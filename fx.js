/* ---------- animated backdrops ---------- */
const FX=(()=>{
  const c=$('#fx'),x=c.getContext('2d'),rm=matchMedia('(prefers-reduced-motion: reduce)');
  let W=0,H=0,type=null,raf=0,last=0,D={},rt=0;
  const R=(a,b)=>a+Math.random()*(b-a);
  function size(){const dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);if(type&&M[type])M[type].init()}
  const mkP=rand=>({x:R(0,W),y:rand?R(-H,H):R(-40,-10),s:R(6,13),r:R(0,6.28),vr:R(-.01,.01),vx:R(.2,.6),vy:R(.5,1.3),ph:R(0,6.28)});
  const glow=(px,py,rad,col)=>{const g=x.createRadialGradient(px,py,0,px,py,rad);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px-rad,py-rad,rad*2,rad*2)};
  const M={
    blossom:{init(){D.p=Array.from({length:Math.round(Math.min(46,W/20))},()=>mkP(true))},
      draw(t){x.clearRect(0,0,W,H);for(const p of D.p){p.x+=p.vx+Math.sin(t*.001+p.ph)*.4;p.y+=p.vy;p.r+=p.vr;
        if(p.y>H+20||p.x>W+30){Object.assign(p,mkP(false));p.x=R(-30,W)}
        x.save();x.translate(p.x,p.y);x.rotate(p.r);x.scale(1,.55+.45*Math.abs(Math.sin(t*.0015+p.ph)));x.beginPath();
        x.moveTo(0,-p.s);x.bezierCurveTo(p.s*.95,-p.s*.6,p.s*.75,p.s*.8,0,p.s);x.bezierCurveTo(-p.s*.75,p.s*.8,-p.s*.95,-p.s*.6,0,-p.s);
        const g=x.createLinearGradient(0,-p.s,0,p.s);g.addColorStop(0,'rgba(255,205,220,.8)');g.addColorStop(1,'rgba(255,110,150,.55)');x.fillStyle=g;x.fill();x.restore()}}},
    aurora:{o:.9,init(){},
      draw(t){x.clearRect(0,0,W,H);const cols=['94,242,196','157,140,255','80,200,255'];
        cols.forEach((c,i)=>{const base=H*(.2+i*.11);
          for(let px=0;px<=W;px+=10){const y=base+Math.sin(px*.0035+t*.00035*(i+1)+i*2)*H*.07+Math.sin(px*.011-t*.0005)*H*.02;
            const a=.5+.5*Math.sin(px*.02+t*.0007+i);const g=x.createLinearGradient(0,y-H*.12,0,y+H*.3);
            g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(.35,`rgba(${c},${.3*a})`);g.addColorStop(1,`rgba(${c},0)`);
            x.fillStyle=g;x.fillRect(px,y-H*.12,11,H*.42)}})}},
    stars:{init(){D.s=Array.from({length:Math.min(190,Math.round(W*H/9000))},()=>({x:R(0,W),y:R(0,H),r:R(.4,1.6),ph:R(0,6.28),sp:R(.0008,.003)}));D.sh=null;D.next=2000},
      draw(t){x.clearRect(0,0,W,H);x.fillStyle='#fff';for(const s of D.s){x.globalAlpha=.3+.7*Math.abs(Math.sin(t*s.sp+s.ph));x.beginPath();x.arc(s.x,s.y,s.r,0,6.283);x.fill()}
        x.globalAlpha=1;if(!D.sh&&t>D.next){D.sh={x:R(W*.2,W),y:R(0,H*.4),vx:-R(7,10),vy:R(3,5),l:0}}
        if(D.sh){const s=D.sh;s.x+=s.vx;s.y+=s.vy;s.l++;const g=x.createLinearGradient(s.x,s.y,s.x-s.vx*8,s.y-s.vy*8);g.addColorStop(0,'rgba(255,240,200,.95)');g.addColorStop(1,'rgba(255,240,200,0)');
          x.strokeStyle=g;x.lineWidth=2;x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x-s.vx*8,s.y-s.vy*8);x.stroke();if(s.l>60){D.sh=null;D.next=t+R(4000,9000)}}}},
    ocean:{init(){},
      draw(t){x.clearRect(0,0,W,H);for(let i=0;i<5;i++){const by=H*(.6+i*.07),amp=14+i*5,sp=.0004*(1+i*.3);x.beginPath();x.moveTo(0,H);
        for(let px=0;px<=W;px+=10)x.lineTo(px,by+Math.sin(px*.008*(1+i*.15)+t*sp*3+i)*amp+Math.sin(px*.017+t*sp*5)*amp*.35);
        x.lineTo(W,H);x.closePath();x.fillStyle=`rgba(${76-i*8},${201-i*20},240,${.08+i*.04})`;x.fill()}}},
    matrix:{o:.6,init(){D.d=Array.from({length:Math.ceil(W/18)},()=>R(-40,0));x.clearRect(0,0,W,H)},
      draw(t){if(t-last<60)return;last=t;x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.14)';x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over';
        x.font='15px monospace';const ch='ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789';
        D.d.forEach((y,i)=>{x.fillStyle='rgba(120,255,160,.9)';x.fillText(ch[Math.floor(Math.random()*ch.length)],i*18,y*18);
          if(y*18>H&&Math.random()>.975)D.d[i]=0;else D.d[i]=y+1})}},
    synth:{o:.85,init(){},
      draw(t){x.clearRect(0,0,W,H);const hz=H*.58,cx=W/2,sr=Math.min(W,H)*.2;
        x.save();x.beginPath();x.rect(0,0,W,hz);x.clip();
        const g=x.createLinearGradient(0,hz-sr*2,0,hz);g.addColorStop(0,'rgba(255,214,90,.95)');g.addColorStop(.55,'rgba(255,61,242,.85)');g.addColorStop(1,'rgba(120,30,200,.7)');
        x.fillStyle=g;x.beginPath();x.arc(cx,hz-sr*.9,sr,0,6.283);x.fill();
        for(let k=0;k<6;k++)x.clearRect(cx-sr,hz-sr*1.3+k*sr*.17,sr*2,k*1.6+1);x.restore();
        x.lineWidth=1.2;const off=(t*.00035)%1;x.strokeStyle='rgba(255,61,242,.9)';
        for(let i=0;i<16;i++){const z=(i+off)/16,y=hz+(H-hz)*z*z;x.globalAlpha=.15+z*.6;x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}
        x.strokeStyle='rgba(39,225,255,.8)';x.globalAlpha=.45;for(let i=-14;i<=14;i++){x.beginPath();x.moveTo(cx+i*W*.02,hz);x.lineTo(cx+i*W*.14,H);x.stroke()}
        x.globalAlpha=1;x.fillStyle='rgba(255,120,240,.7)';x.fillRect(0,hz-1,W,2)}},
    fireflies:{init(){D.f=Array.from({length:Math.round(Math.min(48,W/14))},()=>({x:R(0,W),y:R(0,H),a:R(0,6.28),v:R(.2,.6),ph:R(0,6.28),r:R(10,22)}))},
      draw(t){x.clearRect(0,0,W,H);for(const f of D.f){f.a+=R(-.06,.06);f.x+=Math.cos(f.a)*f.v;f.y+=Math.sin(f.a)*f.v-.05;
        if(f.x<-20)f.x=W+20;if(f.x>W+20)f.x=-20;if(f.y<-20)f.y=H+20;if(f.y>H+20)f.y=-20;
        const a=Math.pow(Math.max(0,Math.sin(t*.0018+f.ph)),2);glow(f.x,f.y,f.r,`rgba(198,255,90,${.15+a*.7})`)}}},
    rain:{o:.9,init(){D.r=Array.from({length:Math.round(W/6)},()=>({x:R(0,W),y:R(0,H),l:R(10,28),v:R(9,17)}));D.b=Array.from({length:8},()=>({x:R(0,W),y:R(0,H),r:R(3,7),v:R(.15,.5),w:R(0,200)}))},
      draw(t){x.clearRect(0,0,W,H);x.strokeStyle='rgba(170,200,255,.3)';x.lineWidth=1;x.beginPath();
        for(const d of D.r){d.y+=d.v;d.x-=d.v*.12;if(d.y>H){d.y=-30;d.x=R(0,W+80)}x.moveTo(d.x,d.y);x.lineTo(d.x-d.l*.12,d.y-d.l)}x.stroke();
        for(const b of D.b){if(b.w>0){b.w--}else{b.y+=b.v;if(Math.random()<.02)b.w=R(10,80)}if(b.y>H+10){b.y=R(-40,0);b.x=R(0,W)}
          x.fillStyle='rgba(190,215,255,.14)';x.strokeStyle='rgba(210,230,255,.35)';x.beginPath();x.ellipse(b.x,b.y,b.r,b.r*1.3,0,0,6.283);x.fill();x.stroke()}}},
    nebula:{init(){D.c=Array.from({length:5},(_,i)=>({x:R(0,W),y:R(0,H),r:R(220,420),ph:R(0,6.28),col:['192,132,252','255,143,209','100,120,255','160,90,255','80,200,255'][i]}));D.p=Array.from({length:70},()=>({x:R(0,W),y:R(0,H),r:R(.4,1.4),ph:R(0,6.28)}))},
      draw(t){x.clearRect(0,0,W,H);x.globalCompositeOperation='lighter';
        for(const b of D.c){const px=b.x+Math.sin(t*.00012+b.ph)*140,py=b.y+Math.cos(t*.0001+b.ph)*100;glow(px,py,b.r,`rgba(${b.col},.2)`)}
        x.fillStyle='#fff';for(const p of D.p){p.y-=.08;p.x-=.04;if(p.y<0)p.y=H;if(p.x<0)p.x=W;x.globalAlpha=.25+.6*Math.abs(Math.sin(t*.001+p.ph));x.fillRect(p.x,p.y,p.r*2,p.r*2)}
        x.globalAlpha=1;x.globalCompositeOperation='source-over'}},
    embers:{init(){D.e=Array.from({length:Math.round(Math.min(70,W/10))},()=>mkE(true))},
      draw(t){x.clearRect(0,0,W,H);x.globalCompositeOperation='lighter';for(const e of D.e){e.y-=e.v;e.x+=Math.sin(t*.001+e.ph)*.5;e.l-=.004;
        if(e.l<=0||e.y<-20)Object.assign(e,mkE(false));glow(e.x,e.y,e.s*5,`rgba(255,${Math.round(120+e.l*100)},40,${e.l*.8})`)}x.globalCompositeOperation='source-over'}}
  };
  function mkE(rand){return{x:R(0,W),y:rand?R(0,H):H+R(0,30),v:R(.4,1.4),s:R(1.5,4),l:R(.4,1),ph:R(0,6.28)}}
  function frame(t){raf=requestAnimationFrame(frame);M[type].draw(t)}
  function set(tp){
    cancelAnimationFrame(raf);type=tp;last=0;x.clearRect(0,0,W,H);
    if(!tp||!M[tp]){c.style.opacity='0';return}
    M[tp].init();c.style.opacity=M[tp].o||1;
    if(rm.matches){M[tp].draw(1000);return}
    raf=requestAnimationFrame(frame)}
  addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,200)});
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden&&type&&M[type]&&!rm.matches)raf=requestAnimationFrame(frame)});
  size();
  return{set};
})();
