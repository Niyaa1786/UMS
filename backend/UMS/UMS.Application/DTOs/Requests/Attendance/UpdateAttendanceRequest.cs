using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Requests.Attendance
{
    public class UpdateAttendanceRequest
    {
        public AttendanceStatus Status { get; set; }
        public string? Remark { get; set; }
    }
}
