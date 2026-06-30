using System;
using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Responses.Grades
{
    public class GradeResponse
    {
        public Guid Id { get; set; }
        public Guid EnrollmentId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public GradeType GradeType { get; set; }
        public float Score { get; set; }
        public float MaxScore { get; set; }
        public float Weight { get; set; }
        public DateTime GradedAt { get; set; }
        public string? Note { get; set; }
    }
}
