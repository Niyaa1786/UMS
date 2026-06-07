using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.UseCases.UserManagement.Commands;
using UMS.Application.UseCases.UserManagement.Queries;

namespace UMS.Application.Facades
{
    internal class UserManagementFacade : IUserManagementFacade
    {
        private readonly CreateStudentUseCase _createStudent;
        private readonly UpdateStudentUseCase _updateStudent;
        private readonly DeleteStudentUseCase _deleteStudent;
        private readonly GetStudentByIdUseCase _getStudentById;
        private readonly GetAllStudentsUseCase _getAllStudents;

        private readonly CreateTeacherUseCase _createTeacher;
        private readonly UpdateTeacherUseCase _updateTeacher;
        private readonly DeleteTeacherUseCase _deleteTeacher;
        private readonly GetTeacherByIdUseCase _getTeacherById;
        private readonly GetAllTeachersUseCase _getAllTeachers;

        private readonly CreateStaffUseCase _createStaff;
        private readonly UpdateStaffUseCase _updateStaff;
        private readonly DeleteStaffUseCase _deleteStaff;
        private readonly GetStaffByIdUseCase _getStaffById;
        private readonly GetAllStaffsUseCase _getAllStaffs;

        private readonly ToggleAccountStatusUseCase _toggleAccountStatus;

        public UserManagementFacade(
            CreateStudentUseCase createStudent,
            UpdateStudentUseCase updateStudent,
            DeleteStudentUseCase deleteStudent,
            GetStudentByIdUseCase getStudentById,
            GetAllStudentsUseCase getAllStudents,

            CreateTeacherUseCase createTeacher,
            UpdateTeacherUseCase updateTeacher,
            DeleteTeacherUseCase deleteTeacher,
            GetTeacherByIdUseCase getTeacherById,
            GetAllTeachersUseCase getAllTeachers,

            CreateStaffUseCase createStaff,
            UpdateStaffUseCase updateStaff,
            DeleteStaffUseCase deleteStaff,
            GetStaffByIdUseCase getStaffById,
            GetAllStaffsUseCase getAllStaffs,
            ToggleAccountStatusUseCase toggleAccountStatus)
        {
            _createStudent = createStudent;
            _updateStudent = updateStudent;
            _deleteStudent = deleteStudent;
            _getStudentById = getStudentById;
            _getAllStudents = getAllStudents;

            _createTeacher = createTeacher;
            _updateTeacher = updateTeacher;
            _deleteTeacher = deleteTeacher;
            _getTeacherById = getTeacherById;
            _getAllTeachers = getAllTeachers;

            _createStaff = createStaff;
            _updateStaff = updateStaff;
            _deleteStaff = deleteStaff;
            _getStaffById = getStaffById;
            _getAllStaffs = getAllStaffs;

            _toggleAccountStatus = toggleAccountStatus;
        }

        // Student
        public Task<StudentResponse> CreateStudentAsync(CreateStudentRequest request, CancellationToken ct)
            => _createStudent.ExecuteAsync(request, ct);
        public Task<StudentResponse> UpdateStudentAsync(Guid id, UpdateStudentRequest request, CancellationToken ct) => _updateStudent.ExecuteAsync(id, request, ct);
        public Task<bool> DeleteStudentAsync(Guid id, CancellationToken ct)
            => _deleteStudent.ExecuteAsync(id, ct);
        public Task<StudentResponse> GetStudentByIdAsync(Guid id, CancellationToken ct)
            => _getStudentById.ExecuteAsync(id, ct);
        public Task<IEnumerable<StudentResponse>> GetAllStudentsAsync(CancellationToken ct)
            => _getAllStudents.ExecuteAsync(ct);

        // Teacher
        public Task<TeacherResponse> CreateTeacherAsync(CreateTeacherRequest request, CancellationToken ct)
            => _createTeacher.ExecuteAsync(request, ct);
        public Task<TeacherResponse> UpdateTeacherAsync(Guid id, UpdateTeacherRequest request, CancellationToken ct)
            => _updateTeacher.ExecuteAsync(id, request, ct);
        public Task<bool> DeleteTeacherAsync(Guid id, CancellationToken ct)
            => _deleteTeacher.ExecuteAsync(id, ct);
        public Task<TeacherResponse> GetTeacherByIdAsync(Guid id, CancellationToken ct)
            => _getTeacherById.ExecuteAsync(id, ct);
        public Task<IEnumerable<TeacherResponse>> GetAllTeachersAsync(CancellationToken ct)
            => _getAllTeachers.ExecuteAsync(ct);

        // Staff
        public Task<StaffResponse> CreateStaffAsync(CreateStaffRequest request, CancellationToken ct)
            => _createStaff.ExecuteAsync(request, ct);
        public Task<StaffResponse> UpdateStaffAsync(Guid id, UpdateStaffRequest request, CancellationToken ct)
            => _updateStaff.ExecuteAsync(id, request, ct);
        public Task<bool> DeleteStaffAsync(Guid id, CancellationToken ct)
            => _deleteStaff.ExecuteAsync(id, ct);
        public Task<StaffResponse> GetStaffByIdAsync(Guid id, CancellationToken ct)
            => _getStaffById.ExecuteAsync(id, ct);
        public Task<IEnumerable<StaffResponse>> GetAllStaffsAsync(CancellationToken ct)
            => _getAllStaffs.ExecuteAsync(ct);

        // Account status
        public Task ToggleAccountStatusAsync(Guid accountId, bool isActive, CancellationToken ct = default)
            => _toggleAccountStatus.ExecuteAsync(accountId, isActive, ct);
    }

}

