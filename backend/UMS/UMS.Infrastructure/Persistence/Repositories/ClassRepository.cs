using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class ClassRepository : IClassRepository
    {
        private readonly AppDbContext _context;
        public ClassRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Class>> GetAllAsync(CancellationToken ct)
            => await _context.Classes
            .AsNoTracking()
            .Include(c => c.Subject)
            .Include(c => c.Teacher)
            .ToListAsync(ct);

        public async Task<Class?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Classes
            .Include(c => c.Subject)
            .Include(c => c.Teacher)
            .FirstOrDefaultAsync(c => c.Id == id, ct);

        public async Task<IEnumerable<Class>> GetByTeacherAsync(Guid teacherId, CancellationToken ct)
            => await _context.Classes
            .Include(c => c.Subject)
            .Include(c => c.Teacher)
            .AsNoTracking()
            .Where(c => c.TeacherId == teacherId)
            .ToListAsync(ct);

        public async Task<IEnumerable<Class>> GetBySubjectAsync(Guid subjectId, CancellationToken ct)
            => await _context.Classes
            .Include(c => c.Subject)
            .Include(c => c.Teacher)
            .AsNoTracking().Where(c => c.SubjectId == subjectId)
            .ToListAsync(ct);

        public async Task<bool> ExistsByCodeAsync(string code, CancellationToken ct)
            => await _context.Classes.AnyAsync(c => c.Code == code, ct);

        public void Add(Class classEntity) => _context.Classes.Add(classEntity);
        public void Update(Class classEntity) => _context.Classes.Update(classEntity);
        public void Remove(Class classEntity) => _context.Classes.Remove(classEntity);
    }
}
