using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly AppDbContext _context;
        public EnrollmentRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Enrollment>> GetByClassIdAsync(Guid classId, CancellationToken ct)
            => await _context.Enrollments
                .Include(e => e.Student)
                    .ThenInclude(s => s.Account)
                .Where(e => e.ClassId == classId && e.Status == "Active")
                .AsNoTracking()
                .ToListAsync(ct);

        public async Task<Enrollment?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Enrollments
                .Include(e => e.Student)
                    .ThenInclude(s => s.Account)
                .FirstOrDefaultAsync(e => e.Id == id, ct);

        public async Task<Enrollment?> GetActiveByClassAndStudentAsync(Guid classId, Guid studentId, CancellationToken ct)
            => await _context.Enrollments.FirstOrDefaultAsync(e => e.ClassId == classId && e.StudentId == studentId && e.Status == "Active", ct);

        public async Task<bool> ExistsActiveAsync(Guid classId, Guid studentId, CancellationToken ct)
            => await _context.Enrollments.AnyAsync(e => e.ClassId == classId && e.StudentId == studentId && e.Status == "Active", ct);

        public void Add(Enrollment enrollment) => _context.Enrollments.Add(enrollment);
        public void Update(Enrollment enrollment) => _context.Enrollments.Update(enrollment);
        public void Remove(Enrollment enrollment) => _context.Enrollments.Remove(enrollment);
    }
}

