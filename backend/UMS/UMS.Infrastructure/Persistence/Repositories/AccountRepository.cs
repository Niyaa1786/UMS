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
    internal class AccountRepository : IAccountRepository
    {
        private readonly AppDbContext _context;
        public AccountRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Account>> GetAllAsync(CancellationToken ct) 
            => await _context.Accounts.AsNoTracking().ToListAsync(ct);

        public async Task<IEnumerable<Account>> GetByRoleAsync(Roles role, CancellationToken ct)
            => await _context.Accounts.AsNoTracking().Where(a => a.Role == role).ToListAsync(ct);

        public async Task<Account?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id, ct);

        public async Task<Account?> GetByUsernameAsync(string username, CancellationToken ct)
            => await _context.Accounts.FirstOrDefaultAsync(a => a.Username == username, ct);

        public async Task<Account?> GetByRefreshTokenAsync(string token, CancellationToken ct)
        {
            return await _context.Accounts
                .Include(a => a.Student)
                .Include(a => a.Teacher)
                .Include(a => a.Staff)
                .FirstOrDefaultAsync(a => a.RefreshToken == token, ct);
        }

        public async Task<bool> ExistsByUsernameAsync(string username, CancellationToken ct)
            => await _context.Accounts.AnyAsync(a => a.Username == username, ct);

        public async Task<int> CountAsync(CancellationToken ct)
            => await _context.Accounts.CountAsync(ct);

        public void Add(Account account) => _context.Accounts.Add(account);
        public void Update(Account account) => _context.Accounts.Update(account);
        public void Remove(Account account) => _context.Accounts.Remove(account);
    }
}
