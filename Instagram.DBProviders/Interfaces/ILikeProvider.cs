using Instagram.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.DBProviders.Interfaces
{
    public interface ILikeProvider
    {
        void CreateLike(Like like);

        IEnumerable<Like> GetPostLikes(int postId);
    }
}
