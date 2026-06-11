using System;
using System.Collections.Generic;
using System.Text;
using UMS.Domain.Entities;

namespace UMS.Domain.Interfaces
{
    public interface IClassScheduleRepository
    {
        Task<IEnumerable<ClassSchedule>> GetByClassIdAsync(Guid classId, CancellationToken ct);
        Task<ClassSchedule?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<bool> IsTimeSlotOverlapAsync(Guid classId, DayOfWeek day, TimeSpan start, TimeSpan end, CancellationToken ct);

        void Add(ClassSchedule schedule);
        void Update(ClassSchedule schedule);
        void Remove(ClassSchedule schedule);
    }

}
