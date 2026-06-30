using System;
using System.Collections.Generic;
using UMS.Application.DTOs.Requests.Grades;
using UMS.Application.DTOs.Responses.Grades;
using UMS.Application.UseCases.Grades.Commands;
using UMS.Application.UseCases.Grades.Queries;

namespace UMS.Application.Facades
{
    internal class GradeFacade : IGradeFacade
    {
        private readonly CreateGradeUseCase _createGrade;
        private readonly UpdateGradeUseCase _updateGrade;
        private readonly DeleteGradeUseCase _deleteGrade;
        private readonly GetGradesByClassUseCase _getGradesByClass;
        private readonly GetGradesByStudentUseCase _getGradesByStudent;
        private readonly CalculateFinalGradeUseCase _calculateFinalGrade;
        private readonly SyncAttendanceToGradeUseCase _syncAttendanceToGrade;

        public GradeFacade(
            CreateGradeUseCase createGrade,
            UpdateGradeUseCase updateGrade,
            DeleteGradeUseCase deleteGrade,
            GetGradesByClassUseCase getGradesByClass,
            GetGradesByStudentUseCase getGradesByStudent,
            CalculateFinalGradeUseCase calculateFinalGrade,
            SyncAttendanceToGradeUseCase syncAttendanceToGrade)
        {
            _createGrade = createGrade;
            _updateGrade = updateGrade;
            _getGradesByClass = getGradesByClass;
            _getGradesByStudent = getGradesByStudent;
            _calculateFinalGrade = calculateFinalGrade;
            _syncAttendanceToGrade = syncAttendanceToGrade;
        }

        public Task<GradeResponse> CreateGradeAsync(CreateGradeRequest request, Guid updatedBy, CancellationToken ct = default)
            => _createGrade.ExecuteAsync(request, updatedBy, ct);

        public Task<GradeResponse> UpdateGradeAsync(Guid gradeId, UpdateGradeRequest request, Guid updatedBy, CancellationToken ct = default)
            => _updateGrade.ExecuteAsync(gradeId, request, updatedBy, ct);

        public Task DeleteGradeAsync(Guid gradeId, CancellationToken ct = default)
            => _deleteGrade.ExecuteAsync(gradeId, ct);

        public Task<IEnumerable<GradeResponse>> GetGradesByClassAsync(Guid classId, CancellationToken ct = default)
            => _getGradesByClass.ExecuteAsync(classId, ct);

        public Task<IEnumerable<GradeResponse>> GetGradesByStudentAsync(Guid studentId, CancellationToken ct = default)
            => _getGradesByStudent.ExecuteAsync(studentId, ct);

        public Task<IEnumerable<FinalGradeResponse>> CalculateFinalGradeAsync(Guid classId, CancellationToken ct = default)
            => _calculateFinalGrade.ExecuteAsync(classId, ct);

        public Task<GradeResponse> SyncAttendanceToGradeAsync(Guid enrollmentId, Guid updatedBy, CancellationToken ct = default)
            => _syncAttendanceToGrade.ExecuteAsync(enrollmentId, updatedBy, ct);
    }
}
