(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const config = window.MIEL_CONFIG || {};
  const loader = document.querySelector('.loading');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let firstVisit = true;
  try { firstVisit = sessionStorage.getItem('miel-visited') !== '1'; sessionStorage.setItem('miel-visited', '1'); } catch (_) {}
  if (firstVisit) {
    document.body.classList.add('locked'); loader.classList.add('active');
    setTimeout(() => { loader.classList.add('leaving'); setTimeout(() => { loader.remove(); document.body.classList.remove('locked'); }, reduced ? 0 : 700); }, reduced ? 300 : 1500);
  } else loader.remove();
  const hero = document.querySelector('.hero');
  const photos = [...document.querySelectorAll('.hero-image')];
  const bars = [...document.querySelectorAll('.progress i')];
  let queued = false;
  const clamp = v => Math.min(1, Math.max(0, v));
  function renderHero() {
    queued = false;
    const pinHeight = document.querySelector('.hero-pin').clientHeight;
    const range = Math.max(1, hero.offsetHeight - pinHeight);
    const progress = clamp(-hero.getBoundingClientRect().top / range);
    // 重なり合うレイヤーで、背景が白く抜けることなく往復します。
    photos[0].style.opacity = '1';
    photos[1].style.opacity = String(clamp((progress - .16) / .22));
    photos[2].style.opacity = String(clamp((progress - .54) / .22));
    bars.forEach((bar, i) => bar.classList.toggle('current', i === (progress < .27 ? 0 : progress < .65 ? 1 : 2)));
  }
  function queueRender() { if (!queued) { queued = true; requestAnimationFrame(renderHero); } }
  addEventListener('scroll', queueRender, { passive: true });
  addEventListener('resize', queueRender); renderHero();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  function validUrl(value, key) {
    try { const url = new URL(value); return url.protocol === 'https:' && (key !== 'instagram' || /(^|\.)instagram\.com$/.test(url.hostname)) ? url.href : ''; } catch (_) { return ''; }
  }
  ['square', 'instagram'].forEach(key => {
    const url = validUrl(config[key + 'Url'], key);
    if (!url) return;
    document.querySelectorAll(`[data-link="${key}"]`).forEach(link => { link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.removeAttribute('aria-disabled'); });
    document.querySelector(`[data-status="${key}"]`).textContent = key === 'square' ? 'Squareの予約ページで空き状況をご確認いただけます。' : '';
  });
  if (config.transparentLogo) {
    const logo = document.querySelector('.hero-logo');
    logo.onload = () => { logo.hidden = false; const note = document.querySelector('.hero-note'); if (note) note.hidden = true; };
    logo.src = config.transparentLogo;
  }
  const dialog = document.querySelector('.lightbox');
  let previousFocus;
  document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
    previousFocus = button;
    const source = button.querySelector('img'); const enlarged = dialog.querySelector('img');
    enlarged.src = source.src; enlarged.alt = source.alt; dialog.querySelector('p').textContent = source.alt;
    dialog.showModal(); document.body.classList.add('locked');
  }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('locked'); if (previousFocus) previousFocus.focus(); });
  const calendarDate = new Date();
  calendarDate.setDate(1);
  function renderCalendar() {
    const year = calendarDate.getFullYear(), month = calendarDate.getMonth();
    document.querySelector('.calendar-month').textContent = `${year}年 ${month + 1}月`;
    const grid = document.querySelector('.calendar-days');
    grid.replaceChildren();
    const start = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    for (let index = 0; index < Math.ceil((start + count) / 7) * 7; index++) {
      const cell = document.createElement('span');
      const day = index - start + 1;
      if (day > 0 && day <= count) { cell.textContent = String(day); cell.setAttribute('aria-label', `${month + 1}月${day}日`); }
      else cell.setAttribute('aria-hidden', 'true');
      grid.append(cell);
    }
  }
  document.querySelector('.calendar-prev').addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); });
  document.querySelector('.calendar-next').addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });
  renderCalendar();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
