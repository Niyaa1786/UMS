using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.ClassManagement.Queries
{
    internal class GetEnrollmentsByStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetEnrollmentsByStudentUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<StudentClassResponse>> ExecuteAsync(Guid studentId, CancellationToken ct = default)
        {
            var enrollments = await _unitOfWork.Enrollments.GetActiveByStudentIdAsync(studentId, ct);
            return enrollments.Select(EnrollmentMapper.ToStudentClassResponse);
        }
    }
}
