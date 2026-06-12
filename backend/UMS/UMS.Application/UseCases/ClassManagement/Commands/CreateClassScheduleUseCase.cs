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
    internal class CreateClassScheduleUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateClassScheduleRequest> _validator;

        public CreateClassScheduleUseCase(IUnitOfWork unitOfWork, IValidator<CreateClassScheduleRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<ClassScheduleResponse> ExecuteAsync(CreateClassScheduleRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var classEntity = await _unitOfWork.Classes.GetByIdAsync(request.ClassId, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {request.ClassId}.");

            var overlap = await _unitOfWork.ClassSchedules.IsTimeSlotOverlapAsync(request.ClassId, request.DayOfWeek, request.StartTime, request.EndTime, ct);
            if (overlap)
                throw new ValidationException(new[] { new ValidationFailure("TimeSlot", "Khung giờ này bị trùng với lịch học khác của lớp.") });

            var schedule = ClassScheduleMapper.ToEntity(request);
            _unitOfWork.ClassSchedules.Add(schedule);
            await _unitOfWork.SaveChangesAsync(ct);

            var created = await _unitOfWork.ClassSchedules.GetByIdAsync(schedule.Id, ct);
            return ClassScheduleMapper.ToResponse(schedule);
        }
    }
}
