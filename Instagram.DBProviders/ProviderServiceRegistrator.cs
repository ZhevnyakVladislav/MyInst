using System.Data.Entity;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Identity;
using Instagram.DBProviders.Interfaces;
using Instagram.DBProviders.Providers;
using Microsoft.AspNet.Identity;

namespace Instagram.DBProviders
{
    public class ProviderServiceRegistrator
    {
        public static void RegisterServices()
        {
            IoContainer.RegisterSingleton<DbContext>(new AppDbContext());
            IoContainer.RegisterSingleton<IUserStore<User, int>>(new UserStore());
            IoContainer.RegisterSingleton<IRoleStore<Role, int>>(new RoleStore());
            IoContainer.RegisterSingleton<RoleManager<Role, int>>(new AppRoleManager());
            IoContainer.RegisterSingleton<UserManager<User, int>>(new AppUserManager());
            IoContainer.RegisterSingleton<IProfileProvider>(new ProfileProvider());
            IoContainer.RegisterSingleton<IPostProvider>(new PostProvider());
            IoContainer.RegisterSingleton<ICommentProvider>(new CommentProvider());
            IoContainer.RegisterSingleton<ILikeProvider>(new LikeProvider());
        }
    }
}