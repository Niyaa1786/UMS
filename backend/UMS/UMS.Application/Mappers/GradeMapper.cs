using System;
using System.Collections.Generic;
using System.Linq;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal static class GradeMapper
    {
        public static Grade ToEntity(CreateGradeRequest request, Guid updatedBy)
        {
            return new Grade(
                enrollmentId: request.EnrollmentId,
                gradeType: request.GradeType,
                score: request.Score,
                updatedBy: updatedBy,
                maxScore: request.MaxScore,
                weight: request.Weight,
                note: request.Note
            );
        }

        public static GradeResponse ToResponse(Grade grade)
        {
            return new GradeResponse
            {
                Id = grade.Id,
                EnrollmentId = grade.EnrollmentId,
                StudentId = grade.Enrollment?.StudentId ?? Guid.Empty,
                StudentFullName = grade.Enrollment?.Student?.FullName ?? string.Empty,
                GradeType = grade.GradeType,
                Score = grade.Score,
                MaxScore = grade.MaxScore,
                Weight = grade.Weight,
                GradedAt = grade.GradedAt,
                Note = grade.Note
            };
        }

        public static IEnumerable<FinalGradeResponse> ToFinalGradeResponses(IEnumerable<Grade> grades)
        {
            return grades
                .GroupBy(g => g.EnrollmentId)
                .Select(group =>
                {
                    var totalWeight = group.Sum(g => g.Weight);
                    var finalScore = totalWeight == 0 ? 0 : group.Sum(g => g.Score * g.Weight) / totalWeight;
                    var first = group.First();
                    return new FinalGradeResponse
                    {
                        EnrollmentId = group.Key,
                        StudentId = first.Enrollment?.StudentId ?? Guid.Empty,
                        StudentFullName = first.Enrollment?.Student?.FullName ?? string.Empty,
                        FinalScore = (float)Math.Round(finalScore, 2),
                        GradeLetter = ToGradeLetter(finalScore)
                    };
                });
        }

        private static string ToGradeLetter(double score) => score switch
        {
            >= 8.5 => "Giỏi",
            >= 7.0 => "Khá",
            >= 5.0 => "Trung bình",
            >= 4.0 => "Yếu",
            _ => "Kém"
        };
    }
}
