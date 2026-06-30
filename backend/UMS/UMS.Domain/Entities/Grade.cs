using System;
using UMS.Domain.Enums;

namespace UMS.Domain.Entities
{
    public class Grade
    {
        public Guid Id { get; private set; }
        public Guid EnrollmentId { get; private set; }
        public GradeType GradeType { get; private set; }
        public float Score { get; private set; }
        public float MaxScore { get; private set; }
        public float Weight { get; private set; }
        public Guid? UpdatedBy { get; private set; }
        public DateTime GradedAt { get; private set; }
        public string? Note { get; private set; }

        public Enrollment? Enrollment { get; private set; }

        private Grade() { }

        public Grade(Guid enrollmentId, GradeType gradeType, float score, Guid updatedBy, float maxScore = 10, float weight = 1.0f, string? note = null)
        {
            Id = Guid.NewGuid();
            EnrollmentId = enrollmentId;
            GradeType = gradeType;
            Score = score;
            MaxScore = maxScore;
            Weight = weight;
            UpdatedBy = updatedBy;
            Note = note;
            GradedAt = DateTime.UtcNow;
        }

        public void UpdateScore(float score, Guid updatedBy, string? note = null)
        {
            Score = score;
            UpdatedBy = updatedBy;
            Note = note;
            GradedAt = DateTime.UtcNow;
        }
    }
}