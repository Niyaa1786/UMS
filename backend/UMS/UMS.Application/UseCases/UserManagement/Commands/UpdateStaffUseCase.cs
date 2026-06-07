using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class UpdateStaffUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private IValidator<UpdateStaffRequest> _validator;

        public UpdateStaffUseCase( IUnitOfWork unitOfWork, IValidator<UpdateStaffRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<StaffResponse> ExecuteAsync(Guid staffId, UpdateStaffRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var staff = await _unitOfWork.Staffs.GetByIdAsync(staffId, ct);
            if (staff == null)
                throw new NotFoundException($"Staff with id {staffId} not found.");

            UserMapper.ApplyDetailsUpdate(request, staff);
            await _unitOfWork.SaveChangesAsync(ct);

            return UserMapper.ToResponse(staff);
        }
    }
}
