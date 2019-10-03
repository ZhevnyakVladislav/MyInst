using Instagram.BusinessLogic.Entities;

namespace Instagram.BusinessLogic.Interfaces
{
    interface IPostService
    {
        void CreatePost(PostDto post);

        PostDto GetUserPosts(string userName);
        
    }
}
