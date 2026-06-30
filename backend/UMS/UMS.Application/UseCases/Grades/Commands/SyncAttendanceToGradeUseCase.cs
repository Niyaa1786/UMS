using System;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.Exceptions;
using UMS.Application.Interfaces.Shared;
using UMS.Domain.Enums;
using GradeMapper = UMS.Application.Mappers.GradeMapper;

namespace UMS.Application.UseCases.Grades.Commands
{
    /// <summary>
    /// UC-GA01: Tự động tính điểm chuyên cần (thang 10) từ tỉ lệ Attendance
    /// rồi ghi/cập nhật vào Grades với GradeType = Attendance.
    /// </summary>
    internal class SyncAttendanceToGradeUseCase
    {
        private const GradeType TargetGradeType = Domain.Enums.GradeType.Attendance;
        private const float DefaultWeight = 0.1f;

        private readonly IUnitOfWork _unitOfWork;
        public SyncAttendanceToGradeUseCase(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        public async Task<GradeResponse> ExecuteAsync(Guid enrollmentId, Guid updatedBy, CancellationToken ct = default)
        {
            var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId, ct);
            if (enrollment is null)
                throw new NotFoundException($"Không tìm thấy bản ghi đăng ký với id {enrollmentId}.");

            var summary = await _unitOfWork.Attendances.GetSummaryByEnrollmentIdAsync(enrollmentId, ct);

            // Quy đổi tỉ lệ chuyên cần (0-100%) sang thang điểm 10
            var score = (float)Math.Round(summary.AttendanceRate / 10.0, 2);

            var existing = await _unitOfWork.Grades.GetByEnrollmentAndTypeAsync(enrollmentId, TargetGradeType, ct);
            if (existing is null)
            {
                var grade = new Domain.Entities.Grade(enrollmentId, TargetGradeType, score, updatedBy, maxScore: 10, weight: DefaultWeight, note: "Tự động tính từ điểm danh");
                _unitOfWork.Grades.Add(grade);
                await _unitOfWork.SaveChangesAsync(ct);

                var saved = await _unitOfWork.Grades.GetByIdAsync(grade.Id, ct);
                return GradeMapper.ToResponse(saved!);
            }
            else
            {
                existing.UpdateScore(score, updatedBy, "Tự động tính từ điểm danh");
                await _unitOfWork.SaveChangesAsync(ct);

                var updated = await _unitOfWork.Grades.GetByIdAsync(existing.Id, ct);
                return GradeMapper.ToResponse(updated!);
            }
        }
    }
}
