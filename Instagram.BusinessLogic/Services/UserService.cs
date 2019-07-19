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

        public async Task CreateUserAsync(UserDto userDto)
        {
            if (userDto == null) throw new ArgumentNullException(nameof(userDto));

            var user = await _userManager.FindByNameAsync(userDto.UserName);

            if (user == null)
            {
                var role = await _roleManager.FindByNameAsync(userDto.Role.ToString());

                if (role == null)
                {
                    throw new BusinessLogicException($"Role with name = {userDto.Role.ToString()} was not found.");
                }

                user = _mapper.Map<User>(userDto);
                user.RoleId = role.Id;

                var result = await _userManager.CreateAsync(user, userDto.Password);

                if (result.Succeeded)
                {
                    var userProfile = _mapper.Map<ProfileDto>(userDto);
                    userProfile.Id = user.Id;

                    _profileService.CreateProfile(userProfile);

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    await _userManager.SendEmailAsync(user.Id,
                        "Confirm your account",
                        $"Your verification code: {code}");
                }
                else
                {
                    throw new BusinessLogicException(result.Errors.First());
                }
            }
            else
            {
                throw new BusinessLogicException($"User with userName = {userDto.UserName} already exists.");
            }
        }

        public async Task<ClaimsIdentity> AuthenticateUserAsync(UserDto userDto)
        {
            if (userDto == null) throw new ArgumentNullException(nameof(userDto));

            ClaimsIdentity identity;

            var user = await _userManager.FindByNameAsync(userDto.UserName);

            if (user != null)
            {
                if (!await _userManager.IsEmailConfirmedAsync(user.Id))
                {
                    throw new BusinessLogicException($"You must have a confirmed email to log on.");
                }

                if (await _userManager.CheckPasswordAsync(user, userDto.Password))
                {
                    identity = await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ExternalBearer);
                }
                else
                {
                    throw new BusinessLogicException($"Sorry, your password was incorrect. Please double-check your password.");
                }
            }
            else
            {
                throw new BusinessLogicException($"The username you entered doesn't belong to an account. Please check your username and try again.");
            }

            foreach (Claim c in identity.Claims)
            {
                identity.TryRemoveClaim(c);
            }

            return identity;
        }

        public UserDto GetUserByEmail(string email)
        {
            if (email.IsNullOrEmpty()) throw  new ArgumentNullException(nameof(email));

            var user = _userManager.FindByEmailAsync(email).Result;

            if (user == null)
            {
                throw new BusinessLogicException($"User with email={email} was not found.");
            }

            return _mapper.Map<UserDto>(user);
        }

        public UserDto GetUserByUserName(string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var user = _userManager.FindByNameAsync(userName).Result;

            if (user == null)
            {
                throw new BusinessLogicException($"User with userName={userName} was not found.");
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> ConfirmUserEmailAsync(string userName, string code)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));
            if (code.IsNullOrEmpty()) throw new ArgumentNullException(nameof(code));

            var user = GetUserByUserName(userName);

            var result = await _userManager.ConfirmEmailAsync(user.Id, code);

            if (!result.Succeeded)
            {
                throw new BusinessLogicException(result.Errors.FirstOrDefault());
            }

            return user;
        }

        public async Task RecoverUserAsync(string userName)
        {
            if(userName.IsNullOrEmpty()) throw  new ArgumentNullException(userName);

            var user = GetUserByUserName(userName);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user.Id);

            await _userManager.SendEmailAsync(user.Id,
                "Confirm your account",
                $"Your verification code: {token}");
        }

        public async Task ResetPasswordAsync(string userName, string token, string newPassword)
        {
            if(userName.IsNullOrEmpty()) throw  new ArgumentNullException(nameof(userName));
            if (token.IsNullOrEmpty()) throw new ArgumentNullException(nameof(token));
            if (newPassword.IsNullOrEmpty()) throw new ArgumentNullException(nameof(newPassword));

            var user = GetUserByUserName(userName);

            var result = await _userManager.ResetPasswordAsync(user.Id, token, newPassword);

            if (!result.Succeeded)
            {
                throw new BusinessLogicException(result.Errors.FirstOrDefault());
            }
        }

        public async Task ChangePassword(string userName, string oldPassword, string newPassword, string confirmPassword)
        {
            if(oldPassword.IsNullOrEmpty()) throw  new ArgumentNullException(nameof(oldPassword));
            if (newPassword.IsNullOrEmpty()) throw new ArgumentNullException(nameof(newPassword));
            if (confirmPassword.IsNullOrEmpty()) throw new ArgumentNullException(nameof(confirmPassword));

            if (newPassword != confirmPassword) throw new BusinessLogicException("Please make sure both passwords match.");

            var user = GetUserByUserName(userName);
            var result = await _userManager.ChangePasswordAsync(user.Id, oldPassword, newPassword);

            if (!result.Succeeded)
            {
                throw new BusinessLogicException(result.Errors.FirstOrDefault());
            }
        }

        public void UpdateUserName(string oldUserName, string newUserName)
        {
            if (oldUserName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(oldUserName));
            if (newUserName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(newUserName));

            if (oldUserName != newUserName)
            {
                var existedUser = _userManager.FindByNameAsync(oldUserName).Result;
                existedUser.UserName = newUserName;

                var result =_userManager.UpdateAsync(existedUser).Result;

                if (!result.Succeeded)
                {
                    throw new BusinessLogicException(result.Errors.FirstOrDefault());
                }
            }
        }
    }
}