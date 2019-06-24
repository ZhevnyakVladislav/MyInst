using Instagram.BusinessLogic.Interfaces;
using Instagram.BusinessLogic.Services;
using Instagram.Common.IoContainer;

namespace Instagram.BusinessLogic
{
    public class BusinesslogicServiceRegistrator
    {
        public static void RegisterServices()
        {
            IoContainer.RegisterSingleton<IProfileService>(new ProfileService());
            IoContainer.RegisterSingleton<IUserService>(new UserService());
        }
    }
}