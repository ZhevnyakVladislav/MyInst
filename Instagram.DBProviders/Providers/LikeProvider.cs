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
        public void CreateLike(Like like)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Likes.Add(like);
                context.SaveChanges();
            }
        }

        public IEnumerable<Like> GetPostLikes(int postId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var likes = context.Likes
                    .Include(l => l.User)
                    .Where(l => l.PostId == postId);

                return likes;
            }
        }
    }
}
