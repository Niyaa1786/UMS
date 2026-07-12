using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Application.Interfaces.Shared;
using UMS.Application.Mappers;

namespace UMS.Application.UseCases.Attendances.Queries
{
    internal class GetAttendanceSummaryByClassUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAttendanceSummaryByClassUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AttendanceSummaryResponse>> ExecuteAsync(Guid classId, CancellationToken ct = default)
        {
            var summaries = await _unitOfWork.Attendances.GetSummaryByClassIdAsync(classId, ct);
            var enrollments = await _unitOfWork.Enrollments.GetByClassIdAsync(classId, ct);
            var enrollmentLookup = enrollments.ToDictionary(e => e.Id);

            return summaries.Select(s =>
            {
                enrollmentLookup.TryGetValue(s.EnrollmentId, out var enrollment);
                return AttendanceMapper.ToSummaryResponse(
                    s,
                    enrollment?.StudentId ?? Guid.Empty,
                    enrollment?.Student?.FullName ?? string.Empty
                );
            });
        }
    }
}
