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
    internal class StaffRepository : IStaffRepository
    {
        private readonly AppDbContext _context;
        public StaffRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Staff>> GetAllAsync(CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).AsNoTracking().ToListAsync(ct);

        public async Task<IEnumerable<Staff>> GetByDepartmentAsync(Department department, CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).AsNoTracking().Where(s => s.Department == department).ToListAsync(ct);

        public async Task<Staff?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).FirstOrDefaultAsync(s => s.Id == id, ct);

        public async Task<Staff?> GetByAccountIdAsync(Guid accountId, CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).FirstOrDefaultAsync(s => s.AccountId == accountId, ct);

        public async Task<Staff?> GetByEmailAsync(string email, CancellationToken ct)
            => await _context.Staffs.Include(s => s.Account).FirstOrDefaultAsync(s => s.Email == email, ct);

        public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct)
            => await _context.Staffs.AnyAsync(s => s.Email == email, ct);

        public async Task<int> CountAsync(CancellationToken ct)
            => await _context.Staffs.CountAsync(ct);

        public void Add(Staff staff) => _context.Staffs.Add(staff);
        public void Update(Staff staff) => _context.Staffs.Update(staff);
        public void Remove(Staff staff) => _context.Staffs.Remove(staff);
    }
}
