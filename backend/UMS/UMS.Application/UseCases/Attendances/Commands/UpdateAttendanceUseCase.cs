using FluentValidation;
using System;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Attendances.Commands
{
    internal class UpdateAttendanceUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdateAttendanceRequest> _validator;

        public UpdateAttendanceUseCase(IUnitOfWork unitOfWork, IValidator<UpdateAttendanceRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<AttendanceResponse> ExecuteAsync(Guid attendanceId, UpdateAttendanceRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var attendance = await _unitOfWork.Attendances.GetByIdAsync(attendanceId, ct);
            if (attendance is null)
                throw new NotFoundException($"Không tìm thấy bản ghi điểm danh với id {attendanceId}.");

            attendance.UpdateStatus(request.Status, request.Remark);
            await _unitOfWork.SaveChangesAsync(ct);

            var updated = await _unitOfWork.Attendances.GetByIdAsync(attendanceId, ct);
            return AttendanceMapper.ToResponse(updated!);
        }
    }
}
