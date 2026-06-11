using System;
using System.Collections.Generic;
using System.Text;
using UMS.Application.DTOs.Requests.Class;
using UMS.Application.DTOs.Responses.Class;
using UMS.Domain.Entities;

namespace UMS.Application.Mappers
{
    internal class ClassScheduleMapper
    {
        public static ClassSchedule ToEntity(CreateClassScheduleRequest request)
        {
            return new ClassSchedule(request.ClassId, request.DayOfWeek, request.StartTime, request.EndTime, request.Room);
        }

        public static ClassScheduleResponse ToResponse(ClassSchedule schedule)
        {
            return new ClassScheduleResponse
            {
                Id = schedule.Id,
                ClassId = schedule.ClassId,
                DayOfWeek = schedule.DayOfWeek,
                StartTime = schedule.StartTime,
                EndTime = schedule.EndTime,
                Room = schedule.Room
            };
        }

        public static void ApplyUpdate(UpdateClassScheduleRequest request, ClassSchedule schedule)
        {
            schedule.Update(request.DayOfWeek, request.StartTime, request.EndTime, request.Room);
        }
    }
}
