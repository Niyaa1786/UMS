using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Domain.Interfaces
{
    public interface IGradeRepository
    {
        Task<Grade?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<Grade?> GetByEnrollmentAndTypeAsync(Guid enrollmentId, GradeType gradeType, CancellationToken ct);
        Task<IEnumerable<Grade>> GetByEnrollmentIdAsync(Guid enrollmentId, CancellationToken ct);
        Task<IEnumerable<Grade>> GetByClassIdAsync(Guid classId, CancellationToken ct);
        Task<IEnumerable<Grade>> GetByStudentIdAsync(Guid studentId, CancellationToken ct);

        void Add(Grade grade);
        void Update(Grade grade);
        void Remove(Grade grade);
    }
}
