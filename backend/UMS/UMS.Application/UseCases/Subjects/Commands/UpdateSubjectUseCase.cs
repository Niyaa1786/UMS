using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.UseCases.Subjects.Commands
{
    internal class UpdateSubjectUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdateSubjectRequest> _validator;

        public UpdateSubjectUseCase(IUnitOfWork unitOfWork, IValidator<UpdateSubjectRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<SubjectResponse> ExecuteAsync(Guid id, UpdateSubjectRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var subject = await _unitOfWork.Subjects.GetByIdAsync(id, ct);
            if (subject is null)
                throw new NotFoundException($"Không tìm thấy môn học với id {id}.");

            SubjectMapper.ApplyUpdate(request, subject);
            await _unitOfWork.SaveChangesAsync(ct);

            return SubjectMapper.ToResponse(subject);
        }

    }
}
