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
        private readonly ChangePasswordBySelfUseCase _changePasswordBySelf;
        private readonly ChangePasswordByAdminUseCase _changePasswordByAdmin;

        public AuthFacade(
            LoginUseCase login,
            LogoutUseCase logout,
            RefreshTokenUseCase refreshToken,
            ChangePasswordBySelfUseCase changePasswordBySelf,
            ChangePasswordByAdminUseCase changePasswordByAdmin
            )
        {
            _login = login;
            _logout = logout;
            _refreshToken = refreshToken;
            _changePasswordBySelf = changePasswordBySelf;
            _changePasswordByAdmin = changePasswordByAdmin;
        }
        public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
            => await _login.ExecuteAsync(request, ct);

        public async Task<bool> LogoutAsync(Guid id, CancellationToken ct = default)
            => await _logout.ExecuteAsync(id, ct);

        public async Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken ct = default)
            => await _refreshToken.ExecuteAsync(request, ct);

        public async Task<bool> ChangePasswordBySelfAsync(Guid userId, ChangePasswordRequest request, CancellationToken ct = default)
            => await _changePasswordBySelf.ExecuteAsync(userId, request, ct);

        public async Task<bool> ChangePasswordByAdminAsync(Guid userId, string newPassword, CancellationToken ct = default)
            => await _changePasswordByAdmin.ExecuteAsync(userId, newPassword, ct);
    }
}
