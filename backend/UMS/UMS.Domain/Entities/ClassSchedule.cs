using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Domain.Entities
{
    public class ClassSchedule
    {
        public Guid Id { get; private set; }
        public Guid ClassId { get; private set; }
        public DayOfWeek DayOfWeek { get; private set; }
        public TimeSpan StartTime { get; private set; }
        public TimeSpan EndTime { get; private set; }
        public string Room { get; private set; } = string.Empty;

        public Class? Class { get; private set; }

        private ClassSchedule() { }

        public ClassSchedule(Guid classId, DayOfWeek dayOfWeek, TimeSpan startTime, TimeSpan endTime, string room)
        {
            Id = Guid.NewGuid();
            ClassId = classId;
            DayOfWeek = dayOfWeek;
            StartTime = startTime;
            EndTime = endTime;
            Room = room;
        }

        public void Update(DayOfWeek dayOfWeek, TimeSpan startTime, TimeSpan endTime, string room)
        {
            DayOfWeek = dayOfWeek;
            StartTime = startTime;
            EndTime = endTime;
            Room = room;
        }
    }
}
