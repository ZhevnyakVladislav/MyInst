using Instagram.BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Interfaces
{
    interface ICommentService
    {
        void CreateComment(int postId, CommentDto comment);

        IEnumerable<CommentDto> GetPostComments(int postId);
    }
}
