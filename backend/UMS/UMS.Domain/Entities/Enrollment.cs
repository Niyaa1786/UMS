using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Domain.Entities
{
    public class Enrollment
    {
        public Guid Id { get; private set; }
        public Guid ClassId { get; private set; }
        public Guid StudentId { get; private set; }
        public DateTime EnrolledAt { get; private set; }
        public string Status { get; private set; }

        public Class? Class { get; private set; }
        public Student? Student { get; private set; }

        private Enrollment() { }

        public Enrollment(Guid classId, Guid studentId)
        {
            Id = Guid.NewGuid();
            ClassId = classId;
            StudentId = studentId;
            EnrolledAt = DateTime.UtcNow;
            Status = "Active";
        }

        public void Drop()
        {
            Status = "Dropped";
        }
    }

}
