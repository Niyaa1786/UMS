using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;

namespace UMS.Application.Validator.Class
{
    public class CreateEnrollmentRequestValidator : AbstractValidator<CreateEnrollmentRequest>
    {
        public CreateEnrollmentRequestValidator()
        {
            RuleFor(x => x.ClassId)
                .NotEmpty().WithMessage("ClassId không hợp lệ.");

            RuleFor(x => x.StudentId)
                .NotEmpty().WithMessage("StudentId không hợp lệ.");
        }
    }
}
