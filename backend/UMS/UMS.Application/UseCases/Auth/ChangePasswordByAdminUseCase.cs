using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Auth
{
    internal class ChangePasswordByAdminUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;

        public ChangePasswordByAdminUseCase(
            IUnitOfWork unitOfWork,
            IPasswordHasher passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        public async Task<bool> ExecuteAsync(Guid userId, string newPassword, CancellationToken ct = default)
        {
            var account = await _unitOfWork.Accounts.GetByIdAsync(userId, ct);
            if (account == null)
                throw new ValidationException(new[] { new ValidationFailure("Id", "User not found.") });

            var newPasswordHash = _passwordHasher.HashPassword(newPassword);
            account.UpdatePassword(newPasswordHash);
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }
    }
}
