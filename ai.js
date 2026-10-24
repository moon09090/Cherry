/* ---------- OpenRouter AI ---------- */
const MODELS=['openrouter/auto','openai/gpt-4o-mini','openai/gpt-4o','anthropic/claude-3.5-sonnet','anthropic/claude-3.5-haiku','google/gemini-2.0-flash-001','meta-llama/llama-3.3-70b-instruct','deepseek/deepseek-chat','mistralai/mistral-small-3.1-24b-instruct'];
const PROMPTS=[['Plan my day','Make a realistic plan for the rest of today using my tasks, plan and energy. Keep it short and time-boxed.'],['Study tips','Give me 5 practical study techniques tailored to my subjects and recent results.'],['Motivate me','Give me a short, honest pep talk based on my dreams and progress.'],['Review my week','Review my week from the data and name one thing to improve.']];
function sysPrompt(){const t=today(),open=S.tasks.filter(x=>!x.done).sort(taskSort).slice(0,8).map(x=>`${x.title} (${x.pri}${x.due?', due '+x.due:''})`);
  const dr=S.dreams.map(d=>`${d.title}: ${d.done?'done':d.progress+'%'}`);const rs=S.results.slice(-5).map(r=>`${r.subject} ${r.exam} ${Math.round(r.score/r.max*100)}%`);
  return`You are Cherry, a warm, concise study and wellness coach inside a personal productivity app. Give practical, specific answers in short paragraphs or bullet lists.${S.settings.name?' The user is called '+S.settings.name+'.':''} Today is ${t}.
Open tasks: ${open.join('; ')||'none'}.
Today: studied ${sMins(t)} min, focused ${fMins(t)} min, water ${H(t).water||0}/${S.waterGoal}, moved ${wMins(t)} min.
Dreams: ${dr.join('; ')||'none'}.
Recent results: ${rs.join('; ')||'none'}.`}
async function ask(text){
  const s=S.settings;S.chat.push({role:'user',content:text});
  if(!s.key){S.chat.push({role:'assistant',content:'Add your OpenRouter API key above and I can answer. You can create one at openrouter.ai/keys.',err:1});save();render();return}
  ui.busy=true;render();
  const msgs=[{role:'system',content:sysPrompt()}].concat(S.chat.filter(m=>!m.err).slice(-12).map(m=>({role:m.role,content:m.content})));
  try{
    const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+s.key,'Content-Type':'application/json','X-Title':'Cherry'},body:JSON.stringify({model:s.model,messages:msgs})});
    const j=await r.json();if(!r.ok)throw new Error((j.error&&j.error.message)||('Request failed ('+r.status+')'));
    const out=j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content;
    S.chat.push({role:'assistant',content:out||'The model returned an empty reply. Try again or pick another model.',err:out?0:1});
  }catch(e){
    const net=e instanceof TypeError;
    S.chat.push({role:'assistant',err:1,content:net?'Could not reach OpenRouter. If you are viewing a preview that blocks outside connections, open the downloaded Cherry file in your browser and try again.':'OpenRouter said: '+e.message})}
  ui.busy=false;save();render()}
async function loadModels(){
  try{const r=await fetch('https://openrouter.ai/api/v1/models');const j=await r.json();const ids=(j.data||[]).map(m=>m.id).sort();
    if(!ids.length)throw new Error('empty');$('#models').innerHTML=ids.map(i=>`<option value="${esc(i)}">`).join('');toast(ids.length+' models loaded. Type to search.')}
  catch(e){toast('Could not load the model list from here.')}}
