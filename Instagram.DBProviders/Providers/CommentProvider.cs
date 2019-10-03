using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Interfaces;

namespace Instagram.DBProviders.Providers
{
    public class CommentProvider : ICommentProvider
    {
        public void CreateComment(Comment comment)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Comments.Add(comment);

                context.SaveChanges();
            }
        }

        public IEnumerable<Comment> GetPostComments(int postId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                var comments = context.Comments
                    .Include(c => c.User)
                    .Where(c => c.PostId == postId);

                return comments;
            }
        }
    }
}
