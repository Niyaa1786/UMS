using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class UpdateClassScheduleUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdateClassScheduleRequest> _validator;

        public UpdateClassScheduleUseCase(IUnitOfWork unitOfWork, IValidator<UpdateClassScheduleRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<ClassScheduleResponse> ExecuteAsync(Guid scheduleId, UpdateClassScheduleRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var schedule = await _unitOfWork.ClassSchedules.GetByIdAsync(scheduleId, ct);
            if (schedule is null)
                throw new NotFoundException($"Không tìm thấy lịch học với id {scheduleId}.");

            var isOverlap = await _unitOfWork.ClassSchedules.IsOverlapExcludingSelfAsync(
                scheduleId, schedule.ClassId, request.DayOfWeek, request.StartTime, request.EndTime, ct);

            if (isOverlap)
                throw new ValidationException(new[]
                {
                new ValidationFailure(nameof(request.DayOfWeek), "Khung giờ bị trùng với lịch học khác của lớp."),
                new ValidationFailure(nameof(request.StartTime), "Khung giờ bị trùng với lịch học khác của lớp.")
            });

            schedule.Update(request.DayOfWeek, request.StartTime, request.EndTime, request.Room);
            await _unitOfWork.SaveChangesAsync(ct);

            var updated = await _unitOfWork.ClassSchedules.GetByIdAsync(scheduleId, ct);
            return ClassScheduleMapper.ToResponse(updated!);
        }
    }
}
