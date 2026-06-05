using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.Interfaces.Common;
using UMS.Domain.Entities;

namespace UMS.Infrastructure.Security
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly IConfiguration _configuration;
        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public TokenResult GenerateToken(Account account)
        {
            var accessExpiry = DateTime.UtcNow.AddMinutes(15);
            var RefreshExpiry = DateTime.UtcNow.AddDays(7);
            var accessToken = GenerateAccessToken(account, accessExpiry, _configuration);
            var refreshToken = GenerateRefreshToken();

            return new TokenResult
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiration = accessExpiry,
                RefreshTokenExpiration = RefreshExpiry
            };

        }

        private static string GenerateAccessToken(Account account, DateTime accessExpiry, IConfiguration configuration)
        {
            var jwtSetting = configuration.GetSection("JwtSettings");
            var serectKey  = jwtSetting["SecretKey"] ?? throw new Exception("SecretKey is not configured");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(serectKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new Dictionary<string, object>()
            {
                [ClaimTypes.NameIdentifier] = account.Id.ToString(),
                [ClaimTypes.Name] = account.Username,
                [ClaimTypes.Role] = account.Role.ToString()
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = jwtSetting["Issuer"],
                Audience = jwtSetting["Audience"],
                Claims = claims,
                SigningCredentials = creds,
                Expires = accessExpiry
            };

            var handler = new JsonWebTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);

            return token;
        }

        private static string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
