using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UMS.Api.Reponses;
using UMS.Application.Facades;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Enums;

namespace UMS.Api.Controllers
{
    [Route("api/student")]
    [ApiController]
    //[Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        private readonly IClassManagementFacade _classFacade;
        private readonly IUnitOfWork _unitOfWork;

        public StudentController(IClassManagementFacade classFacade, IUnitOfWork unitOfWork)
        {
            _classFacade = classFacade;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("me/classes/{classId}/register")]
        public async Task<IActionResult> SelfRegisterClass(Guid classId, CancellationToken ct)
        {
            var userId = GetUserId();
            var student = await _unitOfWork.Students.GetByAccountIdAsync(userId, ct);
            if (student is null)
                return NotFound(ApiResponse<object>.Failure(null!, "Không tìm thấy thông tin sinh viên."));

            if (!student.Account.IsActive)
                return BadRequest(ApiResponse<object>.Failure(null!, "Tài khoản sinh viên đã bị vô hiệu hóa."));

            var result = await _classFacade.SelfRegisterClassAsync(student.Id, classId, ct);
            return Ok(ApiResponse<object>.Success(result, "Đăng ký học phần thành công"));
        }

        [HttpDelete("me/classes/{classId}/drop")]
        public async Task<IActionResult> SelfDropClass(Guid classId, CancellationToken ct)
        {
            var userId = GetUserId();
            var student = await _unitOfWork.Students.GetByAccountIdAsync(userId, ct);
            if (student is null)
                return NotFound(ApiResponse<object>.Failure(null!, "Không tìm thấy thông tin sinh viên."));

            await _classFacade.SelfDropClassAsync(student.Id, classId, ct);
            return Ok(ApiResponse<object>.Success(null!, "Hủy đăng ký thành công"));
        }

        [HttpGet("me/classes")]
        public async Task<IActionResult> GetMyClasses(CancellationToken ct)
        {
            var userId = GetUserId();
            var student = await _unitOfWork.Students.GetByAccountIdAsync(userId, ct);
            if (student is null)
                return NotFound(ApiResponse<object>.Failure(null!, "Không tìm thấy thông tin sinh viên."));

            var result = await _classFacade.GetEnrollmentsByStudentAsync(student.Id, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("classes/available")]
        public async Task<IActionResult> GetAllClasses(CancellationToken ct)
        {
            var result = await _classFacade.GetAllClassesAsync(ct);
            return Ok(ApiResponse<object>.Success(result));
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
