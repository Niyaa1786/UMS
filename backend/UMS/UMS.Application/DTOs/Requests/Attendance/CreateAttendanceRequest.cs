using System;
using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Requests.Attendance
{
    public class CreateAttendanceRequest
    {
        public Guid EnrollmentId { get; set; }
        public DateOnly CheckDate { get; set; }
        public AttendanceStatus Status { get; set; }
        public string? Remark { get; set; }
    }
}
