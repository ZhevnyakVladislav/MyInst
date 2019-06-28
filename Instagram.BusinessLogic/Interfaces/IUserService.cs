using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Microsoft.AspNet.Identity;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(UserDto user);

        Task<ClaimsIdentity> AuthenticateUserAsync(UserDto userDto);

        UserDto GetUserByEmail(string email);

        UserDto GetUserByUserName(string userName);

        Task<UserDto> ConfirmUserEmailAsync(string userName, string code);

        Task RecoverUserAsync(string userName);

        Task ResetPasswordAsync(string userName, string token, string newPassword);
    }
}
