using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<object> CreateAsync(UserDTO user);

        Task<ClaimsIdentity> Authenticate(UserDTO userDto);
    }
}
