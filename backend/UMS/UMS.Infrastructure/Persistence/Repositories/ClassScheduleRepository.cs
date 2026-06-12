using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UMS.Domain.Entities;
using UMS.Domain.Interfaces;
using UMS.Infrastructure.Persistence.Data;

namespace UMS.Infrastructure.Persistence.Repositories
{
    internal class ClassScheduleRepository : IClassScheduleRepository
    {
        private readonly AppDbContext _context;
        public ClassScheduleRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<ClassSchedule>> GetSchedulesByClassIdAsync(Guid classId, CancellationToken ct)
            => await _context.ClassSchedules
            .Include(cs => cs.Class)
            .AsNoTracking()
            .Where(s => s.ClassId == classId)
            .ToListAsync(ct);

        public async Task<ClassSchedule?> GetByIdAsync(Guid id, CancellationToken ct)
            => await _context.ClassSchedules
            .Include(cs => cs.Class)
            .FirstOrDefaultAsync(s => s.Id == id, ct);

        public async Task<bool> IsTimeSlotOverlapAsync(Guid classId, DayOfWeek day, TimeSpan start, TimeSpan end, CancellationToken ct)
            => await _context.ClassSchedules.AnyAsync(s => s.ClassId == classId && s.DayOfWeek == day && s.StartTime < end && s.EndTime > start, ct);

        public async Task<bool> IsOverlapExcludingSelfAsync(Guid scheduleId, Guid classId, DayOfWeek day, TimeSpan start, TimeSpan end, CancellationToken ct)
            => await _context.ClassSchedules
                .AnyAsync(s => s.ClassId == classId &&
                               s.Id != scheduleId &&
                               s.DayOfWeek == day &&
                               s.StartTime < end &&
                               s.EndTime > start, ct);

        public void Add(ClassSchedule schedule) => _context.ClassSchedules.Add(schedule);
        public void Update(ClassSchedule schedule) => _context.ClassSchedules.Update(schedule);
        public void Remove(ClassSchedule schedule) => _context.ClassSchedules.Remove(schedule);
    }
}
