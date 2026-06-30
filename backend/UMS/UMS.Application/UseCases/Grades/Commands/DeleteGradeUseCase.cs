using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Grades.Commands
{
    internal class DeleteGradeUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteGradeUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task ExecuteAsync(Guid gradeId, CancellationToken ct = default)
        {
            var grade = await _unitOfWork.Grades.GetByIdAsync(gradeId, ct);
            if (grade is null)
                throw new NotFoundException($"Không tìm thấy điểm với id {gradeId}.");

            _unitOfWork.Grades.Remove(grade);
            await _unitOfWork.SaveChangesAsync(ct);
        }
    }
}
