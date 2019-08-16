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
                .HasMany(p => p.Followers)
                .WithMany()
                .Map(m =>
                {
                    m.MapLeftKey("Id");
                    m.MapRightKey("FollowerId");
                    m.ToTable("Followers");
                });
        }
    }
}