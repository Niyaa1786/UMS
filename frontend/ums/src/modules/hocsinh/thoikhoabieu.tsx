import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Calendar, Info } from 'lucide-react';

interface TimetableSlot {
  day: number; // 2 to 8 (8 is CN)
  timeSlot: '07:00' | '09:00' | '13:00' | '15:00';
  title: string;
  room: string;
  teacher: string;
  type: 'ly-thuyet' | 'thuc-hanh' | 'ngoai-ngu' | 'ky-nang';
}

export default function ThoiKhoaBieu() {
  const [selectedWeek] = useState('Tuần 12: 18/03/2024 - 24/03/2024');
  const [visibleTypes, setVisibleTypes] = useState({
    'ly-thuyet': true,
    'thuc-hanh': true,
    'ngoai-ngu': true,
    'ky-nang': true,
  });

  const slots: TimetableSlot[] = [
    {
      day: 2,
      timeSlot: '07:00',
      title: 'CẤU TRÚC DỮ LIỆU',
      room: 'P.402 - A1',
      teacher: 'ThS. Lê Quang Bình',
      type: 'ly-thuyet',
    },
    {
      day: 2,
      timeSlot: '15:00',
      title: 'KỸ NĂNG MỀM',
      room: 'Hội trường A',
      teacher: 'Hội đồng kĩ năng',
      type: 'ky-nang',
    },
    {
      day: 3,
      timeSlot: '09:00',
      title: 'PHÂN TÍCH HỆ THỐNG',
      room: 'P.505 - C1',
      teacher: 'PGS. Nguyễn Hải',
      type: 'ky-nang',
    },
    {
      day: 4,
      timeSlot: '07:00',
      title: 'TOÁN RỜI RẠC',
      room: 'P.201 - B3',
      teacher: 'TS. Trần Thế Anh',
      type: 'ngoai-ngu', // Green color
    },
    {
      day: 4,
      timeSlot: '13:00',
      title: 'LẬP TRÌNH JAVA (BT)',
      room: 'Lab 05',
      teacher: 'ThS. Ngô Thị Mai',
      type: 'thuc-hanh',
    },
    {
      day: 5,
      timeSlot: '09:00',
      title: 'MẠNG MÁY TÍNH',
      room: 'P.102 - A2',
      teacher: 'ThS. Đặng Hữu Việt',
      type: 'ly-thuyet',
    },
    {
      day: 5,
      timeSlot: '15:00',
      title: 'TIẾNG ANH CHUYÊN NGÀNH',
      room: 'P.404 - A1',
      teacher: 'Cô J. Smith',
      type: 'ngoai-ngu',
    },
    {
      day: 6,
      timeSlot: '07:00',
      title: 'LẬP TRÌNH JAVA',
      room: 'Lab 05',
      teacher: 'ThS. Ngô Thị Mai',
      type: 'thuc-hanh',
    }
  ];

  const toggleType = (type: keyof typeof visibleTypes) => {
    setVisibleTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getDayLabel = (dayNum: number) => {
    if (dayNum === 8) return 'CHỦ NHẬT';
    return `THỨ ${dayNum}`;
  };

  const getDayDate = (dayNum: number) => {
    // Hardcoded corresponding dates from Screenshot 4 (18 to 24)
    const dates: Record<number, string> = {
      2: '18',
      3: '19',
      4: '20',
      5: '21',
      6: '22',
      7: '23',
      8: '24'
    };
    return dates[dayNum];
  };

  const getTypeStyle = (type: TimetableSlot['type']) => {
    switch (type) {
      case 'ly-thuyet':
        return 'bg-blue-50/95 border-l-4 border-blue-500 text-blue-800 shadow-sm';
      case 'thuc-hanh':
        return 'bg-purple-50/95 border-l-4 border-purple-500 text-purple-800 shadow-sm';
      case 'ngoai-ngu':
        return 'bg-emerald-50/95 border-l-4 border-emerald-500 text-emerald-800 shadow-sm';
      case 'ky-nang':
        return 'bg-amber-50/95 border-l-4 border-amber-500 text-amber-800 shadow-sm';
    }
  };

  const timeSlots: TimetableSlot['timeSlot'][] = ['07:00', '09:00', '13:00', '15:00'];
  const dayNumbers = [2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100 self-start md:self-auto">
            <button className="p-1 hover:bg-white rounded-lg transition-all text-gray-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-700">{selectedWeek}</span>
            <button className="p-1 hover:bg-white rounded-lg transition-all text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-initial bg-gray-50 hover:bg-gray-100 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" /> Tháng
            </button>
            <button className="flex-1 md:flex-initial bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow">
              <Download className="w-4 h-4" /> Xuất PDF
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Grid Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500">
                <th className="px-4 py-5 text-center w-24">GIỜ</th>
                {dayNumbers.map(dayNum => (
                  <th key={dayNum} className={`px-4 py-4 border-l border-gray-100 text-center ${dayNum === 8 ? 'text-red-600 bg-red-50/10' : ''}`}>
                    <div className="text-[10px] uppercase font-bold text-gray-400">{getDayLabel(dayNum)}</div>
                    <div className="text-base font-extrabold text-gray-800 mt-1">{getDayDate(dayNum)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot} className="border-b border-gray-50 hover:bg-gray-50/10 transition-colors">
                  <td className="px-4 py-8 font-bold text-gray-500 text-center text-sm border-r border-gray-50 bg-gray-50/20">
                    {timeSlot}
                  </td>
                  {dayNumbers.map(dayNum => {
                    const slotData = slots.find(s => s.day === dayNum && s.timeSlot === timeSlot);
                    const isVisible = slotData && visibleTypes[slotData.type];

                    return (
                      <td key={dayNum} className="px-3 py-3 border-l border-gray-50 h-32 align-top w-40 relative">
                        {slotData && isVisible ? (
                          <div className={`p-3 rounded-xl h-full flex flex-col justify-between text-xs leading-relaxed transition-all hover:scale-[1.02] cursor-pointer border ${getTypeStyle(slotData.type)}`}>
                            <div>
                              <h4 className="font-extrabold uppercase text-[10px] tracking-wide mb-1 leading-snug">
                                {slotData.title}
                              </h4>
                              <p className="text-[10px] font-bold opacity-80 mt-1 flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                {slotData.room}
                              </p>
                            </div>
                            <p className="text-[10px] font-semibold opacity-75 mt-2 truncate">
                              {slotData.teacher}
                            </p>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Course notes filter */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-gray-400" /> Ghi chú môn học
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Ly thuyet */}
            <label className="flex items-center gap-3.5 p-3.5 bg-blue-50/30 border border-blue-100/50 rounded-xl cursor-pointer hover:bg-blue-50/50 transition-all">
              <input
                type="checkbox"
                checked={visibleTypes['ly-thuyet']}
                onChange={() => toggleType('ly-thuyet')}
                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span className="text-xs font-bold text-blue-900">Lý thuyết</span>
            </label>

            {/* Thuc hanh */}
            <label className="flex items-center gap-3.5 p-3.5 bg-purple-50/30 border border-purple-100/50 rounded-xl cursor-pointer hover:bg-purple-50/50 transition-all">
              <input
                type="checkbox"
                checked={visibleTypes['thuc-hanh']}
                onChange={() => toggleType('thuc-hanh')}
                className="w-4 h-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer accent-purple-600"
              />
              <span className="text-xs font-bold text-purple-900">Thực hành</span>
            </label>

            {/* Ngoai ngu */}
            <label className="flex items-center gap-3.5 p-3.5 bg-emerald-50/30 border border-emerald-100/50 rounded-xl cursor-pointer hover:bg-emerald-50/50 transition-all">
              <input
                type="checkbox"
                checked={visibleTypes['ngoai-ngu']}
                onChange={() => toggleType('ngoai-ngu')}
                className="w-4 h-4 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
              />
              <span className="text-xs font-bold text-emerald-900">Ngoại ngữ</span>
            </label>

            {/* Ky nang */}
            <label className="flex items-center gap-3.5 p-3.5 bg-amber-50/30 border border-amber-100/50 rounded-xl cursor-pointer hover:bg-amber-50/50 transition-all">
              <input
                type="checkbox"
                checked={visibleTypes['ky-nang']}
                onChange={() => toggleType('ky-nang')}
                className="w-4 h-4 rounded text-amber-600 border-gray-300 focus:ring-amber-500 cursor-pointer accent-amber-600"
              />
              <span className="text-xs font-bold text-amber-900">Kỹ năng</span>
            </label>
          </div>
        </div>

        {/* Weekly Stats Card */}
        <div className="bg-gradient-to-br from-red-800 to-red-950 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-200 mb-2">Thống kê tuần</h3>
            <p className="text-xl font-bold leading-tight">Tổng số tiết học tuần này: 24 tiết</p>
          </div>
          
          <div className="flex items-center justify-between mt-8 border-t border-red-700/50 pt-4">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-red-900 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                alt="student"
              />
              <img
                className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-red-900 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                alt="student"
              />
              <span className="flex items-center justify-center h-6.5 w-6.5 rounded-full bg-red-700 ring-2 ring-red-900 text-[9px] font-bold text-red-100">
                +12
              </span>
            </div>
            <button className="bg-white hover:bg-red-50 text-red-800 font-bold px-4 py-2 rounded-xl text-xs transition-all duration-300 shadow-sm active:scale-95">
              ĐANG THAM GIA
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
