using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Requests.Subjects;
using UMS.Application.DTOs.Responses.Class;
using UMS.Application.DTOs.Responses.Subject;

namespace UMS.Application.Facades
{
    public interface IClassManagementFacade
    {
        Task<SubjectResponse> CreateSubjectAsync(CreateSubjectRequest request, CancellationToken ct = default);
        Task<SubjectResponse> UpdateSubjectAsync(Guid id, UpdateSubjectRequest request, CancellationToken ct = default);
        Task<bool> DeleteSubjectAsync(Guid id, CancellationToken ct = default);
        Task<SubjectResponse> GetSubjectByIdAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<SubjectResponse>> GetAllSubjectsAsync(CancellationToken ct = default);

        Task<ClassResponse> CreateClassAsync(CreateClassRequest request, CancellationToken ct = default);
        Task<ClassResponse> UpdateClassAsync(Guid id, UpdateClassRequest request, CancellationToken ct = default);
        Task<bool> DeleteClassAsync(Guid id, CancellationToken ct = default);
        Task<ClassResponse> GetClassByIdAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<ClassResponse>> GetAllClassesAsync(CancellationToken ct = default);
        Task<IEnumerable<ClassResponse>> GetClassesByTeacherAsync(Guid teacherId, CancellationToken ct = default);
        Task<IEnumerable<ClassResponse>> GetClassesBySubjectAsync(Guid subjectId, CancellationToken ct = default);
        Task<bool> ChangeClassStatusAsync(Guid id, bool isActive, CancellationToken ct = default);

        Task<ClassScheduleResponse> CreateClassScheduleAsync(CreateClassScheduleRequest request, CancellationToken ct = default);
        Task<ClassScheduleResponse> UpdateClassScheduleAsync(Guid scheduleId, UpdateClassScheduleRequest request, CancellationToken ct = default);
        Task<bool> DeleteClassScheduleAsync(Guid scheduleId, CancellationToken ct = default);
        Task<IEnumerable<ClassScheduleResponse>> GetClassSchedulesByClassIdAsync(Guid classId, CancellationToken ct = default);
    }
}
