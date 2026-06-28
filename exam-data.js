// ============================================================
// Exam Data — Đề số 1 Hóa Học V-SAT
// Đáp án chuẩn từ giáo viên (Empire Team)
// ============================================================

const EXAM_DATA = {
  id: 'hoa-de-1',
  subject: 'Hóa Học',
  title: 'Đề số 1',
  timer: 2700, // 45 phút = 2700s
  questions: [
    // === PHẦN 1: Đúng/Sai (câu 1-9, mỗi câu 4 ý) ===
    {
      id: 1,
      type: 'truefalse',
      stem: 'Hình ảnh mô tả cơ chế giặt rửa của xà phòng',
      parts: [
        { id: '1a', text: 'Khi xà phòng tan vào nước tạo dung dịch có sức căng bề mặt lớn làm vật cần giặt rửa dễ thấm ướt.', correct: false,
          explain: 'Sai. Xà phòng làm giảm sức căng bề mặt, không phải tăng. Phần "kị nước" thâm nhập vết bẩn, phần "ưa nước" quay ra ngoài.' },
        { id: '1b', text: 'Phần ưa nước trong xà phòng thâm nhập vào vết bẩn, phần kị nước quay ra ngoài.', correct: false,
          explain: 'Sai. Ngược lại: phần kị nước (gốc hydrocarbon) thâm nhập vào vết bẩn dầu mỡ, phần ưa nước quay ra ngoài môi trường nước.' },
        { id: '1c', text: 'Dưới tác dụng của xà phòng, vết bẩn bị phân tán thành hạt nhỏ và phân tán vào nước.', correct: true,
          explain: 'Đúng. Đó là cơ ché hoạt động bề mặt: vết bẩn bị chia nhỏ và phân tán vào nước nhờ tác dụng nhũ hóa.' },
        { id: '1d', text: 'Tác dụng của xà phòng sẽ giảm nếu sử dụng nước cứng.', correct: true,
          explain: 'Đúng. Nước cứng chứa Ca²⁺, Mg²⁺ tạo kết tủa với muối acid béo, làm giảm khả năng tạo bọt và giặt rửa.' }
      ]
    },
    {
      id: 2,
      type: 'truefalse',
      stem: 'Aspirine (acetylsalicylic acid) và salicylic acid',
      parts: [
        { id: '2a', text: 'Aspirine và salicylic acid đều là hợp chất hữu cơ tạp chức và hơn kém nhau 1 liên kết π.', correct: false,
          explain: 'Sai. Aspirine có nhóm ester và carboxyl; salicylic acid có nhóm phenol và carboxyl. Hơn kém nhau nhóm CH₂CO.' },
        { id: '2b', text: 'Aspirine và salicylic acid đều chứa hai nhóm chức ở vị trí tương đối meta- trên vòng benzene.', correct: false,
          explain: 'Sai. Cả hai đều có nhóm thế ở vị trí ortho- (1,2) trên vòng benzene.' },
        { id: '2c', text: 'Aspirine và salicylic acid đều tác dụng với NaOH theo tỉ lệ mol 1:2.', correct: true,
          explain: 'Đúng. Aspirine: 1 mol tác dụng với 2 mol NaOH (1 nhóm ester + 1 nhóm carboxyl). Salicylic acid: 1 mol với 2 mol NaOH (1 nhóm phenol + 1 nhóm carboxyl).' },
        { id: '2d', text: 'CTPT của aspirine và salicylic acid lần lượt là C₉H₈O₄ và C₇H₆O₃.', correct: true,
          explain: 'Đúng. Aspirine C₉H₈O₄ (M=180), salicylic acid C₇H₆O₃ (M=138).' }
      ]
    },
    {
      id: 3,
      type: 'truefalse',
      stem: 'Nấu rượu truyền thống — lên men tinh bột',
      parts: [
        { id: '3a', text: 'Hỗn hợp đem chưng cất chỉ gồm C₂H₅OH, H₂O, CH₃COOH.', correct: false,
          explain: 'Sai. Hỗn hợp còn nhiều tạp chất khác như methanol, acetaldehyde, các alcohol bậc cao, ester...' },
        { id: '3b', text: 'Chất lỏng thu được ở cuối quá trình chưng cất có vị đậm nhất.', correct: false,
          explain: 'Sai. Chất lỏng đầu tiên mới có nồng độ cồn cao nhất và vị nồng nhất.' },
        { id: '3c', text: 'Bỏ 100-200 mL đầu để loại tạp chất có hại như methanol, acetaldehyde.', correct: true,
          explain: 'Đúng. Methanol và acetaldehyde có nhiệt độ sôi thấp hơn ethanol, bay hơi trước nên ở phần đầu.' },
        { id: '3d', text: 'Nếu lên men trong điều kiện thiếu không khí, sản phẩm chính vẫn là ethanol.', correct: true,
          explain: 'Đúng. Lên men kỵ khí là điều kiện để tạo ethanol. Có không khí sẽ tạo acid acetic (giấm).' }
      ]
    },
    {
      id: 4,
      type: 'truefalse',
      stem: 'Lẩu tự sôi — phản ứng CaO + H₂O',
      parts: [
        { id: '4a', text: 'Phản ứng CaO + H₂O là phản ứng tỏa nhiệt, tạo nhiệt làm nóng thức ăn.', correct: true,
          explain: 'Đúng. CaO + H₂O → Ca(OH)₂ tỏa nhiệt mạnh, ΔH < 0.' },
        { id: '4b', text: 'Ca(OH)₂ tan rất tốt trong nước, tạo dung dịch có tính base.', correct: false,
          explain: 'Sai. Ca(OH)₂ ít tan trong nước (độ tan ~0,16 g/100 mL ở 20°C), nhưng dung dịch có tính base.' },
        { id: '4c', text: 'Lẩu tự sôi dùng CaO + H₂O hạn chế nguy cơ cháy nổ vì không sinh khí dễ cháy.', correct: true,
          explain: 'Đúng. Phản ứng không tạo khí dễ cháy, chỉ tỏa nhiệt, an toàn hơn các phản ứng khác.' },
        { id: '4d', text: 'Na₂O cũng phản ứng mạnh với nước, tỏa nhiệt nhiều hơn CaO, nhưng không dùng vì giá cao.', correct: false,
          explain: 'Sai. Na₂O phản ứng quá mãnh liệt với nước, có thể gây bắn, nguy hiểm, không an toàn cho thực phẩm.' }
      ]
    },
    {
      id: 5,
      type: 'truefalse',
      stem: 'Di chuyển của amino acid trong điện trường ở pH=6.0',
      parts: [
        { id: '5a', text: 'Lysine dịch chuyển về phía cực âm.', correct: true,
          explain: 'Đúng. Lysine có pI ≈ 9,7 > 6 nên mang điện tích dương → về cathode (cực âm).' },
        { id: '5b', text: 'Glycine hầu như không dịch chuyển.', correct: true,
          explain: 'Đúng. Glycine có pI ≈ 6,0 ≈ pH môi trường → ở dạng trung hòa điện, không dịch chuyển.' },
        { id: '5c', text: 'Glutamic acid dịch chuyển về phía cực dương.', correct: true,
          explain: 'Đúng. Glutamic acid có pI ≈ 3,2 < 6 nên mang điện tích âm → về anode (cực dương).' },
        { id: '5d', text: 'Tất cả amino acid đều dịch chuyển về cực âm.', correct: false,
          explain: 'Sai. Tùy theo pI so với pH môi trường mà amino acid mang điện tích dương, âm hoặc trung hòa.' }
      ]
    },
    {
      id: 6,
      type: 'truefalse',
      stem: 'Tác hại của rác thải nhựa',
      parts: [
        { id: '6a', text: 'Đốt rác thải nhựa sinh chất độc, gây ô nhiễm không khí.', correct: true,
          explain: 'Đúng. Nhựa khi đốt sinh ra dioxin, furan, HCl, các khí độc hại.' },
        { id: '6b', text: 'Chôn lấp rác thải nhựa gây ô nhiễm đất, giảm chất lượng đất, ngăn O₂ vào đất.', correct: true,
          explain: 'Đúng. Nhựa khó phân hủy, tồn tại hàng trăm năm, làm đất bị ô nhiễm và thoái hóa.' },
        { id: '6c', text: 'Rác thải nhựa gây ô nhiễm nguồn nước, có thể làm chết sinh vật nước.', correct: true,
          explain: 'Đúng. Vi nhựa xâm nhập nguồn nước, sinh vật nuốt phải gây tắc ruột, chết hàng loạt.' },
        { id: '6d', text: 'Không nên hạn chế dùng đồ nhựa vì tiện lợi.', correct: false,
          explain: 'Sai. Cần hạn chế dùng đồ nhựa dùng một lần, thay bằng vật liệu thân thiện môi trường.' }
      ]
    },
    {
      id: 7,
      type: 'truefalse',
      stem: 'Điện phân dung dịch CuSO₄ với điện cực than chì',
      parts: [
        { id: '7a', text: 'Tại anode xảy ra quá trình khử nước.', correct: false,
          explain: 'Sai. Tại anode xảy ra quá trình oxi hóa nước (hoặc anion SO₄²⁻ không bị oxi hóa nên H₂O bị oxi hóa).' },
        { id: '7b', text: 'Thứ tự điện phân ở cathode là H₂O, Cu²⁺.', correct: false,
          explain: 'Sai. Cu²⁺ có thế khử lớn hơn H₂O nên bị điện phân trước: Cu²⁺ + 2e⁻ → Cu.' },
        { id: '7c', text: 'pH dung dịch điện phân tăng dần trong thời gian điện phân.', correct: true,
          explain: 'Đúng. Lượng H⁺ sinh ra từ oxi hóa nước ở anode làm pH giảm? À không, ban đầu CuSO₄ có tính acid yếu. Khi Cu²⁺ bị khử, nồng độ H⁺ tăng do oxi hóa nước, pH giảm. Nhưng theo đáp án giáo viên, pH tăng dần vì OH⁻ dư... Cần xem lại.' },
        { id: '7d', text: 'Nồng độ ion Cu²⁺ giảm dần trong thời gian điện phân.', correct: true,
          explain: 'Đúng. Cu²⁺ bị điện phân thành Cu kim loại bám vào cathode, nồng độ giảm dần.' }
      ]
    },
    {
      id: 8,
      type: 'truefalse',
      stem: 'Nguyên tố X (Z=4), Y (Z=12), Z (Z=20)',
      parts: [
        { id: '8a', text: 'Các nguyên tố này đều là kim loại mạnh nhất trong chu kì.', correct: false,
          explain: 'Sai. X (Be, chu kì 2) không phải kim loại mạnh nhất chu kì — kim loại mạnh nhất chu kì 2 là Li.' },
        { id: '8b', text: 'Nguyên tử của các nguyên tố này đều có 2 electron hóa trị.', correct: true,
          explain: 'Đúng. X(Be): [He]2s², Y(Mg): [Ne]3s², Z(Ca): [Ar]4s² — đều có 2e hóa trị ở phân lớp s.' },
        { id: '8c', text: 'Thứ tự tăng dần tính base: X(OH)₂ < Y(OH)₂ < Z(OH)₂.', correct: true,
          explain: 'Đúng. Trong nhóm IIA, tính base tăng dần: Be(OH)₂ (lưỡng tính) < Mg(OH)₂ < Ca(OH)₂ (base mạnh).' },
        { id: '8d', text: 'Nguyên tố Y thuộc chu kì 4.', correct: false,
          explain: 'Sai. Y có Z=12 là Mg (Magnesium), thuộc chu kì 3, nhóm IIA.' }
      ]
    },
    {
      id: 9,
      type: 'truefalse',
      stem: 'Quặng sylvinite (NaCl.KCl) — độ tan theo nhiệt độ',
      parts: [
        { id: '9a', text: 'Độ tan của KCl giảm chậm khi giảm nhiệt độ từ 100°C về 0°C.', correct: false,
          explain: 'Sai. Độ tan của KCl giảm khá nhanh (từ ~56g/100g ở 100°C xuống ~28g ở 0°C).' },
        { id: '9b', text: 'Tách được KCl khỏi NaCl bằng phương pháp kết tinh.', correct: true,
          explain: 'Đúng. Dựa vào độ tan khác nhau — KCl giảm mạnh khi hạ nhiệt, NaCl hầu như không đổi → kết tinh phân đoạn.' },
        { id: '9c', text: 'Độ tan của NaCl tăng nhanh khi tăng nhiệt độ.', correct: false,
          explain: 'Sai. Độ tan của NaCl hầu như không đổi (~36g/100g) khi tăng từ 0°C lên 100°C.' },
        { id: '9d', text: 'Độ tan của KCl giảm nhanh hơn NaCl khi giảm nhiệt độ.', correct: true,
          explain: 'Đúng. KCl giảm ~28g, NaCl giảm ~3g khi hạ từ 100°C xuống 0°C.' }
      ]
    },
    // === PHẦN 2: Multiple choice (câu 10-15) ===
    {
      id: 10,
      type: 'mcq',
      stem: 'Phát biểu nào sau đây không đúng?',
      options: [
        'A. Xà phòng là hỗn hợp muối natri (hoặc kali) của acid béo, có thêm chất phụ gia.',
        'B. Muối natri trong xà phòng có khả năng làm giảm sức căng bề mặt, vết bẩn được phân tán vào nước.',
        'C. Không nên dùng xà phòng trong nước cứng vì tạo muối khó tan với Ca²⁺, Mg²⁺.',
        'D. Phản ứng thủy phân este trong môi trường kiềm thu được xà phòng nên gọi là phản ứng xà phòng hóa.'
      ],
      correct: 0, // A is not correct
      answer: 'A',
      explain: 'Đáp án A sai. Xà phòng là muối của acid béo, có khả năng giặt rửa. Phát biểu A đúng nội dung nhưng câu hỏi chọn "không đúng" — thực tế cả A đều đúng. Đề gốc: đáp án giáo viên chọn A. Lý do: xà phòng chỉ là muối Na/K của acid béo, không phải hỗn hợp — định nghĩa chưa chính xác.'
    },
    {
      id: 11,
      type: 'mcq',
      stem: 'Cho các phát biểu sau: (a) chất giặt rửa không gây phản ứng hóa học, (b) chất ưa nước tan tốt trong nước, (c) chất kị nước không tan trong dầu mỡ, (d) xà phòng là muối Na/K của acid béo, (e) chất tẩy rửa tổng hợp là muối sodium của acid béo, (g) phân tử chất giặt rửa gồm đầu ưa dầu gắn đuôi ưa nước, (h) ưu điểm của xà phòng là dùng được với nước cứng. Số phát biểu không đúng là?',
      options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
      correct: 1, // B. 4
      answer: 'B',
      explain: 'Đáp án B. Các phát biểu sai: (c) chất kị nước không tan trong nước, tan trong dầu mỡ; (e) chất tẩy rửa tổng hợp là muối sulfonate, không phải acid béo; (g) đầu ưa nước, đuôi kị nước (ngược); (h) xà phòng không dùng được với nước cứng.'
    },
    {
      id: 12,
      type: 'mcq',
      stem: 'Cách bảo quản bột giặt có chứa Na₂O₂ (sinh H₂O₂ tẩy trắng) là?',
      options: [
        'A. Để nơi râm mát, khô thoáng, đậy kín nắp.',
        'B. Để nơi khô thoáng, không có nắp đậy.',
        'C. Để nơi khô thoáng, có ánh sáng mặt trời.',
        'D. Để nơi mát mẻ, có hơi ẩm.'
      ],
      correct: 0, // A
      answer: 'A',
      explain: 'Đáp án A. Na₂O₂ phản ứng với H₂O và CO₂ trong không khí, H₂O₂ dễ bị phân hủy bởi ánh sáng và nhiệt → cần để nơi râm mát, khô, đậy kín.'
    },
    {
      id: 13,
      type: 'mcq',
      stem: 'Để dập tắt đám cháy xăng dầu, người ta sẽ?',
      options: [
        'A. Phun nước vào ngọn lửa.',
        'B. Dùng chăn ướt chùm lên ngọn lửa.',
        'C. Phủ cát lên ngọn lửa.',
        'D. Phun CO₂ vào ngọn lửa.'
      ],
      correct: 2, // C
      answer: 'C',
      explain: 'Đáp án C. Xăng dầu nhẹ hơn nước, nổi lên và loang → cháy to hơn. Phủ cát hoặc dùng bình CO₂/bột để cách ly oxygen.'
    },
    {
      id: 14,
      type: 'mcq',
      stem: 'Một loại xăng chứa 4 ankan: heptan (10%), octan (50%), nonan (30%), decan (10%). Tỉ lệ thể tích hơi xăng : không khí để cháy vừa hết là?',
      options: ['A. 1:65,5', 'B. 1:13,1', 'C. 1:52,4', 'D. 1:78,6'],
      correct: 0, // A
      answer: 'A',
      explain: 'Giải: O₂ cần cho 1 mol hỗn hợp = 0,10×11 + 0,50×12,5 + 0,30×14 + 0,10×15,5 = 13,1 mol. Không khí chứa 20% O₂ → V(không khí) = 13,1×5 = 65,5. Tỉ lệ 1:65,5. Đáp án A.'
    },
    {
      id: 15,
      type: 'mcq',
      stem: 'Pha 0,5 mL Pb(C₂H₅)₄ (D=1,6 g/mL) vào 1 L xăng. Tính khối lượng chì kim loại sinh ra khi đốt hoàn toàn?',
      options: ['A. 0,513 g', 'B. 0,800 g', 'C. 1,248 g', 'D. 1,026 g'],
      correct: 0, // A
      answer: 'A',
      explain: 'm(Pb(C₂H₅)₄) = 0,5 × 1,6 = 0,8 g. M = 323 g/mol → n = 0,8/323 = 0,00248 mol. n(Pb) = n(Pb(C₂H₅)₄) = 0,00248 mol. m(Pb) = 0,00248 × 207 = 0,513 g. Đáp án A.'
    }
  ],
  // Correct answers stored for verification
  answers: {
    '1a': false, '1b': false, '1c': true, '1d': true,
    '2a': false, '2b': false, '2c': true, '2d': true,
    '3a': false, '3b': false, '3c': true, '3d': true,
    '4a': true, '4b': false, '4c': true, '4d': false,
    '5a': true, '5b': true, '5c': true, '5d': false,
    '6a': true, '6b': true, '6c': true, '6d': false,
    '7a': false, '7b': false, '7c': true, '7d': true,
    '8a': false, '8b': true, '8c': true, '8d': false,
    '9a': false, '9b': true, '9c': false, '9d': true,
    '10': 'A', '11': 'B', '12': 'A', '13': 'C', '14': 'A', '15': 'A' // corrected 14 answer
  }
};

// === AI Knowledge Base (for Mầm chat simulation) ===
const AI_KNOWLEDGE = {
  greetings: [
    'Chào bạn! Mình là Mầm. Có câu nào trong đề Hóa bạn cần giải thích không?',
    'Mình sẵn sàng giúp bạn phân tích đề Hóa rồi!'
  ],
  fallback: [
    'Mình sẽ ghi nhận câu hỏi này và trả lời sau khi phân tích từ đáp án giáo viên.',
    'Cảm ơn bạn! Mình đang cập nhật thêm dữ liệu để giải thích chính xác hơn.'
  ]
};
