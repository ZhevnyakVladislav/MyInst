using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Interfaces;


namespace Instagram.DBProviders.Providers
{
    public class PostProvider : IPostProvider
    {
        public void CreatePost(Post post)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Posts.Add(post);

                context.SaveChanges();
            }
        }

        public IEnumerable<Post> CreateUsetPost(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var posts = context.Posts
                    .Include(p => p.User)
                    .Where(p => p.User.UserName == userName);

                return posts;
            }
        }
    }
}
