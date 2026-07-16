const app=document.getElementById('app');
if(app){app.innerHTML=(window.YH_PART_1||'')+(window.YH_PART_2||'')+(window.YH_PART_3||'');}

const menu=document.querySelector('.menu');
const openBtn=document.querySelector('.menu-btn');
const closeBtn=document.querySelector('.menu-close');
const body=document.body;
const openMenu=()=>{menu?.classList.add('open');body.classList.add('menu-open')};
const closeMenu=()=>{menu?.classList.remove('open');body.classList.remove('menu-open')};
openBtn?.addEventListener('click',openMenu);
closeBtn?.addEventListener('click',closeMenu);
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.q')?.addEventListener('click',()=>item.classList.toggle('open'));
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const cursor=document.querySelector('.cursor');
const kinetic=document.querySelector('.kinetic-mark');
const heroMedia=document.querySelector('.hero-media');
window.addEventListener('mousemove',e=>{
  if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}
  const x=(e.clientX/window.innerWidth-.5);
  const y=(e.clientY/window.innerHeight-.5);
  if(kinetic) kinetic.style.transform=`translate3d(${x*28}px,${y*28}px,0) rotate(${x*7}deg)`;
  if(heroMedia) heroMedia.style.transform=`rotate(${-2+x*2}deg) translate3d(${x*-8}px,${y*-8}px,0)`;
});

document.querySelectorAll('a,button,.project,.article,.chip,.tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor?.classList.add('active'));
  el.addEventListener('mouseleave',()=>cursor?.classList.remove('active'));
});

const progress=document.querySelector('.scroll-progress');
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?window.scrollY/max:0;
  if(progress) progress.style.width=(ratio*100)+'%';
  document.querySelectorAll('.project img').forEach(img=>{
    const r=img.getBoundingClientRect();
    const offset=(r.top-window.innerHeight/2)*-.025;
    img.style.transform=`scale(1.08) translateY(${offset}px)`;
  });
},{passive:true});

document.querySelectorAll('[data-count]').forEach(el=>{
  let done=false;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting&&!done){
      done=true;
      const end=Number(el.dataset.count||0);
      const suffix=el.dataset.suffix||'';
      const start=performance.now();
      const duration=1300;
      const tick=now=>{
        const p=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-p,3);
        el.textContent=Math.floor(end*eased)+suffix;
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }
  }),{threshold:.5});
  observer.observe(el);
});
