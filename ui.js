/* ---------- reusable ui bits ---------- */
const head=(t,s)=>`<div class="vh"><h2>${t}</h2>${s?`<p class="sub">${s}</p>`:''}</div>`;
const exTag=o=>o&&o.demo?'<span class="pill p-ex">Example</span>':'';
function meter(label,val,max,txt){return`<div class="meter"><div class="mt"><span>${label}</span><span class="num">${txt}</span></div><div class="bar"><i style="width:${pct(val,max)}%"></i></div></div>`}
function ring(p,size,big,small,sw=11){const r=(size-sw)/2,c=2*Math.PI*r;
  return`<div class="ringw" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(big+' '+small)}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${sw}"/><circle class="rg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#rg)" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c*p/100} ${c}"/></svg><div class="ringc"><b>${big}</b><small>${small}</small></div></div>`}
function bars(vals,labels,o={}){
  const W=320,Ht=140,pb=22,pt=18,m=Math.max(1,o.max||0,...vals,o.goal||0),bw=W/vals.length;let s='';
  if(o.goal){const y=Ht-pb-(Ht-pb-pt)*o.goal/m;s+=`<line class="cgoal" x1="0" x2="${W}" y1="${y}" y2="${y}"/>`}
  s+=`<line class="cg" x1="0" x2="${W}" y1="${Ht-pb}" y2="${Ht-pb}"/>`;
  vals.forEach((v,i)=>{const h=(Ht-pb-pt)*v/m,x=i*bw+bw*.2,y=Ht-pb-h,last=i===vals.length-1;
    s+=`<rect class="ca" x="${x}" y="${y}" width="${bw*.6}" height="${Math.max(h,v>0?2:0)}" rx="5" opacity="${last?1:.55}"/>`;
    if(v>0)s+=`<text class="cv" x="${x+bw*.3}" y="${y-4}" text-anchor="middle">${o.fmt?o.fmt(v):v}</text>`;
    s+=`<text class="cl" x="${x+bw*.3}" y="${Ht-6}" text-anchor="middle">${esc(labels[i])}</text>`});
  return`<svg class="chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(o.label||'Chart')}">${s}</svg>`}
function line(pts,o={}){
  const W=320,Ht=150,pl=30,pr=10,pt=14,pb=24;
  if(!pts.length)return'<p class="empty">No data yet.</p>';
  const ys=pts.map(p=>p.y),lo=Math.max(0,Math.floor((Math.min(...ys)-8)/10)*10),hi=Math.min(100,Math.ceil((Math.max(...ys)+4)/10)*10),sp=Math.max(1,hi-lo);
  const X=i=>pts.length===1?(pl+W-pr)/2:pl+(W-pl-pr)*i/(pts.length-1),Y=v=>Ht-pb-(Ht-pb-pt)*(v-lo)/sp;
  let s=[lo,Math.round((lo+hi)/2),hi].map(v=>`<line class="cg" x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="cl" x="${pl-5}" y="${Y(v)+3}" text-anchor="end">${v}%</text>`).join('');
  const path=pts.map((p,i)=>(i?'L':'M')+X(i)+' '+Y(p.y)).join(' ');
  if(pts.length>1)s+=`<path d="${path} L${X(pts.length-1)} ${Ht-pb} L${X(0)} ${Ht-pb}Z" fill="var(--accent)" opacity=".12"/><path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>`;
  pts.forEach((p,i)=>{const e=i===pts.length-1;s+=`<circle cx="${X(i)}" cy="${Y(p.y)}" r="${e?5:3}" fill="${e?'var(--accent)':'var(--surface)'}" stroke="var(--accent)" stroke-width="2"/>`;
    if(e)s+=`<text class="cv" x="${X(i)}" y="${Y(p.y)-10}" text-anchor="middle">${p.y}%</text>`;
    if(i===0||e)s+=`<text class="cl" x="${X(i)}" y="${Ht-6}" text-anchor="${i===0&&pts.length>1?'start':'end'}">${esc(p.x)}</text>`});
  return`<svg class="chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(o.label||'Trend')}">${s}</svg>`}

