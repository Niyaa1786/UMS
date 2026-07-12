using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMS.Api.Reponses;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.Facades;

namespace UMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementFacade _userManagementFacade;

        public UserManagementController(IUserManagementFacade userManagementFacade)
        {
            _userManagementFacade = userManagementFacade;
        }

        [HttpPost("Student")]
        //[Authorize(Policy = "RequireAcademicDepartment")]
        public async Task<IActionResult> CreateStudent(CreateStudentRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.CreateStudentAsync(request, ct);

            return Ok(ApiResponse<object>.Success(result, "Student created successfully"));
        }

        [HttpPut("Student/{id}")]
        //[Authorize(Policy = "RequireAcademicDepartment")]
        public async Task<IActionResult> UpdateStudent(Guid id, UpdateStudentRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.UpdateStudentAsync(id, request, ct);

            return Ok(ApiResponse<object>.Success(result, "Student updated successfully"));
        }

        [HttpDelete("Student/{id}")]
        //[Authorize(Policy = "RequireAcademicDepartment")]
        public async Task<IActionResult> DeleteStudent(Guid id, CancellationToken ct)
        {
            await _userManagementFacade.DeleteStudentAsync(id, ct);

            return Ok(ApiResponse<object>.Success(null!, "Student deleted successfully"));
        }

        [HttpGet("Student/{id}")]
        //[Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> GetStudentById(Guid id, CancellationToken ct)
        {
            var result = await _userManagementFacade.GetStudentByIdAsync(id, ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Students")]
        //[Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> GetAllStudents(CancellationToken ct)
        {
            var result = await _userManagementFacade.GetAllStudentsAsync(ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("Teacher")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> CreateTeacher(CreateTeacherRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.CreateTeacherAsync(request, ct);

            return Ok(ApiResponse<object>.Success(result, "Teacher created successfully"));
        }

        [HttpPut("Teacher/{id}")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> UpdateTeacher(Guid id, UpdateTeacherRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.UpdateTeacherAsync(id, request, ct);

            return Ok(ApiResponse<object>.Success(result, "Teacher updated successfully"));
        }

        [HttpDelete("Teacher/{id}")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> DeleteTeacher(Guid id, CancellationToken ct)
        {
            await _userManagementFacade.DeleteTeacherAsync(id, ct);

            return Ok(ApiResponse<object>.Success(null!, "Teacher deleted successfully"));
        }

        [HttpGet("Teacher/{id}")]
        //[Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> GetTeacherById(Guid id, CancellationToken ct)
        {
            var result = await _userManagementFacade.GetTeacherByIdAsync(id, ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Teachers")]
        //[Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> GetAllTeachers(CancellationToken ct)
        {
            var result = await _userManagementFacade.GetAllTeachersAsync(ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("Staff")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> CreateStaff(CreateStaffRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.CreateStaffAsync(request, ct);

            return Ok(ApiResponse<object>.Success(result, "Staff created successfully"));
        }

        [HttpPut("Staff/{id}")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> UpdateStaff(Guid id, UpdateStaffRequest request, CancellationToken ct)
        {
            var result = await _userManagementFacade.UpdateStaffAsync(id, request, ct);

            return Ok(ApiResponse<object>.Success(result, "Staff updated successfully"));
        }

        [HttpDelete("Staff/{id}")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> DeleteStaff(Guid id, CancellationToken ct)
        {
            await _userManagementFacade.DeleteStaffAsync(id, ct);

            return Ok(ApiResponse<object>.Success(null!, "Staff deleted successfully"));
        }

        [HttpGet("Staff/{id}")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> GetStaffById(Guid id, CancellationToken ct)
        {
            var result = await _userManagementFacade.GetStaffByIdAsync(id, ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("Staffs")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> GetAllStaffs(CancellationToken ct)
        {
            var result = await _userManagementFacade.GetAllStaffsAsync(ct);

            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("Account/{userCode}/Status")]
        //[Authorize(Policy = "RequireHRDepartment")]
        public async Task<IActionResult> ActivateAccount(string userCode, bool isActive, CancellationToken ct)
        {
            await _userManagementFacade.ToggleAccountStatusAsync(userCode, isActive, ct);

            return Ok(ApiResponse<object>.Success(null!, "Account status updated successfully"));
        }
    }

}
