using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetTeacherByAccountIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetTeacherByAccountIdUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<TeacherResponse> ExecuteAsync(Guid accountId, CancellationToken ct)
        {
            var teacher = await _unitOfWork.Teachers.GetByAccountIdAsync(accountId, ct);
            if (teacher is null)
                throw new NotFoundException("Không tìm thấy thông tin giáo viên.");
            return UserMapper.ToResponse(teacher);
        }
    }
}
