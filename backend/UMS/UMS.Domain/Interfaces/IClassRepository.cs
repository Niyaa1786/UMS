using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface IClassRepository
    {
        Task<IEnumerable<Class>> GetAllAsync(CancellationToken ct);
        Task<Class?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<IEnumerable<Class>> GetByTeacherAsync(Guid teacherId, CancellationToken ct);
        Task<IEnumerable<Class>> GetBySubjectAsync(Guid subjectId, CancellationToken ct);
        Task<bool> ExistsByCodeAsync(string code, CancellationToken ct);

        void Add(Class classEntity);
        void Update(Class classEntity);
        void Remove(Class classEntity);
    }

}
