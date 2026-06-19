using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class SelfRegisterClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SelfRegisterClassUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<EnrollmentResponse> ExecuteAsync(Guid studentId, Guid classId, CancellationToken ct = default)
        {
            var student = await _unitOfWork.Students.GetByIdAsync(studentId, ct);
            if (student is null)
                throw new NotFoundException("Sinh viên không tồn tại.");

            var classEntity = await _unitOfWork.Classes.GetByIdAsync(classId, ct);
            if (classEntity is null)
                throw new NotFoundException("Lớp học không tồn tại.");

            if (classEntity.Status != Status.Active)
                throw new ValidationException(new[] { new ValidationFailure("ClassId", "Lớp học đã đóng hoặc không hoạt động.") });

            var currentCount = await _unitOfWork.Enrollments.CountActiveByClassAsync(classId, ct);
            if (currentCount >= classEntity.MaxStudents)
                throw new ValidationException(new[] { new ValidationFailure("ClassId", "Lớp học đã đủ sĩ số.") });

            var exists = await _unitOfWork.Enrollments.ExistsActiveAsync(classId, studentId, ct);
            if (exists)
                throw new ValidationException(new[] { new ValidationFailure("ClassId", "Bạn đã đăng ký lớp này.") });

            var enrollment = new Enrollment(classId, studentId);
            _unitOfWork.Enrollments.Add(enrollment);
            await _unitOfWork.SaveChangesAsync(ct);

            var saved = await _unitOfWork.Enrollments.GetByIdAsync(enrollment.Id, ct);
            return EnrollmentMapper.ToResponse(saved!);
        }
    }
}
