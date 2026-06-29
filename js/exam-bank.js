const EXAMS = [
  { id: 'sample-hoa', subject: 'hoa', title: 'Đề số 1 — Hóa Học', questions: 25, time: 45, difficulty: 'Trung bình', free: true },
  { id: 'toan-de-1', subject: 'toan', title: 'Đề thi Minh họa Toán 2025 – Trường ĐH Cần Thơ', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'de-13', subject: 'toan', title: 'Đề số 13 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'de-14', subject: 'toan', title: 'Đề số 14 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'de-15', subject: 'toan', title: 'Đề số 15 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'de-can-tho-2025', subject: 'toan', title: 'Đề Cần Thơ 2025 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'handout-1', subject: 'toan', title: 'Handout Đề số 1 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'handout-2', subject: 'toan', title: 'Handout Đề số 2 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'handout-6', subject: 'toan', title: 'Handout Đề số 6 — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'ngan-hang-mau', subject: 'toan', title: 'Ngân hàng Mẫu — Toán', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'lich-su-5', subject: 'van', title: 'Đề số 5 — Lịch Sử', questions: 25, time: 90, difficulty: 'Trung bình', free: true },
  { id: 'vat-ly-0', subject: 'ly', title: 'Đề số 0 — Vật Lý', questions: 25, time: 90, difficulty: 'Trung bình', free: true }
];

function renderExams(filter = 'all') {
  const list = document.getElementById('examList');
  list.innerHTML = '';
  const filtered = filter === 'all' ? EXAMS : EXAMS.filter(e => e.subject === filter);
  filtered.forEach(exam => {
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.innerHTML = `
      <div class="exam-card__header">
        <h3 class="exam-card__title">${exam.title}</h3>
        ${exam.free ? '<span class="badge badge--free">Miễn phí</span>' : '<span class="badge badge--paid">Túi Lá</span>'}
      </div>
      <div class="exam-card__info"><span>📝 ${exam.questions} câu</span><span>⏱ ${exam.time} phút</span><span>📊 ${exam.difficulty}</span></div>
      <div class="exam-card__actions"><button class="btn btn--primary btn--md" onclick="startExam('${exam.id}')">Bắt đầu làm</button></div>`;
    list.appendChild(card);
  });
}

function startExam(examId) {
  window.location.href = `exam.html?exam=${examId}`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      renderExams(btn.dataset.subject);
    });
  });
  renderExams();
});