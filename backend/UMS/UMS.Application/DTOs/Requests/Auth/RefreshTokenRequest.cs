using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Requests.Auth
{
    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
