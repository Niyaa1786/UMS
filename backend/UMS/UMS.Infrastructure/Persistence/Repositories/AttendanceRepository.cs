using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Enums;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class AttendanceRepository : IAttendanceRepository
    {
        private readonly AppDbContext _context;
        public AttendanceRepository(AppDbContext context) => _context = context;

        public async Task<Attendance?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Attendances
                .Include(a => a.Enrollment)
                    .ThenInclude(e => e!.Student)
                .FirstOrDefaultAsync(a => a.Id == id, ct);

        public async Task<Attendance?> GetByEnrollmentAndDateAsync(Guid enrollmentId, DateOnly checkDate, CancellationToken ct)
            => await _context.Attendances
                .FirstOrDefaultAsync(a => a.EnrollmentId == enrollmentId && a.CheckDate == checkDate, ct);

        public async Task<IEnumerable<Attendance>> GetByClassAndDateAsync(Guid classId, DateOnly checkDate, CancellationToken ct)
            => await _context.Attendances
                .Include(a => a.Enrollment)
                    .ThenInclude(e => e!.Student)
                .Where(a => a.Enrollment!.ClassId == classId && a.CheckDate == checkDate)
                .AsNoTracking()
                .ToListAsync(ct);

        public async Task<IEnumerable<Attendance>> GetByStudentAndClassAsync(Guid studentId, Guid classId, CancellationToken ct)
            => await _context.Attendances
                .Include(a => a.Enrollment)
                    .ThenInclude(e => e!.Student)
                .Where(a => a.Enrollment!.StudentId == studentId && a.Enrollment!.ClassId == classId)
                .AsNoTracking()
                .OrderBy(a => a.CheckDate)
                .ToListAsync(ct);

        public async Task<IEnumerable<AttendanceSummary>> GetSummaryByClassIdAsync(Guid classId, CancellationToken ct)
            => await _context.Attendances
                .Where(a => a.Enrollment!.ClassId == classId)
                .GroupBy(a => a.EnrollmentId)
                .Select(g => new AttendanceSummary
                {
                    EnrollmentId = g.Key,
                    Total = g.Count(),
                    Present = g.Count(a => a.Status == AttendanceStatus.Present),
                    Absent = g.Count(a => a.Status == AttendanceStatus.Absent),
                    Late = g.Count(a => a.Status == AttendanceStatus.Late)
                })
                .AsNoTracking()
                .ToListAsync(ct);

        public async Task<AttendanceSummary> GetSummaryByEnrollmentIdAsync(Guid enrollmentId, CancellationToken ct)
        {
            var result = await _context.Attendances
                .Where(a => a.EnrollmentId == enrollmentId)
                .GroupBy(a => a.EnrollmentId)
                .Select(g => new AttendanceSummary
                {
                    EnrollmentId = g.Key,
                    Total = g.Count(),
                    Present = g.Count(a => a.Status == AttendanceStatus.Present),
                    Absent = g.Count(a => a.Status == AttendanceStatus.Absent),
                    Late = g.Count(a => a.Status == AttendanceStatus.Late)
                })
                .AsNoTracking()
                .FirstOrDefaultAsync(ct);

            return result ?? new AttendanceSummary { EnrollmentId = enrollmentId, Total = 0, Present = 0, Absent = 0, Late = 0 };
        }

        public void Add(Attendance attendance) => _context.Attendances.Add(attendance);
        public void Update(Attendance attendance) => _context.Attendances.Update(attendance);
        public void Remove(Attendance attendance) => _context.Attendances.Remove(attendance);
    }
}
