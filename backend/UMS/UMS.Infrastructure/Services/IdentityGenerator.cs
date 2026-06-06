using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Common;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Utilities;

namespace UMS.Infrastructure.Services
{
    internal class IdentityGenerator : IIdentityGenerator
    {
        private readonly IUnitOfWork _unitOfWork;

        public IdentityGenerator(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<string> GenerateStudentIdAsync(CancellationToken ct)
        {
            int count = await _unitOfWork.Students.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"SV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }

        public async Task<string> GenerateTeacherIdAsync(CancellationToken ct)
        {
            int count = await _unitOfWork.Teachers.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"GV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }

        public async Task<string> GenerateStaffIdAsync(CancellationToken ct)
        {
            int count = await _unitOfWork.Staffs.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"NV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }
    }
}
