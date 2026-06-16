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
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class CreateEnrollmentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateEnrollmentRequest> _validator;

        public CreateEnrollmentUseCase(IUnitOfWork unitOfWork, IValidator<CreateEnrollmentRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<EnrollmentResponse> ExecuteAsync(CreateEnrollmentRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var classEntity = await _unitOfWork.Classes.GetByIdAsync(request.ClassId, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {request.ClassId}.");

            var student = await _unitOfWork.Students.GetByIdAsync(request.StudentId, ct);
            if (student is null)
                throw new NotFoundException($"Không tìm thấy sinh viên với id {request.StudentId}.");

            var exists = await _unitOfWork.Enrollments.ExistsActiveAsync(request.ClassId, request.StudentId, ct);
            if (exists)
                throw new ValidationException(new[] { new ValidationFailure("StudentId", "Sinh viên đã đăng ký lớp này.") });

            var enrollment = new Enrollment(request.ClassId, request.StudentId);
            _unitOfWork.Enrollments.Add(enrollment);
            await _unitOfWork.SaveChangesAsync(ct);

            var saved = await _unitOfWork.Enrollments.GetByIdAsync(enrollment.Id, ct);
            return EnrollmentMapper.ToResponse(saved!);
        }
    }
}
