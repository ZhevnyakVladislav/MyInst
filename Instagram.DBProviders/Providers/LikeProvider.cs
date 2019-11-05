using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Interfaces;
namespace Instagram.DBProviders.Providers
{
    public class LikeProvider : ILikeProvider
    {
        public int CreateLike(Like like)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Likes.Add(like);
                context.SaveChanges();

                return like.Id;
            }
        }

        public void DeleteLike(int id)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var like = new Like { Id = id };
                context.Likes.Attach(like);
                context.Likes.Remove(like);
                context.SaveChanges();
            }
        }

        public Like GetLikeById(int id)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var like = context.Likes
                    .Include(c => c.User)
                    .Include(c => c.User.UsertProfile)
                    .FirstOrDefault(x => x.Id == id);

                return like;
            }
        }

        public IEnumerable<Like> GetPostLikes(int postId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var likes = context.Likes
                    .Include(l => l.User)
                    .Include(c => c.User.UsertProfile)
                    .Where(l => l.PostId == postId);

                return likes.ToList();
            }
        }

        public IEnumerable<UserProfile> GetPostLikedBy(int postId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {

                var userIds = context.Likes.Where(l => l.PostId == postId).Select(l => l.UserId);
                var profiles = context.UserProfiles
                    .Include(p => p.User)
                    .Where(p => userIds.Contains(p.User.Id));

                return profiles.ToList();
            }
        }

    }
}
