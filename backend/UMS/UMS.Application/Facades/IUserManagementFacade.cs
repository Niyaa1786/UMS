using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;

namespace UMS.Application.Facades
{
    public interface IUserManagementFacade
    {
        //Student
        Task<StudentResponse> CreateStudentAsync(CreateStudentRequest request, CancellationToken ct = default);
        Task<StudentResponse> UpdateStudentAsync(Guid id, UpdateStudentRequest request, CancellationToken ct = default);
        Task<bool> DeleteStudentAsync(Guid id, CancellationToken ct = default);
        Task<StudentResponse> GetStudentByIdAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<StudentResponse>> GetAllStudentsAsync(CancellationToken ct = default);

        // Teacher
        Task<TeacherResponse> CreateTeacherAsync(CreateTeacherRequest request, CancellationToken ct = default);
        Task<TeacherResponse> UpdateTeacherAsync(Guid id, UpdateTeacherRequest request, CancellationToken ct = default);
        Task<bool> DeleteTeacherAsync(Guid id, CancellationToken ct = default);
        Task<TeacherResponse> GetTeacherByIdAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<TeacherResponse>> GetAllTeachersAsync(CancellationToken ct = default);
        Task<TeacherResponse> GetTeacherByAccountIdAsync(Guid accountId, CancellationToken ct = default);

        // Staff
        Task<StaffResponse> CreateStaffAsync(CreateStaffRequest request, CancellationToken ct = default);
        Task<StaffResponse> UpdateStaffAsync(Guid id, UpdateStaffRequest request, CancellationToken ct = default);
        Task<bool> DeleteStaffAsync(Guid id, CancellationToken ct = default);
        Task<StaffResponse> GetStaffByIdAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<StaffResponse>> GetAllStaffsAsync(CancellationToken ct = default);

        // Account status
        Task ToggleAccountStatusAsync(string userCode, bool isActive, CancellationToken ct = default);
    }
}
