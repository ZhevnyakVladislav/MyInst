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

        public void Update(UserProfile item)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Entry(item).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        public UserProfile GetProfileByUserName(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var profile = context.UserProfiles.FirstOrDefault(item => item.User.UserName == userName);

                return profile;
            }
        }
    }
}