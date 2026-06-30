using System;

namespace UMS.Application.DTOs.Responses.Attendance
{
    public class AttendanceSummaryResponse
    {
        public Guid EnrollmentId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public int Total { get; set; }
        public int Present { get; set; }
        public int Absent { get; set; }
        public int Late { get; set; }
        public double AttendanceRate { get; set; }
    }
}
