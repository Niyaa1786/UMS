using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.Facades;

namespace UMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "RequireAcademicDepartment")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceFacade _facade;

        public AttendanceController(IAttendanceFacade facade)
        {
            _facade = facade;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAttendance(CreateAttendanceRequest request, CancellationToken ct)
        {
            var result = await _facade.CreateAttendanceAsync(request, ct);
            return Ok(ApiResponse<object>.Success(result, "Điểm danh thành công"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(Guid id, UpdateAttendanceRequest request, CancellationToken ct)
        {
            var result = await _facade.UpdateAttendanceAsync(id, request, ct);
            return Ok(ApiResponse<object>.Success(result, "Cập nhật điểm danh thành công"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(Guid id, CancellationToken ct)
        {
            await _facade.DeleteAttendanceAsync(id, ct);
            return Ok(ApiResponse<object>.Success(null, "Xóa điểm danh thành công"));
        }

        [HttpGet("Classes/{classId}")]
        public async Task<IActionResult> GetAttendanceByClassAndDate(Guid classId, [FromQuery] DateOnly checkDate, CancellationToken ct)
        {
            var result = await _facade.GetAttendanceByClassAndDateAsync(classId, checkDate, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Students/{studentId}/Classes/{classId}")]
        [Authorize(Roles = "Admin,Staff,Teacher,Student")]
        public async Task<IActionResult> GetAttendanceByStudent(Guid studentId, Guid classId, CancellationToken ct)
        {
            var result = await _facade.GetAttendanceByStudentAsync(studentId, classId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Classes/{classId}/Summary")]
        public async Task<IActionResult> GetAttendanceSummaryByClass(Guid classId, CancellationToken ct)
        {
            var result = await _facade.GetAttendanceSummaryByClassAsync(classId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }
    }
}
