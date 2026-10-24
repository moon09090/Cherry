/* ---------- themes: 10 animated + 5 simple ---------- */
const BASE={good:'#5fe39b',warn:'#ffcf6b',bad:'#ff8080',sh:'0 10px 40px -20px rgba(0,0,0,.6)'};
const LIGHT_SEM={good:'#14804a',warn:'#8f5d00',bad:'#c0302f',sh:'0 12px 30px -18px rgba(60,20,40,.35)'};
const T=[
 {id:'blossom',name:'Sakura Night',fx:'blossom',fxl:'Petals',motion:'float',v:{bg:'#170812',bg2:'#2d0f22',surface:'#2a1423',fg:'#fdeef3',muted:'#c49aad',accent:'#ff5c7a',accent2:'#ffb3c4',line:'rgba(255,190,210,.16)',glow:'rgba(255,92,122,.4)',on:'#2b0714'}},
 {id:'aurora',name:'Aurora',fx:'aurora',fxl:'Curtains',motion:'shimmer',v:{bg:'#05121a',bg2:'#0b2b36',surface:'#0d2330',fg:'#e8fbff',muted:'#85b3c0',accent:'#5ef2c4',accent2:'#9d8cff',line:'rgba(160,255,240,.15)',glow:'rgba(94,242,196,.35)',on:'#03231c'}},
 {id:'stars',name:'Stardust',fx:'stars',fxl:'Starfall',motion:'glow',v:{bg:'#070914',bg2:'#151a3a',surface:'#12162e',fg:'#f3f1ff',muted:'#9ea3cc',accent:'#ffd479',accent2:'#ffb36b',line:'rgba(200,205,255,.16)',glow:'rgba(255,212,121,.3)',on:'#2a1c02'}},
 {id:'ocean',name:'Deep Ocean',fx:'ocean',fxl:'Waves',motion:'lift',v:{bg:'#03121d',bg2:'#07334a',surface:'#082536',fg:'#e6f7ff',muted:'#86b4c9',accent:'#4cc9f0',accent2:'#7af0d8',line:'rgba(140,220,255,.16)',glow:'rgba(76,201,240,.35)',on:'#02202c'}},
 {id:'matrix',name:'Code Rain',fx:'matrix',fxl:'Glyph rain',motion:'glow',v:{bg:'#020a05',bg2:'#06240f',surface:'#07170d',fg:'#d9ffe6',muted:'#6fb98a',accent:'#3dff7a',accent2:'#b6ff5e',line:'rgba(80,255,140,.18)',glow:'rgba(61,255,122,.35)',on:'#03200d'}},
 {id:'synth',name:'Neon Drive',fx:'synth',fxl:'Grid drive',motion:'glow',v:{bg:'#10041c',bg2:'#2a0a44',surface:'#1e0a33',fg:'#fdeaff',muted:'#bb94d6',accent:'#ff3df2',accent2:'#27e1ff',line:'rgba(255,120,240,.2)',glow:'rgba(255,61,242,.4)',on:'#1d0220'}},
 {id:'fireflies',name:'Firefly Woods',fx:'fireflies',fxl:'Fireflies',motion:'float',v:{bg:'#06110b',bg2:'#10301c',surface:'#0e2016',fg:'#effbe6',muted:'#92b58f',accent:'#c6ff5a',accent2:'#ffe66b',line:'rgba(200,255,120,.16)',glow:'rgba(198,255,90,.3)',on:'#162602'}},
 {id:'rain',name:'Rainy Window',fx:'rain',fxl:'Raindrops',motion:'lift',v:{bg:'#0a0f16',bg2:'#17263a',surface:'#121b28',fg:'#e9f0ff',muted:'#8ea2c0',accent:'#8ab4ff',accent2:'#b9d0ff',line:'rgba(160,190,255,.16)',glow:'rgba(138,180,255,.3)',on:'#07142b'}},
 {id:'nebula',name:'Nebula',fx:'nebula',fxl:'Cosmic drift',motion:'shimmer',v:{bg:'#0a0615',bg2:'#24104a',surface:'#170d2c',fg:'#f4ebff',muted:'#a690c8',accent:'#c084fc',accent2:'#ff8fd1',line:'rgba(210,160,255,.18)',glow:'rgba(192,132,252,.4)',on:'#1c0836'}},
 {id:'embers',name:'Gilded Embers',fx:'embers',fxl:'Embers',motion:'glow',v:{bg:'#0f0a05',bg2:'#2e1a08',surface:'#1d1209',fg:'#fff3dc',muted:'#c2a47a',accent:'#f5b942',accent2:'#ff8a3d',line:'rgba(255,200,120,.16)',glow:'rgba(245,185,66,.35)',on:'#2a1700'}},
 {id:'cherry',name:'Cherry Light',fx:null,fxl:'Simple',motion:'lift',light:1,v:{bg:'#fff4f6',bg2:'#ffe1e8',surface:'#ffffff',fg:'#3a1220',muted:'#8a5a6b',accent:'#c8102e',accent2:'#ff6b86',line:'rgba(120,30,60,.14)',glow:'rgba(200,16,46,.25)',on:'#ffffff'}},
 {id:'midnight',name:'Midnight',fx:null,fxl:'Simple',motion:'lift',v:{bg:'#0d1017',bg2:'#141a26',surface:'#151b27',fg:'#eef1f7',muted:'#8f99ad',accent:'#ff5c7a',accent2:'#ff9eb0',line:'rgba(255,255,255,.1)',glow:'rgba(255,92,122,.25)',on:'#2b0714'}},
 {id:'forest',name:'Forest',fx:null,fxl:'Simple',motion:'lift',v:{bg:'#0c1712',bg2:'#14281d',surface:'#12221a',fg:'#e9f5ee',muted:'#85a592',accent:'#5fd08f',accent2:'#b5e86a',line:'rgba(150,230,180,.14)',glow:'rgba(95,208,143,.25)',on:'#05210f'}},
 {id:'frost',name:'Frost',fx:null,fxl:'Simple',motion:'lift',light:1,v:{bg:'#eef2f8',bg2:'#dde6f3',surface:'#ffffff',fg:'#131a2a',muted:'#5d6b85',accent:'#2f5bea',accent2:'#6f8cff',line:'rgba(20,40,90,.12)',glow:'rgba(47,91,234,.25)',on:'#ffffff'}},
 {id:'graphite',name:'Graphite',fx:null,fxl:'Simple',motion:'lift',v:{bg:'#151515',bg2:'#232220',surface:'#1d1c1a',fg:'#f1eee8',muted:'#a39d92',accent:'#d9ad5a',accent2:'#f0d08a',line:'rgba(255,235,200,.12)',glow:'rgba(217,173,90,.25)',on:'#241a05'}}
];
function applyTheme(id){
  const th=T.find(x=>x.id===id)||T[0],r=document.documentElement;
  const v=Object.assign({},BASE,th.light?LIGHT_SEM:{},th.v);
  for(const k in v)r.style.setProperty('--'+k,v[k]);
  r.style.colorScheme=th.light?'light':'dark';
  r.dataset.motion=th.motion;
  S.theme=th.id;
  FX.set(th.fx);
  const b=$('#themebtn');if(b)b.innerHTML=ic('palette',16)+' '+esc(th.name);
}

