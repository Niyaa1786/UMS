using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;

namespace UMS.Application.Validator.Auth
{
    public class RefreshTokenRequestValidator : AbstractValidator<RefreshTokenRequest>
    {
        public RefreshTokenRequestValidator()
        {
            RuleFor(r => r.RefreshToken).NotEmpty().WithMessage("Refresh token không được để trống.");
        }
    }
}
