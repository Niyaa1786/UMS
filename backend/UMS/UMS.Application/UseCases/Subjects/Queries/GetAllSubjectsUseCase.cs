using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Subject;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Subjects.Queries
{
    internal class GetAllSubjectsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllSubjectsUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<SubjectResponse>> ExecuteAsync(CancellationToken ct = default)
        {
            var subjects = await _unitOfWork.Subjects.GetAllAsync(ct);
            return subjects.Select(SubjectMapper.ToResponse);
        }

    }
}
