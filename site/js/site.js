(() => {
  const D = document;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealNear = () => {
    D.querySelectorAll('[data-r]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95 && r.bottom > 0) el.classList.add('in');
    });
  };

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px 0px 0px', threshold: 0.01 });
  D.querySelectorAll('[data-r]').forEach(el => io.observe(el));
  if (RM) D.querySelectorAll('[data-r]').forEach(el => el.classList.add('in'));
  revealNear();
  addEventListener('load', revealNear);

  const bar = D.getElementById('bar');
  const hero = D.getElementById('hero');
  const tickBar = () => {
    if (!bar) return;
    if (!hero) { bar.classList.add('lt'); return; }
    bar.classList.toggle('lt', hero.getBoundingClientRect().bottom < 72);
  };
  tickBar();
  addEventListener('scroll', () => { tickBar(); revealNear(); }, { passive: true });
  addEventListener('resize', () => { tickBar(); revealNear(); });

  const sec = D.querySelector('.acad-C');
  if (sec) {
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const tickPath = () => {
      if (RM) {
        sec.querySelectorAll('.bs').forEach(x => x.style.setProperty('--d', '0'));
        sec.querySelectorAll('.nd, .stg').forEach(n => n.classList.add('on'));
        return;
      }
      const r = sec.getBoundingClientRect();
      const h = Math.max(sec.offsetHeight, 1);
      let p = (innerHeight * 0.85 - r.top) / (h * 0.7);
      p = Math.min(1, Math.max(0, p));
      p = ease(p);
      sec.querySelectorAll('.bs').forEach(x => x.style.setProperty('--d', (1 - p).toFixed(4)));
      const th = innerWidth < 861 ? [0.12, 0.45, 0.78] : [0.2, 0.5, 0.82];
      sec.querySelectorAll('.nd').forEach((n, i) => n.classList.toggle('on', p >= th[i] - 0.04));
      sec.querySelectorAll('.stg').forEach((s, i) => s.classList.toggle('on', p >= th[i] - 0.04));
    };
    tickPath();
    addEventListener('scroll', tickPath, { passive: true });
    addEventListener('resize', tickPath);
  }
})();
