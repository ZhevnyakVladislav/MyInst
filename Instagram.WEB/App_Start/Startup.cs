using Instagram.BusinessLogic;
using Instagram.DBProviders;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace Instagram.WEB
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });


            ProviderServiceRegistrator.RegisterServices();
            BusinesslogicServiceRegistrator.RegisterServices();
        }
    }
}