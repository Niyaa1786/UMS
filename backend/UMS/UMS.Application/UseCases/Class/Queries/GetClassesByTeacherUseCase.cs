using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Class.Queries
{
    internal class GetClassesByTeacherUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetClassesByTeacherUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<ClassResponse>> ExecuteAsync(Guid teacherId, CancellationToken ct)
        {
            var classes = await _unitOfWork.Classes.GetByTeacherAsync(teacherId, ct);
            return classes.Select(ClassMapper.ToResponse);
        }
    }
}
