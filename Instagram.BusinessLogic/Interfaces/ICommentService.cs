using Instagram.BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface ICommentService
    {
        CommentDto CreateComment(int postId, string userName, CommentDto commentDto);

        IEnumerable<CommentDto> GetPostComments(int postId);
    }
}
