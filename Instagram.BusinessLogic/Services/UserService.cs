using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;
using User = Instagram.Common.Models.User;

namespace Instagram.BusinessLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IProfileProvider _profileManager;

        private readonly UserManager<User, int> _userManager;

        private readonly RoleManager<Role, int> _roleManager;

        public UserService() : this(IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<RoleManager<Role, int>>(), IoContainer.Resolve<IProfileProvider>()) {}

        public UserService(UserManager<User, int> appUserManager, RoleManager<Role, int> roleManager, IProfileProvider profileManager)
        {
            _profileManager = profileManager ?? throw new ArgumentException(nameof(profileManager));
            _userManager = appUserManager ?? throw new ArgumentException(nameof(appUserManager));
            _roleManager = roleManager ?? throw new ArgumentException(nameof(roleManager));
        }

        public async Task<IdentityResult> CreateAsync(UserDTO userDto)
        {
            if(userDto == null) throw new ArgumentNullException(nameof(userDto));

            var user = await _userManager.FindByNameAsync(userDto.Email);

            if (user == null)
            {
                var role = await _roleManager.FindByNameAsync(userDto.Role.ToString());
                user = new User
                {
                    Email = userDto.Email,
                    UserName = userDto.UserName,
                    RoleId = role.Id
                };

                var result = await _userManager.CreateAsync(user, userDto.Password);

                if (result.Succeeded)
                {
                    var userProfile = new UserProfile
                    {
                        Id = user.Id,
                        FullName = userDto.FullName,
                    };

                    _profileManager.Create(userProfile);
                } else
                {
                    throw new BusinesslogicException(result.Errors.First());
                }

                return result;
            }
            else
            {
                throw new BusinesslogicException($"User with email = {userDto.Email} already exists.");
            }
            
        }

        public async Task<ClaimsIdentity> Authenticate(UserDTO userDto)
        {
            ClaimsIdentity claim = null;

            var user = await _userManager.FindAsync(userDto.UserName, userDto.Password);

            if (user != null)
            {
                claim = await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            }
            else
            {
                throw new BusinesslogicException($"Wrong email or password. Please try again.");
            }

            return claim;
        }

        public UserDTO GetUserByEmail(string email)
        {
            var user = _userManager.FindByEmailAsync(email).Result;

            if (user == null)
            {
                throw new BusinesslogicException($"user with email={email} was not found.");
            }

            return  new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName
            };
        }

        public UserDTO GetUserByUserName(string userName)
        {
            var user = _userManager.FindByNameAsync(userName).Result;

            if (user == null)
            {
                throw new BusinesslogicException($"user with userName={userName} was not found.");
            }

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName
            };
        }
    }
}