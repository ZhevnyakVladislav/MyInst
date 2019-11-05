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

        public IEnumerable<Post> GetUserPosts(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var posts = context.Posts
                    .Include(p => p.CreatedBy)
                    .Include(p => p.CreatedBy.UsertProfile)
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .Where(p => p.CreatedBy.UserName == userName);

                return posts.ToList();
            }
        }

        public IEnumerable<Post> GetFollowingPost(IEnumerable<string>  followersUserName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var posts = context.Posts
                    .Include(p => p.CreatedBy)
                    .Include(p => p.CreatedBy.UsertProfile)
                    .Include(p => p.Comments)
                    .Include(p => p.Comments.Select(c => c.User))
                    .Include(p => p.Comments.Select(c => c.User.UsertProfile))
                    .Include(p => p.Likes)
                    .Include(p => p.Likes.Select(l => l.User))
                    .Include(p => p.Likes.Select(l => l.User.UsertProfile))
                    .Where(p => followersUserName.Contains(p.CreatedBy.UserName));
                   

                return posts.ToList();
            }
        }

        public Post GetPostById(int id)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var post = context.Posts
                    .Include(p => p.CreatedBy)
                    .Include(p => p.CreatedBy.UsertProfile)
                    .Include(p => p.Comments)
                    .Include(p => p.Comments.Select(c => c.User))
                    .Include(p => p.Comments.Select(c => c.User.UsertProfile))
                    .Include(p => p.Likes)
                    .Include(p => p.Likes.Select(l => l.User))
                    .Include(p => p.Likes.Select(l => l.User.UsertProfile))
                    .FirstOrDefault(p => p.Id == id);

                return post;
            }
        }
    }
}
