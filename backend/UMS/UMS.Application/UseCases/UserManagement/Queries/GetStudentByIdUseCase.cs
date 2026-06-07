using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetStudentByIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetStudentByIdUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<StudentResponse> ExecuteAsync(Guid studentId, CancellationToken ct)
        {
            var student = await _unitOfWork.Students.GetByIdAsync(studentId, ct);

            if (student is null)
                throw new NotFoundException($"Staff with id {studentId} not found.");

            return UserMapper.ToResponse(student);
        }
    }
}
