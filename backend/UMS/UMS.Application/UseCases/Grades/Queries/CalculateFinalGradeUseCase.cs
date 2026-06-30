using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Grades.Queries
{
    internal class CalculateFinalGradeUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CalculateFinalGradeUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<FinalGradeResponse>> ExecuteAsync(Guid classId, CancellationToken ct = default)
        {
            var grades = await _unitOfWork.Grades.GetByClassIdAsync(classId, ct);
            return GradeMapper.ToFinalGradeResponses(grades);
        }
    }
}
