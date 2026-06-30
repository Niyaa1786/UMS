using System;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Attendance
    {
        public Guid Id { get; private set; }
        public Guid EnrollmentId { get; private set; }
        public DateOnly CheckDate { get; private set; }
        public AttendanceStatus Status { get; private set; }
        public string? Remark { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Enrollment? Enrollment { get; private set; }

        private Attendance() { }

        public Attendance(Guid enrollmentId, DateOnly checkDate, AttendanceStatus status, string? remark = null)
        {
            Id = Guid.NewGuid();
            EnrollmentId = enrollmentId;
            CheckDate = checkDate;
            Status = status;
            Remark = remark;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateStatus(AttendanceStatus status, string? remark = null)
        {
            Status = status;
            Remark = remark;
        }
    }
}
