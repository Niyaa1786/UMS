using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Auth;

namespace UMS.Application.Validator.Auth
{
    public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordRequestValidator()
        {
            RuleFor(x => x.OldPassword)
                .NotEmpty().WithMessage("Old password is required.");

            RuleFor(x => x.NewPassword)
                    .NotEmpty().WithMessage("New password is required.")
                    .MinimumLength(6).WithMessage("New password must be at least 6 characters.")
                    .NotEqual(x => x.OldPassword).WithMessage("New password must be different from old password.");
        }
    }
}
