using FluentValidation;
using System;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Grades.Commands
{
    internal class UpdateGradeUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdateGradeRequest> _validator;

        public UpdateGradeUseCase(IUnitOfWork unitOfWork, IValidator<UpdateGradeRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<GradeResponse> ExecuteAsync(Guid gradeId, UpdateGradeRequest request, Guid updatedBy, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var grade = await _unitOfWork.Grades.GetByIdAsync(gradeId, ct);
            if (grade is null)
                throw new NotFoundException($"Không tìm thấy điểm với id {gradeId}.");

            if (request.Score > grade.MaxScore)
                throw new ValidationException($"Score không được vượt quá MaxScore ({grade.MaxScore}).");

            grade.UpdateScore(request.Score, updatedBy, request.Note);
            await _unitOfWork.SaveChangesAsync(ct);

            var updated = await _unitOfWork.Grades.GetByIdAsync(gradeId, ct);
            return GradeMapper.ToResponse(updated!);
        }
    }
}
