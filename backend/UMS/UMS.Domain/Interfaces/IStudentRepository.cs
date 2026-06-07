using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface IStudentRepository
    {
        public Task<IEnumerable<Student>> GetAllAsync(CancellationToken ct);
        public Task<IEnumerable<Student>> GetByMajorAsync(string major, CancellationToken ct);
        public Task<Student?> GetByIdAsync(Guid id, CancellationToken ct);
        public Task<Staff?> GetByAccountIdAsync(Guid accountId, CancellationToken ct);
        public Task<Student?> GetByEmailAsync(string email, CancellationToken ct);
        public Task<bool> ExistsByEmailAsync(string email, CancellationToken ct);
        public Task<int> CountAsync(CancellationToken ct);

        void Add(Student student);
        void Update(Student student);
        void Remove(Student student);
    }
}
