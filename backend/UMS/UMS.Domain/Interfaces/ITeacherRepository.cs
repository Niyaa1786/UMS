using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Domain.Interfaces
{
    public interface ITeacherRepository
    {
        public Task<IEnumerable<Teacher>> GetAllAsync(CancellationToken ct);
        public Task<IEnumerable<Teacher>> GetByFacultyAsync(Faculty faculty, CancellationToken ct);
        public Task<Teacher?> GetByIdAsync(Guid id, CancellationToken ct);
        public Task<Staff?> GetByAccountIdAsync(Guid accountId, CancellationToken ct);
        public Task<Teacher?> GetByEmailAsync(string email, CancellationToken ct);
        public Task<bool> ExistsByEmailAsync(string email, CancellationToken ct);
        public Task<int> CountAsync(CancellationToken ct);

        void Add(Teacher teacher);
        void Update(Teacher teacher);
        void Remove(Teacher teacher);
    }
}
