using System;
using System.Collections.Generic;
using Instagram.Common.Models;

namespace Instagram.DBProviders.Interfaces
{
    public interface IProfileProvider
    {
        void Create(UserProfile item);

        UserProfile GetProfileByUserId(int userId);

        UserProfile GetProfileByUserName(string useName);

        void Update(UserProfile item);

        void Follow(string userName, string followerUserName);

        void Unfollow(string userName, string followerUserName);

        IEnumerable<UserProfile> GetFollowersByUserName(string userName);

        IEnumerable<UserProfile> GetFollowingByUserName(string userName);
    }
}