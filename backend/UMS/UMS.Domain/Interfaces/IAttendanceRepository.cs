using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<Attendance?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<Attendance?> GetByEnrollmentAndDateAsync(Guid enrollmentId, DateOnly checkDate, CancellationToken ct);
        Task<IEnumerable<Attendance>> GetByClassAndDateAsync(Guid classId, DateOnly checkDate, CancellationToken ct);
        Task<IEnumerable<Attendance>> GetByStudentAndClassAsync(Guid studentId, Guid classId, CancellationToken ct);
        Task<IEnumerable<AttendanceSummary>> GetSummaryByClassIdAsync(Guid classId, CancellationToken ct);
        Task<AttendanceSummary> GetSummaryByEnrollmentIdAsync(Guid enrollmentId, CancellationToken ct);

        void Add(Attendance attendance);
        void Update(Attendance attendance);
        void Remove(Attendance attendance);
    }
}
