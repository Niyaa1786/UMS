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
    internal class GetTeacherByIdUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetTeacherByIdUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TeacherResponse> ExecuteAsync(Guid teacherId, CancellationToken ct)
        {
            var teacher = await _unitOfWork.Teachers.GetByIdAsync(teacherId, ct);

            if (teacher is null)
                throw new NotFoundException($"Staff with id {teacherId} not found.");

            return UserMapper.ToResponse(teacher);
        }
    }
}
