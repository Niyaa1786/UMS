using System;
using UMS.Domain.Enums;

namespace UMS.Application.DTOs.Requests.Grades
{
    public class CreateGradeRequest
    {
        public Guid EnrollmentId { get; set; }
        public GradeType GradeType { get; set; }
        public float Score { get; set; }
        public float MaxScore { get; set; } = 10;
        public float Weight { get; set; } = 1.0f;
        public string? Note { get; set; }
    }
}
