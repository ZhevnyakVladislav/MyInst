using System;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        Task Create(UserDTO userDto);
    }
}