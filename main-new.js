let state = {
  answers: {},
  submitted: false,
  currentQ: 0,
  examData: null
};
let timerInterval = null;
let timeLeft = 0;

// Mapping exam IDs to file names
const examFileMap = {
  'toan-de-1': 'toan-de-1.json'
};

document.addEventListener('DOMContentLoaded', async () => {
  // Get exam ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const examId = urlParams.get('exam');
  
  if (!examId || !examFileMap[examId]) {
    window.location.href = 'kho-de.html';
    return;
  }
  
  // Load exam data
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
  // Update UI
  document.getElementById('examSubjectBadge').textContent = state.examData.metadata?.subject || 'Đề thi';
  document.getElementById('examTitle').textContent = state.examData.title;
  document.getElementById('examSub').textContent = `Thời gian: ${state.examData.time} phút`;
  document.getElementById('examSidebarTitle').textContent = state.examData.title;
  
  // Initialize timer
  timeLeft = state.examData.time * 60;
  startTimer();
  
  // Render
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
    btn.textContent = q.id;
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
  
  // Update progress text
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
      <span class="exam-q__num">Câu ${q.id}</span>
      <span class="exam-q__type">${getQuestionTypeName(q.type)}</span>
    </div>
    <p class="exam-q__stem">${q.question.replace("[EMPIRE TEAM]", "")}</p>
  `;
  
  if (q.type === 'truefalse') {
    html += `<div class="subq-list">`;
    q.statements.forEach((stmt, i) => {
      const partId = `${q.id}-${i}`;
      const ans = state.answers[partId];
      html += `
        <div class="subq-item">
          <div class="subq-item__text"><strong>${String.fromCharCode(65 + i)}.</strong> ${stmt}</div>
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
      html += `
        <div class="exam-q__mcq-option" onclick="selectMCQ('${q.id}', '${letter}')">
          <strong>${letter}.</strong> ${opt}
        </div>
      `;
    });
    html += `</div>`;
  } else if (q.type === 'matching') {
    html += `<p style="color: var(--muted);">Dạng bài ghép nối sẽ được hỗ trợ sớm!</p>`;
  } else if (q.type === 'short') {
    html += `
      <input type="text" class="chat-input" style="width: 100%;" placeholder="Nhập đáp án của bạn..." 
        onchange="saveShortAnswer('${q.id}', this.value)" ${state.submitted ? 'disabled' : ''}>
    `;
  }
  
  // Navigation buttons
  const prev = idx > 0;
  const next = idx < state.examData.questions.length - 1;
  html += `
    <div class="exam-q__actions">
      <div class="exam-q__nav-btns">
        ${prev ? `<button class="btn btn--outline btn--sm" onclick="showQuestion(${idx - 1})">← Câu ${state.examData.questions[idx - 1].id}</button>` : ''}
      </div>
      <div>
        ${next ? `<button class="btn btn--primary btn--sm" onclick="showQuestion(${idx + 1})">Câu ${state.examData.questions[idx + 1].id} →</button>` : `<button class="btn btn--primary btn--sm" onclick="submitExam()">Nộp bài →</button>`}
      </div>
    </div>
  `;
  
  main.innerHTML = html;
  updateNav();
  // Render LaTeX
  if (window.renderMathInElement) {
    renderMathInElement(main, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ]
    });
  }
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

function selectMCQ(qId, letter) {
  if (state.submitted) return;
  state.answers[qId] = letter;
  showQuestion(state.currentQ);
}

function saveShortAnswer(qId, value) {
  if (state.submitted) return;
  state.answers[qId] = value;
  updateNav();
}

function submitExam() {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();
  
  document.getElementById('examContainer').style.display = 'none';
  const result = document.getElementById('examResult');
  result.style.display = 'block';
  
  // Simple result (no scoring yet since answers aren't in JSON)
  const answered = Object.keys(state.answers).length;
  document.getElementById('resultScore').textContent = `${answered}/${state.examData.questions.length}`;
  document.getElementById('resultUnanswered').textContent = `Chưa làm: ${state.examData.questions.length - answered}`;
  
  let reviewHtml = '<h3 style="margin-bottom:16px">Đáp án của bạn</h3>';
  state.examData.questions.forEach((q, i) => {
    let userAns = '';
    if (q.type === 'truefalse') {
      userAns = q.statements.map((_, j) => {
        const ans = state.answers[`${q.id}-${j}`];
        return `${String.fromCharCode(65 + j)}: ${ans === true ? 'Đúng' : ans === false ? 'Sai' : '-'}`;
      }).join(' | ');
    } else {
      userAns = state.answers[q.id] || '-';
    }
    reviewHtml += `
      <div style="padding:8px 0;border-bottom:1px solid var(--border)">
        <span><strong>Câu ${q.id}:</strong> ${userAns}</span>
      </div>
    `;
  });
  document.getElementById('resultReview').innerHTML = reviewHtml;
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
