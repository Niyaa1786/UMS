using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Interfaces;

namespace UMS.Application.Interfaces
{
    public interface IUnitOfWork
    {
        public IAccountRepository Accounts { get; }
        public IStaffRepository Staffs { get; }
        public ITeacherRepository Teachers { get; }
        public IStudentRepository Students { get; }

        public Task<int> SaveChangesAsync(CancellationToken ct);
    }
}
