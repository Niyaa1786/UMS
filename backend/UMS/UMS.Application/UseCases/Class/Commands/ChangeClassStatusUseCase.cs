using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.Class.Commands
{
    internal class ChangeClassStatusUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ChangeClassStatusUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<bool> ExecuteAsync(Guid id, bool isActive, CancellationToken ct = default)
        {
            var classEntity = await _unitOfWork.Classes.GetByIdAsync(id, ct);
            if (classEntity is null)
                throw new NotFoundException($"Không tìm thấy lớp với id {id}.");

            classEntity.ChangeStatus(isActive ? Status.Active : Status.Closed);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }

    }
}
