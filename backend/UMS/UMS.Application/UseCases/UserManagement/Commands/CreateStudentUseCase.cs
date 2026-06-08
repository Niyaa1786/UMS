using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class CreateStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIdentityGenerator _identityGenerator;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IValidator<CreateStudentRequest> _validator;

        public CreateStudentUseCase(IUnitOfWork unitOfWork, IIdentityGenerator identityGenerator, IPasswordHasher passwordHasher, IValidator<CreateStudentRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _identityGenerator = identityGenerator;
            _passwordHasher = passwordHasher;
            _validator = validator;
        }

        public async Task<StudentResponse> ExecuteAsync(CreateStudentRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var emailExists = await _unitOfWork.Staffs.ExistsByEmailAsync(request.Email, ct);
            if (emailExists)
                throw new ValidationException(new[] { new ValidationFailure(nameof(request.Email), "Email already exist.") });

            var studentCode = await _identityGenerator.GenerateStudentIdAsync(ct);
            var passwordHash = _passwordHasher.HashPassword($"SV@{studentCode}");

            var account = new Account(studentCode, passwordHash, Roles.Student);
            var student = UserMapper.ToEntity(request, account.Id);

            _unitOfWork.Accounts.Add(account);
            _unitOfWork.Students.Add(student);
            await _unitOfWork.SaveChangesAsync(ct);

            var savedStudent = await _unitOfWork.Students.GetByIdAsync(student.Id, ct);
            return UserMapper.ToResponse(savedStudent!);
        }
    }
}
