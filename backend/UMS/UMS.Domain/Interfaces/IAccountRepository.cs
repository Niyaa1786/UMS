using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Domain.Interfaces
{
    public interface IAccountRepository
    {
        public Task<IEnumerable<Account>> GetAllAsync(CancellationToken ct);
        public Task<IEnumerable<Account>> GetByRoleAsync(Roles role, CancellationToken ct);
        public Task<Account?> GetByIdAsync(Guid id, CancellationToken ct);
        public Task<Account?> GetByUsernameAsync(string username, CancellationToken ct);
        public Task<Account?> GetByRefreshTokenAsync(string refreshToken, CancellationToken ct);
        public Task<bool> ExistsByUsernameAsync(string username, CancellationToken ct);
        public Task<int> CountAsync(CancellationToken ct);

        void Add(Account account);
        void Update(Account account);
        void Remove(Account account);
    }
}
