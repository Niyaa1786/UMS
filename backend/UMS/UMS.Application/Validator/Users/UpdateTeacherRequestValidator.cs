using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;

namespace UMS.Application.Validator.Users
{
    public class UpdateTeacherRequestValidator : AbstractValidator<UpdateTeacherRequest>
    {
        public UpdateTeacherRequestValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ và tên giảng viên không được để trống.")
                .MaximumLength(100).WithMessage("Họ và tên không được vượt quá 100 ký tự.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email giảng viên không được để trống.")
                .EmailAddress().WithMessage("Định dạng Email không hợp lệ.")
                .MaximumLength(100).WithMessage("Email không được vượt quá 100 ký tự.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Số điện thoại không được để trống.")
                .Matches(@"^\d{10}$").WithMessage("Số điện thoại phải chứa đúng 10 chữ số.");

            RuleFor(x => x.Faculty)
                .IsInEnum().WithMessage("Khoa giảng dạy được chọn không hợp lệ.");

            RuleFor(x => x.Gender)
                .IsInEnum().WithMessage("Giới tính được chọn không hợp lệ.");
        }
    }
}
