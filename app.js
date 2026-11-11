
/* ===== data ===== */
const ALL12=[0,1,2,3,4,5,6,7,8,9,10,11];
const VIMG=new Proxy({},{get:()=>ALL12});
const C=window.COURSE;const UNITS={};
/* weekly plan: 6 lesson days, then a review day */
C.mods=[
 {id:"w1",track:"core",name:"Week 1 · Me, my day and my home",units:["1","2","3","4","5","6"]},
 {id:"w2",track:"core",name:"Week 2 · Food, shopping and the past",units:["7","8","9","10","11","12"]},
 {id:"w3",track:"core",name:"Week 3 · Experiences, plans and the future",units:["13","14","15","16","17","18"]},
 {id:"w4",track:"core",name:"Week 4 · Health, people, technology and travel",units:["19","20","21","22","23","24"]},
 {id:"x1",track:"biz",name:"Week 1 · Meeting basics and emails",units:["B1","B2","B3","B19","B4","B5"]},
 {id:"x2",track:"biz",name:"Week 2 · Decisions, numbers and calls",units:["B6","B7","B8","B20","B9","B10"]},
 {id:"x3",track:"biz",name:"Week 3 · Money, site and clients",units:["B11","B12","B21","B13","B14","B22"]},
 {id:"x4",track:"biz",name:"Week 4 · Tenders, handover and management",units:["B15","B16","B23","B17","B18","B24"]}];
[...C.core.map(u=>({...u,track:"core"})),...C.biz.map(u=>({...u,track:"biz"}))].forEach(u=>{
  u.vocab=u.v.map((s,i)=>{const [w,pos,mean,ar,ex]=s.split("|");return{w,pos,mean,ar,ex,img:{s:`spr/${u.id}.jpg`,i}}});
  ((window.EXPR||{})[u.id]||[]).forEach(s=>{const [w,pos,mean,ar,ex]=s.split("|");u.vocab.push({w,pos,mean,ar,ex,img:null,x:true})});
  u.qs=u.checks.map(s=>{const [q,o,a]=s.split("|");return{q,opts:o.split(","),a:+a}});UNITS[u.id]=u});
C.mods.forEach(m=>{UNITS["R"+m.id]={id:"R"+m.id,review:true,track:m.track,covers:m.units,mod:m,title:"Review · "+m.name}});
const TR={core:{name:"A2 Course",short:"General English"},biz:{name:"Business English · Meetings",short:"Business English"}};
const modOf=id=>C.mods.find(m=>m.units.includes(id)||("R"+m.id)===id);
const trackList=t=>C.mods.filter(m=>m.track===t).flatMap(m=>[...m.units,"R"+m.id]);
const coreUnits=C.core.map(u=>u.id),bizUnits=C.biz.map(u=>u.id);
const LNO={};["core","biz"].forEach(t=>C.mods.filter(m=>m.track===t).flatMap(m=>m.units).forEach((id,i)=>LNO[id]=i+1));
const label=id=>{const u=UNITS[id];return u.review?"Weekly review · "+u.mod.name.split(" · ")[0]:"Session "+LNO[id]+" · "+u.title};

/* ===== state ===== */
const KEY="shadowlab_v2";
let S={cur:"1",view:"unit",mode:"listen",sub:"vocab",rate:1,rep:3,gap:1.3,voice:"",hide:false,lang:"ar",u:{},rv:{},log:{},exitBest:null,coach:{},done:{},bank:{},mine:{},fav:{},fold:{},autoSpeak:true,bankF:"all",part:"p",hideMine:false,cmp:true};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)S=Object.assign(S,s)}catch(e){}
["coach","done","bank","mine","fav","fold","u","rv","log"].forEach(k=>{if(!S[k]||typeof S[k]!=="object")S[k]={}});
if(["level","how","words","unit","phrases"].indexOf(S.view)<0)S.view="unit";
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function P(id){const p=S.u[id]||(S.u[id]={});p.l=p.l||0;p.s=p.s||0;p.r=p.r||0;p.g=p.g||[null,null,null];p.m=p.m||{};p.p=p.p||[0,0,0,0];p.wc=p.wc||0;p.rp=p.rp||0;return p}
const dkey=d=>{const z=new Date(d);return z.getFullYear()+"-"+String(z.getMonth()+1).padStart(2,"0")+"-"+String(z.getDate()).padStart(2,"0")};
const TODAY=()=>dkey(Date.now());
function bump(k,n=1){const t=TODAY();S.log[t]=S.log[t]||{};S.log[t][k]=(S.log[t][k]||0)+n;save()}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clean=w=>w.replace(/[?!.]+$/,"");
const rxEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const arr=x=>Array.isArray(x)?x:[];
const spr=(m,c,l)=>`<span class="spr ${c}" ${l?`role="img" aria-label="${esc(l)}"`:'aria-hidden="true"'} style="background-image:url('${m.s}');background-position:${(m.i%4)/3*100}% ${Math.floor(m.i/4)/2*100}%"></span>`;

/* ===== progress ===== */
function steps(id){const p=P(id),u=UNITS[id];const used=u.vocab.filter(v=>(p.m[v.w]||0)>=1).length;const gr=p.g.filter((x,i)=>x===u.qs[i].a).length;const sp=p.p.filter(Boolean).length+(p.wc?1:0);
  const o={listen:[Math.min(p.l,3),3],shadow:[Math.min(p.s,2),2],read:[p.r?1:0,1]};if(u.dlg)o.roleplay=[Math.min(p.rp,2),2];
  return Object.assign(o,{grammar:[gr,3],words:[Math.min(used,6),6],speak:[Math.min(sp,2),2]})}
const LBL={listen:"Listen",shadow:"Shadow",read:"Read aloud",roleplay:"Role-play",grammar:"Grammar",words:"Words used",speak:"Speaking"};
const isDone=id=>!!S.done[id];
const nextItem=t=>trackList(t).find(id=>!isDone(id))||null;
function tprog(t){const l=trackList(t),d=l.filter(isDone).length;return{d,n:l.length,pct:Math.round(d/l.length*100)}}
/* ===== day plan: each day = 2 sessions ===== */
function buildDays(){const c=trackList("core"),b=trackList("biz"),d=[];let i=0,j=0;
  while(i<c.length||j<b.length){const day=[];if(i<c.length)day.push(c[i++]);if(j<b.length)day.push(b[j++]);else if(i<c.length)day.push(c[i++]);d.push(day)}return d}
const DAYS=buildDays();
const dayOf=id=>DAYS.findIndex(d=>d.includes(id))+1;
const curDay=()=>{const k=DAYS.findIndex(d=>!d.every(isDone));return k<0?DAYS.length:k+1};
const nextInPlan=()=>{for(const d of DAYS)for(const id of d)if(!isDone(id))return id;return null};
const ALL=()=>DAYS.flat();
function allProg(){const a=ALL(),d=a.filter(isDone).length;return{d,n:a.length,pct:Math.round(d/a.length*100)}}
function planDate(n){const base=S.start?new Date(S.start+"T12:00:00"):new Date();base.setDate(base.getDate()+n-1);return base.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}
function todayOf(t){const l=trackList(t);const td=l.filter(id=>S.done[id]===TODAY());return td.length?td[td.length-1]:nextItem(t)}
function dayFull(k){return trackList("core").some(id=>S.done[id]===k)&&trackList("biz").some(id=>S.done[id]===k)}
function dayAny(k){return !!S.log[k]||Object.values(S.done).includes(k)}
function streak(){let n=0;const d=new Date();if(!dayAny(dkey(d)))d.setDate(d.getDate()-1);while(dayAny(dkey(d))){n++;d.setDate(d.getDate()-1)}return n}

/* ===== speech ===== */
const synth=window.speechSynthesis;let voices=[];
function loadVoices(){if(!synth)return;voices=synth.getVoices().filter(v=>/^en/i.test(v.lang));const sel=document.getElementById("voiceSel");
  if(!voices.length){sel.innerHTML="<option>Default</option>";return}
  sel.innerHTML=voices.map(v=>`<option value="${esc(v.name)}">${esc(v.name.replace(/^(Microsoft|Google) /,""))} · ${v.lang}</option>`).join("");
  if(!S.voice||!voices.find(v=>v.name===S.voice)){const nat=v=>/natural|neural|google|online/i.test(v.name);
    const pick=voices.find(v=>/en-GB/i.test(v.lang)&&nat(v))||voices.find(v=>/en-US/i.test(v.lang)&&nat(v))||voices.find(v=>/en-(GB|US)/i.test(v.lang))||voices[0];S.voice=pick.name}
  sel.value=S.voice}
if(synth){loadVoices();synth.onvoiceschanged=loadVoices}
document.getElementById("voiceSel").onchange=e=>{S.voice=e.target.value;save()};
function voiceFor(spk){const base=voices.find(v=>v.name===S.voice)||voices[0];if(!spk||!voices.length)return{v:base,pitch:1};
  const others=voices.filter(v=>v.name!==(base&&base.name));const pref=others.filter(v=>v.lang===(base&&base.lang)).concat(others.filter(v=>v.lang!==(base&&base.lang)));
  if(pref.length)return{v:pref[(spk-1)%pref.length],pitch:1};return{v:base,pitch:[1,.82,1.18,.92][spk%4]}}

let token=0,playing=false,gapT=null,FLAT=[],FLATS={p:[],d:[]},CUR="p";
const spell=t=>t.replace(/\b[A-Z](?:-[A-Z])+\b/g,m=>m.split("-").join(". ")+".");
function utter(text,spk,onend,rate){const u=new SpeechSynthesisUtterance(spell(text));const {v,pitch}=voiceFor(spk);
  if(v){u.voice=v;u.lang=v.lang}else u.lang="en-GB";u.rate=rate||S.rate;u.pitch=pitch;u.onend=onend;u.onerror=onend;synth.speak(u)}
function stopAll(){token++;playing=false;clearTimeout(gapT);if(synth)synth.cancel();mark(-1);setTurn(false);updPlay()}
function say(text,rate){if(!synth){toast("No speech voice in this browser");return}stopAll();utter(text,0,()=>{},rate)}
function sayAt(part,i){if(!synth)return;stopAll();const f=FLATS[part];if(!f||!f[i])return;const my=++token;markP(part,i,i);utter(f[i].t,f[i].spk,()=>{if(my===token)mark(-1)})}
function otherName(u){const f=FLATS.d||[];const o=f.find(x=>x.who&&x.who!==u.me);return o?o.who:"the other person"}
function run(){if(!synth){toast("No speech voice in this browser");return}
  if(playing){stopAll();return}stopAll();const my=++token;playing=true;updPlay();
  const mode=S.mode,id=S.cur,u=UNITS[id],F=FLAT;let i=0,loop=0;
  const fin=()=>{const p=P(id);if(mode==="listen")p.l++;else if(mode==="shadow")p.s++;else p.rp++;bump("act");save();refreshPills();
    loop++;i=0;if(loop>=S.rep){playing=false;mark(-1);setTurn(false);updPlay();toast(mode==="role"?"Role-play done. Next time, try hiding your lines.":mode==="listen"?"Listening done. Now try Shadow.":"Shadowing done. Now read it aloud.");return false}return true};
  const next=()=>{if(my!==token)return;
    if(i>=F.length){if(fin())gapT=setTimeout(next,1200);return}
    const s=F[i];
    if(mode==="role"&&s.who===u.me){let j=i,words=0;while(j<F.length&&F[j].pi===s.pi){words+=F[j].t.split(/\s+/).length;j++}
      markP(CUR,i,j-1);setTurn(true,"Your line: say it now");
      gapT=setTimeout(()=>{if(my!==token)return;
        if(S.cmp){setTurn(false,"Now listen and compare");let k=i;const mine=()=>{if(my!==token)return;if(k>=j){i=j;gapT=setTimeout(next,350);return}markP(CUR,k,k);utter(F[k].t,F[k].spk,()=>{k++;mine()})};mine()}
        else{i=j;next()}},(words*430/S.rate)*S.gap+900);return}
    mark(i);setTurn(false);
    utter(s.t,s.spk,()=>{if(my!==token)return;i++;
      if(mode==="shadow"){const w=s.t.split(/\s+/).length;setTurn(true);gapT=setTimeout(next,(w*400/S.rate)*S.gap+600)}
      else{const ch=F[i]&&F[i].pi!==s.pi;gapT=setTimeout(next,ch?(F[i].who?280:120):15)}})};
  next()}
function markP(part,a,b){document.querySelectorAll(".s").forEach(el=>{const i=+el.dataset.i;el.classList.toggle("on",el.dataset.p===part&&a>=0&&i>=a&&i<=b)});
  if(part===CUR){const bar=document.getElementById("tline"),pos=document.getElementById("tpos");
    if(bar)bar.style.width=(a<0?0:((b+1)/FLAT.length*100))+"%";if(pos)pos.textContent=a<0?`${FLAT.length} sentences`:`Sentence ${b+1} of ${FLAT.length}`}
  if(a>=0){const el=document.querySelector(`.s[data-p="${part}"][data-i="${a}"]`);if(el&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const r=el.getBoundingClientRect();if(r.top<90||r.bottom>innerHeight-20)el.scrollIntoView({block:"center",behavior:"smooth"})}}}
function mark(i){markP(CUR,i,i)}
function setTurn(on,txt){const t=document.getElementById("turn");if(!t)return;t.classList.toggle("go",!!on);
  const u=UNITS[S.cur];t.textContent=txt||(on?"Your turn: say it":S.mode==="shadow"?"Listen, then repeat in the pause":S.mode==="role"?`Listen to ${u&&!u.review?otherName(u):"the other person"}, then say your line`:"Speak along with the voice")}
const IC={play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',spk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',chk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',circ:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 16.3 6.6 19.3l1.3-6L3.3 9.2l6.1-.6z"/></svg>',book:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/></svg>',chat:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16v11H8l-4 4z"/></svg>',mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',chev:'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>'};
function updPlay(){const b=document.getElementById("playBtn");if(b){b.innerHTML=playing?IC.stop:IC.play;b.setAttribute("aria-label",playing?"Stop":"Play")}}
const spkBtn=(t,l)=>`<button class="ico" data-say="${esc(t)}" aria-label="${esc(l||"Listen")}">${IC.spk}</button>`;
function bindSay(root){root.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say,b.dataset.rate?+b.dataset.rate:undefined))}


/* ===== parse ===== */
function parse(text){const flat=[],paras=[],names=[];
  text.split("\n").forEach((line,pi)=>{const m=line.match(/^([A-Z][a-zA-Z]+): (.+)$/);let who=null,body=line;
    if(m){who=m[1];body=m[2];if(!names.includes(who))names.push(who)}
    const parts=(body.match(/[^.!?]+[.!?]+["”]?|[^.!?]+$/g)||[body]).map(x=>x.trim()).filter(Boolean);
    paras.push({who,idx:parts.map(t=>{flat.push({t,who,pi,spk:who?names.indexOf(who):0});return flat.length-1})})});
  return{flat,paras,names}}
const spanHTML=(part,i,t,rx)=>`<span class="s" data-p="${part}" data-i="${i}">${esc(t).replace(rx,x=>`<span class="vw">${x}</span>`)}</span>`;

function vocabRx(u){const ws=u.vocab.map(v=>clean(v.w)).sort((a,b)=>b.length-a.length).map(rxEsc);return new RegExp("\\b("+ws.join("|")+")(s|es|er|est|ed|d)?\\b","gi")}

/* ===== sidebar ===== */
function itemHTML(id,showTrack){const u=UNITS[id],d=isDone(id);
  const sub=showTrack?TR[u.track].short:(u.review?"Pass with 8/10":u.g);
  return `<button class="it ${S.view==="unit"&&S.cur===id?"on":""}" data-open="${id}"><span class="ic">${u.review?IC.star:IC.play}</span><span class="lb">${esc(label(id))}<small>${esc(sub)}</small></span><span class="cir ${d?"d":""}">${d?IC.chk:""}</span></button>`}
function secHTML(key,title,count,body){const open=S.fold[key]!==false;
  return `<div><button class="sec-h" data-fold="${key}" aria-expanded="${open}"><span>${title}</span><span class="cnt"><span class="num">${count}</span>${IC.chev}</span></button><div ${open?"":"hidden"}>${body}</div></div>`}
function renderSide(){const days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dkey(d);days.push(`<span class="${dayFull(k)?"f":dayAny(k)?"p":""} ${i===0?"t":""}" title="${k}"></span>`)}
  const tc=todayOf("core"),tb=todayOf("biz");const tdone=[tc,tb].filter(id=>id&&S.done[id]===TODAY()).length;
  const today=`<div class="streak-box"><div><b class="num">${streak()}</b> <small>day streak</small></div><div class="days" aria-label="Last 14 days">${days.join("")}</div></div>`+
    [tc,tb].filter(Boolean).map(id=>itemHTML(id,true)).join("");
  const trackBody=t=>C.mods.filter(m=>m.track===t).map(m=>{const all=[...m.units,"R"+m.id];return `<div class="mod-l"><span>${esc(m.name)}</span><span class="num">${all.filter(isDone).length}/${all.length}</span></div>`+all.map(id=>itemHTML(id,false)).join("")}).join("");
  const pc=tprog("core"),pb=tprog("biz");const nb=Object.keys(S.bank).length+Object.keys(S.mine).length;
  const tools=`<button class="it ${S.view==="words"?"on":""}" data-view="words"><span class="ic">${IC.book}</span><span class="lb">My Words<small>Session words and your own</small></span><span class="num" style="font-size:.8rem;color:var(--muted)">${nb}</span></button>
   <button class="it ${S.view==="phrases"?"on":""}" data-view="phrases"><span class="ic">${IC.chat}</span><span class="lb">Meeting Phrases<small>Ready phrases for every situation</small></span><span class="num" style="font-size:.8rem;color:var(--muted)">${window.PHRASES.reduce((a,g)=>a+g.items.length,0)}</span></button>
   <button class="it ${S.view==="level"?"on":""}" data-view="level"><span class="ic">${IC.star}</span><span class="lb">Level check<small>Are you ready for B1?</small></span><span></span></button>
   <button class="it ${S.view==="how"?"on":""}" data-view="how"><span class="ic">${IC.book}</span><span class="lb">How to use<small>Method and daily plan</small></span><span></span></button>`;
  const side=document.getElementById("side");
  const cd=curDay();
  const dayBody=DAYS.map((d,k)=>{const n=k+1,key="d"+n,dn=d.filter(isDone).length,isCur=n===cd,open=S.fold[key]===undefined?isCur:S.fold[key]!==false;
    return `<div class="day ${isCur?"cur":""} ${dn===d.length?"full":""}"><button class="sec-h" data-fold="${key}" data-def="${isCur?1:0}" aria-expanded="${open}"><span>Day ${n} <span class="dd">(${planDate(n)})</span>${isCur?' <span class="tday">Today</span>':""}</span><span class="cnt"><span class="num">${dn}/${d.length}</span>${IC.chev}</span></button><div ${open?"":"hidden"}>${d.map(id=>itemHTML(id,true)).join("")}</div></div>`}).join("");
  const sw=`<div class="side-sw" role="group" aria-label="Organise sessions"><button data-sw="day" class="${S.sideMode!=="course"?"on":""}">By day</button><button data-sw="course" class="${S.sideMode==="course"?"on":""}">By course</button></div>`;
  const streakBox=`<div class="streak-box"><div><b class="num">${streak()}</b> <small>day streak</small></div><div class="days" aria-label="Last 14 days">${days.join("")}</div></div>`;
  side.innerHTML=sw+(S.sideMode==="course"?secHTML("core",TR.core.name,`${pc.d}/${pc.n}`,trackBody("core"))+secHTML("biz",TR.biz.name,`${pb.d}/${pb.n}`,trackBody("biz")):streakBox+`<div class="plan-h"><span>Daily plan · ${DAYS.length} days</span><span class="num">${DAYS.filter(d=>d.every(isDone)).length}/${DAYS.length}</span></div>`+dayBody)+secHTML("tools","Tools","",tools);
  side.querySelectorAll("[data-sw]").forEach(b=>b.onclick=()=>{S.sideMode=b.dataset.sw;save();renderSide()});
  side.querySelectorAll("[data-fold]").forEach(b=>b.onclick=()=>{const k=b.dataset.fold;const was=b.getAttribute("aria-expanded")==="true";S.fold[k]=!was;save();renderSide()});
  side.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>open(b.dataset.open));
  side.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{stopAll();S.view=b.dataset.view;save();closeMenu();renderAll();scrollTop()})}
function closeMenu(){document.body.classList.remove("menu-open");document.getElementById("menuBtn").setAttribute("aria-expanded","false")}
document.getElementById("menuBtn").onclick=()=>{const o=document.body.classList.toggle("menu-open");document.getElementById("menuBtn").setAttribute("aria-expanded",String(o))};
function scrollTop(){scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
function open(id,anchor){stopAll();S.cur=id;S.view="unit";save();closeMenu();renderAll();const a=anchor&&document.getElementById(anchor);if(a)a.scrollIntoView({behavior:"smooth"});else scrollTop()}

/* ===== top bar + completion ===== */
function renderTop(){const prog=document.getElementById("tbProg"),btn=document.getElementById("markBtn"),title=document.getElementById("tbTitle");
  const t=allProg();prog.innerHTML=`Your Progress: <b class="num">${t.d}</b> of <b class="num">${t.n}</b> (${t.pct}%)`;
  if(S.view!=="unit"){btn.hidden=true;title.textContent="";return}
  const u=UNITS[S.cur];title.textContent=`Day ${dayOf(u.id)} · ${TR[u.track].short}`;btn.hidden=false;
  const d=isDone(u.id);btn.className="tb-btn"+(d?" done":"");btn.innerHTML=`${IC.circ}${d?"Completed":"Mark as Complete"}`;btn.onclick=()=>markClick(u)}
function missing(u){if(u.review){const b=S.rv[u.id];return b>=8?[]:[`Pass the quiz with 8/10 (best so far: ${b==null?"not taken":b+"/10"})`]}
  return Object.entries(steps(u.id)).filter(([k,[a,b]])=>a<b).map(([k,[a,b]])=>`${LBL[k]} ${a}/${b}`)}
function markClick(u){if(isDone(u.id)){uncomplete(u);return}
  const miss=missing(u);if(!miss.length){complete(u);return}
  const box=document.getElementById("banner");box.innerHTML=`<div class="banner warn"><div><b>This session isn't finished yet</b><p>Still to do: ${esc(miss.join(" · "))}</p></div><div class="row"><button class="btn" id="keepBtn">Keep studying</button><button class="btn pri" id="forceBtn">Complete anyway</button></div></div>`;
  scrollTop();document.getElementById("keepBtn").onclick=()=>{box.innerHTML=""};document.getElementById("forceBtn").onclick=()=>complete(u)}
function complete(u){stopAll();S.done[u.id]=TODAY();let added=0;
  if(!u.review)u.vocab.forEach(v=>{if(!S.bank[v.w]){S.bank[v.w]={unit:u.id,date:TODAY()};added++}});
  bump(u.track);save();const t=allProg(),tt=tprog(u.track);const nx=nextInPlan();const dn=dayOf(u.id),dayDone=DAYS[dn-1].every(isDone);
  renderAll();const box=document.getElementById("banner");
  box.innerHTML=`<div class="banner ok"><div><b>${dayDone?`Day ${dn} complete`:"Session complete"} · ${t.pct}% of the course</b><p>${t.d} of ${t.n} sessions done · ${TR[u.track].short} ${tt.pct}%.${added?` ${added} new ${u.track==="biz"?"phrases":"words"} moved to My Words.`:""}</p></div><div class="row">${added?`<button class="btn" id="seeWords">Open My Words</button>`:""}${nx?`<button class="btn pri" id="nextBtn">${dayOf(nx)!==dn?`Start Day ${dayOf(nx)}`:"Next"}: ${esc(label(nx))}</button>`:`<span class="chip g">Course complete</span>`}</div></div>`;
  scrollTop();toast(dayDone?`Day ${dn} complete · ${t.pct}% of the course`:`Completed · ${t.pct}% of the course`);
  const sw=document.getElementById("seeWords");if(sw)sw.onclick=()=>{S.view="words";save();renderAll();scrollTop()};
  const nb=document.getElementById("nextBtn");if(nb)nb.onclick=()=>open(nx)}
function uncomplete(u){delete S.done[u.id];Object.keys(S.bank).forEach(w=>{if(S.bank[w].unit===u.id)delete S.bank[w]});save();renderAll();toast("Marked as not complete")}

/* ===== session page ===== */
function renderMain(){const main=document.getElementById("main");
  if(S.view==="level")return renderLevel(main);if(S.view==="how")return renderHow(main);if(S.view==="words")return renderWords(main);if(S.view==="phrases")return renderPhrases(main);
  const u=UNITS[S.cur];if(u.review)return renderReview(u,main);
  const PP=parse(u.text),PD=u.dlg?parse(u.dlg):null;FLATS={p:PP.flat,d:PD?PD.flat:[]};if(!u.dlg){S.part="p";if(S.mode==="role")S.mode="listen"}if(S.part==="p"&&S.mode==="role")S.mode="listen";FLAT=FLATS[S.part];CUR=S.part;const rx=vocabRx(u);const m=modOf(u.id);const p=P(u.id);
  main.innerHTML=`<div id="banner"></div>
  <section class="lhead">
    <div class="eyebrow">${TR[u.track].name} · ${esc(m.name)}</div>
    <h1>${esc(u.title)}</h1><div class="kicker" style="margin:-4px 0 12px">${esc(label(u.id).split(" · ")[0])}</div>
    <div class="chips"><span class="chip lv">Level ${esc(u.lvl||"A2")}</span><span class="chip">${esc(u.topic)}</span><span class="chip g">Grammar · ${esc(u.g)}</span><span class="chip">About ${u.dlg?25:20} minutes</span></div>
    <div class="progress" id="prog">${pillsHTML(u.id)}</div>
  </section>


  <section class="card"><span class="tag">1 · Listen / Shadow${u.dlg?" / Role-play":""}</span>
    ${u.dlg?`<div class="parts" role="group" aria-label="Choose text"><button data-part="p" class="${S.part==="p"?"on":""}">Reading passage</button><button data-part="d" class="${S.part==="d"?"on":""}">Dialogue · ${esc(PD.names.join(" & "))}</button></div>`:""}
    <div class="mode" role="group" aria-label="Mode">
      <button data-mode="listen" class="${S.mode==="listen"?"on":""}">Listen <small id="cl">${p.l}/3</small></button>
      <button data-mode="shadow" class="${S.mode==="shadow"?"on":""}">Shadow (with pauses) <small id="cs">${p.s}/2</small></button>
      ${u.dlg?`<button data-mode="role" class="${S.mode==="role"?"on":""}">Play ${esc(u.me)} <small id="cr">${p.rp}/2</small></button>`:""}
    </div>
    ${S.mode==="role"?`<div class="note">The app reads ${esc(otherName(u))}'s lines and stops at yours. Say ${esc(u.me)}'s line in the pause.${S.cmp?" Then it plays your line so you can compare.":""}<span class="ar">البرنامج هيقرا كلام ${esc(otherName(u))} ويقف عند جملتك. قول جملة ${esc(u.me)} في الوقفة${S.cmp?"، وبعدها هيقولها عشان تقارن":""}.</span></div>`:""}
    <div class="player">
      <button class="play" id="playBtn" aria-label="Play">${IC.play}</button>
      <div class="pbar"><div class="pmeta"><span class="turn" id="turn"></span><span id="tpos" class="num"></span></div><div class="track-line"><i id="tline"></i></div></div>
      <div class="ctrls">
        <div class="ctrl">Speed <span class="seg" data-k="rate">${[0.75,0.9,1,1.15].map(r=>`<button class="${S.rate===r?"on":""}" data-v="${r}">${r}×</button>`).join("")}</span></div>
        <div class="ctrl">Repeat <span class="seg" data-k="rep">${[1,2,3,5].map(r=>`<button class="${S.rep===r?"on":""}" data-v="${r}">${r}×</button>`).join("")}</span></div>
        <div class="ctrl" ${S.mode==="listen"?"hidden":""} id="gapCtrl">Pause <span class="seg" data-k="gap">${[[1,"Short"],[1.3,"Normal"],[1.8,"Long"]].map(r=>`<button class="${S.gap===r[0]?"on":""}" data-v="${r[0]}">${r[1]}</button>`).join("")}</span></div>
      </div>
    </div>
  </section>

  <section class="card"><span class="tag">2 · Read aloud</span>
    <div class="card-h"><div><div class="kicker">Reading passage</div><h2 class="big">${esc(u.title)}</h2></div><div class="row">
      <button class="btn" id="hideBtn">${S.hide?"Show passage":"Hide passage"}</button>
      <button class="btn ${p.r?"good":"pri"}" id="readBtn">${p.r?"✓ Read aloud":"I read it aloud"}</button></div></div>
    ${S.hide?`<div class="hidden-msg">Passage hidden. Listen first, then show it.</div>`:`<div class="passage">${PP.paras.map(pa=>`<p>${pa.idx.map(i=>spanHTML("p",i,PP.flat[i].t,rx)).join(" ")}</p>`).join("")}</div>`}
    <div class="foot">Tap a sentence to hear it. Dotted words are this session's vocabulary.</div>
  </section>
  ${u.dlg?`<section class="card"><span class="tag">2b · Dialogue</span>
    <div class="card-h"><div><div class="kicker">Meeting dialogue</div><h2>${esc(PD.names.join(" and "))}</h2></div><div class="row" style="gap:14px">
      <label class="check"><input type="checkbox" id="hideMine" ${S.hideMine?"checked":""}> Hide ${esc(u.me)}'s lines</label>
      <label class="check"><input type="checkbox" id="cmpMine" ${S.cmp?"checked":""}> Play my line after my turn</label></div></div>
    <div class="dialogue">${PD.paras.map(pa=>{const mine=pa.who===u.me;return `<div class="dl ${mine?"mine":""} ${mine&&S.hideMine?"hid":""}"><span class="who">${esc(pa.who)}${mine?" <em>YOU</em>":""}</span><span class="tx">${pa.idx.map(i=>spanHTML("d",i,PD.flat[i].t,rx)).join(" ")}</span></div>`}).join("")}</div>
    <div class="foot">You are ${esc(u.me)}. Tap a line to hear it.${S.hideMine?" Tap a hidden line to reveal it.":""}</div>
  </section>`:""}

  <section class="card"><span class="tag">3 · Grammar</span>
    <div class="card-h"><h2>${esc(u.g)}</h2></div>
    <div class="gtable">${u.rows.map(r=>`<div class="grow"><span>${esc(r[0])}</span><em>${esc(r[1])}</em></div>`).join("")}</div>
    <div class="sub-h">Check yourself <span class="chip num">${steps(u.id).grammar[0]}/3</span></div>
    <div class="qs">${u.qs.map((q,i)=>{const pick=p.g[i];return `<div class="q"><div class="qt"><span class="n">${i+1}</span>${esc(q.q).replace("___","<b>_____</b>")}</div><div class="opts">${q.opts.map((o,j)=>{let c="";if(pick!=null){if(j===q.a)c="right";else if(j===pick)c="wrong"}return `<button class="opt ${c}" data-gq="${i}" data-o="${j}">${esc(o)}</button>`}).join("")}</div></div>`}).join("")}</div>
    ${p.g.some((x,i)=>x!=null&&x!==u.qs[i].a)?`<div class="row" style="margin-top:12px"><button class="btn" id="gRetry">Try the wrong ones again</button></div>`:""}
  </section>

  <section class="card"><span class="tag">4 · Vocab / Speak</span>
    <div class="vtabs" role="tablist">
      <button class="vtab ${S.sub==="vocab"?"on":""}" data-sub="vocab">Vocabulary <span class="b">${u.vocab.length}</span></button>
      <button class="vtab ${S.sub==="track"?"on":""}" data-sub="track">Word Tracking <span class="b num" id="trkB">${u.vocab.filter(v=>(p.m[v.w]||0)>=5).length}/${u.vocab.length}</span></button>
      <button class="vtab ${S.sub==="speak"?"on":""}" data-sub="speak">Speaking Prompts <span class="b">${u.p.length}</span></button>
    </div>
    <div id="subBody">${subHTML(u)}</div>
  </section>

  ${coachHTML(u)}

  <section class="card"><span class="tag">Finish</span>
    <div class="card-h"><h2>${isDone(u.id)?"Session completed":"Done with this session?"}</h2></div>
    <p style="margin:0 0 12px;color:var(--muted)">Marking it complete moves its ${u.track==="biz"?"phrases":"words"} to My Words and updates your course progress.</p>
    <div class="row"><button class="btn ${isDone(u.id)?"good":"pri"}" id="markBottom">${isDone(u.id)?"✓ Completed":"Mark as Complete"}</button>
    <button class="btn" id="copyAI">Copy a ${u.track==="biz"?"meeting role-play":"conversation"} prompt for your AI chat</button></div>
  </section>`;
  bindLesson(u);setTurn(false);mark(-1);updPlay()}
function pillsHTML(id){return Object.entries(steps(id)).map(([k,[a,b]])=>`<div class="pp ${a>=b?"ok":""}">${LBL[k]}<b class="num">${a}/${b}</b></div>`).join("")}
function refreshPills(){const u=UNITS[S.cur];if(!u||u.review||S.view!=="unit")return;const pr=document.getElementById("prog");if(pr)pr.innerHTML=pillsHTML(u.id);
  const p=P(u.id),cl=document.getElementById("cl"),cs=document.getElementById("cs");if(cl)cl.textContent=p.l+"/3";if(cs)cs.textContent=p.s+"/2";const cr=document.getElementById("cr");if(cr)cr.textContent=p.rp+"/2";
  const tb=document.getElementById("trkB");if(tb)tb.textContent=u.vocab.filter(v=>(p.m[v.w]||0)>=5).length+"/"+u.vocab.length}

function subHTML(u){const p=P(u.id);
  if(S.sub==="vocab")return `<div class="note">Listen to each word, its meaning and the example. Say the example out loud twice.</div>
   <div class="vgrid">${u.vocab.map((v,i)=>`${v.x&&!(u.vocab[i-1]||{}).x?`<div class="vsec"><b>Useful expressions</b><span>Learn these as whole chunks, not word by word.</span><span class="ar">احفظها كقطعة واحدة زي ما هي، مش كلمة كلمة.</span></div>`:""}<div class="vcard ${v.x?"xp":""}"><span class="rib">${v.x?"EXPRESSION":u.track==="biz"?"PHRASE":"WORD"}</span>${v.img?`<div class="vimg">${spr(v.img,"","Picture for "+v.w)}</div>`:v.x?`<div class="vimg noimg xbox"><span class="nw">${esc(v.w)}</span><span class="na">${esc(v.ar)}</span></div>`:""}
     <div class="vtop"><span class="vno">${String(i+1).padStart(2,"0")}</span><span class="vword">${esc(v.w)}</span>${spkBtn(clean(v.w),"Hear "+v.w)}${favBtn(v.w)}<span class="var">${esc(v.ar)}</span></div>
     <div class="vpos">${esc(v.pos)}</div>
     <div class="vrow"><span class="lab">MEANING</span><span>${esc(v.mean)}</span>${spkBtn(v.mean,"Hear meaning")}</div>
     <div class="vrow"><span class="lab">EXAMPLE</span><span>${esc(v.ex)}</span>${spkBtn(v.ex,"Hear example")}</div></div>`).join("")}${mineCards(u)}</div>`;
  if(S.sub==="track")return `<div class="note">Add a mark every time you use a word correctly in real speaking. The voice coach adds marks for you. Five marks means the word is activated.<span class="ar">حط علامة كل ما تستخدم الكلمة صح وانت بتتكلم، والكوتش بيضيفها لوحده. خمس علامات يعني الكلمة اتفعّلت.</span></div>
   <div class="ttable"><div class="trow h"><span>Word</span><span>Part of speech</span><span>Uses (aim for 5)</span><span style="text-align:right">Progress</span></div>
   ${u.vocab.map((v,i)=>{const m=p.m[v.w]||0;return `${v.x&&!(u.vocab[i-1]||{}).x?`<div class="trow h tsec"><span>Useful expressions</span><span></span><span></span><span></span></div>`:""}<div class="trow ${m>=5?"act":""}"><span class="w">${esc(v.w)} ${favBtn(v.w)}</span><span class="pos">${esc(v.pos)}</span><span class="boxes" data-w="${esc(v.w)}">${[1,2,3,4,5].map(n=>`<button class="${n<=m?"f":""}" data-n="${n}" aria-label="${n} uses">${n<=m?"✓":""}</button>`).join("")}</span><span class="st">${m>=5?"✓ Activated":m+"/5"}</span></div>`}).join("")}${mineIn(u.id).map(([id,x])=>{const m=x.m||0;return `<div class="trow ${m>=5?"act":""}"><span class="w">${esc(x.w)} <span class="mine-chip">Mine</span></span><span class="pos">${esc(x.pos||"")}</span><span class="boxes" data-mid="${id}">${[1,2,3,4,5].map(n=>`<button class="${n<=m?"f":""}" data-n="${n}" aria-label="${n} uses">${n<=m?"✓":""}</button>`).join("")}</span><span class="st">${m>=5?"✓ Activated":m+"/5"}</span></div>`}).join("")}</div>`;
  return `<div class="note">Answer about your own life, about a minute each. Use the voice coach below to get corrected, or press Done after you speak.<span class="ar">جاوب عن حياتك، دقيقة لكل سؤال. استخدم الـ Voice coach تحت عشان تتصحح، أو دوس Done بعد ما تتكلم.</span></div>
   <div class="prompts">${u.p.map((q,i)=>`<div class="prompt ${p.p[i]?"done":""}"><span class="pn">${String(i+1).padStart(2,"0")}</span><span>${esc(q)}</span>
    <span class="pact">${spkBtn(q,"Hear question")}<button class="btn" data-coach="p${i}">Answer with coach</button><button class="btn ${p.p[i]?"good":""}" data-done="${i}">${p.p[i]?"✓":"Done"}</button></span></div>`).join("")}</div>`}

let VADD=null;
function mineIn(uid){return Object.entries(S.mine).filter(([id,x])=>x.unit===uid).sort((a,b)=>(a[1].t||0)-(b[1].t||0))}
function mineCards(u){const n0=u.vocab.length;const st=VADD&&VADD.u===u.id?VADD.t:"";
  return mineIn(u.id).map(([id,x],k)=>`<div class="vcard mine ${S.flash===id?"flash":""}"><span class="rib">MY ${u.track==="biz"?"PHRASE":"WORD"}</span>
     <div class="vimg noimg"><span class="nw">${esc(x.w)}</span>${x.ar?`<span class="na">${esc(x.ar)}</span>`:""}</div>
     <div class="vtop"><span class="vno">${String(n0+k+1).padStart(2,"0")}</span><span class="vword">${esc(x.w)}</span>${spkBtn(clean(x.w),"Hear "+x.w)}${favBtn(x.w)}<span class="var">${esc(x.ar||"")}</span></div>
     ${x.pos?`<div class="vpos">${esc(x.pos)}</div>`:""}
     ${x.note?`<div class="vrow"><span class="lab">USE</span><span class="vnote" dir="rtl">${esc(x.note)}</span><span></span></div>`:""}
     ${x.mean?`<div class="vrow"><span class="lab">MEANING</span><span>${esc(x.mean)}</span>${spkBtn(x.mean,"Hear meaning")}</div>`:""}
     ${x.ex?`<div class="vrow"><span class="lab">EXAMPLE</span><span>${esc(x.ex)}${x.exAr?`<span class="vexar" dir="rtl">${esc(x.exAr)}</span>`:""}</span>${spkBtn(x.ex,"Hear example")}</div>`:""}
     <div class="vmine"><button class="lnk" data-vedit="${id}">Edit in My Words</button><button class="lnk" data-vdel="${id}">Remove</button></div></div>`).join("")+
   `<div class="vcard vadd"><span class="rib">ADD YOUR OWN</span>
     <div class="vaddin"><b>Add a ${u.track==="biz"?"phrase":"word"} to this session</b><p>Type it in English or Arabic and press +. Then add the Arabic and an example from My Words (Edit).</p>
     <div class="qadd"><input id="vW" placeholder="${u.track==="biz"?"e.g. as per the contract":"e.g. get used to"}" autocomplete="off" aria-label="Word or expression"><button class="btn pri qgo" id="vGo" aria-label="Add to this session">+</button></div>
     <span class="cstate" id="vSt" role="status">${esc(st)}</span></div></div>`}
async function quickAdd(w,unit,stEl,btn,inp,done){if(fillCtl){fillCtl.abort();return}
  if(!w){toast("Type a word first.");inp&&inp.focus();return}
  if(isDup(w)){stEl.textContent=`"${w}" is already in My Words.`;return}
  const mk=(W,r)=>{const id="m"+Date.now().toString(36);const x={w:W,date:TODAY(),t:Date.now(),m:0};if(unit)x.unit=unit;["pos","ar","note","mean","ex","exAr"].forEach(k=>x[k]=r&&r[k]?String(r[k]).trim():"");S.mine[id]=x;S.flash=id;save();return x};
  if(!SAMPLE){const x=mk(w,null);say(w);done(`Saved "${w}". Add the meaning from My Words (Edit).`);return}
  fillCtl=new AbortController();btn.textContent="■";inp.disabled=true;stEl.textContent=`Saving "${w}"…`;
  try{const r=await fillWord(w,"",fillCtl.signal);if(!r||!r.mean||!r.w)throw{code:"invalid_json"};
    const W=String(r.w).trim();fillCtl=null;if(isDup(W)){done(`"${W}" is already in My Words.`);return}
    const x=mk(W,r);say(W);done(`Saved "${W}" — ${x.ar}`);
  }catch(e){fillCtl=null;stEl.textContent=fillErr(e);btn.textContent="+";inp.disabled=false}}
function bindLesson(u){const main=document.getElementById("main");
  main.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{stopAll();S.mode=b.dataset.mode;if(S.mode==="role")S.part="d";save();renderMain()});
  main.querySelectorAll("[data-part]").forEach(b=>{if(b.tagName==="BUTTON")b.onclick=()=>{stopAll();S.part=b.dataset.part;if(S.part==="p"&&S.mode==="role")S.mode="listen";save();renderMain()}});
  const hm=document.getElementById("hideMine");if(hm)hm.onchange=e=>{S.hideMine=e.target.checked;save();renderMain()};
  const cm=document.getElementById("cmpMine");if(cm)cm.onchange=e=>{S.cmp=e.target.checked;save()};
  main.querySelectorAll(".dl.mine .tx").forEach(t=>t.addEventListener("click",()=>t.classList.add("show")));
  document.getElementById("playBtn").onclick=run;
  main.querySelectorAll(".seg[data-k]").forEach(seg=>seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{S[seg.dataset.k]=parseFloat(b.dataset.v);save();seg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b))}));
  document.getElementById("hideBtn").onclick=()=>{S.hide=!S.hide;save();stopAll();renderMain()};
  document.getElementById("readBtn").onclick=()=>{const p=P(u.id);p.r=p.r?0:1;bump("act");save();renderMain()};
  main.querySelectorAll(".s").forEach(s=>s.onclick=()=>sayAt(s.dataset.p,+s.dataset.i));
  main.querySelectorAll("[data-gq]").forEach(b=>b.onclick=()=>{const p=P(u.id),i=+b.dataset.gq;if(p.g[i]!=null)return;p.g[i]=+b.dataset.o;bump("act");save();renderMain()});
  const gr=document.getElementById("gRetry");if(gr)gr.onclick=()=>{const p=P(u.id);p.g=p.g.map((x,i)=>x===u.qs[i].a?x:null);save();renderMain()};
  main.querySelectorAll("[data-sub]").forEach(b=>b.onclick=()=>{S.sub=b.dataset.sub;save();main.querySelectorAll("[data-sub]").forEach(x=>x.classList.toggle("on",x===b));document.getElementById("subBody").innerHTML=subHTML(u);bindSub(u)});
  bindSub(u);bindCoach(u);
  document.getElementById("markBottom").onclick=()=>markClick(u);
  document.getElementById("copyAI").onclick=()=>copy(aiPrompt(u))}
function bindSub(u){const box=document.getElementById("subBody");bindSay(box);
  const redraw=()=>{const b=document.getElementById("subBody");if(!b)return;b.innerHTML=subHTML(u);bindSub(u);if(S.flash){S.flash=null;save()}};
  const vi=document.getElementById("vW"),vg=document.getElementById("vGo");
  if(vi){vi.onkeydown=e=>{if(e.key==="Enter")vg.click()};vg.onclick=()=>quickAdd(vi.value.trim(),u.id,document.getElementById("vSt"),vg,vi,t=>{VADD={u:u.id,t};redraw();setTimeout(()=>{const n=document.getElementById("vW");if(n)n.focus({preventScroll:true})},50)})}
  box.querySelectorAll("[data-vdel]").forEach(b=>b.onclick=()=>{const x=S.mine[b.dataset.vdel];if(!x)return;delete S.mine[b.dataset.vdel];delete S.fav[fk(x.w)];VADD=null;save();redraw();toast(`Removed "${x.w}"`)});
  box.querySelectorAll("[data-vedit]").forEach(b=>b.onclick=()=>{const id=b.dataset.vedit,x=S.mine[id];if(!x)return;S.editId=id;S.addOpen=true;S.addDraft={...x};S.view="words";save();renderAll();scrollTop()});
  box.querySelectorAll(".boxes").forEach(m=>m.querySelectorAll("button").forEach(b=>b.onclick=()=>{const n=+b.dataset.n;if(m.dataset.mid){const x=S.mine[m.dataset.mid];if(x)x.m=(x.m||0)===n?n-1:n}else{const p=P(u.id),w=m.dataset.w;p.m[w]=(p.m[w]||0)===n?n-1:n}bump("act");save();box.innerHTML=subHTML(u);bindSub(u);refreshPills()}));
  box.querySelectorAll("[data-done]").forEach(b=>b.onclick=()=>{const p=P(u.id),i=+b.dataset.done;p.p[i]=p.p[i]?0:1;bump("act");save();box.innerHTML=subHTML(u);bindSub(u);refreshPills()});
  box.querySelectorAll("[data-coach]").forEach(b=>b.onclick=()=>{const c=coachState(u);c.task=b.dataset.coach;c.res=null;c.input="";save();redrawCoach(u);document.getElementById("coach").scrollIntoView({behavior:"smooth"});setTimeout(()=>{const t=document.getElementById("coachIn");if(t)t.focus()},400)})}

function aiPrompt(u){const words=u.vocab.map(v=>v.w).join(", ");
  if(u.track==="biz")return `You are my Business English coach. My level is A2 and I want to reach B1. I'm a contracts manager in a fit-out construction company and I need English for meetings.

Today's session: "${u.title}". Grammar focus: ${u.g}.
Target phrases: ${words}.

Role-play a short meeting on this topic with new details (different project, materials and numbers). You play the other people. I play the contracts manager.
- Say one or two lines at a time, then wait for me.
- After each of my turns, correct my mistakes briefly and show a more natural way to say it.
- Tell me which target phrases I used.
At the end, give me a score out of 10 and three things to practise.`;
  return `You are my English speaking partner. My level is A2 and I want to reach B1.

Today's topic: "${u.title}". Grammar focus: ${u.g}.
Target words: ${words}.

Ask me these questions one at a time:
${u.p.map((q,i)=>`${i+1}. ${q}`).join("\n")}

After each answer: correct my mistakes briefly, show a more natural version, tell me which target words I used, and ask one short follow-up question. Keep your English simple.`}

/* ===== voice coach ===== */
let SAMPLE=null,coachCtl=null;
(async()=>{try{if(window.claude&&typeof window.claude.use==="function")SAMPLE=await window.claude.use("sample")}catch(e){SAMPLE=null}updCoachBtn()})();
function coachState(u){if(!S.coach[u.id])S.coach[u.id]={task:"words",input:"",res:null,custom:""};return S.coach[u.id]}
function coachTask(u,c){const biz=u.track==="biz";
  if(c.task==="words")return `Make your own sentences with at least four of this session's ${biz?"phrases":"words"}. Talk about your real work or life.`;
  if(c.task==="next"&&c.custom)return c.custom;const i=+String(c.task).replace("p","");return u.p[i]||u.p[0]}
function micHint(){const ua=navigator.userAgent||"";
  if(/iPhone|iPad|iPod/i.test(ua))return "Tap the box, then tap the microphone on your iPhone keyboard and speak.";
  if(/Android/i.test(ua))return "Tap the box, then tap the microphone on your keyboard and speak.";
  if(/Mac/i.test(ua))return "Click the box, press the Fn key twice (or the microphone key) and speak.";
  if(/Win/i.test(ua))return "Click the box, press Windows + H and speak.";
  return "Click the box and use your device's dictation (the microphone on your keyboard).";}
function coachHTML(u){const c=coachState(u),biz=u.track==="biz";
  const tasks=[["words",`Use the ${biz?"phrases":"words"}`],...u.p.map((q,i)=>["p"+i,"Question "+(i+1)]),...(c.custom?[["next","Follow-up"]]:[])];
  return `<section class="card" id="coach"><span class="tag">5 · Voice coach</span>
    <div class="card-h"><h2>Speak, then get corrected</h2><label class="check"><input type="checkbox" id="autoSpeak" ${S.autoSpeak?"checked":""}> Read the correction aloud</label></div>
    <div class="ctasks" role="group" aria-label="Task">${tasks.map(([k,l])=>`<button data-ctask="${k}" class="${c.task===k?"on":""}">${l}</button>`).join("")}</div>
    <div class="ctask"><span>${esc(coachTask(u,c))}</span>${spkBtn(coachTask(u,c),"Hear the task")}</div>
    ${c.task==="words"?`<div class="wchips" style="margin-bottom:10px">${u.vocab.map(v=>`<span class="wchip">${esc(v.w)}</span>`).join("")}${mineIn(u.id).map(([i,x])=>`<span class="wchip">${esc(x.w)}</span>`).join("")}</div>`:""}
    <div class="micbox"><div class="mh">${IC.mic}<span>${esc(micHint())}</span></div>
      <textarea id="coachIn" aria-label="Your answer" placeholder="Speak here…">${esc(c.input||"")}</textarea></div>
    <div class="row"><button class="btn pri" id="coachGo">Check my English</button><button class="btn" id="coachClear">Clear</button><span class="cstate" id="coachSt" role="status"></span></div>
    <div id="coachOut">${c.res?resHTML(c.res,u):""}</div>
  </section>`}
function resHTML(r,u){const sc=Math.max(0,Math.min(10,Math.round(Number(r.score)||0)));const biz=u.track==="biz";
  const used=arr(r.words_used).map(w=>String(w).toLowerCase());const corr=arr(r.corrections).filter(x=>x&&x.right),pron=arr(r.pronunciation).filter(x=>x&&x.meant);
  const q=(t,cls,l)=>`<div class="cquote ${cls}"><span>${esc(t)}</span><span class="acts">${spkBtn(t,l)}<button class="slow" data-say="${esc(t)}" data-rate="0.75">Slow</button></span></div>`;
  return `<div class="cres">
    <div class="chead"><div class="cscore ${sc>=7?"":sc>=4?"mid":"low"}"><span><b class="num">${sc}</b>/10</span></div><div>${r.level?`<span class="chip g">Level shown: ${esc(r.level)}</span>`:""}${r.praise?`<p>${esc(r.praise)}</p>`:""}</div></div>
    ${r.natural?`<div><div class="clab">Correct version · listen and repeat it</div>${q(r.natural,"","Hear the correct version")}</div>`:""}
    ${biz&&r.professional?`<div><div class="clab">Meeting-ready version</div>${q(r.professional,"pro","Hear the meeting version")}</div>`:""}
    <div><div class="clab">Corrections</div>${corr.length?`<ol class="clist">${corr.map(x=>`<li><span class="cw">${esc(x.wrong||"")}</span> → <span class="cr">${esc(x.right)}</span> ${spkBtn(x.right,"Hear "+x.right)}${x.tip_ar?`<div class="ctip ar">${esc(x.tip_ar)}</div>`:""}</li>`).join("")}</ol>`:`<div class="cok">No mistakes. Well done.</div>`}</div>
    ${pron.length?`<div><div class="clab">Check your pronunciation</div><ol class="clist">${pron.map(x=>`<li>The keyboard heard <span class="cw">${esc(x.heard||"")}</span>. You probably meant <span class="cr">${esc(x.meant)}</span> ${spkBtn(x.meant,"Hear "+x.meant)}${x.tip_ar?`<div class="ctip ar">${esc(x.tip_ar)}</div>`:""}</li>`).join("")}</ol></div>`:""}
    <div><div class="clab">Target ${biz?"phrases":"words"} you used</div><div class="wchips">${u.vocab.map(v=>`<span class="wchip ${used.includes(clean(v.w).toLowerCase())||used.includes(v.w.toLowerCase())?"on":""}">${esc(v.w)}</span>`).join("")}${mineIn(u.id).map(([i,x])=>`<span class="wchip ${used.includes(clean(x.w).toLowerCase())||used.includes(x.w.toLowerCase())?"on":""}">${esc(x.w)}</span>`).join("")}</div></div>
    ${r.next?`<div><div class="clab">Keep talking</div><div class="ctask" style="margin:0"><span>${esc(r.next)}</span><button class="btn" id="coachNext">Answer it</button></div></div>`:""}
  </div>`}
function coachPrompt(u,c,text,forChat){const biz=u.track==="biz";const words=u.vocab.map(v=>v.w).concat(mineIn(u.id).map(([i,x])=>x.w)).join(", ");
  const base=`You are an experienced English teacher. Your student is an Egyptian adult (native language Egyptian Arabic), level A2, working towards B1. He is a contracts manager in a fit-out construction company${biz?" and is practising English for business meetings":""}.
He SPOKE his answer and his device's dictation turned it into text, so ignore punctuation and capital letters. If a word looks wrong but sounds like the word he probably meant, treat it as a possible pronunciation problem, not a grammar mistake.

Session: "${u.title}". Grammar focus: ${u.g}.
Target ${biz?"phrases":"words"}: ${words}.
Task: ${coachTask(u,c)}

Student's answer:
"""${text}"""
`;
  if(forChat)return base+`
Please give me: a score out of 10 and the level shown; my answer in correct, natural English;${biz?" the same message as a professional would say it in a meeting;":""} my mistakes (my words → correction) with a short tip in Egyptian Arabic; words dictation may have misheard (pronunciation); the target ${biz?"phrases":"words"} I used; and one follow-up question.`;
  return base+`
Reply with only a JSON object in exactly this shape:
{"score": <number 1-10 for accuracy and naturalness at his level>,
 "level": "<A1|A2|B1|B2: the level this answer shows>",
 "praise": "<one short, specific sentence in simple English about what he did well>",
 "natural": "<his whole answer in correct, natural English, keeping his meaning and staying close to his words>",
 "professional": "<${biz?"the same message as a confident professional would say it in a meeting":"empty string"}>",
 "corrections": [{"wrong": "<his exact words>", "right": "<the correction>", "tip_ar": "<one short explanation in Egyptian Arabic>"}],
 "pronunciation": [{"heard": "<word in the transcript>", "meant": "<word he probably said>", "tip_ar": "<short pronunciation tip in Egyptian Arabic>"}],
 "words_used": ["<target items he used correctly, spelled exactly as in the list>"],
 "next": "<one follow-up question in simple English on the same topic>"}
At most 6 corrections, most important first. Use [] when a list is empty. Keep tips short and practical.`}
function updCoachBtn(){const b=document.getElementById("coachGo");if(b)b.textContent=coachCtl?"Stop":SAMPLE?"Check my English":"Copy prompt"}
function redrawCoach(u){const box=document.getElementById("coach");if(!box)return;box.outerHTML=coachHTML(u);bindCoach(u)}
function bindCoach(u){const c=coachState(u),box=document.getElementById("coach");if(!box)return;const inp=document.getElementById("coachIn");updCoachBtn();bindSay(box);
  inp.oninput=()=>{c.input=inp.value;save()};
  document.getElementById("autoSpeak").onchange=e=>{S.autoSpeak=e.target.checked;save()};
  box.querySelectorAll("[data-ctask]").forEach(b=>b.onclick=()=>{c.task=b.dataset.ctask;c.res=null;c.input="";save();redrawCoach(u);document.getElementById("coachIn").focus()});
  document.getElementById("coachClear").onclick=()=>{inp.value="";c.input="";c.res=null;save();document.getElementById("coachOut").innerHTML="";inp.focus()};
  const nx=document.getElementById("coachNext");if(nx)nx.onclick=()=>{c.custom=c.res.next;c.task="next";c.res=null;c.input="";save();redrawCoach(u);document.getElementById("coachIn").focus()};
  document.getElementById("coachGo").onclick=()=>coachCheck(u)}
async function coachCheck(u){if(coachCtl){coachCtl.abort();return}
  const c=coachState(u),inp=document.getElementById("coachIn"),st=document.getElementById("coachSt");
  const text=inp.value.trim();if(text.split(/\s+/).length<3){toast("Say at least one full sentence first.");inp.focus();return}
  c.input=text;save();
  if(!SAMPLE){copy(coachPrompt(u,c,text,true));st.textContent="Copied. Paste it into ChatGPT, Gemini or any AI chat to get corrected.";return}
  coachCtl=new AbortController();updCoachBtn();st.textContent="Checking your English… usually 10 to 30 seconds.";
  try{const r=await SAMPLE.json(coachPrompt(u,c,text,false),{signal:coachCtl.signal});
    if(!r||typeof r!=="object"||!r.natural)throw{code:"invalid_json"};
    c.res=r;const p=P(u.id),used=arr(r.words_used).map(w=>String(w).toLowerCase());let added=0;
    u.vocab.forEach(v=>{if(used.includes(clean(v.w).toLowerCase())||used.includes(v.w.toLowerCase())){const m=p.m[v.w]||0;if(m<5){p.m[v.w]=m+1;added++}}});
    mineIn(u.id).forEach(([i,x])=>{if(used.includes(clean(x.w).toLowerCase())||used.includes(x.w.toLowerCase())){const m=x.m||0;if(m<5){x.m=m+1;added++}}});
    if(c.task==="words")p.wc=1;if(/^p\d$/.test(c.task))p.p[+c.task[1]]=1;bump("act");save();
    redrawCoach(u);refreshPills();const sb=document.getElementById("subBody");if(sb){sb.innerHTML=subHTML(u);bindSub(u)}
    if(S.autoSpeak)say(r.natural);
    if(added)toast(`Added a mark to ${added} ${added>1?"words":"word"} you used.`);
  }catch(e){const code=e&&e.code;const s2=document.getElementById("coachSt");if(!s2)return;
    if(code==="cancelled")s2.textContent="Stopped.";
    else if(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(code)){SAMPLE=null;s2.textContent="AI check isn't available. Press Copy prompt and paste it into any AI chat."}
    else if(code==="rate_limited")s2.textContent="Too many checks right now. Wait a minute, then try again.";
    else if(code==="session_expired")s2.textContent="Please sign in again, then press Check.";
    else if(code==="invalid_json")s2.textContent="The correction didn't come back complete. Press Check again.";
    else if(code==="refused")s2.textContent="Couldn't check this answer. Try saying it differently.";
    else s2.textContent="Connection problem. Press Check again."}
  finally{coachCtl=null;updCoachBtn()}}

/* ===== quizzes ===== */
let quiz=null,exam=null,bq=null;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function vocabQ(v,pool,forceMeaning){const others=shuffle(pool.filter(x=>x.w!==v.w)).slice(0,3).map(x=>x.w);const opts=shuffle([v.w,...others]);const rx=new RegExp("\\b"+rxEsc(clean(v.w))+"\\w*","i");
  if(!forceMeaning&&rx.test(v.ex))return{q:"Complete: "+esc(v.ex).replace(rx,"<b>_____</b>"),opts,a:opts.indexOf(v.w),say:v.ex,pick:null};
  return{q:`${v.img?spr(v.img,"qimg",""):""}Which ${v.w.includes(" ")?"phrase":"word"} means: <b>${esc(v.mean)}</b>?`,opts,a:opts.indexOf(v.w),pick:null}}
function gramQ(u){const q=u.qs[Math.floor(Math.random()*3)];const o=shuffle(q.opts.map((t,i)=>({t,i})));return{q:esc(q.q).replace("___","<b>_____</b>")+` <span style="color:var(--muted);font-size:.85rem">(Session ${u.id})</span>`,opts:o.map(x=>x.t),a:o.findIndex(x=>x.i===q.a),pick:null}}
function quizHTML(items){return `<div class="qs">${items.map((x,i)=>`<div class="q"><div class="qt"><span class="n">${i+1}</span>${x.q}</div><div class="opts">${x.opts.map((o,j)=>{let c="";if(x.pick!=null){if(j===x.a)c="right";else if(j===x.pick)c="wrong"}return `<button class="opt ${c}" data-q="${i}" data-o="${j}" ${x.pick!=null?"disabled":""}>${esc(o)}</button>`}).join("")}</div></div>`).join("")}</div>`}

function renderReview(r,main){if(!quiz||quiz.id!==r.id){const units=r.covers.map(id=>UNITS[id]);const pool=units.flatMap(u=>u.vocab);quiz={id:r.id,items:shuffle([...shuffle(pool).slice(0,Math.max(4,10-units.length)).map((v,i)=>vocabQ(v,pool,i%2===1)),...units.map(gramQ)])}}
  const n=quiz.items.length,ans=quiz.items.filter(x=>x.pick!=null).length,right=quiz.items.filter(x=>x.pick===x.a).length;
  main.innerHTML=`<div id="banner"></div><section class="lhead"><div class="eyebrow">${TR[r.track].name} · Review</div><h1>${esc(r.mod.name)}</h1>
    <div class="chips">${r.covers.map(id=>`<span class="chip">${esc(label(id))}</span>`).join("")}</div></section>
   <section class="card"><span class="tag">Quiz</span><div class="card-h"><h2>Words and grammar from these sessions</h2><span class="chip">Best ${S.rv[r.id]!=null?S.rv[r.id]+"/10":"–"} · pass 8/10</span></div>
    ${quizHTML(quiz.items)}
    <div class="row" style="justify-content:space-between;margin-top:16px"><div><span class="score">${right}/${n}</span> <span style="color:var(--muted)">${ans<n?`${n-ans} left`:right>=8?"Passed. Press Mark as Complete.":"Below 8. Go back to the sessions, then try a new set."}</span></div><button class="btn pri" id="newQuiz">New set of questions</button></div>
   </section>`;
  main.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const x=quiz.items[+b.dataset.q];x.pick=+b.dataset.o;if(x.say&&x.pick===x.a)say(x.say);
    if(quiz.items.every(y=>y.pick!=null)){const s=quiz.items.filter(y=>y.pick===y.a).length;S.rv[r.id]=Math.max(S.rv[r.id]||0,s);bump("act");save()}renderReview(r,main)});
  document.getElementById("newQuiz").onclick=()=>{quiz=null;renderReview(r,main)}}


/* ===== meeting phrases ===== */
function renderPhrases(main){const q=(S.phQ||"").toLowerCase();
  const groups=window.PHRASES.map(g=>({...g,items:g.items.filter(it=>!q||(it[0]+" "+it[1]).toLowerCase().includes(q))})).filter(g=>g.items.length);
  main.innerHTML=`<section class="lhead"><div class="eyebrow">Tools</div><h1>Meeting Phrases</h1><p style="margin:0;color:var(--muted);max-width:62ch">Ready-to-use phrases for meetings, grouped by situation. Listen, repeat each one twice, then use it in your next real meeting.</p></section>
   <div class="bank-tools"><input type="search" id="phSearch" placeholder="Search English or Arabic" value="${esc(S.phQ||"")}" aria-label="Search phrases"></div>
   ${groups.map((g,gi)=>`<section class="card"><span class="tag">${esc(g.name)}</span><div class="card-h"><h2>${esc(g.name)} <span class="ar" style="font-size:1rem;color:var(--muted);font-weight:400">${esc(g.ar)}</span></h2><button class="btn" data-playall="${gi}">Play all with pauses</button></div>
     <div class="phl">${g.items.map(it=>`<div class="ph">${spkBtn(it[0],"Hear phrase")}<div><div class="en">${esc(it[0])}</div><div class="ar">${esc(it[1])}</div></div>${it[2]?`<button class="src" data-open="${it[2]}">Session ${it[2].slice(1)}</button>`:"<span></span>"}</div>`).join("")}</div></section>`).join("")||`<div class="empty">No phrases match.</div>`}`;
  bindSay(main);
  const s=document.getElementById("phSearch");s.oninput=()=>{S.phQ=s.value;const pos=s.selectionStart;renderPhrases(main);const n=document.getElementById("phSearch");n.focus();n.setSelectionRange(pos,pos)};
  main.querySelectorAll(".src[data-open]").forEach(b=>b.onclick=()=>open(b.dataset.open));
  main.querySelectorAll("[data-playall]").forEach(b=>b.onclick=()=>playList(groups[+b.dataset.playall].items.map(x=>x[0])))}
function playList(list){if(!synth){toast("No speech voice in this browser");return}stopAll();const my=++token;let k=0;
  const nx=()=>{if(my!==token||k>=list.length)return;utter(list[k++],0,()=>{if(my===token)gapT=setTimeout(nx,2200)})};nx();toast("Repeat each phrase in the pause.")}

/* ===== my words ===== */
const fk=w=>String(w).trim().toLowerCase();
const isFav=w=>!!S.fav[fk(w)];
const STAR='<svg viewBox="0 0 24 24"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.5-4.2 6.1-.8z"/></svg>';
const favBtn=w=>{const on=isFav(w);return `<button class="fav ${on?"on":""}" data-fav="${esc(fk(w))}" aria-pressed="${on}" aria-label="${on?"Remove from":"Add to"} favourites: ${esc(w)}" title="${on?"Remove from favourites":"Add to favourites"}">${STAR}</button>`};
function rowHTML(r){return `<div class="brow ${r.m>=5?"act":""} ${r.mid&&r.mid===S.flash?"flash":""}">${spkBtn(clean(r.w),"Hear "+r.w)}<span class="w">${r.img?spr(r.img,"bthumb",""):""}<span class="wl">${esc(r.w)}${favBtn(r.w)}</span><small>${esc(r.pos)}</small></span><span class="ar arw">${esc(r.ar)}${r.note?`<small class="arnote">${esc(r.note)}</small>`:""}</span><span class="mn">${esc(r.mean)}<div class="ex">${r.ex?`${spkBtn(r.ex,"Hear the example").replace('class="ico"','class="ico sm"')} `:""}${esc(r.ex)}</div>${r.exAr?`<div class="exar" dir="rtl">${esc(r.exAr)}</div>`:""}</span>${r.mid?`<span class="srcm">${r.unit?`<button class="src" data-open="${r.unit}">${UNITS[r.unit].track==="biz"?"Business ":"A2 "}${esc(r.unit.replace("B",""))}</button>`:`<span class="mine-chip">Mine</span>`}<button class="del" data-edit="${r.mid}" aria-label="Edit ${esc(r.w)}" title="Edit">&#9998;</button><button class="del" data-del="${r.mid}" aria-label="Delete ${esc(r.w)}">&times;</button></span>`:`<button class="src" data-open="${r.unit}">${r.track==="biz"?"Business ":"A2 "}${esc(r.unit.replace("B",""))}</button>`}<span class="mini" ${r.mid?`data-mid="${r.mid}"`:`data-u="${r.unit}"`} data-w="${esc(r.w)}">${[1,2,3,4,5].map(n=>`<button class="${n<=r.m?"f":""}" data-n="${n}" aria-label="${n} uses"></button>`).join("")}</span></div>`}
function favRows(){const have=new Map(bankRows().map(r=>[fk(r.w),r]));
  Object.values(UNITS).forEach(u=>{if(u.review||!u.vocab)return;u.vocab.forEach(v=>{const k=fk(v.w);if(!have.has(k))have.set(k,{...v,unit:u.id,track:u.track,date:"",m:P(u.id).m[v.w]||0,notYet:true})})});
  return Object.entries(S.fav).map(([k,f])=>{const r=have.get(k);return r?{...r,ft:f.t||0}:null}).filter(Boolean).sort((a,b)=>b.ft-a.ft)}
function toggleFav(k){if(S.fav[k])delete S.fav[k];else S.fav[k]={t:Date.now()};save();const on=!!S.fav[k];
  if(S.view==="words"){const m=document.getElementById("main");const y=window.scrollY;renderWords(m);window.scrollTo(0,y)}
  else document.querySelectorAll(`[data-fav="${CSS.escape(k)}"]`).forEach(b=>{b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
  toast(on?"Added to favourites":"Removed from favourites")}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-fav]");if(!b)return;e.preventDefault();e.stopPropagation();toggleFav(b.dataset.fav)},true);
function bankRows(){return Object.entries(S.bank).map(([w,b])=>{const u=UNITS[b.unit];if(!u)return null;const v=u.vocab.find(x=>x.w===w);if(!v)return null;return{...v,unit:u.id,track:u.track,date:b.date,m:P(u.id).m[w]||0}}).filter(Boolean).concat(Object.entries(S.mine).map(([id,x])=>({w:x.w,pos:x.pos||"",ar:x.ar||"",note:x.note||"",exAr:x.exAr||"",mean:x.mean||"",ex:x.ex||"",unit:x.unit&&UNITS[x.unit]?x.unit:null,mid:id,track:"mine",date:x.date,m:x.m||0})))}
function favHTML(){const rows=favRows();
  return `<section class="card" id="favCard"><span class="tag">Favourites</span>
   <div class="card-h"><h2>My favourite words</h2><span class="chip num">${rows.length}</span></div>
   ${rows.length?`<div class="btable"><div class="brow h"><span></span><span>Word</span><span>Arabic</span><span>Meaning · example</span><span>Session</span><span>Uses</span></div>${rows.map(rowHTML).join("")}</div>`
   :`<div class="empty">No favourites yet. Press the star next to any word, here or inside a session, and it shows up in this table.</div>`}
  </section>`}
function renderWords(main){const all=bankRows();const q=(S.bankQ||"").toLowerCase();
  const f=S.bankF;let rows=all.filter(r=>f==="all"||(f==="core"&&r.track==="core")||(f==="biz"&&r.track==="biz")||(f==="new"&&r.m<5)||(f==="mine"&&r.track==="mine")||(f==="fav"&&isFav(r.w)));
  if(q)rows=rows.filter(r=>(r.w+" "+r.ar+" "+r.mean+" "+(r.note||"")).toLowerCase().includes(q));
  rows.sort((a,b)=>(b.date||"").localeCompare(a.date||"")||a.w.localeCompare(b.w));
  const act=all.filter(r=>r.m>=5).length;
  main.innerHTML=`<section class="lhead"><div class="eyebrow">Tools</div><h1>My Words</h1>
    <div class="stats"><div class="stat"><b>${all.length}</b><span>Words and phrases</span></div><div class="stat"><b>${act}</b><span>Activated (5 uses)</span></div><div class="stat"><b>${all.filter(r=>r.track==="core").length}</b><span>General English</span></div><div class="stat"><b>${all.filter(r=>r.track==="biz").length}</b><span>Meeting phrases</span></div></div></section>
   ${favHTML()}
   ${addHTML()}
   ${all.filter(r=>r.mean).length>=4?`<section class="card" id="bankQuiz"><span class="tag">Practise</span>${bqHTML()}</section>`:""}
   <section class="card"><span class="tag">Word list</span>
    ${all.length?`<div class="bank-tools"><input type="search" id="bankSearch" placeholder="Search English or Arabic" value="${esc(S.bankQ||"")}" aria-label="Search words">
      <span class="seg" role="group" aria-label="Filter">${[["all","All"],["fav","★ Favourites"],["core","General"],["biz","Business"],["mine","Added by me"],["new","Not activated"]].map(([k,l])=>`<button data-bf="${k}" class="${f===k?"on":""}">${l}</button>`).join("")}</span></div>
     <div class="btable"><div class="brow h"><span></span><span>Word</span><span>Arabic</span><span>Meaning · example</span><span>Session</span><span>Uses</span></div>
     ${rows.map(rowHTML).join("")||`<div class="empty">No words match.</div>`}</div>`
    :`<div class="empty">No words yet. When you mark a session as complete, its words and phrases move here. You can also add your own above.</div>`}
   </section>`;
  bindSay(main);
  const s=document.getElementById("bankSearch");if(s)s.oninput=()=>{S.bankQ=s.value;const pos=s.selectionStart;renderWords(main);const n=document.getElementById("bankSearch");n.focus();n.setSelectionRange(pos,pos)};
  main.querySelectorAll("[data-bf]").forEach(b=>b.onclick=()=>{S.bankF=b.dataset.bf;save();renderWords(main)});
  main.querySelectorAll(".src[data-open]").forEach(b=>b.onclick=()=>open(b.dataset.open));
  main.querySelectorAll(".mini").forEach(m=>m.querySelectorAll("button").forEach(b=>b.onclick=()=>{const n=+b.dataset.n;if(m.dataset.mid){const x=S.mine[m.dataset.mid];x.m=(x.m||0)===n?n-1:n}else{const p=P(m.dataset.u),w=m.dataset.w;p.m[w]=(p.m[w]||0)===n?n-1:n}save();renderWords(main)}));
  main.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{const x=S.mine[b.dataset.edit];if(!x)return;S.editId=b.dataset.edit;S.addOpen=true;S.addDraft={...x};save();renderWords(main);document.getElementById("addCard").scrollIntoView({behavior:"smooth",block:"start"})});
  if(S.flash){S.flash=null;save()}
  main.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{const x=S.mine[b.dataset.del];if(!x)return;delete S.mine[b.dataset.del];delete S.fav[fk(x.w)];save();renderWords(main);toast(`Deleted "${x.w}"`)});
  bindAdd(main);
  bindBQ(main)}
function addHTML(){const d=S.addDraft||{};const open=S.addOpen||false;const ed=S.editId&&S.mine[S.editId];
  return `<section class="card" id="addCard"><span class="tag">Add your own</span>
   <div class="card-h"><h2>${ed?"Edit your word":"Add a word or expression"}</h2></div>
   ${open?"":`<p style="margin:0 0 12px;color:var(--muted)">Type the word or expression (English or Arabic) and press <b>+</b>. It is saved straight to your list. Add the Arabic and an example from Edit.</p>
   <div class="qadd"><input id="qW" placeholder="e.g. back-to-back meetings" autocomplete="off" aria-label="Word or expression"><button class="btn pri qgo" id="qGo" aria-label="Add">+</button></div>
   <div class="row" style="margin-top:8px"><span class="cstate" id="qSt" role="status"></span><button class="lnk" id="addOpen">Add it by hand instead</button></div>`}
   ${open?`<div class="addf">
    <label class="fw"><span>Word or expression *</span><input id="aW" value="${esc(d.w||"")}" placeholder="e.g. back-to-back meetings" autocomplete="off"></label>
    <label><span>Type</span><input id="aPos" value="${esc(d.pos||"")}" placeholder="noun, verb, phrase…"></label>
    <label><span>Arabic</span><input id="aAr" dir="rtl" value="${esc(d.ar||"")}" placeholder="المعنى بالعربي"></label>
    <label class="fw"><span>How to use it (Arabic)</span><input id="aNote" dir="rtl" value="${esc(d.note||"")}" placeholder="تستخدمها إمتى وإزاي"></label>
    <label class="fw"><span>Meaning in English</span><input id="aMean" value="${esc(d.mean||"")}" placeholder="simple English meaning"></label>
    <label class="fw"><span>Example</span><input id="aEx" value="${esc(d.ex||"")}" placeholder="a sentence you would really say"></label>
    <label class="fw"><span>Show it in a session (optional)</span><select id="aUnit">${unitOpts(d.unit||"")}</select></label>
    <label class="fw"><span>Example in Arabic</span><input id="aExAr" dir="rtl" value="${esc(d.exAr||"")}" placeholder="ترجمة المثال"></label>
   </div>
   <div class="row"><button class="btn pri" id="addSave">${ed?"Save changes":"Save to My Words"}</button>${SAMPLE?`<button class="btn" id="addFill">Auto-fill</button>`:""}<button class="btn" id="addCancel">Cancel</button><span class="cstate" id="addSt" role="status"></span></div>`:""}
  </section>`}
function unitOpts(sel){return `<option value="">No session, My Words only</option>`+C.mods.map(m=>`<optgroup label="${esc(m.name)}">${m.units.filter(id=>UNITS[id]&&!UNITS[id].review).map(id=>`<option value="${id}" ${id===sel?"selected":""}>${esc(label(id))}</option>`).join("")}</optgroup>`).join("")}
const FLDS=[["aUnit","unit"],["aW","w"],["aPos","pos"],["aAr","ar"],["aNote","note"],["aMean","mean"],["aEx","ex"],["aExAr","exAr"]];
function addDraft(){const o={};FLDS.forEach(([id,k])=>{const e=document.getElementById(id);o[k]=e?e.value.trim():""});return o}
function isDup(w,except){w=w.toLowerCase();return Object.entries(S.mine).some(([id,x])=>id!==except&&x.w.toLowerCase()===w)||Object.keys(S.bank).some(k=>k.toLowerCase()===w)}
function fillWord(w,ar,signal){return SAMPLE.json(`You help an Egyptian adult (A2 level, working towards B1) learn English. He is a contracts manager in a fit-out construction company.
He typed this to save to his English word list: "${w}"${ar?` (he thinks it means: ${ar})`:""}.
If he typed Arabic, give the most natural English word or expression for it. If the English is misspelt, correct it. Keep it as a word or expression, not a sentence.
Return JSON only:
{"w": "the English word or expression, correctly spelt", "pos": "noun / verb / adjective / adverb / phrase / phrasal verb / idiom", "ar": "short Arabic meaning, Egyptian-friendly", "note": "one short Arabic sentence (Egyptian Arabic is fine) on when and how to use it, e.g. formal or informal, common words that go with it", "mean": "simple English meaning, under 12 words, A2 level", "ex": "one natural example sentence, under 14 words, about work or daily life", "exAr": "Arabic translation of the example"}`,{signal})}
let fillCtl=null;
function fillErr(e){const code=e&&e.code;return code==="cancelled"?"Stopped.":code==="rate_limited"?"Too many requests. Wait a minute, then try again.":["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(code)?"Add it by hand.":"Couldn't fill it in. Try again or add it by hand."}
function bindAdd(main){const card=document.getElementById("addCard");if(!card)return;
  const o=document.getElementById("addOpen");if(o)o.onclick=()=>{const q=document.getElementById("qW");S.addOpen=true;S.editId=null;S.addDraft={w:q?q.value.trim():""};save();renderWords(main);const w=document.getElementById("aW");if(w)w.focus()};
  const q=document.getElementById("qW"),qg=document.getElementById("qGo");
  if(q){q.onkeydown=e=>{if(e.key==="Enter")qg.click()};
    qg.onclick=()=>quickAdd(q.value.trim(),"",document.getElementById("qSt"),qg,q,t=>{S.bankF="all";S.bankQ="";renderWords(main);const s3=document.getElementById("qSt");if(s3)s3.textContent=t;const n=document.getElementById("qW");if(n)n.focus()})}
  card.querySelectorAll(".addf input,.addf select").forEach(i=>i.oninput=()=>{S.addDraft=addDraft();save()});
  const c=document.getElementById("addCancel");if(c)c.onclick=()=>{if(fillCtl)fillCtl.abort();S.addOpen=false;S.editId=null;S.addDraft={};save();renderWords(main)};
  const sv=document.getElementById("addSave");if(sv)sv.onclick=()=>{const d=addDraft();if(!d.w){toast("Write the word first.");document.getElementById("aW").focus();return}
    const ed=S.editId&&S.mine[S.editId]?S.editId:null;
    if(isDup(d.w,ed)){toast(`"${d.w}" is already in My Words.`);return}
    if(!d.unit)delete d.unit;if(ed){const x=S.mine[ed];if(!d.unit)delete x.unit;if(fk(x.w)!==fk(d.w)&&S.fav[fk(x.w)]){S.fav[fk(d.w)]=S.fav[fk(x.w)];delete S.fav[fk(x.w)]}Object.assign(x,d);S.flash=ed}else{const id="m"+Date.now().toString(36);S.mine[id]={...d,date:TODAY(),t:Date.now(),m:0};S.flash=id}
    S.addDraft={};S.addOpen=false;S.editId=null;S.bankF="all";save();renderWords(main);toast(ed?`Updated "${d.w}"`:`Saved "${d.w}" to My Words`)};
  const fl=document.getElementById("addFill");if(fl)fl.onclick=async()=>{if(fillCtl){fillCtl.abort();return}
    const d=addDraft(),st=document.getElementById("addSt");if(!d.w){toast("Write the word first.");return}
    fillCtl=new AbortController();fl.textContent="Stop";st.textContent="Filling it in…";
    try{const r=await fillWord(d.w,d.ar,fillCtl.signal);if(!r||!r.mean)throw{code:"invalid_json"};
      const set=(id,v)=>{const e=document.getElementById(id);if(e&&v&&!e.value.trim())e.value=String(v)};
      const we=document.getElementById("aW");if(we&&r.w)we.value=String(r.w);
      set("aPos",r.pos);set("aAr",r.ar);set("aNote",r.note);set("aMean",r.mean);set("aEx",r.ex);set("aExAr",r.exAr);S.addDraft=addDraft();save();st.textContent="Done. Check it, then press Save.";
    }catch(e){st.textContent=fillErr(e)}
    finally{fillCtl=null;const b=document.getElementById("addFill");if(b)b.textContent="Auto-fill"}};
  const w=document.getElementById("aW");if(w)w.onkeydown=e=>{if(e.key==="Enter")document.getElementById("addSave").click()}}
function bqHTML(){if(!bq)return `<div class="card-h"><h2>Quiz yourself on your words</h2></div><p style="margin:0 0 12px;color:var(--muted)">Ten quick questions from the words you've collected, newest and least used first.</p><button class="btn pri" id="bqStart">Start a 10-question quiz</button>`;
  const n=bq.length,ans=bq.filter(x=>x.pick!=null).length,right=bq.filter(x=>x.pick===x.a).length;
  return `<div class="card-h"><h2>Word quiz</h2><span class="chip num">${ans}/${n}</span></div>${quizHTML(bq)}<div class="row" style="justify-content:space-between;margin-top:14px"><span class="score">${right}/${n}</span><button class="btn" id="bqStart">New quiz</button></div>`}
function bindBQ(main){const card=document.getElementById("bankQuiz");if(!card)return;
  const st=document.getElementById("bqStart");if(st)st.onclick=()=>{const rows=bankRows().filter(r=>r.mean);const pool=rows.map(r=>({w:r.w,mean:r.mean,ex:r.ex}));
    const pick=rows.sort((a,b)=>a.m-b.m||(b.date||"").localeCompare(a.date||"")).slice(0,Math.min(20,rows.length));bq=shuffle(pick).slice(0,Math.min(10,pick.length)).map((r,i)=>vocabQ({w:r.w,mean:r.mean,ex:r.ex,img:r.img},pool,i%2===1||!!r.img));
    card.innerHTML='<span class="tag">Practise</span>'+bqHTML();bindBQ(main)};
  card.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const x=bq[+b.dataset.q];x.pick=+b.dataset.o;if(x.say&&x.pick===x.a)say(x.say);card.innerHTML='<span class="tag">Practise</span>'+bqHTML();bindBQ(main)})}

/* ===== level check ===== */
function readiness(){const cu=coreUnits.filter(isDone).length;const rvs=C.mods.filter(m=>m.track==="core").map(m=>"R"+m.id);const rp=rvs.filter(id=>(S.rv[id]||0)>=8).length;const ex=S.exitBest;
  const miss=[];if(cu<coreUnits.length)miss.push(`Complete all 24 General English sessions (${cu}/24 done)`);if(rp<rvs.length)miss.push(`Pass all module reviews with 8/10 (${rp}/${rvs.length})`);if(ex==null||ex<24)miss.push(`Score 24/30 or more in the A2 exit test (best: ${ex==null?"not taken":ex+"/30"})`);
  return{cu,rp,rvs:rvs.length,ex,miss,ready:!miss.length}}
function renderLevel(main){const R=readiness();const bz=bizUnits.filter(isDone).length;
  main.innerHTML=`<section class="lhead"><div class="eyebrow">Tools</div><h1>Are you ready to leave A2?</h1>
   <div class="stats"><div class="stat"><b>${R.cu}/24</b><span>General sessions</span></div><div class="stat"><b>${R.rp}/${R.rvs}</b><span>Reviews passed</span></div><div class="stat"><b>${R.ex==null?"–":R.ex+"/30"}</b><span>Best exit test</span></div><div class="stat"><b>${bz}/${bizUnits.length}</b><span>Meeting sessions</span></div></div>
   <div class="verdict ${R.ready?"yes":"no"}">${R.ready?"A2 complete. You're ready to start B1.":"Not yet. To move to B1:"}${R.ready?"":`<ul>${R.miss.map(m=>`<li>${m}</li>`).join("")}</ul>`}</div></section>
  <section class="card"><span class="tag">A2 grammar map</span><div class="card-h"><h2>Every A2 grammar point, one session each</h2></div>
   <div class="map">${coreUnits.map(id=>{const u=UNITS[id];return `<button class="mrow" data-open="${id}"><span class="id">${id}</span><span>${esc(u.g)}<br><span style="color:var(--muted);font-size:.82rem">${esc(u.title)}</span></span><span class="st ${isDone(id)?"d":""}">${isDone(id)?"✓ Complete":"Not complete"}</span></button>`}).join("")}</div></section>
  <section class="card" id="examCard"><span class="tag">A2 exit test</span>${examHTML()}</section>`;
  main.querySelectorAll(".mrow").forEach(b=>b.onclick=()=>open(b.dataset.open));bindExam()}
function examHTML(){if(!exam)return `<div class="card-h"><h2>30 questions from the whole A2 course</h2></div><p style="margin:0 0 12px;max-width:66ch">One grammar question from each of the 24 sessions plus 6 vocabulary questions. You need 24/30 (80%).</p><button class="btn pri" id="startExam">Start the test</button>`;
  const n=exam.length,ans=exam.filter(x=>x.pick!=null).length,right=exam.filter(x=>x.pick===x.a).length;
  return `<div class="card-h"><h2>A2 exit test</h2><span class="chip num">${ans}/${n} answered</span></div>${quizHTML(exam)}<div class="row" style="justify-content:space-between;margin-top:16px"><div><span class="score">${right}/${n}</span> <span style="color:var(--muted)">${ans<n?"":right>=24?"Passed":"Not yet. Check the sessions with wrong answers."}</span></div><button class="btn" id="startExam">New test</button></div>`}
function bindExam(){const card=document.getElementById("examCard");const s=document.getElementById("startExam");
  if(s)s.onclick=()=>{const pool=coreUnits.flatMap(id=>UNITS[id].vocab);exam=[...coreUnits.map(id=>gramQ(UNITS[id])),...shuffle(pool).slice(0,6).map(v=>vocabQ(v,pool,true))];card.innerHTML='<span class="tag">A2 exit test</span>'+examHTML();bindExam()};
  card.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const x=exam[+b.dataset.q];x.pick=+b.dataset.o;
    if(exam.every(y=>y.pick!=null)){S.exitBest=Math.max(S.exitBest||0,exam.filter(y=>y.pick===y.a).length);save();renderLevel(document.getElementById("main"));return}
    card.innerHTML='<span class="tag">A2 exit test</span>'+examHTML();bindExam()})}

/* ===== how to ===== */
const METHOD={en:[["Session","Listen","Listen 3 times without reading. Notice stress, rhythm and intonation."],["Session","Shadow","Speak with the voice twice. Shadow mode pauses after each sentence so you can repeat it."],["Session","Read aloud","Read the whole passage yourself. Tap any sentence to check how it sounds."],["Session","Grammar","Read the grammar focus and answer the three questions."],["Session","Words and speaking","Learn the words, then answer the questions out loud. Use at least six of the words."],["Session","Voice coach","Speak with dictation, copy the prompt into any AI chat, and get corrected. Then press Mark as Complete."]],
ar:[["السيشن","اسمع","اسمع ٣ مرات من غير ما تقرا. ركّز على النبرة والإيقاع."],["السيشن","قلّد","اتكلم مع الصوت مرتين. وضع Shadow بيقف بعد كل جملة عشان تكررها."],["السيشن","اقرا بصوت عالي","اقرا النص كله لوحدك. دوس على أي جملة تسمعها."],["السيشن","الجرامر","اقرا القاعدة وجاوب التلات أسئلة."],["السيشن","الكلمات والكلام","اتعلم الكلمات وجاوب الأسئلة بصوت عالي، واستخدم ٦ كلمات على الأقل."],["السيشن","Voice coach","اتكلم والكيبورد يكتب، وانسخ البرومبت لأي شات AI يصححلك. وبعدين دوس Mark as Complete."]]};
function renderHow(main){const m=METHOD[S.lang],ar=S.lang==="ar";
  main.innerHTML=`<section class="card"><span class="tag">The method</span><div class="card-h"><h2 class="${ar?"ar":""}">${ar?"إزاي تشتغل على كل سيشن":"How to work on each session"}</h2>
   <span class="seg"><button id="mEn" class="${ar?"":"on"}">English</button><button id="mAr" class="${ar?"on":""}">العربية</button></span></div>
   <div class="mgrid">${m.map((s,i)=>`<div class="mstep ${ar?"ar":""}"><span class="k">${i+1} · ${s[0]}</span><h4>${s[1]}</h4><p>${s[2]}</p></div>`).join("")}</div></section>
  <section class="card"><span class="tag">Daily plan</span><div class="card-h"><h2 class="${ar?"ar":""}">${ar?"الخطة اليومية":"Your daily plan"}</h2></div>
   <div class="${ar?"ar":""}" style="max-width:70ch">${ar?
   `<p>كل يوم سيشنين، كل واحدة حوالي ٢٠ دقيقة: سيشن General English وسيشن Business English للاجتماعات. القايمة متقسمة بالأيام: Day 1 وDay 2 وهكذا، واليوم الحالي بيبقى مفتوح.</p><p>لما تخلّص السيشن دوس Mark as Complete. نسبة الكورس بتتحدّث، وكلمات السيشن بتتنقل لصفحة My Words.</p><p>كل أسبوع ٦ أيام دروس، واليوم السابع مراجعة للأسبوع كله: Review General وReview Business. لازم تعدّي كل مراجعة بـ ٨ من ١٠ قبل ما تعلّمها Complete.</p><p>الخطة كلها ٢٨ يوم (٤ أسابيع)، وكل يوم فيه General وBusiness لحد آخر يوم. لما تخلّص الـ General English اعمل اختبار الخروج من صفحة Level check.</p>`:
   `<p>Two sessions a day, about 20 minutes each: one General English session and one Business English meeting session. The menu shows them day by day: Day 1, Day 2 and so on, with today's day open.</p><p>When you finish a session, press Mark as Complete. Your course progress updates and the session's words move to My Words.</p><p>Each week has six lesson days, and day seven is a review of the whole week, one for General and one for Business. Pass each review with 8/10 before marking it complete.</p><p>The whole plan is 28 days (four weeks), and every day has one General and one Business session. When General English is done, take the exit test on the Level check page.</p>`}</div></section>`;
  document.getElementById("mEn").onclick=()=>{S.lang="en";save();renderHow(main)};document.getElementById("mAr").onclick=()=>{S.lang="ar";save();renderHow(main)}}

/* ===== utils ===== */
let tt;function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>el.classList.remove("on"),2400)}
function copy(text){const ok=()=>toast("Copied. Paste it into ChatGPT, Gemini or any AI chat.");try{navigator.clipboard.writeText(text).then(ok,()=>fallback(text,ok))}catch(e){fallback(text,ok)}}
function fallback(text,ok){const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){toast("Couldn't copy. Select the text manually.")}ta.remove()}

function renderAll(){renderTop();renderSide();renderMain()}
if(!UNITS[S.cur])S.cur="1";
if(!S.start){const ds=Object.values(S.done).sort();S.start=ds[0]||TODAY();save()}
if(!S._v4){S.cur=nextInPlan()||"1";S._v4=1;save()}
renderAll();
