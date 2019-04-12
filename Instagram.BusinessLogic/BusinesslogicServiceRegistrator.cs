
using Instagram.BusinessLogic.Interfaces;
using Instagram.BusinessLogic.Services;
using Instagram.Common.IoContainer;
using Instagram.DBProviders.Interfaces;
using Instagram.DBProviders.Providers;

namespace Instagram.BusinessLogic
{
    public class BusinesslogicServiceRegistrator
    {
        public static void RegisterServices()
        {
            IoContainer.RegisterSingleton<IUserService>(new UserService());
            IoContainer.RegisterSingleton<IProfileService>(new ProfileService());
        }
    }
}