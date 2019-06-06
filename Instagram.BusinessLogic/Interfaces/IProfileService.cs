using System;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        void Create(UserDTO userDto);

        UserProfile GetProfileByUserName(string userName);
    }
}