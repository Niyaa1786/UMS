using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;

namespace UMS.Application.Facades
{
    public interface IAuthFacade
    {
        public Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct = default);
        public Task<bool> LogoutAsync(Guid id, CancellationToken ct = default);
        public Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken ct = default);

    }
}
