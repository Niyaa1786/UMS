using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Subject;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Subjects.Queries
{
    internal class GetSubjectByIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSubjectByIdUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<SubjectResponse> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var subject = await _unitOfWork.Subjects.GetByIdAsync(id, ct);
            if (subject is null)
                throw new NotFoundException($"Không tìm thấy môn học với id {id}.");

            return SubjectMapper.ToResponse(subject);
        }

    }
}
