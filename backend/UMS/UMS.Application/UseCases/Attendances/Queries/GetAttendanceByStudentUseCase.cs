using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Attendances.Queries
{
    internal class GetAttendanceByStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAttendanceByStudentUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AttendanceResponse>> ExecuteAsync(Guid studentId, Guid classId, CancellationToken ct = default)
        {
            var attendances = await _unitOfWork.Attendances.GetByStudentAndClassAsync(studentId, classId, ct);
            return attendances.Select(AttendanceMapper.ToResponse);
        }
    }
}
