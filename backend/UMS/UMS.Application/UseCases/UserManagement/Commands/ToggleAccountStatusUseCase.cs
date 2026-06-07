using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class ToggleAccountStatusUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ToggleAccountStatusUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task ExecuteAsync(Guid accountId, bool isActive, CancellationToken ct = default)
        {
            var account = await _unitOfWork.Accounts.GetByIdAsync(accountId, ct);

            if (account == null)
                throw new NotFoundException($"Account with id {accountId} not found.");

            if (isActive)
            {
                account.Activate();
            }
            else
            {
                account.Deactivate();
            }

            await _unitOfWork.SaveChangesAsync(ct);
        }
    }
}
