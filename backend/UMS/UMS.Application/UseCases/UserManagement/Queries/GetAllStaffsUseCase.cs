using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetAllStaffsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllStaffsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<StaffResponse>> ExecuteAsync(CancellationToken ct = default)
        {
            var staffs = await _unitOfWork.Staffs.GetAllAsync(ct);

            return staffs.Select(UserMapper.ToResponse);
        }
    }
}
