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
        int CreateLike(Like like);

        IEnumerable<Like> GetPostLikes(int postId);

        Like GetLikeById(int id);

        void DeleteLike(int id);

        IEnumerable<UserProfile> GetPostLikedBy(int postId);
    }
}
