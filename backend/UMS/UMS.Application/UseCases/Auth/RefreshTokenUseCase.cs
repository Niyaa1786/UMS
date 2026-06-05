using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.Auth
{
    internal class RefreshTokenUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<RefreshTokenRequest> _validator;
        private readonly ITokenGenerator _tokenGenerator;

        public RefreshTokenUseCase(IUnitOfWork unitOfWork, IValidator<RefreshTokenRequest> validator, ITokenGenerator tokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<AuthResponse> ExecuteAsync(RefreshTokenRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var account = await _unitOfWork.Accounts.GetByRefreshTokenAsync(request.RefreshToken, ct);

            if(account is null || account.RefreshTokenExpiry < DateTime.UtcNow)
                throw new ValidationException(new[] {new ValidationFailure("RefreshToken", "Invalid refresh token.")});

            var tokenResult = _tokenGenerator.GenerateToken(account);

            account.SetRefreshToken(tokenResult.RefreshToken, tokenResult.RefreshTokenExpiration);
            await _unitOfWork.SaveChangesAsync(ct);

            return AuthMapper.ToResponse(account, tokenResult);
        }
    }
}
