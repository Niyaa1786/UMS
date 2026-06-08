using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class CreateStaffUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIdentityGenerator _identityGenerator;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IValidator<CreateStaffRequest> _validator;

        public CreateStaffUseCase(IUnitOfWork unitOfWork, IIdentityGenerator identityGenerator, IPasswordHasher passwordHasher, IValidator<CreateStaffRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _identityGenerator = identityGenerator;
            _passwordHasher = passwordHasher;
            _validator = validator;
        }

        public async Task<StaffResponse> ExecuteAsync(CreateStaffRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var emailExists = await _unitOfWork.Staffs.ExistsByEmailAsync(request.Email, ct);
            if (emailExists)
                throw new ValidationException(new[] {new ValidationFailure(nameof(request.Email), "Email already exist.")});

            var staffCode = await _identityGenerator.GenerateStaffIdAsync(ct);
            var passwordHash = _passwordHasher.HashPassword($"QL@{staffCode}");

            var account = new Account(staffCode, passwordHash, Roles.Staff);
            var staff = UserMapper.ToEntity(request, account.Id);

            _unitOfWork.Accounts.Add(account);
            _unitOfWork.Staffs.Add(staff);
            await _unitOfWork.SaveChangesAsync(ct);

            var savedStaff = await _unitOfWork.Staffs.GetByIdAsync(staff.Id, ct);
            return UserMapper.ToResponse(savedStaff!);
        }
    }
}
