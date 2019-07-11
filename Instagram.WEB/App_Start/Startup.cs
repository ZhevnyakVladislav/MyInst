using System;
using Instagram.BusinessLogic;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common;
using Instagram.Common.IoContainer;
using Instagram.DBProviders;
using Instagram.WEB.Utils;
using Instagram.WEB.Utils.Jwt;
using Microsoft.AspNet.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;

namespace Instagram.WEB
{
    public class Startup
    {
        private const string issuer = "https://myinstagram.com/";
        private const string secret = "DzlPJ12AFNnkMArtu0G5Oy5Swcg6LW9oUWoRbZ4VyOdKQe7BMeiJkHyGiCEdGWMy";

        public void Configuration(IAppBuilder app)
        {
            AutoMapperConfig.RegisterAutoMapper();
            CommonRegistrator.Register();
            ProviderServiceRegistrator.RegisterServices();
            BusinesslogicServiceRegistrator.RegisterServices();

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions()
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { "Any" },
                IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[]
                {
                    new SymmetricKeyIssuerSecurityKeyProvider(issuer, secret),
                }
            });

            OAuthAuthorizationServerOptions oAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new AuthorizationServerProvider(IoContainer.Resolve<IUserService>()),
                AccessTokenFormat = new CustomJwtFormat(issuer)
            };

            app.UseOAuthAuthorizationServer(oAuthAuthorizationServerOptions);
        }
    }
}
