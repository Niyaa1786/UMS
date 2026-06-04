using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Profile;

namespace UMS.Application.Validator.Profiles
{
    public class UpdateProfileRequestValidator : AbstractValidator<UpdateProfileRequest>
    {
        public UpdateProfileRequestValidator()
        {
            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Số điện thoại cập nhật không được để trống.")
                .Matches(@"^\d{10}$").WithMessage("Số điện thoại phải chứa đúng 10 chữ số.");

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Địa chỉ không được để trống.")
                .MaximumLength(200).WithMessage("Địa chỉ không được vượt quá 200 ký tự.");

            RuleFor(x => x.Gender)
                .IsInEnum().WithMessage("Giới tính được chọn không hợp lệ.");
        }
    }
}
