using System;
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

        public UserProfile GetProfileByUserName(string useName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles
                    .Include(x => x.Followers)
                    .Include(x => x.Following)
                    .Include(x => x.Followers.Select(i => i.User))
                    .Include(x => x.Following.Select(i => i.User))
                    .Include(x => x.User)
                    .FirstOrDefault(item => item.User.UserName == useName);

                return profile;
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

        public UserProfile GetProfileByUserId(int userId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles
                    .Include(x => x.Followers)
                    .Include(x => x.Following)
                    .Include(x => x.Followers.Select(i => i.User))
                    .Include(x => x.Following.Select(i => i.User))
                    .Include(x => x.User)
                    .FirstOrDefault(item => item.User.Id == userId);

                return profile;
            }
        }
    }
}