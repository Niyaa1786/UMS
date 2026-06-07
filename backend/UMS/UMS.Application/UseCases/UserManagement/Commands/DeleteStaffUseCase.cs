using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class DeleteStaffUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteStaffUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(Guid staffId, CancellationToken ct = default)
        {
            var staff = await _unitOfWork.Staffs.GetByIdAsync(staffId, ct);
            if (staff is null)
                throw new NotFoundException($"Staff with id {staffId} not found.");

            var account = await _unitOfWork.Accounts.GetByIdAsync(staff.AccountId, ct);
            if (account is null)
                throw new NotFoundException($"Account with id {staff.AccountId} for Staff {staffId} not found..");

            _unitOfWork.Staffs.Remove(staff);
            _unitOfWork.Accounts.Remove(account);
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }
    }
}
