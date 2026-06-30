using FluentValidation;
using System;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.Grades.Commands
{
    internal class CreateGradeUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateGradeRequest> _validator;

        public CreateGradeUseCase(IUnitOfWork unitOfWork, IValidator<CreateGradeRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<GradeResponse> ExecuteAsync(CreateGradeRequest request, Guid updatedBy, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(request.EnrollmentId, ct);
            if (enrollment is null)
                throw new NotFoundException($"Không tìm thấy bản ghi đăng ký với id {request.EnrollmentId}.");

            var existing = await _unitOfWork.Grades.GetByEnrollmentAndTypeAsync(request.EnrollmentId, request.GradeType, ct);
            if (existing is not null)
                throw new ValidationException($"Sinh viên đã có điểm loại '{request.GradeType}' cho lớp này. Vui lòng dùng chức năng cập nhật.");

            var grade = GradeMapper.ToEntity(request, updatedBy);
            _unitOfWork.Grades.Add(grade);
            await _unitOfWork.SaveChangesAsync(ct);

            var saved = await _unitOfWork.Grades.GetByIdAsync(grade.Id, ct);
            return GradeMapper.ToResponse(saved!);
        }
    }
}
