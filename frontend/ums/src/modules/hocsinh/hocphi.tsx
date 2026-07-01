import { CreditCard, CheckCircle, Download, Info, AlertTriangle } from 'lucide-react';

interface PaymentTxn {
  semester: string;
  refCode: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending';
}

export default function HocPhi() {
  const transactions: PaymentTxn[] = [
    {
      semester: 'HK1 2024-2025',
      refCode: '#EDU-TXN-8821',
      amount: '5.000.000 đ',
      date: '12/09/2024',
      status: 'paid'
    },
    {
      semester: 'HK1 2024-2025',
      refCode: '#EDU-TXN-7742',
      amount: '7.000.000 đ',
      date: '10/08/2024',
      status: 'paid'
    },
    {
      semester: 'HK2 2023-2024',
      refCode: '#EDU-TXN-5510',
      amount: '3.420.000 đ',
      date: '15/05/2024',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Quản lý Học phí</h1>
          <p className="text-xs text-gray-500 mt-1 font-semibold">
            Theo dõi hóa đơn học phí và cổng nộp tiền trực tuyến sinh viên
          </p>
        </div>
      </div>

      {/* Summary Metrics & Upcoming Warning Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Total Metric Card */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tổng học phí</p>
            <p className="text-2xl font-black text-gray-800 mt-2">15.420.000 <span className="text-xs font-semibold text-gray-400">đ</span></p>
            <span className="inline-block bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-md text-[9px] font-bold mt-4 self-start">
              HỌC KỲ I - 2024
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Đã thanh toán</p>
            <p className="text-2xl font-black text-emerald-600 mt-2">12.000.000 <span className="text-xs font-semibold text-gray-400">đ</span></p>
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-[9px] font-bold mt-4 self-start">
              78% HOÀN TẤT
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Còn nợ</p>
            <p className="text-2xl font-black text-red-700 mt-2">3.420.000 <span className="text-xs font-semibold text-gray-400">đ</span></p>
            <span className="inline-block bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-md text-[9px] font-bold mt-4 self-start">
              CẦN THANH TOÁN
            </span>
          </div>
        </div>

        {/* Due Date Alert Card (1/4 width) */}
        <div className="lg:col-span-1 bg-gradient-to-br from-red-800 to-red-950 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-200">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>HẠN THANH TOÁN SẮP TỚI</span>
            </div>
            <p className="text-xl font-black mt-2 leading-tight">25 Tháng 10, 2024</p>
            <p className="text-[10px] text-red-100/75 leading-relaxed mt-1 font-semibold">
              Vui lòng hoàn tất trước hạn để tránh bị khóa đăng ký học phần học kỳ mới.
            </p>
          </div>
          <button className="bg-white hover:bg-red-50 text-red-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-all w-full text-center mt-5 shadow-sm active:scale-95">
            Thanh toán ngay
          </button>
        </div>
      </div>

      {/* Grid: Transaction History vs QR Quick Pay */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Transaction History table (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex justify-between items-center mb-2 border-b border-gray-50 pb-3">
            <h2 className="text-base font-bold text-gray-800">Lịch sử giao dịch</h2>
            <button className="text-[10px] font-bold text-red-700 hover:text-red-800">Lọc kết quả</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50/80 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-4 py-4">Học kỳ</th>
                  <th className="px-4 py-4">Mã tham chiếu</th>
                  <th className="px-4 py-4">Số tiền</th>
                  <th className="px-4 py-4">Ngày</th>
                  <th className="px-4 py-4">Trạng thái</th>
                  <th className="px-4 py-4 text-center">Hóa đơn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs md:text-sm font-semibold text-gray-700">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-gray-800 font-extrabold">{tx.semester}</td>
                    <td className="px-4 py-4 font-mono text-[11px] text-gray-400 font-bold">{tx.refCode}</td>
                    <td className="px-4 py-4 text-gray-800 font-black">{tx.amount}</td>
                    <td className="px-4 py-4 text-gray-500 font-medium">{tx.date}</td>
                    <td className="px-4 py-4">
                      {tx.status === 'paid' ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Đã đóng
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                          Đang xử lý
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100 text-gray-500 hover:text-gray-800 transition-all mx-auto block">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: QR Quick pay (1/3 width) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-red-700" /> Thanh toán nhanh qua QR
          </h3>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Sử dụng ứng dụng Ngân hàng hoặc Ví điện tử để quét mã và thanh toán tức thì.
          </p>

          {/* Stylized QR Mock Box */}
          <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 flex flex-col items-center gap-4 relative overflow-hidden group">
            {/* QR Mock graphic (beautiful layout with grid and outlines) */}
            <div className="w-40 h-40 bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm relative flex items-center justify-center">
              {/* Inner mockup QR blocks */}
              <div className="grid grid-cols-5 gap-2 w-full h-full opacity-70">
                <div className="border-4 border-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="border-4 border-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="border-2 border-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="border-4 border-slate-800 rounded-sm"></div>
                <div></div>
                <div className="bg-slate-800 rounded-sm"></div>
                <div></div>
                <div className="border-4 border-slate-800 rounded-sm"></div>
              </div>
              {/* Center logo overlay */}
              <div className="absolute p-1 bg-white rounded-md shadow-sm border border-gray-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-red-700 fill-red-50" />
              </div>
            </div>

            {/* Payment Details */}
            <div className="w-full text-center space-y-1.5 border-t border-gray-200/50 pt-3 text-xs font-bold">
              <div className="flex justify-between items-center px-1">
                <span className="text-gray-400 font-medium">Số tiền thanh toán:</span>
                <span className="text-red-700 text-sm font-black">3.420.000 đ</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-gray-400 font-medium">Nội dung:</span>
                <span className="text-gray-800 font-mono text-[10px]">HP HK1 2024 - SV20240012</span>
              </div>
            </div>

            {/* Payment channel tags */}
            <div className="flex items-center justify-center gap-3 pt-1 w-full border-t border-gray-100/50">
              <span className="text-[9px] font-black tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">Napas</span>
              <span className="text-[9px] font-black tracking-wider text-fuchsia-600 bg-fuchsia-50 px-2 py-0.5 rounded uppercase">Momo</span>
              <span className="text-[9px] font-black tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Vnpay</span>
            </div>
          </div>
          
          <p className="text-[9px] text-gray-400 italic text-center leading-normal">
            Hệ thống sẽ tự động cập nhật trạng thái trong 3-5 phút sau khi giao dịch thành công.
          </p>
        </div>

      </div>

      {/* Policies bottom banner */}
      <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl flex items-start gap-3.5">
        <Info className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
          <p className="font-bold text-gray-800">Quy định về học phí & Chính sách hoàn tiền:</p>
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium mt-1">
            Học phí được tính dựa trên số tín chỉ thực tế đăng ký trong học kỳ. Sinh viên có thể thanh toán một lần hoặc chia thành 02 đợt theo thông báo của Phòng Tài vụ. Các trường hợp xin gia hạn hoặc miễn giảm học phí cần nộp kèm chứng minh trước ngày 15 của tháng bắt đầu học kỳ. Vui lòng tham khảo chi tiết tại <strong className="text-red-700 underline cursor-pointer">Sổ tay sinh viên</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
