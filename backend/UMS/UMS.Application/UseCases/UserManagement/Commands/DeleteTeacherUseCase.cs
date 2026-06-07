using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class DeleteTeacherUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteTeacherUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(Guid teacherId, CancellationToken ct = default)
        {
            var teacher = await _unitOfWork.Teachers.GetByIdAsync(teacherId, ct);
            if (teacher is null)
                throw new NotFoundException($"Teacher with id {teacherId} not found.");

            var account = await _unitOfWork.Accounts.GetByIdAsync(teacher.AccountId, ct);
            if (account is null)
                throw new NotFoundException($"Account with id {teacher.AccountId} not found");

            _unitOfWork.Teachers.Remove(teacher);
            _unitOfWork.Accounts.Remove(account);
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }
    }
}
