using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Grades.Queries
{
    internal class GetGradesByClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetGradesByClassUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<GradeResponse>> ExecuteAsync(Guid classId, CancellationToken ct = default)
        {
            var grades = await _unitOfWork.Grades.GetByClassIdAsync(classId, ct);
            return grades.Select(GradeMapper.ToResponse);
        }
    }
}
