/* ============================================================
   LP FACTORY · script.js
   Microjuego arcade-educativo · vanilla JS
   ============================================================ */

(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  const els = {
    app: $('.app'),
    screens: {
      title: $('#screen-title'),
      game: $('#screen-game'),
      result: $('#screen-result')
    },
    btnPlay: $('#btnPlay'),
    btnAgain: $('#btnAgain'),
    btnHome: $('#btnHome'),
    btnMute: $('#btnMute'),
    timeValue: $('#timeValue'),
    scoreValue: $('#scoreValue'),
    scoreMax: $('#scoreMax'),
    pointsValue: $('#pointsValue'),
    dots: $('#dots'),
    pieceCounter: $('#pieceCounter'),
    stage: $('#stage'),
    card: $('#card'),
    cardDisplay: $('#cardDisplay'),
    machines: $('#machines'),
    toast: $('#toast'),
    srStatus: $('#srStatus'),
    resultEmoji: $('#resultEmoji'),
    resultTitle: $('#resultTitle'),
    resultScore: $('#resultScore'),
    resultTime: $('#resultTime'),
    resultPoints: $('#resultPoints'),
    resultCombo: $('#resultCombo'),
    btnAnswers: $('#btnAnswers'),
    btnCloseAnswers: $('#btnCloseAnswers'),
    answerPanel: $('#answerPanel'),
    answerList: $('#answerList')
  };

  const CFG = window.LP_FACTORY;
  const CATS = CFG.categories;
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));

  /* ================= AUDIO (WebAudio sintetizado) ================= */

  const AudioFX = (() => {
    let ctx = null;
    let muted = false;

    try {
      muted = window.localStorage.getItem('lpf-muted') === '1';
    } catch {
      // Audio can still work when storage is blocked by the browser.
    }

    const ensure = () => {
      if (muted) return null;
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    };

    const tone = (freq, dur, { type = 'sine', vol = 0.18, delay = 0, slide = null } = {}) => {
      const c = ensure();
      if (!c) return;
      const t0 = c.currentTime + delay;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.05);
    };

    return {
      unlock: ensure,
      get muted() { return muted; },
      toggle() {
        muted = !muted;
        try {
          window.localStorage.setItem('lpf-muted', muted ? '1' : '0');
        } catch {
          // Keep the current preference for this session.
        }
        return muted;
      },
      tap() { tone(340, 0.05, { type: 'square', vol: 0.07 }); },
      correct() {
        tone(659, 0.1, { type: 'triangle', vol: 0.16 });
        tone(988, 0.16, { type: 'triangle', vol: 0.16, delay: 0.08 });
      },
      error() {
        tone(150, 0.22, { type: 'sawtooth', vol: 0.14, slide: 90 });
        tone(110, 0.24, { type: 'square', vol: 0.1, delay: 0.04 });
      },
      result(good) {
        const seq = good ? [523, 659, 784, 1047] : [392, 330, 262];
        seq.forEach((f, i) => tone(f, 0.16, { type: 'triangle', vol: 0.15, delay: i * 0.11 }));
      }
    };
  })();

  /* ================= ESTADO ================= */

  const S = {
    order: [],
    idx: 0,
    score: 0,
    points: 0,
    combo: 0,
    bestCombo: 0,
    busy: false,
    playing: false,
    elapsedMs: 0,
    lastTick: 0,
    timerId: null,
    session: 0,
    answers: []
  };

  /* ================= UTILIDADES ================= */

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const say = (msg) => { els.srStatus.textContent = msg; };

  function showScreen(name) {
    Object.entries(els.screens).forEach(([key, el]) => {
      el.classList.toggle('active', key === name);
      el.setAttribute('aria-hidden', String(key !== name));
    });
  }

  /* ================= RONDA (5+5+5 balanceado) ================= */

  function buildRound() {
    const catOrder = shuffle(CATS.map((c) => c.id));
    const baseTake = Math.floor(CFG.rounds / CATS.length);
    const remainder = CFG.rounds - baseTake * CATS.length;
    const picks = [];
    catOrder.forEach((catId, i) => {
      const take = baseTake + (i < remainder ? 1 : 0);
      const pool = CFG.items.filter((it) => it.cat === catId);
      picks.push(...shuffle(pool).slice(0, take));
    });
    return shuffle(picks);
  }

  /* ================= TIMER ================= */

  function startTimer() {
    clearInterval(S.timerId);
    S.elapsedMs = 0;
    S.lastTick = performance.now();
    S.timerId = setInterval(() => {
      const now = performance.now();
      if (S.playing && !document.hidden) S.elapsedMs += now - S.lastTick;
      S.lastTick = now;
      els.timeValue.textContent = `${Math.floor(S.elapsedMs / 1000)} s`;
    }, 200);
  }

  function stopTimer() {
    const now = performance.now();
    if (S.playing && !document.hidden) S.elapsedMs += now - S.lastTick;
    clearInterval(S.timerId);
    S.timerId = null;
    return Math.floor(S.elapsedMs / 1000);
  }

  /* ================= RENDER ================= */

  function renderMachines() {
    els.machines.innerHTML = CATS.map((c) => `
      <button class="machine" data-cat="${c.id}" type="button" aria-label="${c.num}. ${c.label}">
        <span class="m-num" aria-hidden="true">${c.num}</span>
        <span class="m-icon" aria-hidden="true">${c.icon}</span>
        <span class="m-text">
          <span class="m-label">${c.label}</span>
          <span class="m-sub">${c.sub}</span>
        </span>
        <span class="m-light" aria-hidden="true"></span>
      </button>
    `).join('');
  }

  function renderDots() {
    els.dots.innerHTML = CFG.rounds > 0
      ? Array.from({ length: CFG.rounds }, () => '<span></span>').join('')
      : '';
  }

  function currentCard() { return S.order[S.idx]; }

  function renderCard() {
    const item = currentCard();
    if (!item) return;
    const d = item.display;
    els.cardDisplay.textContent = d.value;
    els.cardDisplay.className = `card-display ${d.type}`;
    els.pieceCounter.textContent = `PREGUNTA ${S.idx + 1} / ${CFG.rounds}`;

    els.dots.querySelectorAll('span').forEach((dot, i) => {
      dot.className = i === S.idx ? 'current' : '';
    });

    els.card.style.transform = '';
    els.card.style.opacity = '';
    els.card.style.visibility = '';
    els.card.classList.remove('enter', 'fly');
    void els.card.offsetWidth;
    els.card.classList.add('enter');

    const spoken = d.type === 'formula' ? d.value.replace(/[\u2080-\u2089]/g, (m) =>
      '0123456789'['\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089'.indexOf(m)]
    ) : d.value;
    say(`Pieza ${S.idx + 1} de ${CFG.rounds}: ${spoken}`);
  }

  function updateHud() {
    els.scoreValue.textContent = S.score;
    els.scoreMax.textContent = `/${CFG.rounds}`;
    els.pointsValue.textContent = S.points;
  }

  function setAnswersOpen(open, focusButton = false) {
    els.answerPanel.hidden = !open;
    els.btnAnswers.setAttribute('aria-expanded', String(open));
    els.app.classList.toggle('answers-open', open);
    if (focusButton) {
      (open ? els.btnCloseAnswers : els.btnAnswers).focus();
    }
  }

  function renderAnswerKey() {
    els.answerList.innerHTML = '';

    S.answers.forEach((answer, index) => {
      const item = answer.item;
      const correctCat = catById[item.cat];
      const selectedCat = catById[answer.selected];
      const row = document.createElement('li');
      row.className = `answer-row ${answer.correct ? 'is-correct' : 'is-wrong'}`;
      row.style.setProperty('--answer-color', correctCat.color);

      const number = document.createElement('span');
      number.className = 'answer-number';
      number.textContent = String(index + 1).padStart(2, '0');

      const body = document.createElement('div');
      body.className = 'answer-body';

      const top = document.createElement('div');
      top.className = 'answer-top';

      const status = document.createElement('span');
      status.className = 'answer-status';
      status.textContent = answer.correct ? '✓ Correcta' : '✕ Incorrecta';

      const category = document.createElement('span');
      category.className = 'answer-category';
      category.textContent = correctCat.label;

      const value = document.createElement('p');
      value.className = `answer-value ${item.display.type}`;
      value.textContent = item.display.value;

      const route = document.createElement('p');
      route.className = 'answer-route';
      route.textContent = answer.correct
        ? `Respuesta: ${correctCat.label}`
        : `Tu elección: ${selectedCat.label} · Correcta: ${correctCat.label}`;

      const why = document.createElement('p');
      why.className = 'answer-why';
      why.textContent = item.why;

      top.append(status, category);
      body.append(top, value, route, why);
      row.append(number, body);
      els.answerList.appendChild(row);
    });
  }

  /* ================= EFECTOS ================= */

  function sparks(machineEl, color, n = 9) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      const ang = (Math.PI * 2 * i) / n + Math.random() * 0.6;
      const dist = 26 + Math.random() * 34;
      s.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
      s.style.setProperty('--dy', `${Math.sin(ang) * dist - 14}px`);
      s.style.setProperty('--sc', color);
      machineEl.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  }

  function floatPts(text, color) {
    const f = document.createElement('span');
    f.className = 'float-pts';
    f.textContent = text;
    if (color) f.style.color = color;
    els.stage.appendChild(f);
    setTimeout(() => f.remove(), 850);
  }

  function flyToMachine(machineEl) {
    const cardRect = els.card.getBoundingClientRect();
    const mRect = machineEl.getBoundingClientRect();
    const dx = (mRect.left + mRect.width / 2) - (cardRect.left + cardRect.width / 2);
    const dy = (mRect.top + mRect.height / 2) - (cardRect.top + cardRect.height / 2);
    els.card.classList.add('fly');
    els.card.style.transform = `translate(${dx}px, ${dy}px) scale(0.22)`;
    els.card.style.opacity = '0.15';
  }

  function showToast(item) {
    const c = catById[item.cat];
    els.toast.innerHTML = `Era <strong style="--tc:${c.color}">${c.label}</strong> · ${c.sub.toLowerCase()}`;
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), 1300);
  }

  /* ================= GAMEPLAY ================= */

  function setMachinesEnabled(on) {
    els.machines.querySelectorAll('.machine').forEach((b) => {
      b.setAttribute('aria-disabled', String(!on));
    });
  }

  function send(catId, machineEl) {
    if (S.busy || !S.playing || !machineEl) return;
    const item = currentCard();
    if (!item) return;

    S.busy = true;
    const session = S.session;
    setMachinesEnabled(false);
    AudioFX.tap();

    const ok = catId === item.cat;
    const dot = els.dots.querySelectorAll('span')[S.idx];
    S.answers.push({ item, selected: catId, correct: ok });

    if (ok) {
      S.combo += 1;
      S.bestCombo = Math.max(S.bestCombo, S.combo);
      const mult = Math.min(S.combo, 5);
      const pts = 100 * mult;
      S.points += pts;
      S.score += 1;
      machineEl.classList.add('hit');
      sparks(machineEl, catById[item.cat].color);
      floatPts(`+${pts}`, catById[item.cat].color);
      AudioFX.correct();
      say(`Correcto: ${item.display.value}. ${item.why} ${S.score} de ${CFG.rounds}.`);
    } else {
      S.combo = 0;
      machineEl.classList.add('err');
      sparks(machineEl, '#ff5470', 5);
      AudioFX.error();
      showToast(item);
      say(`Incorrecto. ${item.display.value} es ${catById[item.cat].label.toLowerCase()}. ${item.why}`);
    }

    if (dot) dot.classList.add(ok ? 'done-ok' : 'done-bad');
    updateHud();
    flyToMachine(machineEl);

    const wait = ok ? 620 : 1450;
    setTimeout(() => {
      if (session !== S.session) return;
      machineEl.classList.remove('hit', 'err');
      S.idx += 1;
      if (S.idx >= CFG.rounds) {
        endGame();
      } else {
        renderCard();
        S.busy = false;
        setMachinesEnabled(true);
      }
    }, wait);
  }

  function startGame() {
    AudioFX.unlock();
    S.session += 1;
    S.order = buildRound();
    S.idx = 0;
    S.score = 0;
    S.points = 0;
    S.combo = 0;
    S.bestCombo = 0;
    S.answers = [];
    S.busy = false;
    S.playing = true;

    setAnswersOpen(false);

    els.timeValue.textContent = '0 s';
    updateHud();
    renderDots();
    showScreen('game');
    renderCard();
    setMachinesEnabled(true);
    startTimer();
  }

  function endGame() {
    const secs = stopTimer();
    S.playing = false;
    const perfect = S.score === CFG.rounds;

    const rank = perfect
      ? { emoji: '🏆', title: '¡Modelo perfecto!' }
      : S.score >= 6
        ? { emoji: '⚡', title: '¡Buen turno!' }
        : S.score >= 4
          ? { emoji: '🔧', title: 'Turno regular' }
          : { emoji: '🧰', title: 'Sigue ensamblando' };

    els.resultEmoji.textContent = rank.emoji;
    els.resultTitle.textContent = rank.title;
    els.resultScore.textContent = `${S.score}/${CFG.rounds}`;
    els.resultTime.textContent = `${secs} s`;
    els.resultPoints.textContent = S.points;
    els.resultCombo.textContent = `×${Math.max(S.bestCombo, 1)}`;
    renderAnswerKey();

    AudioFX.result(perfect);
    showScreen('result');
    say(`Turno terminado. ${S.score} de ${CFG.rounds} correctas. ${S.points} puntos en ${secs} segundos.`);
  }

  /* ================= EVENTOS ================= */

  function goHome() {
    S.session += 1;
    S.playing = false;
    S.busy = false;
    clearInterval(S.timerId);
    S.timerId = null;
    els.toast.classList.remove('show');
    setAnswersOpen(false);
    els.card.classList.remove('enter', 'fly');
    els.card.style.transform = '';
    els.card.style.opacity = '';
    els.stage.querySelectorAll('.float-pts').forEach((floatie) => floatie.remove());
    els.machines.querySelectorAll('.machine').forEach((machine) => {
      machine.classList.remove('hit', 'err');
      machine.setAttribute('aria-disabled', 'false');
    });
    showScreen('title');
  }

  function bindEvents() {
    els.machines.addEventListener('click', (e) => {
      const btn = e.target.closest('.machine');
      if (btn) send(btn.dataset.cat, btn);
    });

    els.btnPlay.addEventListener('click', startGame);
    els.btnAgain.addEventListener('click', startGame);
    els.btnHome.addEventListener('click', goHome);
    els.btnAnswers.addEventListener('click', () => {
      setAnswersOpen(true, true);
    });
    els.btnCloseAnswers.addEventListener('click', () => {
      setAnswersOpen(false, true);
    });

    els.btnMute.addEventListener('click', () => {
      const muted = AudioFX.toggle();
      els.btnMute.textContent = muted ? '🔇' : '🔊';
      els.btnMute.setAttribute('aria-pressed', String(muted));
      els.btnMute.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar sonido');
    });

    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (!els.answerPanel.hidden) {
        if (e.key === 'Escape') {
          setAnswersOpen(false, true);
        }
        return;
      }
      if (els.screens.title.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startGame(); }
        return;
      }
      if (els.screens.result.classList.contains('active')) {
        if (e.key === 'Enter') startGame();
        return;
      }
      if (els.screens.game.classList.contains('active')) {
        const map = { '1': 'variables', '2': 'restriccion', '3': 'objetivo' };
        if (map[e.key]) {
          const btn = els.machines.querySelector(`.machine[data-cat="${map[e.key]}"]`);
          send(map[e.key], btn);
        }
      }
    });
  }

  /* ================= INIT ================= */

  function init() {
    renderMachines();
    renderDots();
    updateHud();

    const muted = AudioFX.muted;
    els.btnMute.textContent = muted ? '🔇' : '🔊';
    els.btnMute.setAttribute('aria-pressed', String(muted));

    // Colores de chips de portada
    document.querySelectorAll('.legend-chip').forEach((chip) => {
      const c = catById[chip.dataset.cat];
      if (c) chip.querySelector('.chip-icon').style.background = c.color;
    });

    bindEvents();
  }

  init();
})();
