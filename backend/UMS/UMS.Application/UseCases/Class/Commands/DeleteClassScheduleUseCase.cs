using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Class.Commands
{
    internal class DeleteClassScheduleUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteClassScheduleUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<bool> ExecuteAsync(Guid id, CancellationToken ct = default)
        {
            var schedule = await _unitOfWork.ClassSchedules.GetByIdAsync(id, ct);
            if (schedule is null)
                throw new NotFoundException($"Không tìm thấy lịch học với id {id}.");

            _unitOfWork.ClassSchedules.Remove(schedule);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
