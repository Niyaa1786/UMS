using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class StudentRepository : IStudentRepository
    {
        private readonly AppDbContext _context;
        public StudentRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Student>> GetAllAsync(CancellationToken ct)
            => await _context.Students.Include(s => s.Account).AsNoTracking().ToListAsync(ct);

        public async Task<IEnumerable<Student>> GetByMajorAsync(string major, CancellationToken ct)
            => await _context.Students.Include(s => s.Account).AsNoTracking().Where(s => s.Major == major).ToListAsync(ct);

        public async Task<Student?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Students.Include(s => s.Account).FirstOrDefaultAsync(s => s.Id == id, ct);

        public async Task<Staff?> GetByAccountIdAsync(Guid accountId, CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).FirstOrDefaultAsync(s => s.AccountId == accountId, ct);

        public async Task<Student?> GetByEmailAsync(string email, CancellationToken ct)
            => await _context.Students.Include(s => s.Account).FirstOrDefaultAsync(s => s.Email == email, ct);

        public Task<bool> ExistsByEmailAsync(string email, CancellationToken ct)
            => _context.Students.AnyAsync(s => s.Email == email, ct);

        public Task<int> CountAsync(CancellationToken ct)
            => _context.Students.CountAsync(ct);

        public void Add(Student student) => _context.Students.Add(student);
        public void Update(Student student) => _context.Students.Update(student);
        public void Delete(Student student) => _context.Students.Remove(student);
    }
}
