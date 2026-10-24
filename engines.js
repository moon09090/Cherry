/* ---------- sound + voice ---------- */
let AC;
function beep(n=3){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();for(let i=0;i<n;i++){const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=i%2?660:880;o.connect(g);g.connect(AC.destination);const st=AC.currentTime+i*.22;g.gain.setValueAtTime(.0001,st);g.gain.exponentialRampToValueAtTime(.2,st+.02);g.gain.exponentialRampToValueAtTime(.0001,st+.2);o.start(st);o.stop(st+.22)}}catch(e){}}
function say(t){if(S.settings.voice&&'speechSynthesis' in window){try{speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}catch(e){}}}

/* ---------- focus timer + coach commands ---------- */
const CUES=['Eyes on the page. Nothing else exists.','Sit tall and drop your shoulders.','Take a slow breath, then keep going.','Stuck? Write the question down and move on.','Sip some water, then continue.','You are doing great. Stay with it.','One more push. Finish the paragraph.'];
const F={total:1500,left:1500,run:false,end:0,label:'Deep work',line:'Choose a length and press start.',cues:0,half:false,fin:false};
function fCue(t){F.line=t;say(t);const e=$('#f-line');if(e)e.textContent=t}
function fStart(){if(F.run)return;const fresh=F.left===F.total;F.run=true;F.end=Date.now()+F.left*1000;
  if(fresh){F.cues=0;F.half=false;F.fin=false;fCue('Phone away. One task only. Begin.')}else fCue('Back to it. Eyes on the work.');beep(1)}
function fPause(){if(!F.run)return;F.left=Math.max(0,Math.ceil((F.end-Date.now())/1000));F.run=false;F.line='Paused. Breathe, then resume when ready.'}
function fReset(){F.run=false;F.left=F.total;F.line='Choose a length and press start.'}
function fDone(){F.run=false;const m=Math.round(F.total/60),id=uid();
  S.focus.push({id,date:today(),mins:m,label:F.label});
  if(S.subjects.includes(F.label))S.study.push({id:uid(),date:today(),subject:F.label,mins:m});
  save();F.left=F.total;fCue('Session complete. Stand up, stretch and drink some water.');beep(3);toast(m+' minutes of focus logged');
  if(ui.view==='Focus'||ui.view==='Home')render()}
function fTick(){
  if(F.run){F.left=Math.max(0,Math.ceil((F.end-Date.now())/1000));const el=F.total-F.left;
    if(F.left<=0){fDone();return}
    if(!F.half&&el>=F.total/2&&F.total>=300){F.half=true;fCue('Halfway there. Keep the same pace.')}
    else if(!F.fin&&F.left<=60&&F.total>=300){F.fin=true;fCue('Final minute. Finish strong.')}
    else{const i=Math.floor(el/90);if(i>F.cues&&el>0){F.cues=i;fCue(CUES[i%CUES.length])}}}
  const t=$('#f-time'),r=$('#f-ring');
  if(t){t.textContent=fmtT(F.left);if(r){const rr=+r.getAttribute('r'),c=2*Math.PI*rr;r.setAttribute('stroke-dasharray',(c*(F.total-F.left)/F.total)+' '+c)}}
}

/* ---------- guided workout ---------- */
const EX=['Jumping jacks','Wall sit','Push-ups','Crunches','High knees','Squats','Plank','Lunges'];
const W={run:false,idx:0,left:0,end:0,steps:[],cmd:'Ready when you are.'};
function wBuild(){const s=[];EX.forEach((n,i)=>{s.push({name:n,secs:30,kind:'work'});if(i<EX.length-1)s.push({name:'Rest',secs:10,kind:'rest',next:EX[i+1]})});return s}
function wCue(){const s=W.steps[W.idx];W.cmd=s.kind==='work'?s.name+'. Go!':'Rest. Next up: '+s.next+'.';say(W.cmd);beep(1);const e=$('#w-name');if(e)e.textContent=s.kind==='work'?s.name:'Rest'}
function wStart(){W.steps=wBuild();W.idx=0;W.left=W.steps[0].secs;W.end=Date.now()+W.left*1000;W.run=true;wCue()}
function wStop(){W.run=false;W.cmd='Workout stopped.';(typeof speechSynthesis!=='undefined'&&speechSynthesis.cancel())}
function wTick(){
  if(!W.run)return;W.left=Math.max(0,Math.ceil((W.end-Date.now())/1000));
  if(W.left<=0){W.idx++;
    if(W.idx>=W.steps.length){W.run=false;S.workouts.push({id:uid(),date:today(),type:'Guided circuit',mins:5});save();W.cmd='Workout complete. Great work. Cool down and drink water.';say(W.cmd);beep(3);toast('Circuit complete, 5 minutes logged');if(ui.view==='Move'||ui.view==='Home')render();return}
    W.left=W.steps[W.idx].secs;W.end=Date.now()+W.left*1000;wCue();if(ui.view==='Move')render();return}
  const t=$('#w-time'),r=$('#w-ring');
  if(t){t.textContent=W.left;if(r){const s=W.steps[W.idx],rr=+r.getAttribute('r'),c=2*Math.PI*rr;r.setAttribute('stroke-dasharray',(c*(s.secs-W.left)/s.secs)+' '+c)}}
}
function tick(){fTick();wTick()}

/* ---------- coach: what to do right now ---------- */
function coachNow(){
  if(F.run)return{text:F.line,label:'Open timer',go:'Focus'};
  if(W.run)return{text:W.cmd,label:'Open workout',go:'Move'};
  const hr=new Date().getHours(),t=today();
  if(hr>=23||hr<5)return{text:'It is late. Close the books and go to sleep. Memory is built during rest.',label:'Log sleep',go:'Health'};
  const hi=S.tasks.filter(x=>!x.done).sort(taskSort)[0];
  const nx=(S.plans[t]||[]).filter(p=>!p.done).sort((a,b)=>a.time.localeCompare(b.time))[0];
  if(hr>=10&&(H(t).water||0)<2)return{text:'Drink a glass of water now, then get back to work.',label:'Log water',go:'Health'};
  if(hi&&hi.pri==='high')return{text:'Start “'+hi.title+'”. Set a 25 minute timer and begin.',label:'Start focus',go:'Focus'};
  if(nx)return{text:'Next on your plan at '+nx.time+': '+nx.text+'.',label:'Open plan',go:'Plan'};
  if(hi)return{text:'Pick up “'+hi.title+'”. Ten focused minutes is enough to start.',label:'Open tasks',go:'Tasks'};
  return{text:'Everything is done for now. Review your dreams or plan tomorrow.',label:'Plan tomorrow',go:'Plan'}}

