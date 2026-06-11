using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;

namespace UMS.Application.Validator.Class
{
    public class CreateClassScheduleRequestValidator : AbstractValidator<CreateClassScheduleRequest>
    {
        public CreateClassScheduleRequestValidator()
        {
            RuleFor(x => x.ClassId)
                .NotEmpty().WithMessage("ClassId không hợp lệ.");

            RuleFor(x => x.DayOfWeek)
                .IsInEnum().WithMessage("Ngày trong tuần không hợp lệ.");

            RuleFor(x => x.StartTime)
                .LessThan(x => x.EndTime).WithMessage("Thời gian bắt đầu phải trước thời gian kết thúc.");

            RuleFor(x => x.Room)
                .NotEmpty().WithMessage("Phòng học không được để trống.")
                .MaximumLength(50).WithMessage("Phòng học tối đa 50 ký tự.");
        }
    }
}
