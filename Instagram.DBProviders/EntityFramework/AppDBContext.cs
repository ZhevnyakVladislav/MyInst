using System.Data.Entity;
using Instagram.Common.Models;

namespace Instagram.DBProviders.EntityFramework
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public AppDbContext() : base("name=InstContext")
        {
            Database.SetInitializer(new DbInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProfile>()
                .HasMany(u => u.Followers)
                .WithMany(u => u.Following)
                .Map(m =>
                {
                    m.MapLeftKey("OwnerId");
                    m.MapRightKey("FollowerId");
                    m.ToTable("Followers");
                });
        }
    }
}