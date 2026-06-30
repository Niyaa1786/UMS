using FluentValidation;
using System;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Attendances.Commands
{
    internal class CreateAttendanceUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateAttendanceRequest> _validator;

        public CreateAttendanceUseCase(IUnitOfWork unitOfWork, IValidator<CreateAttendanceRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<AttendanceResponse> ExecuteAsync(CreateAttendanceRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(request.EnrollmentId, ct);
            if (enrollment is null)
                throw new NotFoundException($"Không tìm thấy bản ghi đăng ký với id {request.EnrollmentId}.");

            var existing = await _unitOfWork.Attendances.GetByEnrollmentAndDateAsync(request.EnrollmentId, request.CheckDate, ct);
            if (existing is not null)
                throw new ValidationException("Sinh viên đã được điểm danh cho ngày này. Vui lòng dùng chức năng cập nhật.");

            var attendance = AttendanceMapper.ToEntity(request);
            _unitOfWork.Attendances.Add(attendance);
            await _unitOfWork.SaveChangesAsync(ct);

            var saved = await _unitOfWork.Attendances.GetByIdAsync(attendance.Id, ct);
            return AttendanceMapper.ToResponse(saved!);
        }
    }
}
