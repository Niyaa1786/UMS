using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IAccountRepository? _accountRepository;
        private IStaffRepository? _staffRepository;
        private ITeacherRepository? _teacherRepository;
        private IStudentRepository? _studentRepository;

        private ISubjectRepository? _subjectRepository;
        private IClassRepository? _classRepository;
        private IClassScheduleRepository? _classScheduleRepository;
        private IEnrollmentRepository? _enrollmentRepository;

        private IGradeRepository? _gradeRepository;
        private IAttendanceRepository? _attendanceRepository;

        public UnitOfWork(AppDbContext context) => _context = context;

        public IAccountRepository Accounts => _accountRepository ??= new AccountRepository(_context);
        public IStaffRepository Staffs => _staffRepository ??= new StaffRepository(_context);
        public ITeacherRepository Teachers => _teacherRepository ??= new TeacherRepository(_context);
        public IStudentRepository Students => _studentRepository ??= new StudentRepository(_context);

        public ISubjectRepository Subjects => _subjectRepository ??= new SubjectRepository(_context);
        public IClassRepository Classes => _classRepository ??= new ClassRepository(_context);
        public IClassScheduleRepository ClassSchedules => _classScheduleRepository ??= new ClassScheduleRepository(_context);
        public IEnrollmentRepository Enrollments => _enrollmentRepository ??= new EnrollmentRepository(_context);

        public IGradeRepository Grades => _gradeRepository ??= new GradeRepository(_context);
        public IAttendanceRepository Attendances => _attendanceRepository ??= new AttendanceRepository(_context);

        public Task<int> SaveChangesAsync(CancellationToken ct = default) => _context.SaveChangesAsync(ct);

    }
}
