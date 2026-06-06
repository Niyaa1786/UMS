using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;
using UMS.Application.DTOs.Responses.Auth;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.Auth
{
    internal class LoginUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<LoginRequest> _validator;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IPasswordHasher _passwordHasher;

        public LoginUseCase(IUnitOfWork unitOfWork, IValidator<LoginRequest> validator, ITokenGenerator tokenGenerator, IPasswordHasher passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
            _tokenGenerator = tokenGenerator;
            _passwordHasher = passwordHasher;
        }

        public async Task<AuthResponse> ExecuteAsync(LoginRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var account = await _unitOfWork.Accounts.GetByUsernameAsync(request.Username, ct);

            if(account is null)
                throw new ValidationException(new[] { new ValidationFailure("Username", "Invalid username or password.") });

            var isValidPassword = _passwordHasher.VerifyPassword(request.Password, account.PasswordHash);

            if(!isValidPassword)
                throw new ValidationException(new[] { new ValidationFailure("Password", "Invalid username or password.") });

            var tokenResult = _tokenGenerator.GenerateToken(account);
            account.SetRefreshToken(tokenResult.RefreshToken, tokenResult.RefreshTokenExpiration);
            await _unitOfWork.SaveChangesAsync(ct);

            return AuthMapper.ToResponse(account, tokenResult);
        }
    }
}
