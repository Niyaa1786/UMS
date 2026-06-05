using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Responses.Auth
{
    public class TokenResult
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime AccessTokenExpiration { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
