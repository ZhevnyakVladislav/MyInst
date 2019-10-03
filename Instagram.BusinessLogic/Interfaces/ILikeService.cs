using Instagram.BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Interfaces
{
    interface ILikeService
    {
        void CreateLike(int postId, int userId);

        IEnumerable<LikeDto> GetPostLikes(int postId);
    }
}
