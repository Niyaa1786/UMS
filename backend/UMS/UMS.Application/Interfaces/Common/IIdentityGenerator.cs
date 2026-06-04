using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.Interfaces.Common
{
    public interface IIdentityGenerator
    {
        public Task<string> GenerateStaffIdAsync(CancellationToken ct);
        public Task<string> GenerateTeacherIdAsync(CancellationToken ct);
        public Task<string> GenerateStudentIdAsync(CancellationToken ct);
    }
}
