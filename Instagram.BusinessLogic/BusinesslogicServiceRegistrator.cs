using Instagram.BusinessLogic.Interfaces;
using Instagram.BusinessLogic.Services;
using Instagram.Common.IoContainer;

namespace Instagram.BusinessLogic
{
    public class BusinesslogicServiceRegistrator
    {
        public static void RegisterServices()
        {
            IoContainer.RegisterSingleton<IImageService>(new ImageService());
            IoContainer.RegisterSingleton<IProfileService>(new ProfileService());
            IoContainer.RegisterSingleton<IUserService>(new UserService());
            IoContainer.RegisterSingleton<IPostService>(new PostService());
            IoContainer.RegisterSingleton<ICommentService>(new CommentService());
        }
    }
}