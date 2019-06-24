using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Microsoft.AspNet.Identity;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(UserDto user);

        Task<ClaimsIdentity> AuthenticateUser(UserDto userDto);

        UserDto GetUserByEmail(string email);

        UserDto GetUserByUserName(string userName);
    }
}
