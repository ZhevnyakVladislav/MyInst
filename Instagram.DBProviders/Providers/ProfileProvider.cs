using System;
using System.Data.Entity;
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
    }
}