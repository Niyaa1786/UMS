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

        public UnitOfWork(AppDbContext context) => _context = context;

        public IAccountRepository Accounts => _accountRepository ??= new AccountRepository(_context);
        public IStaffRepository Staffs => _staffRepository ??= new StaffRepository(_context);
        public ITeacherRepository Teachers => _teacherRepository ??= new TeacherRepository(_context);
        public IStudentRepository Students => _studentRepository ??= new StudentRepository(_context);

        public Task<int> SaveChangesAsync(CancellationToken ct = default) => _context.SaveChangesAsync(ct);

    }
}
