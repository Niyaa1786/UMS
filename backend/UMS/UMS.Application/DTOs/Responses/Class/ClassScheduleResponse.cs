using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Responses.Class
{
    public class ClassScheduleResponse
    {
        public Guid Id { get; set; }
        public Guid ClassId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Room { get; set; } = string.Empty;
    }
}
