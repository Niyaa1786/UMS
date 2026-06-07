using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetStaffByIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetStaffByIdUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<StaffResponse> ExecuteAsync(Guid staffId, CancellationToken ct)
        {
            var staff = await _unitOfWork.Staffs.GetByIdAsync(staffId, ct);

            if(staff is null)
                throw new NotFoundException($"Staff with id {staffId} not found.");

            return UserMapper.ToResponse(staff);
        }
    }
}
