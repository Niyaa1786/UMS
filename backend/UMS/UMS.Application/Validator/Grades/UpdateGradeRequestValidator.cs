using FluentValidation;
using UMS.Application.DTOs.Requests.Grades;

namespace UMS.Application.Validator.Grades
{
    public class UpdateGradeRequestValidator : AbstractValidator<UpdateGradeRequest>
    {
        public UpdateGradeRequestValidator()
        {
            RuleFor(x => x.Score).GreaterThanOrEqualTo(0);
        }
    }
}
