using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Microsoft.AspNet.Identity;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> CreateAsync(UserDTO user);

        Task<ClaimsIdentity> Authenticate(UserDTO userDto);
    }
}
