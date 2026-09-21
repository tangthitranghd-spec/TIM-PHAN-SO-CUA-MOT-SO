import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // MỨC 1: KHỞI ĐỘNG - NHẬN BIẾT & THÔNG HIỂU (CÂU 1 - 5)
  // ==========================================
  {
    id: 1,
    level: 1,
    levelTitle: 'Mức 1: Khởi động - Nhận biết',
    type: 'fill_blank',
    title: 'Quy tắc cơ bản',
    scenarioContext: 'Quy tắc vàng SGK Toán 4',
    prompt: 'Muốn tìm 3/5 của số 15, ta làm phép tính nào dưới đây vào chỗ trống?',
    fractionNumerator: 3,
    fractionDenominator: 5,
    baseNumber: 15,
    options: ['15 + 3/5', '15 - 3/5', '15 × 3/5', '15 : 3/5'],
    correctAnswer: '15 × 3/5',
    explanation: 'Quy tắc SGK Toán 4: Muốn tìm phân số của một số, ta lấy số đó nhân với phân số. Do đó muốn tìm 3/5 của 15, ta tính: 15 × 3/5 = (15 × 3) : 5 = 9.',
    hint: 'Ghi nhớ quy tắc: Lấy số đó NHÂN với phân số nhé!',
    visualModel: {
      totalValue: 15,
      totalParts: 5,
      selectedParts: 3,
      unitLabel: 'đơn vị'
    }
  },
  {
    id: 2,
    level: 1,
    levelTitle: 'Mức 1: Khởi động - Nhận biết',
    type: 'multiple_choice',
    title: 'Tìm số cái kẹo',
    scenarioContext: 'Hộp kẹo ngọt ngào',
    prompt: 'Tìm 2/3 của 18 cái kẹo. Số kẹo tìm được là:',
    fractionNumerator: 2,
    fractionDenominator: 3,
    baseNumber: 18,
    unit: 'cái kẹo',
    options: ['6 cái kẹo', '12 cái kẹo', '9 cái kẹo', '15 cái kẹo'],
    correctAnswer: '12 cái kẹo',
    acceptableAnswers: ['12', '12 cái kẹo', '12 cái'],
    explanation: 'Cách tính: 18 × 2/3 = (18 × 2) : 3 = 36 : 3 = 12 (cái kẹo). Hoặc ta có thể lấy 18 chia cho 3 rồi nhân với 2 (18 : 3 × 2 = 6 × 2 = 12).',
    hint: 'Lấy 18 nhân với tử số (2) rồi chia cho mẫu số (3).',
    visualModel: {
      totalValue: 18,
      totalParts: 3,
      selectedParts: 2,
      unitLabel: 'cái kẹo'
    }
  },
  {
    id: 3,
    level: 1,
    levelTitle: 'Mức 1: Khởi động - Nhận biết',
    type: 'true_false',
    title: 'Kiểm tra khẳng định',
    scenarioContext: 'Bao bột mì',
    prompt: 'Khẳng định sau ĐÚNG hay SAI: "1/4 của 24 kg là 6 kg."',
    fractionNumerator: 1,
    fractionDenominator: 4,
    baseNumber: 24,
    unit: 'kg',
    correctAnswer: 'Đúng',
    acceptableAnswers: ['Đúng', 'đúng', 'true', 'dung', 'ĐÚNG'],
    explanation: 'Đúng! Vì 24 × 1/4 = 24 : 4 = 6 (kg). Do đó 1/4 của 24 kg đúng bằng 6 kg.',
    hint: 'Thử tính 24 : 4 xem có bằng 6 không nhé!',
    visualModel: {
      totalValue: 24,
      totalParts: 4,
      selectedParts: 1,
      unitLabel: 'kg'
    }
  },
  {
    id: 4,
    level: 1,
    levelTitle: 'Mức 1: Khởi động - Thông hiểu',
    type: 'short_answer',
    title: 'Đoạn dây may mặc',
    scenarioContext: 'Cuộn vải may áo',
    prompt: 'Tìm 3/4 của 28 m vải. Kết quả là bao nhiêu mét? (Em hãy điền số thích hợp)',
    fractionNumerator: 3,
    fractionDenominator: 4,
    baseNumber: 28,
    unit: 'm',
    correctAnswer: '21',
    acceptableAnswers: ['21', '21m', '21 m', '21 mét'],
    explanation: 'Cách giải: Ta lấy 28 × 3/4 = (28 : 4) × 3 = 7 × 3 = 21 (m). Vậy 3/4 của 28 m là 21 m.',
    hint: 'Lấy 28 chia cho 4, sau đó nhân với 3.',
    visualModel: {
      totalValue: 28,
      totalParts: 4,
      selectedParts: 3,
      unitLabel: 'm vải'
    }
  },
  {
    id: 5,
    level: 1,
    levelTitle: 'Mức 1: Khởi động - Thông hiểu',
    type: 'multiple_choice',
    title: 'Rổ cam tươi ngon',
    scenarioContext: 'Bếp của mẹ',
    prompt: 'Một rổ có 20 quả cam. Mẹ lấy ra 2/5 số cam trong rổ để vắt nước ép. Hỏi mẹ đã lấy ra bao nhiêu quả cam?',
    fractionNumerator: 2,
    fractionDenominator: 5,
    baseNumber: 20,
    unit: 'quả cam',
    options: ['4 quả cam', '8 quả cam', '10 quả cam', '12 quả cam'],
    correctAnswer: '8 quả cam',
    acceptableAnswers: ['8', '8 quả', '8 quả cam'],
    explanation: 'Mẹ đã lấy ra số quả cam là: 20 × 2/5 = (20 : 5) × 2 = 4 × 2 = 8 (quả cam). Đáp số: 8 quả cam.',
    hint: 'Tìm 2/5 của 20 bằng cách lấy 20 nhân với 2/5.',
    visualModel: {
      totalValue: 20,
      totalParts: 5,
      selectedParts: 2,
      unitLabel: 'quả cam'
    }
  },

  // ==========================================
  // MỨC 2: VƯỢT CHƯỚNG NGẠI VẬT - VẬN DỤNG THỰC TẾ (CÂU 6 - 10)
  // ==========================================
  {
    id: 6,
    level: 2,
    levelTitle: 'Mức 2: Vượt chướng ngại vật - Vận dụng',
    type: 'multiple_choice',
    title: 'Học sinh lớp 4A',
    scenarioContext: 'Lớp học thân yêu',
    prompt: 'Lớp 4A có 35 học sinh, trong đó 3/7 số học sinh là học sinh nam. Hỏi lớp 4A có bao nhiêu học sinh nam?',
    fractionNumerator: 3,
    fractionDenominator: 7,
    baseNumber: 35,
    unit: 'học sinh',
    options: ['12 học sinh', '15 học sinh', '20 học sinh', '21 học sinh'],
    correctAnswer: '15 học sinh',
    acceptableAnswers: ['15', '15 học sinh', '15 bạn'],
    explanation: 'Số học sinh nam của lớp 4A là: 35 × 3/7 = (35 : 7) × 3 = 5 × 3 = 15 (học sinh).',
    hint: 'Số học sinh nam = Tổng số học sinh cả lớp nhân với 3/7.',
    visualModel: {
      totalValue: 35,
      totalParts: 7,
      selectedParts: 3,
      unitLabel: 'học sinh'
    }
  },
  {
    id: 7,
    level: 2,
    levelTitle: 'Mức 2: Vượt chướng ngại vật - Vận dụng',
    type: 'short_answer',
    title: 'Thùng mật ong hoa nhãn',
    scenarioContext: 'Trang trại ong mật',
    prompt: 'Một thùng có chứa 40 lít mật ong. Bác thợ lấy ra 5/8 số mật ong đó đem đóng chai. Bác thợ đã lấy ra bao nhiêu lít mật ong? (Điền số lít)',
    fractionNumerator: 5,
    fractionDenominator: 8,
    baseNumber: 40,
    unit: 'lít',
    correctAnswer: '25',
    acceptableAnswers: ['25', '25 lít', '25l', '25 l'],
    explanation: 'Số lít mật ong bác thợ đã lấy ra là: 40 × 5/8 = (40 : 8) × 5 = 5 × 5 = 25 (lít mật ong).',
    hint: 'Lấy 40 chia cho 8 rồi nhân với 5.',
    visualModel: {
      totalValue: 40,
      totalParts: 8,
      selectedParts: 5,
      unitLabel: 'lít mật ong'
    }
  },
  {
    id: 8,
    level: 2,
    levelTitle: 'Mức 2: Vượt chướng ngại vật - Vận dụng',
    type: 'true_false',
    title: 'Đổi đơn vị thời gian',
    scenarioContext: 'Đồng hồ quả lắc',
    prompt: 'Bạn Nam nói: "2/5 của 1 giờ bằng 24 phút". Khẳng định của bạn Nam là ĐÚNG hay SAI?',
    fractionNumerator: 2,
    fractionDenominator: 5,
    baseNumber: 60,
    unit: 'phút',
    correctAnswer: 'Đúng',
    acceptableAnswers: ['Đúng', 'đúng', 'true', 'dung', 'ĐÚNG'],
    explanation: 'Đúng! Ta đổi 1 giờ = 60 phút. Sau đó tìm 2/5 của 60 phút: 60 × 2/5 = (60 : 5) × 2 = 12 × 2 = 24 (phút). Bạn Nam nói hoàn toàn chính xác!',
    hint: 'Đổi 1 giờ thành 60 phút trước rồi mới tìm 2/5 của 60 nhé!',
    visualModel: {
      totalValue: 60,
      totalParts: 5,
      selectedParts: 2,
      unitLabel: 'phút'
    }
  },
  {
    id: 9,
    level: 2,
    levelTitle: 'Mức 2: Vượt chướng ngại vật - Vận dụng',
    type: 'multiple_choice',
    title: 'Khu vườn hoa hồng',
    scenarioContext: 'Mảnh vườn thực nghiệm',
    prompt: 'Một mảnh vườn hình chữ nhật có chiều dài là 45 m. Chiều rộng bằng 2/3 chiều dài. Tính chiều rộng của mảnh vườn đó.',
    fractionNumerator: 2,
    fractionDenominator: 3,
    baseNumber: 45,
    unit: 'm',
    options: ['15 m', '30 m', '25 m', '35 m'],
    correctAnswer: '30 m',
    acceptableAnswers: ['30', '30m', '30 m', '30 mét'],
    explanation: 'Chiều rộng mảnh vườn là: 45 × 2/3 = (45 : 3) × 2 = 15 × 2 = 30 (m).',
    hint: 'Chiều rộng bằng 2/3 của chiều dài (45 m). Lấy 45 nhân với 2/3.',
    visualModel: {
      totalValue: 45,
      totalParts: 3,
      selectedParts: 2,
      unitLabel: 'm'
    }
  },
  {
    id: 10,
    level: 2,
    levelTitle: 'Mức 2: Vượt chướng ngại vật - Vận dụng',
    type: 'multiple_choice',
    title: 'Tiết kiệm mua sách',
    scenarioContext: 'Nuôi heo đất tiết kiệm',
    prompt: 'Bình có 60 000 đồng tiền tiết kiệm. Bình đã dùng 3/4 số tiền đó để mua bộ sách "Khám phá khoa học". Hỏi Bình đã dùng bao nhiêu tiền mua sách?',
    fractionNumerator: 3,
    fractionDenominator: 4,
    baseNumber: 60000,
    unit: 'đồng',
    options: ['15 000 đồng', '40 000 đồng', '45 000 đồng', '50 000 đồng'],
    correctAnswer: '45 000 đồng',
    acceptableAnswers: ['45 000 đồng', '45000', '45.000', '45000 đồng', '45 000'],
    explanation: 'Số tiền Bình dùng mua sách là: 60 000 × 3/4 = (60 000 : 4) × 3 = 15 000 × 3 = 45 000 (đồng).',
    hint: 'Tìm 3/4 của số tiền 60 000 đồng: lấy 60 000 : 4 rồi nhân 3.',
    visualModel: {
      totalValue: 60000,
      totalParts: 4,
      selectedParts: 3,
      unitLabel: 'đồng'
    }
  },

  // ==========================================
  // MỨC 3: VỀ ĐÍCH - VẬN DỤNG NÂNG CAO & 2 BƯỚC TÍNH (CÂU 11 - 15)
  // ==========================================
  {
    id: 11,
    level: 3,
    levelTitle: 'Mức 3: Về đích - Vận dụng nâng cao',
    type: 'multiple_choice',
    title: 'Tủ sách thư viện trường',
    scenarioContext: 'Thư viện xanh thân thiện',
    prompt: 'Thư viện lớp có 48 quyển truyện tranh. Giờ ra chơi các bạn đã mượn đọc 3/8 số truyện đó. Hỏi trên giá sách CÒN LẠI bao nhiêu quyển truyện?',
    fractionNumerator: 3,
    fractionDenominator: 8,
    baseNumber: 48,
    unit: 'quyển truyện',
    options: ['18 quyển', '24 quyển', '30 quyển', '32 quyển'],
    correctAnswer: '30 quyển',
    acceptableAnswers: ['30', '30 quyển', '30 quyển truyện'],
    explanation: 'Bài toán gồm 2 bước tính:\n• Bước 1: Số truyện các bạn đã mượn là: 48 × 3/8 = 18 (quyển).\n• Bước 2: Số truyện còn lại trên giá là: 48 - 18 = 30 (quyển).\n(Hoặc: Số truyện còn lại chiếm 1 - 3/8 = 5/8 số truyện; 48 × 5/8 = 30 quyển).',
    hint: 'Chú ý đề bài hỏi số truyện "CÒN LẠI", nên cần lấy tổng số truyện trừ đi số truyện đã mượn!',
    visualModel: {
      totalValue: 48,
      totalParts: 8,
      selectedParts: 5, // phần còn lại
      unitLabel: 'quyển'
    }
  },
  {
    id: 12,
    level: 3,
    levelTitle: 'Mức 3: Về đích - Vận dụng nâng cao',
    type: 'short_answer',
    title: 'Bao gạo của bác Ba',
    scenarioContext: 'Cửa hàng nông sản sạch',
    prompt: 'Một bao gạo nặng 50 kg. Bác Ba đã bán đi 4/5 số gạo đó. Hỏi trong bao CÒN LẠI bao nhiêu ki-lô-gam gạo? (Điền số kg còn lại)',
    fractionNumerator: 4,
    fractionDenominator: 5,
    baseNumber: 50,
    unit: 'kg',
    correctAnswer: '10',
    acceptableAnswers: ['10', '10 kg', '10kg'],
    explanation: '• Khối lượng gạo đã bán là: 50 × 4/5 = 40 (kg).\n• Khối lượng gạo còn lại trong bao là: 50 - 40 = 10 (kg).\n(Hoặc: Phân số chỉ số gạo còn lại là 1 - 4/5 = 1/5; 50 × 1/5 = 10 kg).',
    hint: 'Tìm số gạo đã bán trước (50 × 4/5), sau đó lấy 50 trừ đi số đó để tìm phần còn lại.',
    visualModel: {
      totalValue: 50,
      totalParts: 5,
      selectedParts: 1, // còn lại 1 phần
      unitLabel: 'kg gạo'
    }
  },
  {
    id: 13,
    level: 3,
    levelTitle: 'Mức 3: Về đích - Vận dụng nâng cao',
    type: 'true_false',
    title: 'So sánh hai phân số của hai số',
    scenarioContext: 'Đố vui cùng bạn bè',
    prompt: 'Hoa đố Minh: "2/3 của 30 quả táo LỚN HƠN 3/4 của 28 quả táo". Khẳng định của bạn Hoa là ĐÚNG hay SAI?',
    correctAnswer: 'Sai',
    acceptableAnswers: ['Sai', 'sai', 'false', 'SAI'],
    explanation: 'Ta tính giá trị từng phần:\n• 2/3 của 30 quả táo là: 30 × 2/3 = 20 (quả táo).\n• 3/4 của 28 quả táo là: 28 × 3/4 = 21 (quả táo).\nVì 20 < 21 nên 2/3 của 30 BÉ HƠN 3/4 của 28. Khẳng định của Hoa là SAI!',
    hint: 'Hãy tính xem 2/3 của 30 bằng mấy, và 3/4 của 28 bằng mấy rồi so sánh hai số đó!',
    visualModel: {
      totalValue: 30,
      totalParts: 3,
      selectedParts: 2,
      unitLabel: 'quả'
    }
  },
  {
    id: 14,
    level: 3,
    levelTitle: 'Mức 3: Về đích - Vận dụng nâng cao',
    type: 'multiple_choice',
    title: 'Sân bóng đá mini trường em',
    scenarioContext: 'Sân tập thể thao năng động',
    prompt: 'Một sân bóng mini hình chữ nhật có chiều dài 60 m. Chiều rộng bằng 5/6 chiều dài. Hãy tính CHU VI của sân bóng đá mini đó.',
    fractionNumerator: 5,
    fractionDenominator: 6,
    baseNumber: 60,
    unit: 'm',
    options: ['110 m', '220 m', '100 m', '3 000 m'],
    correctAnswer: '220 m',
    acceptableAnswers: ['220', '220m', '220 m', '220 mét'],
    explanation: 'Bài toán kết hợp tìm phân số của một số và chu vi hình chữ nhật:\n• Bước 1 (Tìm chiều rộng): 60 × 5/6 = 50 (m).\n• Bước 2 (Tính chu vi): (Chiều dài + Chiều rộng) × 2 = (60 + 50) × 2 = 110 × 2 = 220 (m).',
    hint: 'Nhớ lại công thức chu vi hình chữ nhật: (Chiều dài + Chiều rộng) × 2. Hãy tìm chiều rộng trước nhé!',
    visualModel: {
      totalValue: 60,
      totalParts: 6,
      selectedParts: 5,
      unitLabel: 'm (chiều rộng)'
    }
  },
  {
    id: 15,
    level: 3,
    levelTitle: 'Mức 3: Về đích - Thử thách vinh quang',
    type: 'short_answer',
    title: 'Đội tình nguyện trao yêu thương',
    scenarioContext: 'Chuyến xe thiện nguyện',
    prompt: 'Đội tình nguyện chuẩn bị 120 hộp sữa để tặng các bạn nhỏ. Ngày thứ nhất đội phát được 1/3 tổng số hộp sữa. Ngày thứ hai đội phát được 2/5 tổng số hộp sữa ban đầu. Hỏi sau hai ngày, đội còn lại bao nhiêu hộp sữa?',
    fractionNumerator: 1,
    fractionDenominator: 3,
    baseNumber: 120,
    unit: 'hộp sữa',
    correctAnswer: '32',
    acceptableAnswers: ['32', '32 hộp', '32 hộp sữa'],
    explanation: 'Cách giải chi tiết 3 bước:\n• Ngày thứ nhất phát: 120 × 1/3 = 40 (hộp sữa).\n• Ngày thứ hai phát: 120 × 2/5 = 48 (hộp sữa).\n• Cả hai ngày phát được: 40 + 48 = 88 (hộp sữa).\n• Số hộp sữa còn lại là: 120 - 88 = 32 (hộp sữa).',
    hint: 'Tính số hộp sữa phát ngày 1, tính số hộp sữa phát ngày 2, rồi lấy 120 trừ đi tổng sữa 2 ngày đã phát.',
    visualModel: {
      totalValue: 120,
      totalParts: 15,
      selectedParts: 4, // 1 - 1/3 - 2/5 = 4/15 -> 120 * 4/15 = 32
      unitLabel: 'hộp sữa còn lại'
    }
  }
];

export const GAME_RULES = [
  'Tổng cộng có 15 câu hỏi qua 3 chặng đường: Khởi động, Vượt chướng ngại vật và Về đích.',
  'Mỗi câu trả lời đúng được cộng 10 điểm (Tối đa 150 điểm).',
  'Có âm thanh thông báo và phản hồi ngay lập tức cho từng câu trả lời.',
  'Em được tự do làm bài liên tục đến câu cuối cùng.',
  'Sau khi hoàn thành, em có thể xem lại bảng tổng kết và toàn bộ lời giải chi tiết!'
];
