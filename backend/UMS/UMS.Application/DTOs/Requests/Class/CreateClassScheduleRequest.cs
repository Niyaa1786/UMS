using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Requests.Class
{
    public class CreateClassScheduleRequest
    {
        public Guid ClassId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Room { get; set; } = string.Empty;
    }
}
