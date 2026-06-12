using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.ClassManagement.Commands
{
    internal class DeleteClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteClassUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<bool> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var classEntity = await _unitOfWork.Classes.GetByIdAsync(id, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {id}.");

            _unitOfWork.Classes.Remove(classEntity);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
