using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Interfaces;

namespace UMS.Application.Interfaces.Shared
{
    public interface IUnitOfWork
    {
        public IAccountRepository Accounts { get; }
        public IStaffRepository Staffs { get; }
        public ITeacherRepository Teachers { get; }
        public IStudentRepository Students { get; }

        ISubjectRepository Subjects { get; }
        IClassRepository Classes { get; }
        IClassScheduleRepository ClassSchedules { get; }
        IEnrollmentRepository Enrollments { get; }

        public Task<int> SaveChangesAsync(CancellationToken ct);
    }
}
