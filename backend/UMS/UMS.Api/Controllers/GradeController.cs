using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.Facades;

namespace UMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "RequireAcademicDepartment")]
    public class GradeController : ControllerBase
    {
        private readonly IGradeFacade _facade;

        public GradeController(IGradeFacade facade)
        {
            _facade = facade;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGrade(CreateGradeRequest request, CancellationToken ct)
        {
            var updatedBy = GetUserId();
            var result = await _facade.CreateGradeAsync(request, updatedBy, ct);
            return Ok(ApiResponse<object>.Success(result, "Nhập điểm thành công"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrade(Guid id, UpdateGradeRequest request, CancellationToken ct)
        {
            var updatedBy = GetUserId();
            var result = await _facade.UpdateGradeAsync(id, request, updatedBy, ct);
            return Ok(ApiResponse<object>.Success(result, "Cập nhật điểm thành công"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(Guid id, CancellationToken ct)
        {
            await _facade.DeleteGradeAsync(id, ct);
            return Ok(ApiResponse<object>.Success(null, "Xóa điểm thành công"));
        }

        [HttpGet("Classes/{classId}")]
        public async Task<IActionResult> GetGradesByClass(Guid classId, CancellationToken ct)
        {
            var result = await _facade.GetGradesByClassAsync(classId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Students/{studentId}")]
        [Authorize(Roles = "Admin,Staff,Teacher,Student")]
        public async Task<IActionResult> GetGradesByStudent(Guid studentId, CancellationToken ct)
        {
            var result = await _facade.GetGradesByStudentAsync(studentId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Classes/{classId}/Final")]
        public async Task<IActionResult> CalculateFinalGrade(Guid classId, CancellationToken ct)
        {
            var result = await _facade.CalculateFinalGradeAsync(classId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("Enrollments/{enrollmentId}/SyncFromAttendance")]
        public async Task<IActionResult> SyncAttendanceToGrade(Guid enrollmentId, CancellationToken ct)
        {
            var updatedBy = GetUserId();
            var result = await _facade.SyncAttendanceToGradeAsync(enrollmentId, updatedBy, ct);
            return Ok(ApiResponse<object>.Success(result, "Đồng bộ điểm chuyên cần thành công"));
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
