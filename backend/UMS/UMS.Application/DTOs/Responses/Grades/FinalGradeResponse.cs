using System;

namespace UMS.Application.DTOs.Responses.Grades
{
    public class FinalGradeResponse
    {
        public Guid EnrollmentId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public float FinalScore { get; set; }
        public string GradeLetter { get; set; } = string.Empty;
    }
}
