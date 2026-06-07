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
    internal class UpdateStudentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private IValidator<UpdateStudentRequest> _validator;

        public UpdateStudentUseCase(IUnitOfWork unitOfWork, IValidator<UpdateStudentRequest> validator)
        {
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<StudentResponse> ExecuteAsync(Guid studentId, UpdateStudentRequest request, CancellationToken ct = default)
        {
            _validator.ValidateAndThrow(request);

            var student = await _unitOfWork.Students.GetByIdAsync(studentId, ct);
            if (student == null)
                throw new NotFoundException($"Student with id {studentId} not found.");

            UserMapper.ApplyDetailsUpdate(request, student);
            await _unitOfWork.SaveChangesAsync(ct);

            return UserMapper.ToResponse(student);
        }
    }
}
