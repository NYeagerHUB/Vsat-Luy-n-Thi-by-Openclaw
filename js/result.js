const saved = JSON.parse(localStorage.getItem('vsat-last-result') || 'null');

if (saved) {
  document.getElementById('resultScore').textContent = saved.score;
  document.getElementById('resultUnanswered').textContent = saved.unanswered;
  document.getElementById('resultReview').innerHTML = saved.review;
}