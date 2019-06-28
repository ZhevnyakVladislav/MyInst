using System.Threading.Tasks;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;

namespace Instagram.DBProviders.Identity
{
    public class AppUserManager : UserManager<User, int>
    {
        public AppUserManager() : this(IoContainer.Resolve<IUserStore<User, int>>()) { }

        public AppUserManager(IUserStore<User, int> store) : base(store)
        {
            UserValidator = new UserValidator<User, int>(this)
            {
                RequireUniqueEmail = true,
                AllowOnlyAlphanumericUserNames = false
            };

            PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8,
                RequireDigit = true,
                RequireNonLetterOrDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            UserTokenProvider = new EmailTokenProvider<User, int>()
            {
                Subject = "Subject",
                BodyFormat = "Body"
            };

            EmailService = IoContainer.Resolve<IIdentityMessageService>();
        }
    }
}