import { useState } from 'react';
import { Bell, Calendar, DollarSign, BookOpen, Settings, User, CheckCheck, ChevronDown } from 'lucide-react';

interface NotificationCard {
  id: string;
  title: string;
  category: 'hoc-tap' | 'hoc-phi' | 'he-thong' | 'ca-nhan';
  sender: string;
  content: string;
  time: string;
  isRead: boolean;
}

export default function ThongBao() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hoc-tap' | 'hoc-phi' | 'he-thong'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const notificationsList: NotificationCard[] = [
    {
      id: 'NT-1',
      title: 'Thông báo dời lịch thi môn Lập trình Web',
      category: 'hoc-tap',
      sender: 'Phòng Đào tạo',
      content: 'Lịch thi cuối kỳ môn Lập trình Web (COMP301) đã được thay đổi từ ngày 20/12 sang ngày 22/12/2023 tại phòng 402-A1. Sinh viên lưu ý theo dõi.',
      time: '10 phút trước',
      isRead: false
    },
    {
      id: 'NT-2',
      title: 'Nhắc nhở hoàn tất học phí Học kỳ 2',
      category: 'hoc-phi',
      sender: 'Phòng Kế hoạch Tài chính',
      content: 'Hạn cuối nộp học phí HK2 là ngày 15/12/2023. Vui lòng thanh toán qua cổng thông tin hoặc chuyển khoản ngân hàng để không ảnh hưởng đến kết quả đăng ký môn học.',
      time: '2 giờ trước',
      isRead: false
    },
    {
      id: 'NT-3',
      title: 'Bảo trì hệ thống EduManager định kỳ',
      category: 'he-thong',
      sender: 'Admin Hệ thống',
      content: 'Hệ thống sẽ tạm ngưng hoạt động từ 00:00 đến 04:00 ngày 10/12 để nâng cấp hạ tầng. Rất xin lỗi vì sự bất tiện này.',
      time: 'Hôm qua',
      isRead: true
    },
    {
      id: 'NT-4',
      title: 'Kết quả xét duyệt học bổng Khuyến khích',
      category: 'ca-nhan',
      sender: 'Hội đồng Học bổng',
      content: 'Chúc mừng bạn đã đạt học bổng khuyến khích loại Giỏi cho HK1 vừa qua. Vui lòng kiểm tra chi tiết trong hồ sơ sinh viên cá nhân.',
      time: 'Hôm qua',
      isRead: false
    }
  ];

  const getBadgeStyle = (category: NotificationCard['category']) => {
    switch (category) {
      case 'hoc-tap':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'hoc-phi':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'he-thong':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'ca-nhan':
        return 'bg-red-50 text-red-700 border-red-100/50';
    }
  };

  const getBadgeName = (category: NotificationCard['category']) => {
    switch (category) {
      case 'hoc-tap':
        return 'HỌC TẬP';
      case 'hoc-phi':
        return 'HỌC PHÍ';
      case 'he-thong':
        return 'HỆ THỐNG';
      case 'ca-nhan':
        return 'CÁ NHÂN';
    }
  };

  const getCategoryIcon = (category: NotificationCard['category']) => {
    switch (category) {
      case 'hoc-tap':
        return <BookOpen className="w-4.5 h-4.5 text-blue-700" />;
      case 'hoc-phi':
        return <DollarSign className="w-4.5 h-4.5 text-emerald-700" />;
      case 'he-thong':
        return <Settings className="w-4.5 h-4.5 text-purple-700" />;
      case 'ca-nhan':
        return <User className="w-4.5 h-4.5 text-red-700" />;
    }
  };

  const counts = {
    all: 24,
    'hoc-tap': 12,
    'hoc-phi': 2,
    'he-thong': 10
  };

  const filteredNotifs = notificationsList.filter((n) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'hoc-tap') return n.category === 'hoc-tap';
    if (activeCategory === 'hoc-phi') return n.category === 'hoc-phi';
    if (activeCategory === 'he-thong') return n.category === 'he-thong';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Read Mark action */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Thông báo</h1>
          <p className="text-xs text-gray-500 mt-1 font-semibold">
            Cập nhật những thông tin mới nhất từ nhà trường và giảng viên.
          </p>
        </div>
        <button className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm">
          <CheckCheck className="w-4 h-4" /> Đánh dấu tất cả đã đọc
        </button>
      </div>

      {/* Top Category Summary Filter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All */}
        <button
          onClick={() => setActiveCategory('all')}
          className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-start group shadow-sm hover:scale-[1.01] ${
            activeCategory === 'all'
              ? 'bg-red-700 border-red-700 text-white'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${activeCategory === 'all' ? 'text-red-200' : 'text-gray-400'}`}>Tất cả</p>
            <p className="text-2xl font-black mt-2">{counts.all}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${activeCategory === 'all' ? 'bg-white/10 text-white' : 'bg-red-50 text-red-700'}`}>
            <Bell className="w-5 h-5" />
          </div>
        </button>

        {/* Học tập */}
        <button
          onClick={() => setActiveCategory('hoc-tap')}
          className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-start group shadow-sm hover:scale-[1.01] ${
            activeCategory === 'hoc-tap'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${activeCategory === 'hoc-tap' ? 'text-blue-200' : 'text-gray-400'}`}>Học tập</p>
            <p className="text-2xl font-black mt-2">{counts['hoc-tap']}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${activeCategory === 'hoc-tap' ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
        </button>

        {/* Học phí */}
        <button
          onClick={() => setActiveCategory('hoc-phi')}
          className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-start group shadow-sm hover:scale-[1.01] ${
            activeCategory === 'hoc-phi'
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${activeCategory === 'hoc-phi' ? 'text-emerald-200' : 'text-gray-400'}`}>Học phí</p>
            <p className="text-2xl font-black mt-2">{counts['hoc-phi']}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${activeCategory === 'hoc-phi' ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
            <DollarSign className="w-5 h-5" />
          </div>
        </button>

        {/* Hệ thống */}
        <button
          onClick={() => setActiveCategory('he-thong')}
          className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-start group shadow-sm hover:scale-[1.01] ${
            activeCategory === 'he-thong'
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${activeCategory === 'he-thong' ? 'text-purple-200' : 'text-gray-400'}`}>Hệ thống</p>
            <p className="text-2xl font-black mt-2">{counts['he-thong']}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${activeCategory === 'he-thong' ? 'bg-white/10 text-white' : 'bg-purple-50 text-purple-700'}`}>
            <Settings className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Notifications Detailed List Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-5 space-y-4">
        <div className="flex justify-between items-center mb-2 border-b border-gray-50 pb-3">
          <h2 className="text-base font-bold text-gray-800">Danh sách chi tiết</h2>
          <span className="text-[10px] font-bold text-gray-400">Mới nhất</span>
        </div>

        <div className="space-y-4">
          {filteredNotifs.map((notif) => {
            const isExpanded = expandedId === notif.id;
            return (
              <div
                key={notif.id}
                onClick={() => setExpandedId(isExpanded ? null : notif.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-red-700/50 bg-red-50/5 shadow-sm'
                    : 'border-gray-100 hover:border-gray-150 hover:bg-gray-50/20'
                } ${!notif.isRead ? 'border-l-4 border-l-red-700' : ''}`}
              >
                {/* Category Icon */}
                <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl shrink-0">
                  {getCategoryIcon(notif.category)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 border rounded-md text-[9px] font-bold ${getBadgeStyle(notif.category)}`}>
                      {getBadgeName(notif.category)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      {notif.sender}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium ml-auto sm:ml-0">{notif.time}</span>
                  </div>

                  <h3 className="font-extrabold text-gray-800 text-sm md:text-base leading-snug">
                    {notif.title}
                  </h3>

                  <p className={`text-xs text-gray-500 font-semibold leading-relaxed ${isExpanded ? 'hidden' : 'line-clamp-2'}`}>
                    {notif.content.slice(0, 120)}...
                  </p>

                  {isExpanded && (
                    <p className="text-xs text-gray-600 leading-relaxed font-medium pt-2 border-t border-gray-50/80">
                      {notif.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-800 pt-3 border-t border-gray-50 flex items-center justify-center gap-1">
          Xem các thông báo cũ hơn <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
