using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security.DataHandler.Encoder;

namespace Instagram.WEB.Utils.Jwt
{
    public class JwtTokenManager
    {
        private static readonly byte[] Secret = TextEncodings.Base64Url.Decode("IxrAjDoa2FqElO7IhrSrUJELhUckePEPVpaePlS_Xaw");

        private static readonly JwtSecurityTokenHandler Handler;

        static JwtTokenManager()
        {
            Handler = new JwtSecurityTokenHandler();
        }

        public static string GenerateToken(string issuer, IEnumerable<Claim> claims, DateTime expires, DateTime issuedAt)
        {
            var securityKey = new SymmetricSecurityKey(Secret);
            var descriptor = new SecurityTokenDescriptor()
            {
                Issuer = issuer,
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature),
                Expires = expires,
                IssuedAt = issuedAt
            };

            var token = Handler.CreateJwtSecurityToken(descriptor);

            return Handler.WriteToken(token);
        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Secret)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}