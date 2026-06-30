using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.UseCases.Grades.Queries;

namespace UMS.Application.Facades
{
    public interface IGradeFacade
    {
        Task<GradeResponse> CreateGradeAsync(CreateGradeRequest request, Guid updatedBy, CancellationToken ct = default);
        Task<GradeResponse> UpdateGradeAsync(Guid gradeId, UpdateGradeRequest request, Guid updatedBy, CancellationToken ct = default);
        Task DeleteGradeAsync(Guid gradeId, CancellationToken ct = default);
        Task<IEnumerable<GradeResponse>> GetGradesByClassAsync(Guid classId, CancellationToken ct = default);
        Task<IEnumerable<GradeResponse>> GetGradesByStudentAsync(Guid studentId, CancellationToken ct = default);
        Task<IEnumerable<FinalGradeResponse>> CalculateFinalGradeAsync(Guid classId, CancellationToken ct = default);

        Task<GradeResponse> SyncAttendanceToGradeAsync(Guid enrollmentId, Guid updatedBy, CancellationToken ct = default);
    }
}
