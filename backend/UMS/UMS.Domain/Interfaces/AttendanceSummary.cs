using System;
using System.Collections.Generic;
using System.Text;

namespace UMS.Domain.Interfaces
{
    public class AttendanceSummary
    {
        public Guid EnrollmentId { get; set; }
        public int Total { get; set; }
        public int Present { get; set; }
        public int Absent { get; set; }
        public int Late { get; set; }
        public double AttendanceRate => Total == 0 ? 0 : Math.Round((double)Present / Total * 100, 2);
    }
}
