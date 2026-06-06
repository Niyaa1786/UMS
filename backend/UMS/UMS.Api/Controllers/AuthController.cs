using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.Facades;

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
        public async Task<IActionResult> Login(LoginRequest request, CancellationToken ct)
        {
            var result = await _authFacade.LoginAsync(request, ct);
            var res = ApiResponse<AuthResponse>.Success(result, "Login sucessfully");

            return Ok(res);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout(CancellationToken ct)
        {
            var userId = GetUserId();
            await _authFacade.LogoutAsync(userId, ct);
            var res = ApiResponse<object>.Success(null!, "Logout sucessfully");

            return Ok(res);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest request, CancellationToken ct)
        {
            var result = await _authFacade.RefreshTokenAsync(request, ct);
            var res = ApiResponse<AuthResponse>.Success(result, "Token refreshed");

            return Ok(res);
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.Parse(userIdClaim!);
        }
    }
}
