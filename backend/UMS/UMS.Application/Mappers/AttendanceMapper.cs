using System;
using UMS.Application.DTOs.Requests.Attendance;
using UMS.Application.DTOs.Responses.Attendance;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;

namespace UMS.Application.Mappers
{
    internal static class AttendanceMapper
    {
        public static Attendance ToEntity(CreateAttendanceRequest request)
        {
            return new Attendance(
                enrollmentId: request.EnrollmentId,
                checkDate: request.CheckDate,
                status: request.Status,
                remark: request.Remark
            );
        }

        public static AttendanceResponse ToResponse(Attendance attendance)
        {
            return new AttendanceResponse
            {
                Id = attendance.Id,
                EnrollmentId = attendance.EnrollmentId,
                StudentId = attendance.Enrollment?.StudentId ?? Guid.Empty,
                StudentFullName = attendance.Enrollment?.Student?.FullName ?? string.Empty,
                CheckDate = attendance.CheckDate,
                Status = attendance.Status,
                Remark = attendance.Remark
            };
        }

        public static AttendanceSummaryResponse ToSummaryResponse(AttendanceSummary summary, Guid studentId, string studentFullName)
        {
            return new AttendanceSummaryResponse
            {
                EnrollmentId = summary.EnrollmentId,
                StudentId = studentId,
                StudentFullName = studentFullName,
                Total = summary.Total,
                Present = summary.Present,
                Absent = summary.Absent,
                Late = summary.Late,
                AttendanceRate = summary.AttendanceRate
            };
        }
    }
}
