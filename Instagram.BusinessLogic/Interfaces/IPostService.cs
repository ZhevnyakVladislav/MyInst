using Instagram.BusinessLogic.Entities;
using System.Collections.Generic;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IPostService
    {
        void CreatePost(PostDto post);

        PostDto GetPostById(int id);

        IEnumerable<PostDto> GetUserPosts(string userName);

        IEnumerable<PostDto> GetFollowingUsersPosts(string userName);
    }
}
