using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Students;
using UMS.Application.DTOs.Responses.Users;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.UserManagement.Queries
{
    internal class GetAllStudentsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllStudentsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<StudentResponse>> ExecuteAsync(CancellationToken ct = default)
        {
            var students = await _unitOfWork.Students.GetAllAsync(ct);

            return students.Select(UserMapper.ToResponse);
        }
    }
}
