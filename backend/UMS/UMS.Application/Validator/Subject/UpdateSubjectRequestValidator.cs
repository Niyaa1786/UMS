using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Subjects;

namespace UMS.Application.Validator.Subject
{
    public class UpdateSubjectRequestValidator : AbstractValidator<UpdateSubjectRequest>
    {
        public UpdateSubjectRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên môn học không được để trống.")
                .MaximumLength(100).WithMessage("Tên môn học tối đa 100 ký tự.");

            RuleFor(x => x.Credits)
                .GreaterThan(0).WithMessage("Số tín chỉ phải lớn hơn 0.");
        }
    }

}
