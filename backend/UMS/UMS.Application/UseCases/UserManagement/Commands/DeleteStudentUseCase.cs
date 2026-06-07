using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class DeleteStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteStudentUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(Guid studentId, CancellationToken ct = default)
        {
            var student = await _unitOfWork.Students.GetByIdAsync(studentId, ct);
            if (student is null)
                throw new NotFoundException($"Student with id {studentId} not found.");

            var account = await _unitOfWork.Accounts.GetByIdAsync(student.AccountId, ct);
            if (account is null)
                throw new NotFoundException($"Account with id {student.AccountId} not found");

            _unitOfWork.Students.Remove(student);
            _unitOfWork.Accounts.Remove(account);
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }
    }
}
