using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;

namespace UMS.Application.Validator.Users
{
    public class UpdateStudentRequestValidator : AbstractValidator<UpdateStudentRequest>
    {
        public UpdateStudentRequestValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ và tên không được để trống.")
                .MaximumLength(100).WithMessage("Họ và tên không được vượt quá 100 ký tự.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email không được để trống.")
                .EmailAddress().WithMessage("Định dạng Email không hợp lệ.")
                .MaximumLength(100).WithMessage("Email không được vượt quá 100 ký tự.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Số điện thoại không được để trống.")
                .Matches(@"^\d{10}$").WithMessage("Số điện thoại phải chứa đúng 10 chữ số.");

            RuleFor(x => x.Address)
                .MaximumLength(200).WithMessage("Địa chỉ không được vượt quá 200 ký tự.");

            RuleFor(x => x.Major)
                .NotEmpty().WithMessage("Ngành học không được để trống.")
                .MaximumLength(100).WithMessage("Ngành học không được vượt quá 100 ký tự.");

            RuleFor(x => x.Gender)
                .IsInEnum().WithMessage("Giới tính được chọn không hợp lệ.");
        }
    }
}
