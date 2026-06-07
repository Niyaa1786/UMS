using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.Facades;
using UMS.Domain.Enums;

namespace UMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthFacade _authFacade;
        public AuthController(IAuthFacade authFacade)
        {
            _authFacade = authFacade;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequest request, CancellationToken ct)
        {
            var result = await _authFacade.LoginAsync(request, ct);

            return Ok(ApiResponse<AuthResponse>.Success(result, "Login sucessfully"));
        }

        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout(CancellationToken ct)
        {
            var userId = GetUserId();
            await _authFacade.LogoutAsync(userId, ct);

            return Ok(ApiResponse<object>.Success(null!, "Logout sucessfully"));
        }

        [HttpPost("RefreshToken")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest request, CancellationToken ct)
        {
            var result = await _authFacade.RefreshTokenAsync(request, ct);

            return Ok(ApiResponse<AuthResponse>.Success(result, "Token refreshed"));
        }

        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> SelfChangePassword(ChangePasswordRequest request, CancellationToken ct)
        {
            var userId = GetUserId();
            await _authFacade.ChangePasswordBySelfAsync(userId, request, ct);

            return Ok(ApiResponse<object>.Success(null!, "Password changed successfully"));
        }

        [HttpPost("Admin/ChangePassword")]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> AdminChangePassword(Guid userId, string newPassword, CancellationToken ct)
        {
            await _authFacade.ChangePasswordByAdminAsync(userId, newPassword, ct);

            return Ok(ApiResponse<object>.Success(null!, "Password changed successfully"));
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("User ID claim not found.");
            return Guid.Parse(userIdClaim);
        }
    }
}
