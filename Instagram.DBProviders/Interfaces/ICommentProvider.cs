using Instagram.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.DBProviders.Interfaces
{
    public interface ICommentProvider
    {
        int CreateComment(Comment comment);

        IEnumerable<Comment> GetPostComments(int postId);

        Comment GetCommentById(int id);
    }
}
