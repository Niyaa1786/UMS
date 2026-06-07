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
using UMS.Domain.Entities;

namespace UMS.Application.UseCases.UserManagement.Commands
{
    internal class UpdateTeacherUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private IValidator<UpdateTeacherRequest> _validator;

        public UpdateTeacherUseCase(IUnitOfWork unitOfWork, IValidator<UpdateTeacherRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<TeacherResponse> ExecuteAsync(Guid teacherId, UpdateTeacherRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var teacher = await _unitOfWork.Teachers.GetByIdAsync(teacherId, ct);
            if (teacher == null)
                throw new NotFoundException($"Teacher with id {teacherId} not found.");

            UserMapper.ApplyDetailsUpdate(request, teacher);
            await _unitOfWork.SaveChangesAsync(ct);

            return UserMapper.ToResponse(teacher);
        }
    }
}
