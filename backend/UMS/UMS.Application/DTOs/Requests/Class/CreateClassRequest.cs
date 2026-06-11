using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Application.DTOs.Requests.Class
{
    public class CreateClassRequest
    {
        public string Code { get; set; } = string.Empty;
        public Guid SubjectId { get; set; }
        public Guid TeacherId { get; set; }
        public string SchoolYear { get; set; } = string.Empty;
        public int Semester { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MaxStudents { get; set; }
    }
}
