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
    internal class GradeRepository : IGradeRepository
    {
        private readonly AppDbContext _context;
        public GradeRepository(AppDbContext context) => _context = context;

        public async Task<Grade?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Grades
                .Include(g => g.Enrollment)
                    .ThenInclude(e => e!.Student)
                .FirstOrDefaultAsync(g => g.Id == id, ct);

        public async Task<Grade?> GetByEnrollmentAndTypeAsync(Guid enrollmentId, GradeType gradeType, CancellationToken ct)
            => await _context.Grades
                .FirstOrDefaultAsync(g => g.EnrollmentId == enrollmentId && g.GradeType == gradeType, ct);

        public async Task<IEnumerable<Grade>> GetByEnrollmentIdAsync(Guid enrollmentId, CancellationToken ct)
            => await _context.Grades
                .Where(g => g.EnrollmentId == enrollmentId)
                .AsNoTracking()
                .ToListAsync(ct);

        public async Task<IEnumerable<Grade>> GetByClassIdAsync(Guid classId, CancellationToken ct)
            => await _context.Grades
                .Include(g => g.Enrollment)
                    .ThenInclude(e => e!.Student)
                .Where(g => g.Enrollment!.ClassId == classId)
                .AsNoTracking()
                .ToListAsync(ct);

        public async Task<IEnumerable<Grade>> GetByStudentIdAsync(Guid studentId, CancellationToken ct)
            => await _context.Grades
                .Include(g => g.Enrollment)
                    .ThenInclude(e => e!.Student)
                .Include(g => g.Enrollment)
                    .ThenInclude(e => e!.Class)
                .Where(g => g.Enrollment!.StudentId == studentId)
                .AsNoTracking()
                .ToListAsync(ct);

        public void Add(Grade grade) => _context.Grades.Add(grade);
        public void Update(Grade grade) => _context.Grades.Update(grade);
        public void Remove(Grade grade) => _context.Grades.Remove(grade);
    }
}
