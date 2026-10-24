/* ---------- views B ---------- */
function tasksView(){
  const t=today(),f=ui.tf;let list=S.tasks.slice().sort(taskSort);
  if(f==='Today')list=list.filter(x=>x.due===t);else if(f==='Open')list=list.filter(x=>!x.done);else if(f==='Done')list=list.filter(x=>x.done);
  const dn=S.tasks.filter(x=>x.done).length;
  const due=x=>{if(!x.due)return'';const od=x.due<t&&!x.done;return`<span ${od?'style="color:var(--bad);font-weight:700"':''}>${x.due===t?'Today':od?'Overdue, '+fmtD(x.due):fmtD(x.due)}</span>`};
  return head('Tasks','Capture it, rank it, finish it.')+
  `<div class="two"><div class="card"><div class="chips" style="margin-bottom:6px">${['All','Today','Open','Done'].map(x=>`<button class="chip" data-act="tfilter" data-f="${x}" aria-pressed="${f===x}">${x}</button>`).join('')}</div>${meter('Completed',dn,Math.max(1,S.tasks.length),dn+' of '+S.tasks.length)}
   ${list.length?list.map(x=>`<div class="row ${x.done?'done':''}"><button class="chk ${x.done?'on':''}" data-act="ttoggle" data-id="${x.id}" aria-label="Toggle ${esc(x.title)}">${x.done?ic('check',14):''}</button><div class="grow"><div class="rt">${esc(x.title)}</div><div class="meta"><span class="pill p-${x.pri}">${x.pri}</span>${due(x)}${exTag(x)}</div></div><button class="icon-btn" data-act="tdel" data-id="${x.id}" aria-label="Delete">${ic('trash',16)}</button></div>`).join(''):'<p class="empty">Nothing here.</p>'}</div>
  <form class="card" data-form="task"><h3>New task</h3><label class="f" style="margin-bottom:10px"><span>Title</span><input id="task-title" name="title" placeholder="Write lab report" required></label><div class="fr"><label class="f"><span>Priority</span><select id="task-pri" name="pri"><option value="high">High</option><option value="med" selected>Medium</option><option value="low">Low</option></select></label><label class="f"><span>Due</span><input id="task-due" name="due" type="date" value="${t}"></label></div><button class="btn" style="margin-top:12px">${ic('plus',16)} Add task</button></form></div>`}

function resultsView(){
  const rs=S.results.slice().sort((a,b)=>a.date.localeCompare(b.date)),P=r=>Math.round(r.score/r.max*100),by={};
  rs.forEach(r=>{(by[r.subject]=by[r.subject]||[]).push(P(r))});
  const avg=rs.length?Math.round(rs.reduce((a,r)=>a+P(r),0)/rs.length):0,best=rs.length?Math.max(...rs.map(P)):0,lastp=rs.length?P(rs[rs.length-1]):0;
  const delta=rs.length>1?lastp-Math.round(rs.slice(0,-1).reduce((a,r)=>a+P(r),0)/(rs.length-1)):0;
  return head('Results','Record every score and watch the trend, not just the number.')+
  `<div class="two"><div class="card"><div class="hero" style="margin-bottom:14px">${ring(avg,110,avg+'%','average')}<div class="grow"><h3>${rs.length?'Latest '+lastp+'% · '+grade(lastp):'No results yet'}</h3><p class="muted">Best ${best}%${rs.length>1?' · '+(delta>=0?'up ':'down ')+Math.abs(delta)+' points vs earlier average':''}</p></div></div>${line(rs.map(r=>({x:fmtD(r.date),y:P(r)})),{label:'Score trend'})}</div>
  <form class="card" data-form="result"><h3>Add a result</h3><div class="fr"><label class="f"><span>Exam</span><input id="res-exam" name="exam" placeholder="Mid-term" required></label><label class="f"><span>Subject</span><input id="res-sub" name="subject" list="subs" placeholder="Physics" required></label></div><datalist id="subs">${S.subjects.map(s=>`<option value="${esc(s)}">`).join('')}</datalist>
   <div class="fr" style="margin-top:10px"><label class="f"><span>Score</span><input id="res-score" name="score" type="number" step="0.5" min="0" required></label><label class="f"><span>Out of</span><input id="res-max" name="max" type="number" min="1" value="100" required></label><label class="f"><span>Date</span><input id="res-date" name="date" type="date" value="${today()}"></label></div><button class="btn" style="margin-top:12px">${ic('plus',16)} Save result</button></form></div>
  <div class="two"><div class="card"><h3>By subject</h3>${Object.keys(by).length?Object.entries(by).map(a=>meter(esc(a[0]),Math.round(a[1].reduce((x,y)=>x+y,0)/a[1].length),100,Math.round(a[1].reduce((x,y)=>x+y,0)/a[1].length)+'% avg')).join(''):'<p class="empty">Add a result to see subjects.</p>'}</div>
  <div class="card"><h3>History</h3>${rs.length?rs.slice().reverse().map(r=>`<div class="row"><div class="grow"><div class="rt">${esc(r.subject)}: ${esc(r.exam)}</div><div class="meta">${fmtD(r.date)} · ${r.score}/${r.max} ${exTag(r)}</div></div><span class="pill ${P(r)>=70?'p-ok':P(r)>=50?'p-med':'p-high'}">${P(r)}% ${grade(P(r))}</span><button class="icon-btn" data-act="rdel" data-id="${r.id}" aria-label="Delete">${ic('trash',16)}</button></div>`).join(''):'<p class="empty">No results yet.</p>'}</div></div>`}

function dreamsView(){
  const dn=S.dreams.filter(d=>d.done).length,dt=S.dreams.length,t=today();
  const left=d=>{if(!d.target)return'';const n=Math.round((parse(d.target)-parse(t))/864e5);return n>0?'in '+n+' days':n===0?'today':Math.abs(n)+' days ago'};
  const sorted=S.dreams.slice().sort((a,b)=>(a.done-b.done)||((a.target||'9').localeCompare(b.target||'9')));
  return head('Dreams','The big things you are working toward, and how far you have come.')+
  `<div class="two"><div class="card hero">${ring(pct(dn,dt),150,dn+'/'+dt,'completed',13)}<div class="grow"><h3>${dn} of ${dt} dreams completed</h3><p class="muted">${dt-dn} still in progress. Average progress ${dt?Math.round(S.dreams.reduce((a,d)=>a+(d.done?100:d.progress),0)/dt):0}%.</p></div></div>
  <form class="card" data-form="dream"><h3>New dream</h3><label class="f" style="margin-bottom:10px"><span>Dream</span><input id="dream-title" name="title" placeholder="Visit Japan" required></label><div class="fr"><label class="f" style="flex:2 1 160px"><span>Why it matters</span><input id="dream-why" name="why" placeholder="Optional"></label><label class="f"><span>Target date</span><input id="dream-date" name="target" type="date"></label></div><button class="btn" style="margin-top:12px">${ic('plus',16)} Add dream</button></form></div>
  <div class="grid">${sorted.map(d=>`<div class="card" ${d.done?'style="border-color:var(--accent)"':''}><div class="fr" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><h3 style="margin:0">${esc(d.title)}</h3><button class="icon-btn" data-act="ddel" data-id="${d.id}" aria-label="Delete dream">${ic('trash',16)}</button></div>
   ${d.why?`<p class="muted" style="margin:6px 0 0">${esc(d.why)}</p>`:''}<div class="meta" style="margin:8px 0">${d.done?'<span class="pill p-ok">Achieved</span>':''}${d.target?`<span>Target ${fmtD(d.target)}, ${left(d)}</span>`:''}${exTag(d)}</div>
   ${meter('Progress',d.done?100:d.progress,100,(d.done?100:d.progress)+'%')}
   ${d.done?'':`<input id="dp-${d.id}" data-chg="dprog" data-id="${d.id}" type="range" min="0" max="100" step="5" value="${d.progress}" aria-label="Progress for ${esc(d.title)}">`}
   <button class="btn sm ${d.done?'ghost':''}" style="margin-top:10px" data-act="dcomp" data-id="${d.id}">${d.done?'Reopen':ic('check',14)+' Mark complete'}</button></div>`).join('')||'<p class="empty">Add your first dream.</p>'}</div>`}

function aiView(){
  const s=S.settings;
  return head('Cherry AI','Your coach, powered by any model on OpenRouter. It knows your tasks, dreams and recent results.')+
  `<datalist id="models">${MODELS.map(m=>`<option value="${m}">`).join('')}</datalist>
  <form class="card" data-form="aikey" style="margin-bottom:14px"><div class="fr"><label class="f" style="flex:1 1 220px"><span>OpenRouter API key</span><input id="ai-key" name="key" type="password" autocomplete="off" value="${esc(s.key)}" placeholder="sk-or-v1-..."></label><label class="f" style="flex:1 1 220px"><span>Model</span><input id="ai-model" name="model" list="models" value="${esc(s.model)}" placeholder="openrouter/auto"></label><button class="btn sm">Save</button><button class="btn sm ghost" type="button" data-act="loadmodels">Load all models</button></div>
   <div class="chips" style="margin-top:12px">${MODELS.slice(0,6).map(m=>`<button type="button" class="chip" data-act="setmodel" data-m="${m}" aria-pressed="${s.model===m}">${m.split('/')[1]}</button>`).join('')}</div>
   <p class="muted" style="margin-top:10px;font-size:13px">Your key stays in this browser only. Create one at openrouter.ai/keys.</p></form>
  <div class="card"><div class="chat" id="chatlog">${S.chat.length?S.chat.map(m=>`<div class="msg ${m.role==='user'?'u':'a'}">${m.role==='user'?'<p>'+esc(m.content)+'</p>':md(m.content)}</div>`).join(''):'<p class="empty">Ask Cherry to plan your day, explain a topic or quiz you.</p>'}${ui.busy?'<div class="msg a"><span class="typing"><i></i><i></i><i></i></span></div>':''}</div>
   <div class="chips" style="margin-bottom:12px">${PROMPTS.map((p,i)=>`<button class="chip" data-act="aiq" data-i="${i}">${p[0]}</button>`).join('')}${S.chat.length?'<button class="chip" data-act="aiclear">Clear chat</button>':''}</div>
   <form data-form="ai" class="fr" style="flex-wrap:nowrap"><input id="ai-text" name="text" placeholder="Ask anything about your studies..." autocomplete="off" required><button class="btn" ${ui.busy?'disabled':''} aria-label="Send">${ic('send',16)}</button></form></div>`}

function styleView(){
  const card=t=>`<button class="tcard ${S.theme===t.id?'on':''}" data-act="theme" data-id="${t.id}" aria-pressed="${S.theme===t.id}" style="--p1:${t.v.bg};--p2:${t.v.bg2};--pa:${t.v.accent};--pb:${t.v.accent2}"><span class="sw"><i></i><i></i></span><b>${t.name}</b><small class="${t.fx?'live':''}">${t.fxl}</small></button>`;
  return head('Style','Ten animated worlds and five calm, simple looks.')+
  `<div class="card" style="margin-bottom:14px"><h3>Animated themes</h3><div class="themes">${T.filter(t=>t.fx).map(card).join('')}</div></div>
  <div class="card" style="margin-bottom:14px"><h3>Simple themes</h3><div class="themes">${T.filter(t=>!t.fx).map(card).join('')}</div></div>
  <div class="two"><form class="card" data-form="name"><h3>You</h3><div class="fr"><label class="f"><span>Your name</span><input id="you-name" name="name" value="${esc(S.settings.name)}" placeholder="Used in greetings"></label><button class="btn sm">Save</button></div>
   <div class="chips" style="margin-top:14px"><button type="button" class="chip" data-act="voice" aria-pressed="${S.settings.voice}">${ic('sound',14)} Voice coach ${S.settings.voice?'on':'off'}</button></div></form>
  <div class="card"><h3>Data</h3><p class="muted" style="margin-bottom:12px">Everything is stored in this browser.</p><div class="chips">${S.demo?'<button class="btn sm ghost" data-act="clearDemo">Clear example data</button>':''}<button class="btn sm ghost" data-act="reset">${ui.confirm?'Tap again to erase everything':'Reset everything'}</button></div></div></div>`}

