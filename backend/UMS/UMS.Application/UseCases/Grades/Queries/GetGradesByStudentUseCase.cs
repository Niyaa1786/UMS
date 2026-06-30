using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Grades.Queries
{
    internal class GetGradesByStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetGradesByStudentUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<GradeResponse>> ExecuteAsync(Guid studentId, CancellationToken ct = default)
        {
            var grades = await _unitOfWork.Grades.GetByStudentIdAsync(studentId, ct);
            return grades.Select(GradeMapper.ToResponse);
        }
    }
}
