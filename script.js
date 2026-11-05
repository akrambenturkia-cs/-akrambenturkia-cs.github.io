const svg = document.getElementById('network-svg');

if (svg) {
  const nodes = [
    { x: 0.12, y: 0.14 },
    { x: 0.28, y: 0.25 },
    { x: 0.43, y: 0.18 },
    { x: 0.67, y: 0.24 },
    { x: 0.83, y: 0.18 },
    { x: 0.28, y: 0.55 },
    { x: 0.53, y: 0.48 },
    { x: 0.76, y: 0.56 },
    { x: 0.18, y: 0.78 },
    { x: 0.42, y: 0.78 },
    { x: 0.68, y: 0.8 },
    { x: 0.88, y: 0.72 }
  ];

  function renderNetwork() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';

    const lines = [];
    const circles = [];

    for (let i = 0; i < nodes.length; i += 1) {
      const cx = nodes[i].x * w;
      const cy = nodes[i].y * h;
      circles.push(`<circle cx="${cx}" cy="${cy}" r="2.5" fill="rgba(176,141,87,0.9)" />`);

      for (let j = i + 1; j < nodes.length; j += 1) {
        const x2 = nodes[j].x * w;
        const y2 = nodes[j].y * h;
        const dx = cx - x2;
        const dy = cy - y2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 210) {
          lines.push(
            `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(242,237,227,0.14)" stroke-width="1.2" />`
          );
        }
      }
    }

    svg.innerHTML = [...lines, ...circles].join('');
  }

  renderNetwork();
  window.addEventListener('resize', renderNetwork);
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => revealObserver.observe(item));
