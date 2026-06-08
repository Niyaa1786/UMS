using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Users;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;
using UMS.Domain.Entities;
using UMS.Domain.Enums;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class CreateTeacherUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIdentityGenerator _identityGenerator;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IValidator<CreateTeacherRequest> _validator;

        public CreateTeacherUseCase(IUnitOfWork unitOfWork, IIdentityGenerator identityGenerator, IPasswordHasher passwordHasher, IValidator<CreateTeacherRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _identityGenerator = identityGenerator;
            _passwordHasher = passwordHasher;
            _validator = validator;
        }

        public async Task<TeacherResponse> ExecuteAsync(CreateTeacherRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var teacherCode = await _identityGenerator.GenerateTeacherIdAsync(ct);
            var passwordHash = _passwordHasher.HashPassword($"GV@{teacherCode}");

            var account = new Account(teacherCode, passwordHash, Roles.Teacher);
            var teacher = UserMapper.ToEntity(request, account.Id);

            _unitOfWork.Accounts.Add(account);
            _unitOfWork.Teachers.Add(teacher);
            await _unitOfWork.SaveChangesAsync(ct);

            var savedTeacher = await _unitOfWork.Teachers.GetByIdAsync(teacher.Id, ct);
            return UserMapper.ToResponse(savedTeacher!);
        }
    }
}
