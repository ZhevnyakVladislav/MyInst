using System;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        void CreateProfile(ProfileDto profile);

        ProfileDto GetProfileByUserName(string userName);

        void UpdateProfile(ProfileDto profile);

        string UpdateProfileImage(string userName, byte[] file);
    }
}