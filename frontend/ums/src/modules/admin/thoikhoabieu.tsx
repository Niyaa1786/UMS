import { useState } from 'react';
import {
  Calendar,
  Search,
  Plus,
  MapPin,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Edit3,
  Trash2,
  MoreVertical,
  BookOpen,
  School
} from 'lucide-react';

interface ScheduleCell {
  id: string;
  day: number;
  slot: number;
  classCode: string;
  className: string;
  room: string;
  teacher: string;
  color: string;
}

interface ConflictItem {
  room: string;
  time: string;
  desc: string;
}

const classColors = [
  'bg-red-50 border-red-100 text-red-800 hover:bg-red-100/60',
  'bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100/60',
  'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100/60',
  'bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100/60',
  'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100/60',
  'bg-sky-50 border-sky-100 text-sky-800 hover:bg-sky-100/60',
];

const dotColors: Record<string, string> = {
  'bg-red-50 border-red-100 text-red-800 hover:bg-red-100/60': 'bg-red-500',
  'bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100/60': 'bg-blue-500',
  'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100/60': 'bg-emerald-500',
  'bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100/60': 'bg-purple-500',
  'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100/60': 'bg-amber-500',
  'bg-sky-50 border-sky-100 text-sky-800 hover:bg-sky-100/60': 'bg-sky-500',
};

export default function TimetableManagement() {
  const [filterRoom, setFilterRoom] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('');
  const [selectedCell, setSelectedCell] = useState<ScheduleCell | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new schedule slot
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newDay, setNewDay] = useState(2);
  const [newSlot, setNewSlot] = useState(1);

  const handleAddSchedule = () => {
    if (!newClassName.trim() || !newClassCode.trim() || !newTeacher.trim() || !newRoom.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Check for room conflicts
    const conflict = scheduleData.find(s => s.day === newDay && s.slot === newSlot && s.room.toLowerCase() === newRoom.toLowerCase().trim());
    if (conflict) {
      alert(`Xung đột lịch học: Phòng ${newRoom} đã có lớp ${conflict.className} (${conflict.classCode}) vào Thứ ${newDay}, Ca ${newSlot}!`);
      return;
    }

    const newCell: ScheduleCell = {
      id: Math.random().toString(),
      day: newDay,
      slot: newSlot,
      classCode: newClassCode.trim().toUpperCase(),
      className: newClassName.trim(),
      room: newRoom.trim().toUpperCase(),
      teacher: newTeacher.trim(),
      color: classColors[scheduleData.length % classColors.length]
    };

    setScheduleData([...scheduleData, newCell]);
    setShowAddModal(false);

    // Reset Form
    setNewClassName('');
    setNewClassCode('');
    setNewTeacher('');
    setNewRoom('');
    setNewDay(2);
    setNewSlot(1);
  };

  const [scheduleData, setScheduleData] = useState<ScheduleCell[]>([
    { id: '1', day: 2, slot: 1, classCode: 'CNTT101-L01', className: 'Lập trình cơ bản', room: 'A101', teacher: 'TS. Nguyễn Văn A', color: classColors[0] },
    { id: '2', day: 2, slot: 3, classCode: 'CSDL201-L01', className: 'Cơ sở dữ liệu', room: 'A103', teacher: 'TS. Lê Văn C', color: classColors[1] },
    { id: '3', day: 3, slot: 1, classCode: 'TOAN101-L02', className: 'Giải tích 1', room: 'B201', teacher: 'TS. Phạm Thị D', color: classColors[2] },
    { id: '4', day: 3, slot: 2, classCode: 'CNTT203-L02', className: 'Cấu trúc dữ liệu', room: 'A202', teacher: 'ThS. Trần Thị B', color: classColors[3] },
    { id: '5', day: 4, slot: 1, classCode: 'CNTT101-L01', className: 'Lập trình cơ bản', room: 'A101', teacher: 'TS. Nguyễn Văn A', color: classColors[0] },
    { id: '6', day: 4, slot: 3, classCode: 'CSDL201-L01', className: 'Cơ sở dữ liệu', room: 'A103', teacher: 'TS. Lê Văn C', color: classColors[1] },
    { id: '7', day: 5, slot: 1, classCode: 'TOAN101-L02', className: 'Giải tích 1', room: 'B201', teacher: 'TS. Phạm Thị D', color: classColors[2] },
    { id: '8', day: 5, slot: 2, classCode: 'CNTT203-L02', className: 'Cấu trúc dữ liệu', room: 'A202', teacher: 'ThS. Trần Thị B', color: classColors[3] },
    { id: '9', day: 6, slot: 1, classCode: 'VALY101-L01', className: 'Vật lý đại cương', room: 'B101', teacher: 'TS. Hoàng Minh K', color: classColors[4] },
    { id: '10', day: 6, slot: 3, classCode: 'CNTT305-L01', className: 'Trí tuệ nhân tạo', room: 'C301', teacher: 'TS. Vũ Anh Tuấn', color: classColors[5] },
  ]);

  const days = [
    { label: 'Thứ 2', val: 2 }, { label: 'Thứ 3', val: 3 }, { label: 'Thứ 4', val: 4 },
    { label: 'Thứ 5', val: 5 }, { label: 'Thứ 6', val: 6 }, { label: 'Thứ 7', val: 7 }
  ];

  const slots = [
    { label: 'Ca 1', time: '07:30 – 09:15', val: 1 },
    { label: 'Ca 2', time: '09:30 – 11:15', val: 2 },
    { label: 'Ca 3', time: '13:00 – 14:45', val: 3 },
    { label: 'Ca 4', time: '15:00 – 16:45', val: 4 },
  ];

  const weekDates = [10, 11, 12, 13, 14, 15].map(d => d + weekOffset * 7);

  const getCellData = (day: number, slot: number) => {
    return scheduleData.find(d => {
      const matchDay = d.day === day && d.slot === slot;
      const matchRoom = !filterRoom || d.room.toLowerCase().includes(filterRoom.toLowerCase());
      const matchTeacher = !filterTeacher || d.teacher.toLowerCase().includes(filterTeacher.toLowerCase());
      return matchDay && matchRoom && matchTeacher;
    });
  };

  const handleDeleteCell = (id: string) => {
    setScheduleData(prev => prev.filter(c => c.id !== id));
    setSelectedCell(null);
  };

  const totalClasses = scheduleData.length;
  const totalRooms = new Set(scheduleData.map(d => d.room)).size;
  const totalTeachers = new Set(scheduleData.map(d => d.teacher)).size;
  const conflicts: ConflictItem[] = []; // none in this demo

  const isFiltered = filterRoom || filterTeacher;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Thời khóa biểu</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý và điều phối lịch học, lịch dạy, phân phòng học và xử lý xung đột lịch.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Sắp xếp lịch mới</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Tổng lớp học phần', value: totalClasses, icon: <BookOpen className="w-4 h-4 text-red-700" />, bg: 'bg-red-50' },
          { label: 'Phòng học sử dụng', value: totalRooms, icon: <School className="w-4 h-4 text-blue-700" />, bg: 'bg-blue-50' },
          { label: 'Giảng viên tham gia', value: totalTeachers, icon: <User className="w-4 h-4 text-emerald-700" />, bg: 'bg-emerald-50' },
          { label: 'Xung đột lịch', value: conflicts.length, icon: <AlertCircle className="w-4 h-4 text-amber-700" />, bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-gray-200 transition-all">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors mt-0.5">{stat.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Main Timetable Grid */}
        <div className="xl:col-span-9 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">

          {/* Grid toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekOffset(w => w - 1)}
                className="p-1.5 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-black text-gray-800 px-2">
                Tuần {weekOffset === 0 ? 'hiện tại' : weekOffset > 0 ? `+${weekOffset}` : weekOffset} (10 – 15 tháng 06)
              </span>
              <button
                onClick={() => setWeekOffset(w => w + 1)}
                className="p-1.5 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  value={filterRoom}
                  onChange={e => setFilterRoom(e.target.value)}
                  placeholder="Lọc phòng..."
                  className="bg-gray-50 border border-gray-100 pl-7 pr-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-red-300 w-28 transition-all"
                />
                <MapPin className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {filterRoom && <button onClick={() => setFilterRoom('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={filterTeacher}
                  onChange={e => setFilterTeacher(e.target.value)}
                  placeholder="Lọc giảng viên..."
                  className="bg-gray-50 border border-gray-100 pl-7 pr-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-red-300 w-36 transition-all"
                />
                <User className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {filterTeacher && <button onClick={() => setFilterTeacher('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>}
              </div>
              {isFiltered && (
                <button
                  onClick={() => { setFilterRoom(''); setFilterTeacher(''); }}
                  className="flex items-center gap-1 text-[10px] font-black text-red-700 hover:text-red-900 bg-red-50 border border-red-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                >
                  <Filter className="w-3 h-3" /> Xóa lọc
                </button>
              )}
            </div>
          </div>

          {/* Timetable matrix */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px] border border-gray-100 rounded-xl overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-7 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <div className="py-3 px-3 border-r border-gray-100 text-center">Tiết học</div>
                {days.map((day, idx) => (
                  <div key={day.val} className={`py-3 text-center border-r last:border-r-0 border-gray-100 ${idx === 0 ? 'text-red-700' : ''}`}>
                    <p>{day.label}</p>
                    <p className={`text-[9px] font-semibold mt-0.5 ${idx === 0 ? 'text-red-500' : 'text-gray-300'}`}>{weekDates[idx]}/06</p>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {slots.map((slot) => (
                <div key={slot.val} className="grid grid-cols-7 border-b last:border-b-0 border-gray-100 items-stretch min-h-[100px]">
                  {/* Slot label */}
                  <div className="py-3 px-2 bg-gray-50/60 border-r border-gray-100 flex flex-col justify-center items-center text-center shrink-0">
                    <p className="text-[10px] font-black text-gray-800">{slot.label}</p>
                    <p className="text-[8px] text-gray-400 font-semibold mt-0.5 leading-tight">{slot.time}</p>
                  </div>

                  {/* Day cells */}
                  {days.map((day) => {
                    const data = getCellData(day.val, slot.val);
                    const isSelected = selectedCell?.id === data?.id;
                    return (
                      <div
                        key={day.val}
                        className="p-1.5 border-r last:border-r-0 border-gray-100 flex items-stretch"
                        onClick={() => { if (!data) setShowAddModal(true); }}
                      >
                        {data ? (
                          <div
                            className={`w-full h-full p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${data.color} ${isSelected ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedCell(isSelected ? null : data); }}
                          >
                            <div>
                              <p className="text-[9px] font-black leading-tight line-clamp-2">{data.className}</p>
                              <p className="text-[8px] font-extrabold uppercase opacity-60 mt-0.5">{data.classCode}</p>
                            </div>
                            <div className="space-y-0.5 pt-1 border-t border-current/10 mt-1">
                              <p className="text-[8px] font-bold flex items-center gap-0.5 opacity-70 truncate">
                                <User className="w-2.5 h-2.5 shrink-0" /><span className="truncate">{data.teacher.replace('TS. ', '').replace('ThS. ', '')}</span>
                              </p>
                              <p className="text-[8px] font-bold flex items-center gap-0.5 opacity-70">
                                <MapPin className="w-2.5 h-2.5 shrink-0" />Phòng {data.room}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center cursor-pointer group/empty min-h-[80px]">
                            <span className="text-[8px] text-gray-300 group-hover/empty:text-gray-400 font-bold tracking-wider uppercase transition-colors">+ Thêm</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-50">
            {scheduleData
              .filter((v, i, arr) => arr.findIndex(a => a.color === v.color) === i)
              .map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColors[item.color] ?? 'bg-gray-400'}`} />
                  {item.classCode}
                </div>
              ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="xl:col-span-3 space-y-4">

          {/* Selected cell detail */}
          {selectedCell ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900">Chi tiết lịch học</h3>
                <button onClick={() => setSelectedCell(null)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className={`p-3 rounded-xl border ${selectedCell.color} space-y-2`}>
                <p className="text-xs font-black">{selectedCell.className}</p>
                <p className="text-[10px] font-extrabold uppercase opacity-60">{selectedCell.classCode}</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { icon: <User className="w-3.5 h-3.5 text-gray-400" />, label: 'Giảng viên', val: selectedCell.teacher },
                  { icon: <MapPin className="w-3.5 h-3.5 text-gray-400" />, label: 'Phòng học', val: `Phòng ${selectedCell.room}` },
                  { icon: <Calendar className="w-3.5 h-3.5 text-gray-400" />, label: 'Thứ', val: `Thứ ${selectedCell.day}` },
                  { icon: <Clock className="w-3.5 h-3.5 text-gray-400" />, label: 'Ca học', val: slots[selectedCell.slot - 1]?.label + ` (${slots[selectedCell.slot - 1]?.time})` },
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">{info.label}</p>
                      <p className="text-xs font-bold text-gray-700">{info.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-colors cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" /> Sửa
                </button>
                <button
                  onClick={() => handleDeleteCell(selectedCell.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide">Trạng thái xung đột</h3>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-emerald-800">Không có xung đột</h4>
                  <p className="text-[10px] text-emerald-600/80 font-medium leading-relaxed mt-0.5">
                    Tất cả phòng học, giảng đường và giảng viên đã được bố trí an toàn, không trùng lắp.
                  </p>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 font-semibold leading-relaxed">
                💡 Click vào ô lịch trên bảng để xem chi tiết và chỉnh sửa. Click ô trống để thêm lịch mới.
              </p>
            </div>
          )}

          {/* Room utilization */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide">Tình trạng phòng học</h3>
            <div className="space-y-2.5">
              {['A101', 'A103', 'A202', 'B101', 'B201', 'C301'].map((room) => {
                const count = scheduleData.filter(d => d.room === room).length;
                const maxSlots = 24;
                const pct = Math.round((count / maxSlots) * 100);
                return (
                  <div key={room} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>Phòng {room}</span>
                      </div>
                      <span className="text-gray-900">{count}/{24} tiết</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick notice */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2.5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              Lưu ý vận hành
            </h3>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              Đăng ký phòng máy thực hành phải được duyệt trước <strong>thứ Năm</strong> hàng tuần để phòng Vật tư kịp mở thiết bị phục vụ lớp học.
            </p>
          </div>
        </div>
      </div>

      {/* Add schedule modal (simple) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-5 w-full max-w-md z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-gray-900">Thêm lịch học mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Tên lớp học phần *</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="VD: Lập trình nâng cao"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-450 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Mã lớp *</label>
                <input
                  type="text"
                  required
                  value={newClassCode}
                  onChange={(e) => setNewClassCode(e.target.value)}
                  placeholder="VD: CNTT303-L01"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-455 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Giảng viên *</label>
                <input
                  type="text"
                  required
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  placeholder="VD: TS. Nguyễn Văn A"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-460 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Phòng học *</label>
                <input
                  type="text"
                  required
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  placeholder="VD: A101"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-465 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Thứ</label>
                <select 
                  value={newDay}
                  onChange={(e) => setNewDay(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
                >
                  {days.map(d => <option key={d.val} value={d.val}>{d.label}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Ca học</label>
                <select 
                  value={newSlot}
                  onChange={(e) => setNewSlot(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
                >
                  {slots.map(s => <option key={s.val} value={s.val}>{s.label} ({s.time})</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-800 hover:bg-red-900 transition-colors shadow-sm cursor-pointer"
              >
                Thêm lịch học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
