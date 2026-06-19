using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface IEnrollmentRepository
    {
        Task<IEnumerable<Enrollment>> GetByClassIdAsync(Guid classId, CancellationToken ct);
        Task<Enrollment?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<Enrollment?> GetActiveByClassAndStudentAsync(Guid classId, Guid studentId, CancellationToken ct);
        Task<bool> ExistsActiveAsync(Guid classId, Guid studentId, CancellationToken ct);
        Task<IEnumerable<Enrollment>> GetByStudentIdAsync(Guid studentId, CancellationToken ct);
        Task<IEnumerable<Enrollment>> GetActiveByStudentIdAsync(Guid studentId, CancellationToken ct);
        Task<int> CountActiveByClassAsync(Guid classId, CancellationToken ct);

        void Add(Enrollment enrollment);
        void Update(Enrollment enrollment);
        void Remove(Enrollment enrollment);
    }
}
