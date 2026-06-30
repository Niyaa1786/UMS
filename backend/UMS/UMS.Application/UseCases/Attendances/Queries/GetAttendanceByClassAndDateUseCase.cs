using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Attendances.Queries
{
    internal class GetAttendanceByClassAndDateUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAttendanceByClassAndDateUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AttendanceResponse>> ExecuteAsync(Guid classId, DateOnly checkDate, CancellationToken ct = default)
        {
            var attendances = await _unitOfWork.Attendances.GetByClassAndDateAsync(classId, checkDate, ct);
            return attendances.Select(AttendanceMapper.ToResponse);
        }
    }
}
