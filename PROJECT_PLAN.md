# Project Plan — V-SAT Luyện Thi

## Mục tiêu
Web luyện thi V-SAT (Hóa Học) desktop-only, tích hợp AI Tutor Mầm dựa trên đáp án giáo viên.

## Style reference
- Nền trắng + gradient xanh dương
- Primary: `#2563eb`
- Card bo góc 16px, shadow nhẹ
- Desktop-only (min-width 1024px)
- Layout giống thitrenmaytinh.edu.vn

## Cấu trúc trang
1. Header — logo + nav + CTA
2. Hero — mock exam card, stats, floating AI card animation
3. Features — 6 card
4. **Exam section** — đề thi Hóa (25 câu: 9 câu Đ/S, 6 câu MCQ), timer, chấm điểm, gọi Mầm
5. Strategy — 3 bước chiến lược
6. Mầm AI Tutor — chat mock + tính năng
7. Pricing — Miễn phí + Túi Lá
8. FAQ
9. CTA + Footer

## AI tích hợp
- **Mầm AI Tutor** — modal chat, trả lời dựa trên đáp án giáo viên từ đề
- GPT: gõ "câu X" → xem giải thích + kết quả trong exam-data.js
- GPT: hỏi điểm → xem kết quả sau khi nộp
- Hiện tại: localized rule-based. Có thể nâng cấp lên OpenAI API

## File
| File | Dung lượng |
|---|---|
| `index.html` | ~17 KB |
| `style.css` | ~20 KB — desktop-only |
| `main.js` | ~12 KB — exam engine + AI chat |
| `exam-data.js` | ~14 KB — 25 câu + đáp án + giải thích |
| `PROJECT_PLAN.md` | này |

## Đã bỏ
- THPT section (thi xong)
- Mobile responsive (desktop-only)
- Hue (focus exam trực tiếp)
