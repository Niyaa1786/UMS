using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Auth
{
    internal class ChangePasswordBySelfUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IValidator<ChangePasswordRequest> _validator;

        public ChangePasswordBySelfUseCase(
            IUnitOfWork unitOfWork,
            IPasswordHasher passwordHasher,
            IValidator<ChangePasswordRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
            _validator = validator;
        }

        public async Task<bool> ExecuteAsync(Guid userId, ChangePasswordRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var account = await _unitOfWork.Accounts.GetByIdAsync(userId, ct);
            if (account == null)
                throw new ValidationException(new[] { new ValidationFailure("Id", "Account not found.") });

            if (!_passwordHasher.VerifyPassword(request.OldPassword, account.PasswordHash))
                throw new ValidationException(new[] { new ValidationFailure(nameof(request.OldPassword), "Old password is incorrect.") });

            var newPasswordHash = _passwordHasher.HashPassword(request.NewPassword);
            account.UpdatePassword(newPasswordHash);
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }

    }
}
