using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Class
    {
        public Guid Id { get; private set; }
        public string Code { get; private set; } = string.Empty;
        public Guid SubjectId { get; private set; }
        public Guid TeacherId { get; private set; }
        public string SchoolYear { get; private set; } = string.Empty;
        public int Semester { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public int MaxStudents { get; private set; }
        public Status Status { get; private set; }

        // Navigation properties (optional, for EF)
        public Subject? Subject { get; private set; }
        public Teacher? Teacher { get; private set; }

        private Class() { }

        public Class(string code, Guid subjectId, Guid teacherId, string schoolYear, int semester, DateTime startDate, DateTime endDate, int maxStudents)
        {
            Id = Guid.NewGuid();
            Code = code;
            SubjectId = subjectId;
            TeacherId = teacherId;
            SchoolYear = schoolYear;
            Semester = semester;
            StartDate = startDate;
            EndDate = endDate;
            MaxStudents = maxStudents;
            Status = Status.Active;
        }

        public void UpdateDetails(string code, Guid subjectId, Guid teacherId, string schoolYear, int semester, DateTime startDate, DateTime endDate, int maxStudents)
        {
            Code = code;
            SubjectId = subjectId;
            TeacherId = teacherId;
            SchoolYear = schoolYear;
            Semester = semester;
            StartDate = startDate;
            EndDate = endDate;
            MaxStudents = maxStudents;
        }

        public void ChangeStatus(Status newStatus) => Status = newStatus;
    }

}

