using FluentValidation;
using UMS.Application.DTOs.Requests.Attendance;

namespace UMS.Application.Validator.Attendance
{
    public class UpdateAttendanceRequestValidator : AbstractValidator<UpdateAttendanceRequest>
    {
        public UpdateAttendanceRequestValidator()
        {
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
