using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Requests.Subjects;
using UMS.Application.Facades;

namespace UMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAcademicDepartment")]
    public class ClassManagementController : ControllerBase
    {
        private readonly IClassManagementFacade _facade;

        public ClassManagementController(IClassManagementFacade facade)
        {
            _facade = facade;
        }

        [HttpPost("Subject")]
        public async Task<IActionResult> CreateSubject(CreateSubjectRequest request, CancellationToken ct)
        {
            var result = await _facade.CreateSubjectAsync(request, ct);
            return Ok(ApiResponse<object>.Success(result, "Tạo môn học thành công"));
        }

        [HttpPut("Subject/{id}")]
        public async Task<IActionResult> UpdateSubject(Guid id, UpdateSubjectRequest request, CancellationToken ct)
        {
            var result = await _facade.UpdateSubjectAsync(id, request, ct);
            return Ok(ApiResponse<object>.Success(result, "Cập nhật môn học thành công"));
        }

        [HttpDelete("Subject/{id}")]
        public async Task<IActionResult> DeleteSubject(Guid id, CancellationToken ct)
        {
            await _facade.DeleteSubjectAsync(id, ct);
            return Ok(ApiResponse<object>.Success(null!, "Xóa môn học thành công"));
        }

        [HttpGet("Subject/{id}")]
        public async Task<IActionResult> GetSubjectById(Guid id, CancellationToken ct)
        {
            var result = await _facade.GetSubjectByIdAsync(id, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Subjects")]
        public async Task<IActionResult> GetAllSubjects(CancellationToken ct)
        {
            var result = await _facade.GetAllSubjectsAsync(ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("Class")]
        public async Task<IActionResult> CreateClass(CreateClassRequest request, CancellationToken ct)
        {
            var result = await _facade.CreateClassAsync(request, ct);
            return Ok(ApiResponse<object>.Success(result, "Tạo lớp học thành công"));
        }

        [HttpPut("Class/{id}")]
        public async Task<IActionResult> UpdateClass(Guid id, UpdateClassRequest request, CancellationToken ct)
        {
            var result = await _facade.UpdateClassAsync(id, request, ct);
            return Ok(ApiResponse<object>.Success(result, "Cập nhật lớp học thành công"));
        }

        [HttpDelete("Class/{id}")]
        public async Task<IActionResult> DeleteClass(Guid id, CancellationToken ct)
        {
            await _facade.DeleteClassAsync(id, ct);
            return Ok(ApiResponse<object>.Success(null!, "Xóa lớp học thành công"));
        }

        [HttpGet("Class/{id}")]
        public async Task<IActionResult> GetClassById(Guid id, CancellationToken ct)
        {
            var result = await _facade.GetClassByIdAsync(id, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Classes")]
        public async Task<IActionResult> GetAllClasses(CancellationToken ct)
        {
            var result = await _facade.GetAllClassesAsync(ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Classes/Teacher/{teacherId}")]
        public async Task<IActionResult> GetClassesByTeacher(Guid teacherId, CancellationToken ct)
        {
            var result = await _facade.GetClassesByTeacherAsync(teacherId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Classes/Subject/{subjectId}")]
        public async Task<IActionResult> GetClassesBySubject(Guid subjectId, CancellationToken ct)
        {
            var result = await _facade.GetClassesBySubjectAsync(subjectId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPut("Class/{id}/Status")]
        public async Task<IActionResult> ChangeClassStatus(Guid id, bool isActive, CancellationToken ct)
        {
            await _facade.ChangeClassStatusAsync(id, isActive, ct);
            return Ok(ApiResponse<object>.Success(null!, isActive ? "Kích hoạt lớp thành công" : "Đóng lớp thành công"));
        }

        [HttpPost("Schedule")]
        public async Task<IActionResult> CreateClassSchedule(CreateClassScheduleRequest request, CancellationToken ct)
        {
            var result = await _facade.CreateClassScheduleAsync(request, ct);
            return Ok(ApiResponse<object>.Success(result, "Thêm lịch học thành công"));
        }

        [HttpPut("Schedule/{scheduleId}")]
        public async Task<IActionResult> UpdateClassSchedule(Guid scheduleId, UpdateClassScheduleRequest request, CancellationToken ct)
        {
            var result = await _facade.UpdateClassScheduleAsync(scheduleId, request, ct);
            return Ok(ApiResponse<object>.Success(result, "Cập nhật lịch học thành công"));
        }

        [HttpDelete("Schedule/{scheduleId}")]
        public async Task<IActionResult> DeleteClassSchedule(Guid scheduleId, CancellationToken ct)
        {
            await _facade.DeleteClassScheduleAsync(scheduleId, ct);
            return Ok(ApiResponse<object>.Success(null!, "Xóa lịch học thành công"));
        }

        [HttpGet("Schedules/Class/{classId}")]
        public async Task<IActionResult> GetClassSchedulesByClass(Guid classId, CancellationToken ct)
        {
            var result = await _facade.GetClassSchedulesByClassIdAsync(classId, ct);
            return Ok(ApiResponse<object>.Success(result));
        }

    }
}
