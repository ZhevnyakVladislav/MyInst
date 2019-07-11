using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Microsoft.Owin.Security.OAuth;

namespace Instagram.WEB.Utils.Jwt
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private readonly IUserService _userService;

        public AuthorizationServerProvider(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentException(nameof(userService));
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var user = new UserDto()
            {
                UserName = context.UserName,
                Password = context.Password
            };

            var identity = await _userService.AuthenticateUserAsync(user);

            identity.AddClaim(new Claim("userName", user.UserName));
            identity.AddClaim(new Claim("role", user.Role.ToString()));

            context.Validated(identity);
        }
    }
}