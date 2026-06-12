using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Class.Queries
{
    internal class GetClassByIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetClassByIdUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<ClassResponse> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var classEntity = await _unitOfWork.Classes.GetByIdAsync(id, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {id}.");

            var subject = await _unitOfWork.Subjects.GetByIdAsync(classEntity.SubjectId, ct);
            var teacher = await _unitOfWork.Teachers.GetByIdAsync(classEntity.TeacherId, ct);
            return ClassMapper.ToResponse(classEntity, subject!.Name, teacher!.FullName);
        }
    }
}
