using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Responses.Class
{
    public class StudentClassResponse
    {
        public Guid ClassId { get; set; }
        public string ClassCode { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public string TeacherName { get; set; } = string.Empty;
        public string SchoolYear { get; set; } = string.Empty;
        public int Semester { get; set; }
        public DateTime EnrolledAt { get; set; }
        public List<ClassScheduleResponse> Schedules { get; set; } = new();
    }
}

