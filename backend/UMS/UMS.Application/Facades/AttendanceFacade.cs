using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.UseCases.Attendances.Commands;
using UMS.Application.UseCases.Attendances.Queries;

namespace UMS.Application.Facades
{
    internal class AttendanceFacade : IAttendanceFacade
    {
        private readonly CreateAttendanceUseCase _createAttendance;
        private readonly UpdateAttendanceUseCase _updateAttendance;
        private readonly DeleteAttendanceUseCase _deleteAttendance;
        private readonly GetAttendanceByClassAndDateUseCase _getAttendanceByClassAndDate;
        private readonly GetAttendanceByStudentUseCase _getAttendanceByStudent;
        private readonly GetAttendanceSummaryByClassUseCase _getAttendanceSummaryByClass;

        public AttendanceFacade(
            CreateAttendanceUseCase createAttendance,
            UpdateAttendanceUseCase updateAttendance,
            DeleteAttendanceUseCase deleteAttendance,
            GetAttendanceByClassAndDateUseCase getAttendanceByClassAndDate,
            GetAttendanceByStudentUseCase getAttendanceByStudent,
            GetAttendanceSummaryByClassUseCase getAttendanceSummaryByClass)
        {
            _createAttendance = createAttendance;
            _updateAttendance = updateAttendance;
            _deleteAttendance = deleteAttendance;
            _getAttendanceByClassAndDate = getAttendanceByClassAndDate;
            _getAttendanceByStudent = getAttendanceByStudent;
            _getAttendanceSummaryByClass = getAttendanceSummaryByClass;
        }

        public Task<AttendanceResponse> CreateAttendanceAsync(CreateAttendanceRequest request, CancellationToken ct = default)
            => _createAttendance.ExecuteAsync(request, ct);

        public Task<AttendanceResponse> UpdateAttendanceAsync(Guid attendanceId, UpdateAttendanceRequest request, CancellationToken ct = default)
            => _updateAttendance.ExecuteAsync(attendanceId, request, ct);

        public Task DeleteAttendanceAsync(Guid attendanceId, CancellationToken ct = default)
            => _deleteAttendance.ExecuteAsync(attendanceId, ct);

        public Task<IEnumerable<AttendanceResponse>> GetAttendanceByClassAndDateAsync(Guid classId, DateOnly checkDate, CancellationToken ct = default)
            => _getAttendanceByClassAndDate.ExecuteAsync(classId, checkDate, ct);

        public Task<IEnumerable<AttendanceResponse>> GetAttendanceByStudentAsync(Guid studentId, Guid classId, CancellationToken ct = default)
            => _getAttendanceByStudent.ExecuteAsync(studentId, classId, ct);

        public Task<IEnumerable<AttendanceSummaryResponse>> GetAttendanceSummaryByClassAsync(Guid classId, CancellationToken ct = default)
            => _getAttendanceSummaryByClass.ExecuteAsync(classId, ct);
    }
}
