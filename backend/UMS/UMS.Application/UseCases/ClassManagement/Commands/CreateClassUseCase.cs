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
    internal class CreateClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateClassRequest> _validator;

        public CreateClassUseCase(IUnitOfWork unitOfWork, IValidator<CreateClassRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<ClassResponse> ExecuteAsync(CreateClassRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var exists = await _unitOfWork.Classes.ExistsByCodeAsync(request.Code, ct);
            if (exists)
                throw new ValidationException(new[] { new ValidationFailure(nameof(request.Code), "Mã lớp đã tồn tại.") });

            var subject = await _unitOfWork.Subjects.GetByIdAsync(request.SubjectId, ct);
            if (subject is null)
                throw new NotFoundException($"Không tìm thấy môn học với id {request.SubjectId}.");

            var teacher = await _unitOfWork.Teachers.GetByIdAsync(request.TeacherId, ct);
            if (teacher is null)
                throw new NotFoundException($"Không tìm thấy giảng viên với id {request.TeacherId}.");

            var classEntity = ClassMapper.ToEntity(request);
            _unitOfWork.Classes.Add(classEntity);
            await _unitOfWork.SaveChangesAsync(ct);

            return ClassMapper.ToResponse(classEntity, subject.Name, teacher.FullName);
        }
    }
}
