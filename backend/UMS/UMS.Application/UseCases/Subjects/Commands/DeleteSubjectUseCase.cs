using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Subjects.Commands
{
    internal class DeleteSubjectUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSubjectUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<bool> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var subject = await _unitOfWork.Subjects.GetByIdAsync(id, ct);
            if (subject is null)
                throw new NotFoundException($"Không tìm thấy môn học với id {id}.");

            _unitOfWork.Subjects.Remove(subject);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }

    }
}
