/* ---------- shell ---------- */
const VIEWS={Home:homeView,Plan:planView,Study:studyView,Focus:focusView,Health:healthView,Move:moveView,Tasks:tasksView,Results:resultsView,Dreams:dreamsView,AI:aiView,Style:styleView};
const NAV=[['Home','Home','home'],['Plan','Plan','plan'],['Study','Study','book'],['Focus','Focus','focus'],['Health','Health','heart'],['Move','Exercise','dumb'],['Tasks','Tasks','tasks'],['Results','Results','chart'],['Dreams','Dreams','star'],['AI','Cherry AI','spark'],['Style','Style','palette']];
function render(){
  $('#nav').innerHTML=NAV.map(n=>`<button data-act="go" data-v="${n[0]}" ${ui.view===n[0]?'aria-current="page"':''}>${ic(n[2],20)}<span>${n[1]}</span></button>`).join('');
  $('#view').innerHTML=VIEWS[ui.view]();
  if(ui.view==='AI'){const l=$('#chatlog');if(l)l.scrollTop=l.scrollHeight}
}

/* ---------- actions ---------- */
const ACTS={
  go(b){ui.view=b.dataset.v;ui.confirm=false;render();scrollTo({top:0})},
  theme(b){applyTheme(b.dataset.id);save();render()},
  clearDemo(){S.demo=false;['tasks','study','habits','focus','workouts','results','dreams'].forEach(k=>{S[k]=S[k].filter(x=>!x.demo)});
    Object.keys(S.plans).forEach(k=>{S.plans[k]=S.plans[k].filter(x=>!x.demo)});Object.keys(S.health).forEach(k=>{if(S.health[k].demo)delete S.health[k]});save();render();toast('Example data cleared')},
  reset(){if(!ui.confirm){ui.confirm=true;render();return}try{localStorage.removeItem(LS)}catch(e){}S=seed();S.demo=false;['tasks','study','habits','focus','workouts','results','dreams'].forEach(k=>{S[k]=[]});S.plans={};S.health={};ui.confirm=false;applyTheme('blossom');save();render();toast('Everything erased')},
  voice(){S.settings.voice=!S.settings.voice;save();if(S.settings.voice)say('Voice coach on.');render()},
  ttoggle(b){const t=S.tasks.find(x=>x.id===b.dataset.id);if(t){t.done=!t.done;save();render()}},
  tdel(b){S.tasks=S.tasks.filter(x=>x.id!==b.dataset.id);save();render()},
  tfilter(b){ui.tf=b.dataset.f;render()},
  pday(b){ui.planDate=addDays(ui.planDate,+b.dataset.d);render()},
  ptoday(){ui.planDate=today();render()},
  ptoggle(b){const p=(S.plans[ui.planDate]||[]).find(x=>x.id===b.dataset.id);if(p){p.done=!p.done;save();render()}},
  pdel(b){S.plans[ui.planDate]=(S.plans[ui.planDate]||[]).filter(x=>x.id!==b.dataset.id);save();render()},
  aiplan(){ui.view='AI';ask(PROMPTS[0][1])},
  sdel(b){S.study=S.study.filter(x=>x.id!==b.dataset.id);save();render()},
  addsub(){const i=$('#study-new'),v=i&&i.value.trim();if(v&&!S.subjects.includes(v)){S.subjects.push(v);save();render();toast('Subject added')}},
  hdot(b){const h=S.habits.find(x=>x.id===b.dataset.id),d=b.dataset.d;if(h){if(h.log[d])delete h.log[d];else h.log[d]=1;save();render()}},
  hdel(b){S.habits=S.habits.filter(x=>x.id!==b.dataset.id);save();render()},
  fpreset(b){if(F.run)return;F.total=F.left=+b.dataset.m*60;render()},
  fstart(){fStart();render()},fpause(){fPause();render()},freset(){fReset();render()},
  water(b){const w=Math.max(0,(H(today()).water||0)+(+b.dataset.d));setH('water',w);render()},
  mood(b){setH('mood',+b.dataset.n);render()},
  wstart(){wStart();render()},wstop(){wStop();render()},
  wdel(b){S.workouts=S.workouts.filter(x=>x.id!==b.dataset.id);save();render()},
  rdel(b){S.results=S.results.filter(x=>x.id!==b.dataset.id);save();render()},
  dcomp(b){const d=S.dreams.find(x=>x.id===b.dataset.id);if(d){d.done=!d.done;if(d.done){d.progress=100;beep(2);toast('Dream completed. Well done!')}else d.progress=90;save();render()}},
  ddel(b){S.dreams=S.dreams.filter(x=>x.id!==b.dataset.id);save();render()},
  aiq(b){ask(PROMPTS[+b.dataset.i][1])},
  aiclear(){S.chat=[];save();render()},
  setmodel(b){S.settings.model=b.dataset.m;save();render()},
  loadmodels(){loadModels()}
};
const CHG={
  flabel(el){F.label=el.value},
  fcustom(el){if(F.run)return;const m=Math.max(1,Math.min(240,+el.value||25));F.total=F.left=m*60;render()},
  sleep(el){setH('sleep',el.value===''?null:+el.value);render()},
  weight(el){setH('weight',el.value===''?null:+el.value);render()},
  dprog(el){const d=S.dreams.find(x=>x.id===el.dataset.id);if(d){d.progress=+el.value;if(d.progress>=100){d.done=true;beep(2);toast('Dream completed. Well done!')}save();render()}}
};
const FORMS={
  task(f){const t=f.get('title').trim();if(!t)return;S.tasks.push({id:uid(),title:t,pri:f.get('pri'),due:f.get('due')||'',done:false});save();render()},
  plan(f){const k=ui.planDate;(S.plans[k]=S.plans[k]||[]).push({id:uid(),time:f.get('time'),text:f.get('text').trim(),done:false});save();render()},
  study(f){S.study.push({id:uid(),date:today(),subject:f.get('subject'),mins:Math.max(1,+f.get('mins')||0)});save();render();toast('Session logged')},
  habit(f){const n=f.get('name').trim();if(!n)return;S.habits.push({id:uid(),name:n,log:{}});save();render()},
  workout(f){S.workouts.push({id:uid(),date:today(),type:f.get('type'),mins:Math.max(1,+f.get('mins')||0)});save();render();toast('Workout logged')},
  result(f){const mx=+f.get('max')||100,sc=+f.get('score');const sub=f.get('subject').trim();if(!sub)return;if(!S.subjects.includes(sub))S.subjects.push(sub);
    S.results.push({id:uid(),exam:f.get('exam').trim(),subject:sub,score:Math.min(sc,mx),max:mx,date:f.get('date')||today()});save();render();toast('Result saved')},
  dream(f){S.dreams.push({id:uid(),title:f.get('title').trim(),why:f.get('why').trim(),target:f.get('target')||'',progress:0,done:false});save();render()},
  aikey(f){S.settings.key=f.get('key').trim();S.settings.model=f.get('model').trim()||'openrouter/auto';save();render();toast('AI settings saved')},
  ai(f){const t=f.get('text').trim();if(t&&!ui.busy)ask(t)},
  name(f){S.settings.name=f.get('name').trim();save();toast('Saved')}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&ACTS[b.dataset.act]){e.preventDefault();ACTS[b.dataset.act](b)}});
document.addEventListener('change',e=>{const el=e.target.closest('[data-chg]');if(el&&CHG[el.dataset.chg])CHG[el.dataset.chg](el)});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-form]');if(!f)return;e.preventDefault();const fn=FORMS[f.dataset.form];if(fn)fn(new FormData(f),f)});

/* ---------- boot ---------- */
(function boot(){
  S=loadS()||seed();
  const D0=seed();for(const k in D0)if(S[k]==null)S[k]=D0[k];S.settings=Object.assign({},D0.settings,S.settings);
  $('#brand').innerHTML=LOGO(46)+'<div><div class="wm">Cherry</div><div class="tag">study · focus · grow</div></div>';
  try{const l=document.createElement('link');l.rel='icon';l.href='data:image/svg+xml,'+encodeURIComponent(LOGO(64).replace('role="img" aria-label="Cherry"','xmlns="http://www.w3.org/2000/svg"'));document.head.appendChild(l)}catch(e){}
  applyTheme(S.theme);save();render();setInterval(tick,250);
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){navigator.serviceWorker.register('sw.js').catch(()=>{})}
})();
