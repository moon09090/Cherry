/* ---------- state ---------- */
const LS='cherry.v1';
let S;
const ui={view:'Home',planDate:today(),tf:'All',confirm:false,busy:false,pendingAsk:null};
function loadS(){try{const r=localStorage.getItem(LS);if(r)return JSON.parse(r)}catch(e){}return null}
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
function seed(){
  const t=today(),d=n=>addDays(t,n),I=()=>uid();
  const hl={};[[-6,6,7,3,62.6],[-5,7,7.5,4,62.5],[-4,5,6.5,3,62.5],[-3,8,8,5,62.3],[-2,6,7,4,62.3],[-1,7,7.5,4,62.2]].forEach(a=>{hl[d(a[0])]={water:a[1],sleep:a[2],mood:a[3],weight:a[4],demo:1}});
  return{v:1,demo:true,theme:'blossom',subjects:['Mathematics','Physics','English'],studyGoal:180,waterGoal:8,sleepGoal:8,moveGoal:150,
    settings:{key:'',model:'openrouter/auto',voice:false,name:''},chat:[],
    tasks:[
      {id:I(),title:'Finish physics chapter 6 problems',pri:'high',due:t,done:false,demo:1},
      {id:I(),title:'Revise English essay outline',pri:'med',due:d(1),done:false,demo:1},
      {id:I(),title:'Read 20 pages of the novel',pri:'low',due:d(2),done:false,demo:1},
      {id:I(),title:'Submit scholarship form',pri:'high',due:d(-1),done:true,demo:1}],
    plans:{[t]:[
      {id:I(),time:'06:30',text:'Morning walk and stretch',done:true,demo:1},
      {id:I(),time:'09:00',text:'Deep study: Mathematics',done:false,demo:1},
      {id:I(),time:'13:30',text:'Practice problems: Physics',done:false,demo:1},
      {id:I(),time:'18:00',text:'Workout',done:false,demo:1},
      {id:I(),time:'21:30',text:'Plan tomorrow and wind down',done:false,demo:1}]},
    study:[[0,'Mathematics',45],[-1,'Physics',95],[-2,'Mathematics',120],[-3,'English',60],[-4,'Physics',150],[-5,'Mathematics',110],[-6,'English',80]].map(a=>({id:I(),date:d(a[0]),subject:a[1],mins:a[2],demo:1})),
    habits:[
      {id:I(),name:'Review notes for 20 minutes',log:{[d(-1)]:1,[d(-2)]:1,[d(-3)]:1,[d(-5)]:1},demo:1},
      {id:I(),name:'Phone out of reach while studying',log:{[d(-1)]:1,[d(-2)]:1},demo:1},
      {id:I(),name:'Lights out by 11 pm',log:{[d(-2)]:1,[d(-4)]:1},demo:1}],
    focus:[[-1,50,'Mathematics'],[-2,75,'Mathematics'],[-3,25,'English'],[-4,100,'Physics'],[-6,50,'English']].map(a=>({id:I(),date:d(a[0]),mins:a[1],label:a[2],demo:1})),
    health:hl,
    workouts:[[-1,'Running',30],[-3,'Strength',45],[-4,'Yoga',25],[-6,'Cycling',40]].map(a=>({id:I(),date:d(a[0]),type:a[1],mins:a[2],demo:1})),
    results:[['Unit test 1','Mathematics',68,100,-60],['Unit test 1','Physics',72,100,-50],['Mid-term','Mathematics',76,100,-35],['Quiz','English',41,50,-25],['Lab report','Physics',83,100,-14],['Unit test 2','Mathematics',88,100,-6]].map(a=>({id:I(),exam:a[0],subject:a[1],score:a[2],max:a[3],date:d(a[4]),demo:1})),
    dreams:[
      {id:I(),title:'Score 90% in the final exams',why:'It opens the door to the university I want',target:d(120),progress:62,done:false,demo:1},
      {id:I(),title:'Run a 10 km race',why:'Prove to myself that consistency works',target:d(75),progress:45,done:false,demo:1},
      {id:I(),title:'Learn to play piano',why:'Music calms me down',target:d(300),progress:25,done:false,demo:1},
      {id:I(),title:'Read 24 books this year',why:'',target:d(-10),progress:100,done:true,demo:1},
      {id:I(),title:'Build and launch my own app',why:'Turn an idea into something real',target:d(200),progress:15,done:false,demo:1}]};
}

/* ---------- small data helpers ---------- */
const sMins=k=>S.study.filter(s=>s.date===k).reduce((a,s)=>a+s.mins,0);
const fMins=k=>S.focus.filter(s=>s.date===k).reduce((a,s)=>a+s.mins,0);
const wMins=k=>S.workouts.filter(s=>s.date===k).reduce((a,s)=>a+s.mins,0);
const H=k=>S.health[k]||{};
function setH(f,v){const k=today();S.health[k]=Object.assign({},S.health[k],{[f]:v});delete S.health[k].demo;save()}
function streak(is){let k=today(),n=0;if(!is(k))k=addDays(k,-1);while(is(k)&&n<400){n++;k=addDays(k,-1)}return n}
const pct=(a,b)=>b>0?Math.max(0,Math.min(100,Math.round(a/b*100))):0;
const grade=p=>p>=90?'A+':p>=80?'A':p>=70?'B':p>=60?'C':p>=50?'D':'E';
const PRI={high:0,med:1,low:2};
const taskSort=(a,b)=>(a.done-b.done)||(PRI[a.pri]-PRI[b.pri])||((a.due||'9').localeCompare(b.due||'9'));
const fmtT=s=>pad(Math.floor(s/60))+':'+pad(s%60);
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),2600)}
function md(s){let h=esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
  let out='',inl=false;
  for(const ln of h.split('\n')){const m=ln.match(/^\s*(?:[-*]|\d+\.)\s+(.*)/);
    if(m){if(!inl){out+='<ul>';inl=true}out+='<li>'+m[1]+'</li>'}else{if(inl){out+='</ul>';inl=false}if(ln.trim())out+='<p>'+ln+'</p>'}}
  return out+(inl?'</ul>':'')}

