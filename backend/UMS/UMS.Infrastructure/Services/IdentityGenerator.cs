using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.Interfaces.Common;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Utilities;

namespace UMS.Infrastructure.Services
{
    internal class IdentityGenerator : IIdentityGenerator
    {
        private readonly IStudentRepository _studentRepo;
        private readonly ITeacherRepository _teacherRepo;
        private readonly IStaffRepository _staffRepo;

        public IdentityGenerator(IStudentRepository studentRepo, ITeacherRepository teacherRepo, IStaffRepository staffRepo)
        {
            _studentRepo = studentRepo;
            _teacherRepo = teacherRepo;
            _staffRepo = staffRepo;
        }

        public async Task<string> GenerateStudentIdAsync(CancellationToken ct)
        {
            int count = await _studentRepo.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"SV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }

        public async Task<string> GenerateTeacherIdAsync(CancellationToken ct)
        {
            int count = await _teacherRepo.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"GV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }

        public async Task<string> GenerateStaffIdAsync(CancellationToken ct)
        {
            int count = await _staffRepo.CountAsync(ct);
            int nextNumber = count + 1;
            int randomSuffix = Random.Shared.Next(1000, 9999);
            return $"NV{DateTimeUtils.GetYearSuffix()}{nextNumber:D4}{randomSuffix}";
        }
    }
}
