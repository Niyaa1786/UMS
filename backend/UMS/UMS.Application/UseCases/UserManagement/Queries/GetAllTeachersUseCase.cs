using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetAllTeachersUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllTeachersUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<TeacherResponse>> ExecuteAsync(CancellationToken ct = default)
        {
            var teachers = await _unitOfWork.Teachers.GetAllAsync(ct);

            return teachers.Select(UserMapper.ToResponse);
        }
    }
}
