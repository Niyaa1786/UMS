using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class SelfDropClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SelfDropClassUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(Guid studentId, Guid classId, CancellationToken ct = default)
        {
            var enrollment = await _unitOfWork.Enrollments.GetActiveByClassAndStudentAsync(classId, studentId, ct);
            if (enrollment is null)
                throw new NotFoundException("Bạn chưa đăng ký lớp này hoặc đã hủy trước đó.");

            _unitOfWork.Enrollments.Remove(enrollment);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
