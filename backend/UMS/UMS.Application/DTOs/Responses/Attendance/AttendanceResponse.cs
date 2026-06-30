using System;
using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Responses.Attendance
{
    public class AttendanceResponse
    {
        public Guid Id { get; set; }
        public Guid EnrollmentId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public DateOnly CheckDate { get; set; }
        public AttendanceStatus Status { get; set; }
        public string? Remark { get; set; }
    }
}
