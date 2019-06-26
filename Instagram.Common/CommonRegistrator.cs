using Instagram.Common.Services;
using Microsoft.AspNet.Identity;

namespace Instagram.Common
{
    public class CommonRegistrator
    {
        public static void Register()
        {
            IoContainer.IoContainer.RegisterSingleton<IIdentityMessageService>(new EmailService());
        }
    }
}