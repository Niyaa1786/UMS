using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.ClassManagement.Queries
{
    internal class GetEnrollmentsByClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetEnrollmentsByClassUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<EnrollmentResponse>> ExecuteAsync(Guid classId, CancellationToken ct = default)
        {
            var enrollments = await _unitOfWork.Enrollments.GetByClassIdAsync(classId, ct);
            return enrollments.Select(EnrollmentMapper.ToResponse);
        }
    }
}
