// Exam page logic
let state = {
  answers: {},
  submitted: false,
  currentQ: 0,
  examData: null
};
let timerInterval = null;
let timeLeft = 0;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const examId = urlParams.get('exam');

  if (!examId || !examFileMap[examId]) {
    window.location.href = 'kho-de.html';
    return;
  }

  try {
    const response = await fetch(`exams/${examFileMap[examId]}`);
    state.examData = await response.json();
    initializeExam();
  } catch (error) {
    console.error('Error loading exam:', error);
    alert('Không thể tải đề thi. Vui lòng thử lại.');
    window.location.href = 'kho-de.html';
  }
});

function initializeExam() {
  if (state.examData.questions && !state.examData.title) {
    state.examData.title = 'Đề thi';
    state.examData.time = 90;
    state.examData.metadata = { subject: 'Đề thi' };
  }

  document.getElementById('examSubjectBadge').textContent = state.examData.metadata?.subject || 'Đề thi';
  document.getElementById('examTitle').textContent = state.examData.title;
  document.getElementById('examSub').textContent = `Thời gian: ${state.examData.time} phút`;
  document.getElementById('examSidebarTitle').textContent = state.examData.title;

  timeLeft = state.examData.time * 60;
  startTimer();

  renderQuestionNav();
  showQuestion(0);
}

function renderQuestionNav() {
  const container = document.getElementById('questionNav');
  container.innerHTML = '';
  state.examData.questions.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.className = 'qnav-btn';
    btn.dataset.idx = i;
    btn.textContent = i + 1;
    btn.addEventListener('click', () => showQuestion(i));
    container.appendChild(btn);
  });
  updateNav();
}

function updateNav() {
  const btns = document.querySelectorAll('.qnav-btn');
  btns.forEach((btn, i) => {
    btn.className = 'qnav-btn';
    if (i === state.currentQ) btn.classList.add('qnav-btn--active');
  });

  document.getElementById('currentQ').textContent = state.currentQ + 1;
  document.getElementById('totalQ').textContent = state.examData.questions.length;
  const answeredCount = Object.keys(state.answers).length;
  const progressPercent = (answeredCount / state.examData.questions.length) * 100;
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
}

function showQuestion(idx) {
  state.currentQ = idx;
  const q = state.examData.questions[idx];
  const main = document.getElementById('examMain');

  let html = `
    <div class="exam-q__header">
      <span class="exam-q__num">Câu ${idx + 1}</span>
      <span class="exam-q__type">${getQuestionTypeName(q.type)}</span>
    </div>
    <p class="exam-q__stem">${renderMathHTML(q.question.replace("[EMPIRE TEAM]", ""))}</p>
  `;

  if (q.image) {
    html += `<img src="${q.image}" class="exam-q__image" alt="Hình ảnh câu hỏi">`;
  }

  if (q.type === 'truefalse') {
    html += `<div class="subq-list">`;
    q.statements.forEach((stmt, i) => {
      const partId = `${idx}-${i}`;
      const ans = state.answers[partId];
      html += `
        <div class="subq-item">
          <div class="subq-item__text"><strong>${String.fromCharCode(65 + i)}.</strong> ${renderMathHTML(stmt)}</div>
          <div class="subq-toggle">
            <button class="${ans === true ? 'selected-dung' : ''}" onclick="answerTrueFalse('${partId}', true)" ${state.submitted ? 'disabled' : ''}>Đúng</button>
            <button class="${ans === false ? 'selected-sai' : ''}" onclick="answerTrueFalse('${partId}', false)" ${state.submitted ? 'disabled' : ''}>Sai</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  } else if (q.type === 'mcq') {
    html += `<div class="exam-q__mcq-options">`;
    q.options.forEach((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      const selected = state.answers[idx] === i ? 'selected' : '';
      html += `
        <div class="exam-q__mcq-option ${selected}" onclick="selectMCQ(${idx}, ${i})">
          <strong>${letter}.</strong> ${renderMathHTML(opt)}
        </div>
      `;
    });
    html += `</div>`;
  } else if (q.type === 'matching') {
    html += `
      <div class="matching-tables">
        <div class="match-col">
          <div class="match-col-title">Cột trái</div>
          <table class="match-table"><tbody>`;
    q.left.forEach((left, i) => {
      html += `<tr><td class="match-idx">${i+1}.</td><td>${renderMathHTML(left)}</td></tr>`;
    });
    html += `</tbody></table></div>
        <div class="match-col">
          <div class="match-col-title">Cột phải</div>
          <table class="match-table"><tbody>`;
    q.right.forEach((right, i) => {
      html += `<tr><td class="match-key">${String.fromCharCode(65+i)}.</td><td>${renderMathHTML(right)}</td></tr>`;
    });
    html += `</tbody></table></div>
      </div>
      <div class="matching-answer-section">
        <div class="matching-answer-label">Trả lời:</div>
        <div class="matching-selects">`;
    q.left.forEach((_, i) => {
      const sv = state.answers[`${idx}-match-${i}`];
      let opts = `<option value="">Chọn</option>`;
      q.right.forEach((_, ri) => opts += `<option value="${ri}" ${sv === ri ? 'selected' : ''}>${String.fromCharCode(65+ri)}</option>`);
      html += `<div class="match-label-item"><span class="match-label-text">Ý ${i+1}:</span>
        <select class="match-select" onchange="saveMatchingAnswer(${idx}, ${i}, this.value)" ${state.submitted ? 'disabled' : ''}>${opts}</select></div>`;
    });
    html += `</div></div>`;
  } else if (q.type === 'short') {
    html += `
      <input type="text" class="chat-input" style="width: 100%;" placeholder="Nhập đáp án của bạn..." value="${state.answers[idx] || ''}"
        onchange="saveShortAnswer(${idx}, this.value)" ${state.submitted ? 'disabled' : ''}>
    `;
  }

  const prev = idx > 0;
  const next = idx < state.examData.questions.length - 1;
  html += `
    <div class="exam-q__actions">
      <div class="exam-q__nav-btns">
        ${prev ? `<button class="btn btn--outline btn--sm" onclick="showQuestion(${idx - 1})">← Câu ${idx}</button>` : ''}
      </div>
      <div>
        ${next ? `<button class="btn btn--primary btn--sm" onclick="showQuestion(${idx + 1})">Câu ${idx + 2} →</button>` : `<button class="btn btn--primary btn--sm" onclick="submitExam()">Nộp bài →</button>`}
      </div>
    </div>
  `;

  main.innerHTML = html;
  updateNav();
}

function getQuestionTypeName(type) {
  switch(type) {
    case 'truefalse': return 'Đúng/Sai';
    case 'mcq': return 'Trắc nghiệm';
    case 'matching': return 'Ghép cột';
    case 'short': return 'Trả lời ngắn';
    default: return type;
  }
}

function answerTrueFalse(partId, value) {
  if (state.submitted) return;
  state.answers[partId] = value;
  showQuestion(state.currentQ);
}

function selectMCQ(qIdx, optIdx) {
  if (state.submitted) return;
  state.answers[qIdx] = optIdx;
  showQuestion(state.currentQ);
}

function saveShortAnswer(qIdx, value) {
  if (state.submitted) return;
  state.answers[qIdx] = value;
  updateNav();
}

function saveMatchingAnswer(qIdx, leftIdx, rightIdx) {
  if (state.submitted) return;
  state.answers[`${qIdx}-match-${leftIdx}`] = rightIdx === '' ? null : parseInt(rightIdx);
  updateNav();
}

function submitExam() {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  document.getElementById('examContainer').style.display = 'none';
  const result = document.getElementById('examResult');
  result.style.display = 'block';

  const answered = Object.keys(state.answers).length;
  document.getElementById('resultScore').textContent = `${answered}/${state.examData.questions.length}`;
  document.getElementById('resultUnanswered').textContent = `Chưa làm: ${state.examData.questions.length - answered}`;

  let reviewHtml = '<h3 style="margin-bottom:16px">Đáp án của bạn</h3>';
  state.examData.questions.forEach((q, i) => {
    let userAns = '';
    if (q.type === 'truefalse') {
      userAns = q.statements.map((_, j) => {
        const ans = state.answers[`${i}-${j}`];
        return `${String.fromCharCode(65 + j)}: ${ans === true ? 'Đúng' : ans === false ? 'Sai' : '-'}`;
      }).join(' | ');
    } else {
      userAns = state.answers[i] ?? '-';
    }
    reviewHtml += `
      <div style="padding:8px 0;border-bottom:1px solid var(--border)">
        <span><strong>Câu ${i+1}:</strong> ${userAns}</span>
      </div>
    `;
  });
  document.getElementById('resultReview').innerHTML = reviewHtml;
  localStorage.setItem('vsat-last-result', JSON.stringify({
    score: document.getElementById('resultScore').textContent,
    unanswered: document.getElementById('resultUnanswered').textContent,
    review: reviewHtml
  }));
  document.querySelector('.exam-result__actions').insertAdjacentHTML('beforeend', '<a class="btn btn--outline btn--md" href="result.html">Mở trang kết quả</a>');
  updateNav();
}

function resetExam() {
  state.answers = {};
  state.submitted = false;
  state.currentQ = 0;
  document.getElementById('examContainer').style.display = 'grid';
  document.getElementById('examResult').style.display = 'none';
  resetTimer();
  showQuestion(0);
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitExam();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  timeLeft = state.examData.time * 60;
  startTimer();
}

function updateTimerDisplay() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  const el = document.getElementById('examTimer');
  if (el) el.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
