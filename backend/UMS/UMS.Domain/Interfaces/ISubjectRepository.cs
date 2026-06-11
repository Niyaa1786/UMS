using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<Subject>> GetAllAsync(CancellationToken ct);
        Task<Subject?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<Subject?> GetByCodeAsync(string code, CancellationToken ct);
        Task<bool> ExistsByCodeAsync(string code, CancellationToken ct);

        void Add(Subject subject);
        void Update(Subject subject);
        void Remove(Subject subject);
    }

}
