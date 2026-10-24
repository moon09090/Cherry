'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const pad=n=>String(n).padStart(2,'0');
const key=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parse=k=>{const a=k.split('-').map(Number);return new Date(a[0],a[1]-1,a[2])};
const addDays=(k,n)=>{const d=parse(k);d.setDate(d.getDate()+n);return key(d)};
const today=()=>key();
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const fmtD=k=>parse(k).toLocaleDateString(undefined,{month:'short',day:'numeric'});
const days=n=>Array.from({length:n},(_,i)=>addDays(today(),i-n+1));

