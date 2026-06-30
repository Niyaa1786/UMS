using FluentValidation;
using UMS.Application.DTOs.Requests.Grades;

namespace UMS.Application.Validator.Grades
{
    public class CreateGradeRequestValidator : AbstractValidator<CreateGradeRequest>
    {
        public CreateGradeRequestValidator()
        {
            RuleFor(x => x.EnrollmentId).NotEmpty();

            RuleFor(x => x.GradeType).IsInEnum();

            RuleFor(x => x.MaxScore).GreaterThan(0);

            RuleFor(x => x.Score)
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(x => x.MaxScore)
                .WithMessage("Score không được vượt quá MaxScore.");

            RuleFor(x => x.Weight).GreaterThan(0);
        }
    }
}
