using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Extensions;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;
using User = Instagram.Common.Models.User;

namespace Instagram.BusinessLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IProfileService _profileService;

        private readonly UserManager<User, int> _userManager;

        private readonly RoleManager<Role, int> _roleManager;

        private readonly IMapper _mapper;

        public UserService() : this(IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<RoleManager<Role, int>>(), IoContainer.Resolve<IProfileService>(), IoContainer.Resolve<IMapper>()) { }

        public UserService(UserManager<User, int> appUserManager, RoleManager<Role, int> roleManager, IProfileService profileService, IMapper mapper)
        {
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
            _userManager = appUserManager ?? throw new ArgumentException(nameof(appUserManager));
            _roleManager = roleManager ?? throw new ArgumentException(nameof(roleManager));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public async Task<IdentityResult> CreateUserAsync(UserDto userDto)
        {
            if (userDto == null) throw new ArgumentNullException(nameof(userDto));

            var user = await _userManager.FindByNameAsync(userDto.UserName);

            if (user == null)
            {
                var role = await _roleManager.FindByNameAsync(userDto.Role.ToString());

                if (role == null)
                {
                    throw new BusinesslogicException($"Role with name = {userDto.Role.ToString()} was not found.");
                }

                user = _mapper.Map<User>(userDto);
                user.RoleId = role.Id;

                var result = await _userManager.CreateAsync(user, userDto.Password);

                if (result.Succeeded)
                {
                    var userProfile = _mapper.Map<ProfileDto>(userDto);
                    userProfile.Id = user.Id;

                    _profileService.CreateProfile(userProfile);
                }
                else
                {
                    throw new BusinesslogicException(result.Errors.First());
                }

                return result;
            }

            throw new BusinesslogicException($"User with email = {userDto.Email} already exists.");
        }

        public async Task<ClaimsIdentity> AuthenticateUser(UserDto userDto)
        {
            if (userDto == null) throw new ArgumentNullException(nameof(userDto));

            ClaimsIdentity claim;

            var user = await _userManager.FindByNameAsync(userDto.UserName);

            if (user != null)
            {
                if (await _userManager.CheckPasswordAsync(user, userDto.Password))
                {
                    claim = await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                }
                else
                {
                    throw new BusinesslogicException($"Sorry, your password was incorrect. Please double-check your password.");
                }
            }
            else
            {
                throw new BusinesslogicException($"The username you entered doesn't belong to an account. Please check your username and try again.");
            }

            return claim;
        }

        public UserDto GetUserByEmail(string email)
        {
            if (email.IsNullOrEmpty()) throw  new ArgumentNullException(email);

            var user = _userManager.FindByEmailAsync(email).Result;

            if (user == null)
            {
                throw new BusinesslogicException($"user with email={email} was not found.");
            }

            return _mapper.Map<UserDto>(user);
        }

        public UserDto GetUserByUserName(string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(userName);

            var user = _userManager.FindByNameAsync(userName).Result;

            if (user == null)
            {
                throw new BusinesslogicException($"user with userName={userName} was not found.");
            }

            return _mapper.Map<UserDto>(user);
        }
    }
}