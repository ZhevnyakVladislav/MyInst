using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Interfaces;

namespace Instagram.DBProviders.Providers
{
    public class ProfileProvider : IProfileProvider
    {
        public void Create(UserProfile item)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.UserProfiles.Add(item);
                context.SaveChanges();
            }
        }

        public UserProfile GetProfileByUserName(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles
                    .Include(x => x.Followers)
                    .Include(x => x.Followers.Select(i => i.User))
                    .Include(x => x.User)
                    .SingleOrDefault(item => item.User.UserName == userName);

                return profile;
            }
        }

        public IEnumerable<UserProfile> GetFollowingByUserName(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var following = context.UserProfiles
                    .Include(x => x.User)
                    .Include(x => x.Followers)
                    .Where(x => x.Followers.Select(i => i.User.UserName).Contains(userName));

                return following.ToList();
            }
        }

        public void Update(UserProfile item)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Entry(item).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Follow(string userName, string followerUserName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles.FirstOrDefault(item => item.User.UserName == userName);
                var followerProfile = context.UserProfiles.FirstOrDefault(item => item.User.UserName == followerUserName);

                if (!profile.Followers.ToDictionary(x => x.User.UserName, x => x).TryGetValue(followerUserName, out var value))
                {
                    profile.Followers = new List<UserProfile>(profile.Followers) { followerProfile };
                }

                context.SaveChanges();

            }
        }

        public void Unfollow(string userName, string followerUserName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles.FirstOrDefault(item => item.User.UserName == userName);

                if (profile.Followers.ToDictionary(x => x.User.UserName, x => x).TryGetValue(followerUserName, out var value))
                {
                    profile.Followers.Remove(value);
                }

                context.SaveChanges();

            }
        }

        public UserProfile GetProfileByUserId(int userId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles
                    .Include(x => x.Followers)
                    .Include(x => x.Followers.Select(i => i.User))
                    .Include(x => x.User)
                    .SingleOrDefault(item => item.User.Id == userId);

                return profile;
            }
        }

        public IEnumerable<UserProfile> GetFollowersByUserName(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var followers = context.UserProfiles
                    .Include(p => p.Followers)
                    .Include(x => x.Followers.Select(i => i.User))
                    .Include(p => p.Followers.Select(i => i.Followers))
                    .Include(p => p.Followers.Select(i => i.Followers.Select(x => x.User)))
                    .FirstOrDefault(item => item.User.UserName == userName)
                    ?.Followers;

                return followers;
            }
        }
    }
}