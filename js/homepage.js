// Homepage-specific logic

let state = {
  answers: {},
  submitted: false,
  currentQ: 0
};

let timerInterval = null;
let timeLeft = EXAM_DATA.timer;

// Initialize homepage functionality
document.addEventListener('DOMContentLoaded', () => {
  renderQuestionNav();
  showQuestion(0);
  startTimer();

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  });
});

function renderQuestionNav() {
  const container = document.getElementById('questionNav');
  container.innerHTML = '';
  EXAM_DATA.questions.forEach((q, i) => {
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
    const q = EXAM_DATA.questions[i];
    btn.className = 'qnav-btn';

    if (state.submitted) {
      if (isQuestionCorrect(i)) btn.classList.add('qnav-btn--correct');
      else btn.classList.add('qnav-btn--wrong');
    } else if (isQuestionAnswered(i)) {
      btn.classList.add('qnav-btn--answered');
    }

    if (i === state.currentQ) btn.classList.add('qnav-btn--active');
  });

  const total = EXAM_DATA.questions.length;
  const answered = EXAM_DATA.questions.filter((_, i) => isQuestionAnswered(i)).length;
  document.getElementById('totalQ').textContent = total;
  document.getElementById('progressFill').style.width = `${(answered / total) * 100}%`;
}

function isQuestionAnswered(idx) {
  const q = EXAM_DATA.questions[idx];
  if (q.type === 'truefalse') {
    return q.parts.every(p => state.answers[p.id] !== undefined);
  } else {
    return state.answers[q.id] !== undefined;
  }
}

function isQuestionCorrect(idx) {
  const q = EXAM_DATA.questions[idx];
  if (q.type === 'truefalse') {
    return q.parts.every(p => state.answers[p.id] === p.correct);
  } else {
    return state.answers[q.id] === q.answer;
  }
}

function showQuestion(idx) {
  state.currentQ = idx;
  const q = EXAM_DATA.questions[idx];
  const main = document.getElementById('examMain');

  let html = '';

  if (q.sharedContentId && EXAM_DATA.sharedContent && EXAM_DATA.sharedContent[q.sharedContentId]) {
    const shared = EXAM_DATA.sharedContent[q.sharedContentId];
    html += `<div class="exam-q__shared-content">`;
    if (shared.title) {
      html += `<h4 class="exam-q__shared-title">${shared.title}</h4>`;
    }
    if (shared.text) {
      html += `<p class="exam-q__shared-text">${shared.text}</p>`;
    }
    if (shared.image) {
      html += `<img src="${shared.image}" alt="Đồ thị dùng chung" class="exam-q__image">`;
    }
    html += `</div>`;
  }

  html += `<div class="exam-q__header">
    <span class="exam-q__num">Câu ${q.id} ${q.stem ? '– ' + q.stem : ''}</span>
    <span class="exam-q__type">${q.type === 'truefalse' ? 'Đúng / Sai' : q.type === 'mcq' ? 'Trắc nghiệm' : q.type === 'matching' ? 'Ghép cột' : 'Trả lời ngắn'}</span>
  </div>`;

  if (q.image) {
    html += `<img src="${q.image}" alt="Hình ảnh câu ${q.id}" class="exam-q__image">`;
  }

  if (q.type === 'truefalse') {
    html += `<div class="subq-list">`;
    q.parts.forEach(p => {
      const ans = state.answers[p.id];
      const answered = ans !== undefined;
      let cls = '';
      if (state.submitted) {
        cls = ans === p.correct ? 'subq-item--correct' : 'subq-item--wrong';
      }
      html += `<div class="subq-item ${cls}" data-part="${p.id}">
        <div class="subq-item__text"><strong>${p.id.toUpperCase()}.</strong> ${p.text}</div>
        <div class="subq-toggle">
          <button class="${answered && ans === true ? 'selected-dung' : ''}" onclick="answerSub('${p.id}', true)" ${state.submitted ? 'disabled' : ''}>Đúng</button>
          <button class="${answered && ans === false ? 'selected-sai' : ''}" onclick="answerSub('${p.id}', false)" ${state.submitted ? 'disabled' : ''}>Sai</button>
        </div>
        <div class="subq-explain ${state.submitted ? 'show' : ''}">
          <strong>${p.correct ? '✅ Đúng' : '❌ Sai'}:</strong> ${p.explain}
        </div>
      </div>`;
    });
    html += `</div>`;
  } else if (q.type === 'mcq') {
    const selected = state.answers[q.id];
    html += `<p class="exam-q__stem">${q.stem}</p>
    <div class="exam-q__mcq-options">`;
    q.options.forEach((opt, oi) => {
      const letter = String.fromCharCode(65 + oi);
      let cls = '';
      if (selected) {
        cls = letter === q.answer ? 'correct-answer' : (selected === letter ? 'wrong-answer' : '');
        if (selected === letter) cls += ' selected';
      } else if (selected === letter) cls = 'selected';
      html += `<div class="exam-q__mcq-option ${cls}" onclick="${state.submitted ? '' : `selectMCQ('${q.id}', '${letter}')`}"><strong>${letter}.</strong> ${opt.replace(/^[A-D]\.\s*/, '')}</div>`;
    });
    html += `</div>`;

    if (selected || state.submitted) {
      html += `<div class="exam-q__explain show"><strong>Đáp án: ${q.answer}</strong><br>${q.explain}</div>`;
    } else {
      html += `<div class="exam-q__explain"></div>`;
    }
  } else if (q.type === 'matching') {
    html += `<p class="exam-q__stem">${q.stem}</p><p style="color:var(--muted)">Loại câu hỏi ghép cột sẽ được hỗ trợ sớm</p>`;
  } else if (q.type === 'shortanswer') {
    html += `<p class="exam-q__stem">${q.stem}</p><p style="color:var(--muted)">Loại câu hỏi trả lời ngắn sẽ được hỗ trợ sớm</p>`;
  }

  const prev = idx > 0;
  const next = idx < EXAM_DATA.questions.length - 1;
  html += `<div class="exam-q__actions">
    <div class="exam-q__nav-btns">
      ${prev ? `<button class="btn btn--outline btn--sm" onclick="showQuestion(${idx-1})">← Câu ${EXAM_DATA.questions[idx-1].id}</button>` : ''}
      <button class="btn btn--outline btn--sm" onclick="openAIChat()">🌱 Hỏi Mầm</button>
    </div>
    <div>
      ${next ? `<button class="btn btn--primary btn--sm" onclick="showQuestion(${idx+1})">Câu ${EXAM_DATA.questions[idx+1].id} →</button>` : `<button class="btn btn--primary btn--sm" onclick="submitExam()">Nộp bài →</button>`}
    </div>
  </div>`;

  main.innerHTML = html;
  updateNav();
}

function answerSub(partId, value) {
  if (state.submitted) return;
  state.answers[partId] = value;
  const q = EXAM_DATA.questions[state.currentQ];
  showQuestion(state.currentQ);
}

function selectMCQ(qId, letter) {
  if (state.submitted) return;
  state.answers[qId] = letter;
  showQuestion(state.currentQ);
}

function submitExam() {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  let correct = 0, wrong = 0, unanswered = 0;
  const total = EXAM_DATA.questions.length;

  EXAM_DATA.questions.forEach((q, i) => {
    const answered = isQuestionAnswered(i);
    if (!answered) { unanswered++; return; }
    if (isQuestionCorrect(i)) correct++;
    else wrong++;
  });

  document.getElementById('examContainer').style.display = 'none';
  const result = document.getElementById('examResult');
  result.style.display = 'block';
  document.getElementById('resultScore').textContent = `${correct}/${total}`;
  document.getElementById('resultCorrect').textContent = `Đúng: ${correct}`;
  document.getElementById('resultWrong').textContent = `Sai: ${wrong}`;
  document.getElementById('resultUnanswered').textContent = `Chưa làm: ${unanswered}`;

  let reviewHtml = '<h3 style="margin-bottom:16px">Chi tiết từng câu</h3>';
  EXAM_DATA.questions.forEach((q, i) => {
    const corr = isQuestionCorrect(i);
    const ans = isQuestionAnswered(i);
    reviewHtml += `<div style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <span>Câu ${q.id} ${q.stem ? '– ' + q.stem.slice(0,50) + '...' : ''}</span>
      <span style="font-weight:600;color:${!ans ? 'var(--muted)' : corr ? 'var(--green)' : 'var(--red)'}">${!ans ? '—' : corr ? '✅' : '❌'}</span>
    </div>`;
  });
  document.getElementById('resultReview').innerHTML = reviewHtml;

  document.getElementById('examResult').scrollIntoView({ behavior: 'smooth' });

  updateNav();
}

function resetExam() {
  state.answers = {};
  state.submitted = false;
  state.currentQ = 0;
  document.getElementById('examContainer').style.display = 'grid';
  document.getElementById('examResult').style.display = 'none';
  document.getElementById('currentQ').textContent = '1';
  document.getElementById('progressFill').style.width = '4%';
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
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function resetTimer() {
  stopTimer();
  timeLeft = EXAM_DATA.timer;
  startTimer();
}

function updateTimerDisplay() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  const el = document.getElementById('examTimer');
  if (el) el.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

const chatContext = [];

function openAIChat() {
  const modal = document.getElementById('aiModal');
  modal.classList.add('open');
  setTimeout(() => document.getElementById('chatInput').focus(), 100);
  addChatToBody('bot', AI_KNOWLEDGE.greetings[Math.floor(Math.random() * AI_KNOWLEDGE.greetings.length)]);
}

function closeAIChat() {
  document.getElementById('aiModal').classList.remove('open');
}

function addChatToBody(role, text) {
  const body = document.getElementById('chatBody');
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg--${role}`;
  if (role === 'bot') {
    msg.innerHTML = `<span class="chat-msg__avatar">🌱</span><div><strong>Mầm</strong><span>${text}</span></div>`;
  } else {
    msg.innerHTML = `<div>${text}</div>`;
  }
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
  chatContext.push({role, text});
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addChatToBody('user', msg);
  input.value = '';

  const qMatch = msg.match(/câu\s*(\d+)/i);
  let reply = '';

  if (qMatch) {
    const qNum = parseInt(qMatch[1]);
    const found = EXAM_DATA.questions.find(q => q.id === qNum);
    if (found) {
      if (found.type === 'truefalse') {
        reply = `Câu ${found.id}: "${found.stem}"<br>`;
        found.parts.forEach(p => {
          const status = state.answers[p.id] !== undefined ? (state.answers[p.id] === p.correct ? '✅' : '❌') : '⏳';
          reply += `${status} <strong>${p.id.toUpperCase()}:</strong> ${p.correct ? 'Đúng' : 'Sai'}. ${p.explain}<br><br>`;
        });
      } else {
        const userAns = state.answers[found.id];
        const correct = userAns === found.answer;
        const status = userAns ? (correct ? '✅' : '❌') : '⏳';
        reply = `Câu ${found.id}: ${found.stem}<br>`;
        reply += `${status} Đáp án: <strong>${found.answer}</strong>.<br>`;
        if (userAns && !correct) {
          reply += `Bạn chọn: ${userAns}<br>`;
        }
        reply += `<br>${found.explain}`;
      }
    } else {
      reply = `Mình chưa tìm thấy câu ${qNum} trong đề này. Bạn ghi rõ số câu nhé!`;
    }
  } else if (msg.match(/điểm|score|kết.*quả/i)) {
    if (state.submitted) {
      const correct = Object.keys(state.answers).filter(k => {
        const q = EXAM_DATA.questions.find(q => q.parts ? q.parts.some(p => p.id === k) : q.id == k);
        if (!q) return false;
        if (q.type === 'truefalse') {
          const p = q.parts.find(pp => pp.id === k);
          return p && state.answers[k] === p.correct;
        }
        return state.answers[k] === q.answer;
      }).length;
      reply = `Bạn đúng ${correct}/${EXAM_DATA.questions.length} câu. Cố gắng thêm nhé! 📊`;
    } else {
      reply = `Bạn chưa nộp bài. Làm xong rồi bấm "Nộp bài" để xem kết quả nhé!`;
    }
  } else if (msg.match(/cảm ơn|cám ơn/i)) {
    reply = `Không có gì! Có câu nào khác cần Mầm giúp không? 🌱`;
  } else {
    reply = AI_KNOWLEDGE.fallback[Math.floor(Math.random() * AI_KNOWLEDGE.fallback.length)];
  }

  setTimeout(() => addChatToBody('bot', reply), 400);
}

document.getElementById('aiModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeAIChat();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAIChat();
});
