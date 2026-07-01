import { useState } from 'react';
import { MoreVertical, BookOpen, FileText, Video, Calendar, Plus, Lightbulb } from 'lucide-react';

export default function KhoaHoc() {
  const [activeTab, setActiveTab] = useState<'dang-hoc' | 'da-hoan-thanh' | 'luu-tru'>('dang-hoc');

  const courses = {
    'dang-hoc': [
      {
        id: 'IT4442',
        title: 'Lập trình Web nâng cao',
        teacher: 'TS. Lê Văn Hiếu',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
        progress: 75,
        color: 'bg-red-500/10 text-red-700 border-red-500/20',
        badgeColor: 'bg-red-500',
        students: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
        ]
      },
      {
        id: 'IT3011',
        title: 'Cơ sở dữ liệu',
        teacher: 'ThS. Đỗ Thị Lan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
        progress: 42,
        color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
        badgeColor: 'bg-blue-500',
        students: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'
        ]
      },
      {
        id: 'IT2120',
        title: 'Kiến trúc máy tính',
        teacher: 'TS. Trần Quang Vũ',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
        progress: 15,
        color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
        badgeColor: 'bg-emerald-500',
        students: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
        ]
      }
    ],
    'da-hoan-thanh': [
      {
        id: 'MAT101',
        title: 'Giải tích 1',
        teacher: 'ThS. Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
        progress: 100,
        color: 'bg-gray-500/10 text-gray-700 border-gray-500/20',
        badgeColor: 'bg-gray-500',
        students: []
      }
    ],
    'luu-tru': []
  };

  const currentCourses = courses[activeTab] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Left Columns: Courses Grid */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header and Tabs */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
              <p className="text-sm text-gray-500 mt-1">
                Bạn đang có <span className="font-bold text-red-700">{courses['dang-hoc'].length}</span> khóa học trong học kỳ này
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('dang-hoc')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'dang-hoc'
                    ? 'bg-white text-red-700 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Đang học
              </button>
              <button
                onClick={() => setActiveTab('da-hoan-thanh')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'da-hoan-thanh'
                    ? 'bg-white text-red-700 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Đã hoàn thành
              </button>
              <button
                onClick={() => setActiveTab('luu-tru')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'luu-tru'
                    ? 'bg-white text-red-700 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Lưu trữ
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Course Card Top Indicator */}
                <div className={`h-1.5 ${course.badgeColor}`}></div>
                
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${course.color}`}>
                      {course.id}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-50 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg hover:text-red-700 cursor-pointer transition-colors leading-tight">
                    {course.title}
                  </h3>

                  {/* Teacher Info */}
                  <div className="flex items-center gap-2.5 mt-4">
                    <img
                      src={course.avatar}
                      alt={course.teacher}
                      className="w-8 h-8 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Giảng viên</p>
                      <p className="text-xs font-bold text-gray-700">{course.teacher}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                      <span>Tiến độ hoàn thành</span>
                      <span className="text-gray-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${course.badgeColor}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="bg-gray-50/50 border-t border-gray-50 px-5 py-4 flex items-center justify-between mt-auto">
                  {/* Students Avatars overlapping */}
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {course.students.map((stUrl, i) => (
                      <img
                        key={i}
                        className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
                        src={stUrl}
                        alt="student avatar"
                      />
                    ))}
                    {course.students.length > 0 && (
                      <span className="flex items-center justify-center h-6.5 w-6.5 rounded-full bg-gray-100 ring-2 ring-white text-[10px] font-bold text-gray-600">
                        +{course.students.length + 12}
                      </span>
                    )}
                  </div>

                  <button className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98]">
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Không tìm thấy khóa học nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: News, Deadlines & Tips */}
      <div className="space-y-6">
        {/* Tài liệu mới */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">Tài liệu mới</h2>
            <button className="text-[11px] font-bold text-red-700 hover:text-red-800">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            {/* Lab Doc */}
            <div className="flex gap-3.5 p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="p-2.5 bg-red-50 text-red-700 rounded-xl self-start">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-800 leading-tight">
                  Lab 04: React Hooks & State
                </h4>
                <p className="text-[10px] text-gray-500 font-medium">
                  Lập trình Web • 2 giờ trước
                </p>
              </div>
            </div>

            {/* Slide Doc */}
            <div className="flex gap-3.5 p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl self-start">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-800 leading-tight">
                  Slide Chapter 5: SQL Advance
                </h4>
                <p className="text-[10px] text-gray-500 font-medium">
                  Cơ sở dữ liệu • Hôm qua
                </p>
              </div>
            </div>

            {/* Video Lecture */}
            <div className="flex gap-3.5 p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl self-start">
                <Video className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-800 leading-tight">
                  Video Lecture: CPU Cache
                </h4>
                <p className="text-[10px] text-gray-500 font-medium">
                  Kiến trúc máy tính • 2 ngày trước
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hạn nộp bài tập */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">Hạn nộp bài tập</h2>
            <div className="p-1.5 bg-red-50 text-red-700 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-3">
            {/* Assignment 1 */}
            <div className="p-3 border-l-2 border-red-600 bg-red-50/20 rounded-r-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-red-700">Hôm nay, 23:59</span>
              </div>
              <h4 className="text-xs font-bold text-gray-800">
                Bài tập lớn số 1: Xây dựng Landing Page
              </h4>
              <p className="text-[10px] text-gray-500">Môn: Lập trình Web</p>
            </div>

            {/* Assignment 2 */}
            <div className="p-3 border-l-2 border-amber-500 bg-amber-50/10 rounded-r-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-amber-700">Thứ 6, 15/10</span>
              </div>
              <h4 className="text-xs font-bold text-gray-800">
                Assignment 2: Entity Relationship
              </h4>
              <p className="text-[10px] text-gray-500">Môn: Cơ sở dữ liệu</p>
            </div>

            {/* Assignment 3 */}
            <div className="p-3 border-l-2 border-gray-400 bg-gray-50 rounded-r-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-600">Thứ 2, 18/10</span>
              </div>
              <h4 className="text-xs font-bold text-gray-800">
                Project Phase 1: Architecture Design
              </h4>
              <p className="text-[10px] text-gray-500">Môn: Kiến trúc máy tính</p>
            </div>
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-1.5 border border-dashed border-red-300 hover:border-red-600 text-red-700 font-bold py-2.5 rounded-xl text-xs bg-red-50/20 hover:bg-red-50/50 transition-all duration-300">
            <Plus className="w-3.5 h-3.5" /> Thêm nhắc nhở
          </button>
        </div>

        {/* Tip Học Tập */}
        <div className="bg-gradient-to-br from-red-800 to-red-900 text-white p-5 rounded-2xl shadow-md space-y-3 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Lightbulb className="w-24 h-24" />
          </div>
          <h3 className="font-bold flex items-center gap-1.5 text-sm uppercase tracking-wider text-red-200">
            <Lightbulb className="w-4 h-4 text-amber-300 fill-amber-300" /> Mẹo học tập
          </h3>
          <p className="text-xs text-red-100 leading-relaxed font-medium">
            Bạn thường hoàn thành bài tập tốt nhất vào buổi sáng. Hãy thử học chương 5 Cơ sở dữ liệu vào sáng mai nhé!
          </p>
        </div>
      </div>
    </div>
  );
}
