import { Clock, MapPin, Info } from 'lucide-react';

export default function ThoiKhoaBieu() {
  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  
  const scheduleData = [
    { day: 'Thứ 2', time: '07:30 - 10:00', title: 'Cấu trúc dữ liệu và Giải thuật (LT)', code: 'IT001', room: 'C101', color: 'bg-red-50 text-red-700 border-red-200' },
    { day: 'Thứ 2', time: '13:30 - 16:00', title: 'Sinh hoạt Bộ môn', code: 'SH', room: 'Phòng họp Khoa', color: 'bg-slate-50 text-slate-700 border-slate-200' },
    
    { day: 'Thứ 3', time: '09:45 - 12:15', title: 'Hệ quản trị Cơ sở dữ liệu (TH)', code: 'DB404', room: 'Lab 301', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    
    { day: 'Thứ 4', time: '13:30 - 16:00', title: 'Lập trình hướng đối tượng (TH)', code: 'CS202', room: 'Lab S02', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    
    { day: 'Thứ 5', time: '07:30 - 10:00', title: 'Nghiên cứu khoa học', code: 'NCKH', room: 'Phòng Lab AI', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    
    { day: 'Thứ 6', time: '07:30 - 10:00', title: 'Toán rời rạc (LT)', code: 'MATH301', room: 'B201', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">Thời khóa biểu giảng dạy</h2>
        <p className="text-xs text-gray-500 font-semibold mt-1">Lịch dạy và hoạt động học thuật trong tuần</p>
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const slots = scheduleData.filter((s) => s.day === day);
          return (
            <div key={day} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[200px]">
              {/* Header card for the day */}
              <div className="px-5 py-3.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-black text-gray-800">{day}</span>
                <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-100">
                  {slots.length} sự kiện
                </span>
              </div>
              
              {/* Body slots list */}
              <div className="p-4 flex-1 space-y-3">
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 border ${slot.color} space-y-2 hover:shadow-sm transition-all`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/60 px-1.5 py-0.5 rounded">
                          {slot.code}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-bold">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{slot.time}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-xs font-black leading-snug line-clamp-2">{slot.title}</h4>
                      
                      <div className="flex items-center gap-1 text-[9px] font-bold opacity-80 pt-1 border-t border-black/5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{slot.room}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <Info className="w-5 h-5 mb-1 text-gray-300" />
                    <p className="text-[10px] font-bold">Không có lịch lên lớp</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
