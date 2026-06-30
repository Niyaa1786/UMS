using FluentValidation;
using UMS.Application.DTOs.Requests.Attendance;

namespace UMS.Application.Validator.Attendance
{
    public class CreateAttendanceRequestValidator : AbstractValidator<CreateAttendanceRequest>
    {
        public CreateAttendanceRequestValidator()
        {
            RuleFor(x => x.EnrollmentId).NotEmpty();
            RuleFor(x => x.CheckDate).NotEmpty();
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
