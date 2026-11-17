// Shared behaviour for all pages: theme toggle, nav on scroll, reveal, copy buttons.
(function(){
  const root = document.documentElement;
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try{ localStorage.setItem('theme', root.dataset.theme); }catch(_){}
  });

  const nav = document.getElementById('topnav');
  if(nav){ const f = () => nav.classList.toggle('scrolled', scrollY > 40); addEventListener('scroll', f, {passive:true}); f(); }

  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); }
  else{
    const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(e => io.observe(e));
  }

  // <button data-copy="#id"> copies that element's text; <button data-copy-text="..."> copies the literal.
  document.querySelectorAll('[data-copy],[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const label = btn.textContent;
      const text = btn.dataset.copyText ?? document.querySelector(btn.dataset.copy)?.textContent ?? '';
      try{ await navigator.clipboard.writeText(text); btn.textContent = 'Copied ✓'; }
      catch(_){ if(btn.dataset.copyText?.includes('@')) location.href = 'mailto:' + btn.dataset.copyText; else btn.textContent = 'Press Ctrl/⌘+C'; }
      setTimeout(() => btn.textContent = label, 1500);
    });
  });
})();
