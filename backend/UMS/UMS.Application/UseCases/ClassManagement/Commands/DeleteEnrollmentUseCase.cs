using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class DeleteEnrollmentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteEnrollmentUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(Guid enrollmentId, CancellationToken ct = default)
        {
            var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId, ct);
            if (enrollment is null)
                throw new NotFoundException($"Không tìm thấy bản ghi đăng ký với id {enrollmentId}.");

            _unitOfWork.Enrollments.Remove(enrollment);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
