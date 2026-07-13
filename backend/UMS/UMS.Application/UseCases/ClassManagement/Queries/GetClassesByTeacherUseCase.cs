using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.ClassManagement.Queries
{
    internal class GetClassesByTeacherUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetClassesByTeacherUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<ClassResponse>> ExecuteAsync(Guid teacherId, CancellationToken ct)
        {
            // 1. Thử tìm giảng viên theo AccountId (do frontend gửi)
            var teacher = await _unitOfWork.Teachers.GetByAccountIdAsync(teacherId, ct);

            // 2. Nếu không tìm thấy, thử tìm theo TeacherId (để tương thích ngược)
            if (teacher is null)
            {
                teacher = await _unitOfWork.Teachers.GetByIdAsync(teacherId, ct);
            }

            if (teacher is null)
                throw new NotFoundException($"Không tìm thấy giảng viên với id {teacherId}.");

            // 3. Lấy danh sách lớp theo TeacherId thực tế
            var classes = await _unitOfWork.Classes.GetByTeacherAsync(teacher.Id, ct);
            return classes.Select(ClassMapper.ToResponse);
        }

    }
}
