using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.UseCases.Auth;

namespace UMS.Application.Facades
{
    internal class AuthFacade : IAuthFacade
    {
        private readonly LoginUseCase _login;
        private readonly LogoutUseCase _logout;
        private readonly RefreshTokenUseCase _refreshToken;

        public AuthFacade(
            LoginUseCase login,
            LogoutUseCase logout,
            RefreshTokenUseCase refreshToken
            )
        {
            _login = login;
            _logout = logout;
            _refreshToken = refreshToken;
        }
        public Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
            => _login.ExecuteAsync(request, ct);

        public Task<bool> LogoutAsync(Guid id, CancellationToken ct = default)
            => _logout.ExecuteAsync(id, ct);

        public Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken ct = default)
            => _refreshToken.ExecuteAsync(request, ct);

    }
}
