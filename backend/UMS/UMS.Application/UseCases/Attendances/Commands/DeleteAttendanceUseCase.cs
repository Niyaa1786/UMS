using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;

namespace UMS.Application.UseCases.Attendances.Commands
{
    internal class DeleteAttendanceUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteAttendanceUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task ExecuteAsync(Guid attendanceId, CancellationToken ct = default)
        {
            var attendance = await _unitOfWork.Attendances.GetByIdAsync(attendanceId, ct);
            if (attendance is null)
                throw new NotFoundException($"Không tìm thấy bản ghi điểm danh với id {attendanceId}.");

            _unitOfWork.Attendances.Remove(attendance);
            await _unitOfWork.SaveChangesAsync(ct);
        }
    }

}
