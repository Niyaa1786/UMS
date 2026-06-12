using FluentValidation;
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
    internal class UpdateClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdateClassRequest> _validator;

        public UpdateClassUseCase(IUnitOfWork unitOfWork, IValidator<UpdateClassRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<ClassResponse> ExecuteAsync(Guid id, UpdateClassRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var classEntity = await _unitOfWork.Classes.GetByIdAsync(id, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {id}.");

            var subject = await _unitOfWork.Subjects.GetByIdAsync(request.SubjectId, ct);
            if (subject is null)
                throw new NotFoundException($"Không tìm thấy môn học với id {request.SubjectId}.");

            var teacher = await _unitOfWork.Teachers.GetByIdAsync(request.TeacherId, ct);
            if (teacher is null)
                throw new NotFoundException($"Không tìm thấy giảng viên với id {request.TeacherId}.");

            ClassMapper.ApplyUpdate(request, classEntity);
            await _unitOfWork.SaveChangesAsync(ct);

            return ClassMapper.ToResponse(classEntity, subject.Name, teacher.FullName);
        }
    }
}
