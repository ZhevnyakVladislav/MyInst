using Instagram.BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface ILikeService
    {
        LikeDto LikeOrUnlikePost(int postId, string userName);

        IEnumerable<LikeDto> GetPostLikes(int postId);

    }
}
