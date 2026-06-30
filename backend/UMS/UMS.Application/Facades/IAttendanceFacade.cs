using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.DTOs.Responses.Attendance;

namespace UMS.Application.Facades
{
    public interface IAttendanceFacade
    {
        Task<AttendanceResponse> CreateAttendanceAsync(CreateAttendanceRequest request, CancellationToken ct = default);
        Task<AttendanceResponse> UpdateAttendanceAsync(Guid attendanceId, UpdateAttendanceRequest request, CancellationToken ct = default);
        Task DeleteAttendanceAsync(Guid attendanceId, CancellationToken ct = default);
        Task<IEnumerable<AttendanceResponse>> GetAttendanceByClassAndDateAsync(Guid classId, DateOnly checkDate, CancellationToken ct = default);
        Task<IEnumerable<AttendanceResponse>> GetAttendanceByStudentAsync(Guid studentId, Guid classId, CancellationToken ct = default);
        Task<IEnumerable<AttendanceSummaryResponse>> GetAttendanceSummaryByClassAsync(Guid classId, CancellationToken ct = default);
    }
}
