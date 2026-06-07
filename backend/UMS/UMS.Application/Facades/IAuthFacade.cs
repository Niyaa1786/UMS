using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;

namespace UMS.Application.Facades
{
    public interface IAuthFacade
    {
        Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct = default);
        Task<bool> LogoutAsync(Guid id, CancellationToken ct = default);
        Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken ct = default);
        Task<bool>  ChangePasswordBySelfAsync(Guid userId, ChangePasswordRequest request, CancellationToken ct = default);
        Task<bool> ChangePasswordByAdminAsync(Guid userId, string newPassword, CancellationToken ct = default);

    }
}
