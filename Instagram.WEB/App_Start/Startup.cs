using System;
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
                LoginPath = PathString.Empty,
                ExpireTimeSpan = TimeSpan.FromDays(14),
            });

            ProviderServiceRegistrator.RegisterServices();
            BusinesslogicServiceRegistrator.RegisterServices();
        }
    }
}