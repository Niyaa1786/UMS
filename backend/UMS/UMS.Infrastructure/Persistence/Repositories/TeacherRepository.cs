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
    internal class TeacherRepository : ITeacherRepository
    {
        private readonly AppDbContext _context;
        public TeacherRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Teacher>> GetAllAsync(CancellationToken ct)
            => await _context.Teachers.Include(t => t.Account).AsNoTracking().ToListAsync(ct);

        public async Task<IEnumerable<Teacher>> GetByFacultyAsync(Faculty faculty, CancellationToken ct)
            => await _context.Teachers.Include(t => t.Account).AsNoTracking().Where(t => t.Faculty == faculty).ToListAsync(ct);

        public Task<Teacher?> GetByIdAsync(Guid id, CancellationToken ct)
            => _context.Teachers.Include(t => t.Account).FirstOrDefaultAsync(t => t.Id == id, ct);

        public async Task<Staff?> GetByAccountIdAsync(Guid accountId, CancellationToken ct)
            => await _context.Staffs.Include(t => t.Account).FirstOrDefaultAsync(s => s.AccountId == accountId, ct);

        public async Task<Teacher?> GetByEmailAsync(string email, CancellationToken ct)
            => await _context.Teachers.Include(t => t.Account).FirstOrDefaultAsync(t => t.Email == email, ct);

        public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct)
            => await _context.Teachers.AnyAsync(t => t.Email == email, ct);

        public async Task<int> CountAsync(CancellationToken ct)
            => await _context.Teachers.CountAsync(ct);

        public void Add(Teacher teacher) => _context.Teachers.Add(teacher);
        public void Update(Teacher teacher) => _context.Teachers.Update(teacher);
        public void Remove(Teacher teacher) => _context.Teachers.Remove(teacher);
    }
}
