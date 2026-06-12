using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.ClassManagement.Queries
{
    internal class GetAllClassesUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllClassesUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<ClassResponse>> ExecuteAsync(CancellationToken ct = default)
        {
            var classes = await _unitOfWork.Classes.GetAllAsync(ct);
            return classes.Select(ClassMapper.ToResponse);
        }
    }
}
