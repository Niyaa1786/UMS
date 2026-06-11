using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class SubjectRepository : ISubjectRepository 
    {
        private readonly AppDbContext _context;
        public SubjectRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Subject>> GetAllAsync(CancellationToken ct)
            => await _context.Subjects.AsNoTracking().ToListAsync(ct);

        public async Task<Subject?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id, ct);

        public async Task<Subject?> GetByCodeAsync(string code, CancellationToken ct)
            => await _context.Subjects.FirstOrDefaultAsync(s => s.Code == code, ct);

        public async Task<bool> ExistsByCodeAsync(string code, CancellationToken ct)
            => await _context.Subjects.AnyAsync(s => s.Code == code, ct);

        public void Add(Subject subject) => _context.Subjects.Add(subject);
        public void Update(Subject subject) => _context.Subjects.Update(subject);
        public void Remove(Subject subject) => _context.Subjects.Remove(subject);

    }
}
