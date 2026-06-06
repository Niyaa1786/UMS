using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Auth
{
    internal class LogoutUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public LogoutUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<bool> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var user = await _unitOfWork.Accounts.GetByIdAsync(id, ct);
            if (user is null)
                throw new NotFoundException("User not found");

            user.RevokeRefreshToken();
            await _unitOfWork.SaveChangesAsync(ct);

            return true;
        }
    }
}
