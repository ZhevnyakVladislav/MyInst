using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using Instagram.BusinessLogic;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;

namespace Instagram.WEB.Utils.Jwt
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string _issuer;

        public CustomJwtFormat(string issuer)
        {
            _issuer = issuer;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));

            var issued = data.Properties.IssuedUtc;
            var expires = data.Properties.ExpiresUtc;

            return JwtTokenManager.GenerateToken(_issuer, data.Identity.Claims, expires.Value.UtcDateTime, issued.Value.UtcDateTime);
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}