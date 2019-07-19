using System;
using System.IO;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        void CreateProfile(ProfileDto profile);

        ProfileDto GetProfileByUserName(string userName);

        void UpdateProfile(string userName, ProfileDto profile);

        string UpdateProfileImage(string userName, Stream filesStream);

        void UpdateFollowing(string currentUserName, string userName);
    }
}