using System.Data.Entity;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;

namespace Instagram.DBProviders.EntityFramework
{
    public class DbInitializer : DropCreateDatabaseIfModelChanges<AppDbContext>
    {

        protected override void Seed(AppDbContext db)
        {
            var role = new Role
            {
                Name = Roles.Admin.ToString()
            };

            db.Roles.Add(role);
            db.SaveChanges();
        }
    }
}