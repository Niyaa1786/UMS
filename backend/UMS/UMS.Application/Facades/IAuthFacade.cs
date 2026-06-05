using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;

namespace UMS.Application.Facades
{
    public interface IAuthFacade
    {
        public Task<AuthResponse> Login(LoginRequest request, CancellationToken ct = default);
        public Task<bool> Logout(Guid id, CancellationToken ct = default);
        public Task<AuthResponse> RefreshToken(RefreshTokenRequest request, CancellationToken ct = default);

    }
}
