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

        public ISubjectRepository Subjects { get; }
        public IClassRepository Classes { get; }
        public IClassScheduleRepository ClassSchedules { get; }
        public IEnrollmentRepository Enrollments { get; }

        public IGradeRepository Grades { get; }
        public IAttendanceRepository Attendances { get; }
        public Task<int> SaveChangesAsync(CancellationToken ct);
    }
}
