using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Class.Queries
{
    internal class GetClassSchedulesByClassIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetClassSchedulesByClassIdUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<ClassScheduleResponse>> ExecuteAsync(Guid classId, CancellationToken ct = default)
        {
            var schedules = await _unitOfWork.ClassSchedules.GetByClassIdAsync(classId, ct);
            return schedules.Select(ClassScheduleMapper.ToResponse);
        }
    }
}
