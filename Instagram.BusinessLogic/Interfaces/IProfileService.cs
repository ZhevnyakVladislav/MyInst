using System.Collections.Generic;
using System.IO;
using Instagram.BusinessLogic.Entities;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IProfileService
    {
        void CreateProfile(ProfileDto profile);

        ProfileDto GetProfileByUserName(string userName);

        void UpdateProfile(string userName, ProfileDto profile);

        string UpdateProfileImage(string userName, Stream filesStream);

        void Follow(string userName, string followerUserName);

        void Unfollow(string userName, string followerUserName);

        IEnumerable<ProfileDto> GetFollowers(string userName);

        IEnumerable<ProfileDto> GetFollowing(string userName);
    }
}