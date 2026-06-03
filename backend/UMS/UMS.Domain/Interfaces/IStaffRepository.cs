using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Domain.Interfaces
{
    public interface IStaffRepository
    {
        public Task<IEnumerable<Staff>> GetAllAsync(CancellationToken ct);
        public Task<IEnumerable<Staff>> GetByDepartmentAsync(Department department, CancellationToken ct);
        public Task<Staff> GetByIdAsync(Guid id, CancellationToken ct);
        public Task<Staff> GetByEmailAsync(string email, CancellationToken ct);
        public Task<bool> ExistsByEmailAsync(string email, CancellationToken ct);
        public Task<int> CountAsync(CancellationToken ct);


        void Add(Staff staff);
        void Update(Staff staff);
        void Delete(Staff staff);
    }
}
