using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;

namespace UMS.Application.Validator.Class
{
    public class CreateClassRequestValidator : AbstractValidator<CreateClassRequest>
    {
        public CreateClassRequestValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Mã lớp không được để trống.")
                .MaximumLength(30).WithMessage("Mã lớp tối đa 30 ký tự.");

            RuleFor(x => x.SubjectId)
                .NotEmpty().WithMessage("SubjectId không hợp lệ.");

            RuleFor(x => x.TeacherId)
                .NotEmpty().WithMessage("TeacherId không hợp lệ.");

            RuleFor(x => x.SchoolYear)
                .NotEmpty().WithMessage("Năm học không được để trống.")
                .Matches(@"^\d{4}-\d{4}$").WithMessage("Năm học phải có định dạng YYYY-YYYY.");

            RuleFor(x => x.Semester)
                .InclusiveBetween(1, 3).WithMessage("Học kỳ chỉ từ 1 đến 3.");

            RuleFor(x => x.StartDate)
                .LessThan(x => x.EndDate).WithMessage("Ngày bắt đầu phải trước ngày kết thúc.");

            RuleFor(x => x.MaxStudents)
                .GreaterThan(0).WithMessage("Sĩ số tối đa phải lớn hơn 0.");
        }
    }
}
