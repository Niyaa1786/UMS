using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Subjects;
using UMS.Application.DTOs.Responses.Subject;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Subjects.Commands
{
    internal class CreateSubjectUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateSubjectRequest> _validator;

        public CreateSubjectUseCase(IUnitOfWork unitOfWork, IValidator<CreateSubjectRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<SubjectResponse> ExecuteAsync(CreateSubjectRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var exists = await _unitOfWork.Subjects.ExistsByCodeAsync(request.Code, ct);
            if (exists)
                throw new ValidationException(new[] { new ValidationFailure(nameof(request.Code), "Mã môn học đã tồn tại.") });

            var subject = SubjectMapper.ToEntity(request);
            _unitOfWork.Subjects.Add(subject);
            await _unitOfWork.SaveChangesAsync(ct);

            return SubjectMapper.ToResponse(subject);
        }
    }
}
