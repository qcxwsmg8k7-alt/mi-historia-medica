import { useState, useEffect, useRef } from "react";

const PROFILES = [
  { id:"p1", name:"Ana (Yo)", emoji:"👩", age:39, studies:24 },
  { id:"p2", name:"Tomás", emoji:"👨", age:41, studies:14 },
  { id:"p3", name:"Luca", emoji:"👦", age:8, studies:9 },
  { id:"p4", name:"Abuela Marta", emoji:"👵", age:72, studies:31 },
];

const ICONS = { Laboratorio:"🧪", Cardiología:"❤️", Traumatología:"🦴", Neumonología:"🫁", Pediatría:"👶", Odontología:"🦷", Oftalmología:"👁️", Neurología:"🧠" };

const DATA = {
  p2: {
    2026: {
      Laboratorio: [
        { id:"s1", name:"Análisis de sangre", date:"12 may 2026", emoji:"🩸", doctor:"Dr. Juan Pérez", clinic:"Sanatorio del Sol", tags:["sangre","colesterol","glucosa"] },
        { id:"s2", name:"Perfil lipídico", date:"3 abr 2026", emoji:"🫀", doctor:"Dr. Juan Pérez", clinic:"Sanatorio del Sol", tags:["colesterol","triglicéridos"] },
        { id:"s3", name:"Glucosa en sangre", date:"15 feb 2026", emoji:"💧", doctor:"—", clinic:"LabSalud", tags:["glucosa","ayunas"] },
        { id:"s4", name:"Orina completa", date:"10 ene 2026", emoji:"🔬", doctor:"—", clinic:"LabSalud", tags:["orina","sedimento"] },
      ],
      Cardiología: [
        { id:"s5", name:"Ecocardiograma", date:"2 abr 2026", emoji:"❤️", doctor:"Dra. Martínez", clinic:"CardioCenter", tags:["corazón","eco"] },
        { id:"s6", name:"Holter 24hs", date:"20 mar 2026", emoji:"📊", doctor:"Dra. Martínez", clinic:"CardioCenter", tags:["holter","arritmia"] },
      ],
      Neumonología: [
        { id:"s7", name:"Radiografía de tórax", date:"2 abr 2026", emoji:"🫁", doctor:"Dr. Ríos", clinic:"Sanatorio del Sol", tags:["tórax","pulmones"] },
      ],
    },
    2025: {
      Laboratorio: [
        { id:"s8", name:"Análisis de sangre", date:"5 jun 2025", emoji:"🩸", doctor:"Dr. Juan Pérez", clinic:"Sanatorio del Sol", tags:["sangre","rutina"] },
      ],
      Traumatología: [
        { id:"s9", name:"Radiografía rodilla", date:"8 nov 2025", emoji:"🦴", doctor:"Dr. Gómez", clinic:"OrthoClinic", tags:["rodilla","hueso"] },
      ],
    },
  },
  p1: {
    2026: {
      Laboratorio: [
        { id:"s10", name:"Análisis de sangre", date:"3 jun 2026", emoji:"🩸", doctor:"Dra. López", clinic:"LabCentral", tags:["sangre","rutina"] },
      ],
      Ginecología: [
        { id:"s11", name:"Ecografía pelviana", date:"15 may 2026", emoji:"🔵", doctor:"Dra. Ruiz", clinic:"Centro Médico", tags:["ecografía","pelvis"] },
      ],
    },
  },
};

function findStudy(id) {
  let found = null;
  Object.values(DATA).forEach(years => Object.values(years).forEach(specs => Object.values(specs).forEach(arr => arr.forEach(s => { if (s.id === id) found = s; }))));
  return found;
}

const css = {
  app: { fontFamily:"'DM Sans',-apple-system,sans-serif", width:"100%", height:"100vh", background:"#fff", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", maxWidth:430, margin:"0 auto" },
  screen: { display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#fff" },
  scroll: { flex:1, overflowY:"auto", overflowX:"hidden" },
  sb: { height:44, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 20px 8px", fontSize:12, fontWeight:600, flexShrink:0 },
  nh: { display:"flex", alignItems:"center", padding:"10px 16px", borderBottom:"1px solid #f0f0f0", flexShrink:0, minHeight:48 },
  bnav: { height:76, background:"#fff", borderTop:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-around", padding:"0 4px 10px", flexShrink:0 },
  bplus: { width:52, height:52, background:"#000", borderRadius:"50%", border:"none", color:"#fff", fontSize:26, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8, boxShadow:"0 4px 14px rgba(0,0,0,.25)", flexShrink:0 },
  btnK: { width:"100%", border:"none", borderRadius:14, padding:"16px", background:"#000", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit" },
  btnO: { width:"100%", border:"1.5px solid #e5e5e5", borderRadius:14, padding:"15px", background:"#fff", color:"#000", fontSize:15, fontWeight:500, cursor:"pointer", marginTop:10, fontFamily:"inherit" },
  inp: { width:"100%", background:"#f5f5f5", border:"1.5px solid #e5e5e5", borderRadius:12, padding:"14px 16px", fontSize:16, fontFamily:"inherit", outline:"none" },
  row: { display:"flex", alignItems:"center", gap:14, padding:"14px 20px", cursor:"pointer" },
  rowIcon: { width:46, height:46, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, background:"#f2f2f2", flexShrink:0 },
  tag: { background:"#f2f2f2", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:500, color:"#666", display:"inline-block" },
};

const NavBar = ({ active, goTo }) => (
  <div style={css.bnav}>
    <button style={{ ...BnavItem, color: active==="profiles"?"#000":"#aaa" }} onClick={() => goTo("profiles")}>
      <span style={{fontSize:21}}>👥</span><span style={{fontSize:10,fontWeight:active==="profiles"?700:500}}>Perfiles</span>
    </button>
    <button style={{ ...BnavItem, color: active==="activity"?"#000":"#aaa" }} onClick={() => goTo("activity")}>
      <span style={{fontSize:21}}>📋</span><span style={{fontSize:10,fontWeight:active==="activity"?700:500}}>Actividad</span>
    </button>
    <button style={css.bplus} onClick={() => goTo("add")}>+</button>
    <button style={{ ...BnavItem, color: active==="search"?"#000":"#aaa" }} onClick={() => goTo("search")}>
      <span style={{fontSize:21}}>🔍</span><span style={{fontSize:10,fontWeight:active==="search"?700:500}}>Buscar</span>
    </button>
    <button style={{ ...BnavItem, color: active==="vaccines"?"#000":"#aaa" }} onClick={() => goTo("vaccines")}>
      <span style={{fontSize:21}}>💉</span><span style={{fontSize:10,fontWeight:active==="vaccines"?700:500}}>Vacunas</span>
    </button>
  </div>
);
const BnavItem = { display:"flex",flexDirection:"column",alignItems:"center",gap:3,border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",padding:"6px 10px" };

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState(["splash"]);
  const [profile, setProfile] = useState(null);
  const [year, setYear] = useState(null);
  const [spec, setSpec] = useState(null);
  const [study, setStudy] = useState(null);
  const [profiles, setProfiles] = useState(PROFILES);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [smsDigits, setSmsDigits] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingURL, setPendingURL] = useState(null);
  const [pendingMeta, setPendingMeta] = useState(null);
  const [aiStep, setAiStep] = useState(-1);
  const fileRef = useRef(null);

  useEffect(() => { setTimeout(() => goTo("welcome"), 2000); }, []);

  function showToast(msg) { setToast(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 2600); }

  function goTo(id) {
    setScreen(id);
    setHistory(h => [...h, id]);
  }
  function goBack() {
    setHistory(h => {
      const newH = h.slice(0, -1);
      setScreen(newH[newH.length - 1] || "profiles");
      return newH;
    });
  }

  function pressKey(k) {
    setSmsDigits(prev => {
      const next = k === "DEL" ? prev.slice(0, -1) : prev.length < 4 ? [...prev, k] : prev;
      if (next.length === 4) {
        setTimeout(() => {
          if (next.join("") === "1234") goTo("create-profile");
          else { showToast("Código incorrecto. Demo: 1234"); setSmsDigits([]); }
        }, 200);
      }
      return next;
    });
  }

  function handleFile(e) {
    const f = e.target.files[0]; if (!f) return;
    setPendingFile(f); setPendingURL(URL.createObjectURL(f));
    goTo("ai"); setAiStep(0);
    const steps = [0,1,2,3];
    steps.forEach((s,i) => setTimeout(() => setAiStep(s+1), 700*(i+1)));
    setTimeout(() => {
      const name = f.name.toLowerCase();
      let sp = "Laboratorio", tags = ["análisis","rutina"];
      if (name.includes("cardio")||name.includes("eco")) { sp="Cardiología"; tags=["corazón","eco"]; }
      else if (name.includes("radio")||name.includes("rx")) { sp="Neumonología"; tags=["tórax","imagen"]; }
      else if (name.includes("sangre")||name.includes("blood")) { sp="Laboratorio"; tags=["sangre","colesterol","glucosa"]; }
      const today = new Date();
      setPendingMeta({ spec:sp, year:today.getFullYear(), tags, date:today.toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"}), profile: profile||profiles[1] });
      goTo("review");
    }, 700*5);
  }

  const searchResults = searchQ.trim() ? (() => {
    const res = [];
    Object.entries(DATA).forEach(([pid,years]) => {
      const prof = profiles.find(p=>p.id===pid)||{name:"?"};
      Object.entries(years).forEach(([y,specs]) => {
        Object.entries(specs).forEach(([sp,arr]) => {
          arr.forEach(s => {
            if ([s.name,sp,s.doctor,s.clinic,...(s.tags||[])].join(" ").toLowerCase().includes(searchQ.toLowerCase()))
              res.push({...s,profName:prof.name,y,sp});
          });
        });
      });
    });
    return res;
  })() : [];

  const allStudies = (() => {
    const arr = [];
    Object.entries(DATA).forEach(([pid,years]) => {
      const prof = profiles.find(p=>p.id===pid)||{name:"?"};
      Object.entries(years).forEach(([y,specs]) => Object.entries(specs).forEach(([sp,studies]) => studies.forEach(s => arr.push({...s,profName:prof.name,y,sp}))));
    });
    return arr;
  })();

  const S = { ...css.screen };

  const screens = {

    splash: (
      <div style={{...S, background:"#000", alignItems:"center", justifyContent:"center", gap:24}}>
        <div style={{width:88,height:88,border:"2px solid rgba(255,255,255,.25)",borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:42}}>🫀</div>
        <div style={{fontSize:26,fontWeight:800,color:"#fff",textAlign:"center",lineHeight:1.2}}>Mi Historia<br/>Médica</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.4)",letterSpacing:1,textTransform:"uppercase"}}>Tu historial. Tu familia.</div>
        <div style={{width:120,height:3,background:"rgba(255,255,255,.1)",borderRadius:2,overflow:"hidden",marginTop:8}}>
          <div style={{height:"100%",background:"white",borderRadius:2,animation:"none",width:"70%"}}/>
        </div>
      </div>
    ),

    welcome: (
      <div style={{...S}}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",padding:"24px 28px 32px"}}>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80}}>🫀📋</div>
          <div style={{fontSize:30,fontWeight:800,lineHeight:1.15,marginBottom:20}}>Nunca más pierdas un estudio.</div>
          {[["☑️","Todo en un solo lugar"],["⚙️","Organizado automáticamente con IA"],["🔒","Privado. Tuyo. Siempre disponible."]].map(([ic,tx])=>(
            <div key={tx} style={{display:"flex",gap:12,alignItems:"center",marginBottom:14}}>
              <div style={{width:32,height:32,background:"#f2f2f2",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{ic}</div>
              <div style={{fontSize:14,color:"#666"}}>{tx}</div>
            </div>
          ))}
          <div style={{marginTop:20}}><button style={css.btnK} onClick={()=>goTo("phone")}>Comenzar</button></div>
        </div>
      </div>
    ),

    phone: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",padding:"8px 24px 40px"}}>
          <div style={{fontSize:24,fontWeight:800,marginBottom:8}}>¿Cuál es tu número de teléfono?</div>
          <div style={{fontSize:14,color:"#666",marginBottom:28,lineHeight:1.6}}>Te enviamos un código para verificar tu cuenta. Sin contraseñas.</div>
          <div style={{display:"flex",gap:10,marginBottom:8}}>
            <div style={{background:"#f5f5f5",border:"1.5px solid #e5e5e5",borderRadius:12,padding:"14px 16px",fontSize:15,flexShrink:0}}>🇦🇷 +54</div>
            <input style={{...css.inp,flex:1}} type="tel" placeholder="11 1234 5678" id="phone-inp"/>
          </div>
          <div style={{fontSize:11,color:"#aaa",textAlign:"center",lineHeight:1.7,marginTop:12}}>Al continuar aceptás los Términos y Condiciones</div>
          <div style={{marginTop:"auto"}}><button style={css.btnK} onClick={()=>{showToast("Demo: usá el código 1234");goTo("sms");}}>Continuar</button></div>
        </div>
      </div>
    ),

    sms: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",padding:"8px 24px 20px"}}>
          <div style={{fontSize:24,fontWeight:800,marginBottom:8}}>Ingresá el código</div>
          <div style={{fontSize:14,color:"#666",marginBottom:20,lineHeight:1.6}}>Código de prueba: <strong>1234</strong></div>
          <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:20}}>
            {[0,1,2,3].map(i=>(
              <div key={i} style={{width:64,height:72,background:smsDigits[i]?"#000":"#f5f5f5",border:`2px solid ${smsDigits[i]?"#000":"#e5e5e5"}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:smsDigits[i]?"#fff":"#000",transition:"all .15s"}}>
                {smsDigits[i]||""}
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",fontSize:13,color:"#666",marginBottom:16}}>¿No llegó? <span style={{color:"#000",fontWeight:700,cursor:"pointer"}} onClick={()=>showToast("Código reenviado")}>Reenviar</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
            {["1","2","3","4","5","6","7","8","9","","0","DEL"].map(k=>(
              <button key={k} onClick={()=>k&&pressKey(k)} style={{height:64,background:"#f8f8f8",border:"none",borderRadius:8,fontSize:k==="DEL"?18:22,cursor:k?"pointer":"default",fontFamily:"inherit",transition:"background .1s"}}>
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
    ),

    "create-profile": (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",padding:"8px 24px 40px"}}>
          <div style={{fontSize:24,fontWeight:800,marginBottom:4}}>Creá tu perfil principal</div>
          <div style={{fontSize:14,color:"#666",marginBottom:24}}>Este será el perfil administrador</div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,margin:"16px 0 28px"}}>
            <div style={{width:88,height:88,borderRadius:"50%",background:"#f2f2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:42,position:"relative",cursor:"pointer"}}>
              👤<div style={{position:"absolute",bottom:2,right:2,width:26,height:26,background:"#000",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>📷</div>
            </div>
            <div style={{fontSize:13,color:"#aaa"}}>Agregar foto</div>
          </div>
          <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:"#666",marginBottom:6,display:"block"}}>Nombre</label><input style={css.inp} type="text" id="pname" placeholder="Tu nombre"/></div>
          <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:"#666",marginBottom:6,display:"block"}}>Fecha de nacimiento <span style={{fontWeight:400,color:"#aaa"}}>(opcional)</span></label><input style={css.inp} type="date"/></div>
          <div style={{marginTop:"auto"}}><button style={css.btnK} onClick={()=>goTo("location")}>Crear perfil</button></div>
        </div>
      </div>
    ),

    location: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",padding:"28px 24px 40px",overflowY:"auto"}}>
          <div style={{width:72,height:72,background:"#f2f2f2",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,marginBottom:24}}>📍</div>
          <div style={{fontSize:24,fontWeight:800,marginBottom:12,lineHeight:1.2}}>¿Podemos usar tu ubicación?</div>
          <div style={{fontSize:14,color:"#666",lineHeight:1.7,marginBottom:24}}>Tus estudios son completamente privados. La ubicación <strong>nunca se comparte</strong> con ningún médico ni app.</div>
          {[["🔒","Tu privacidad es absoluta","Datos cifrados. Solo vos tenés acceso."],
            ["📊","Estadísticas geográficas anónimas","Mapeamos tendencias de salud por región. 100% anónimo."],
            ["🗺️","Nunca datos identificables","Solo estadísticas agregadas, sin nombre ni dirección."]].map(([ic,t,d])=>(
            <div key={t} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:20}}>
              <div style={{width:36,height:36,background:"#f2f2f2",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,marginTop:2}}>{ic}</div>
              <div><div style={{fontSize:14,fontWeight:700,marginBottom:3}}>{t}</div><div style={{fontSize:13,color:"#666",lineHeight:1.5}}>{d}</div></div>
            </div>
          ))}
          <div style={{background:"#f9f9f9",borderRadius:12,padding:"14px 16px",marginBottom:28,fontSize:12,color:"#666",lineHeight:1.6}}>💡 Podés cambiar esto en <strong>Ajustes → Privacidad → Ubicación</strong></div>
          <button style={css.btnK} onClick={()=>{showToast("📍 Permiso guardado. Gracias.");goTo("profiles");}}>Permitir ubicación</button>
          <button style={css.btnO} onClick={()=>goTo("profiles")}>Ahora no</button>
        </div>
      </div>
    ),

    profiles: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px 8px"}}>
          <div style={{fontSize:24,fontWeight:800}}>Perfiles</div>
          <button style={{width:36,height:36,background:"#f2f2f2",borderRadius:"50%",border:"none",fontSize:18,cursor:"pointer"}}>🔔</button>
        </div>
        <div style={css.scroll}>
          {profiles.map(p=>(
            <div key={p.id}>
              <div style={css.row} onClick={()=>{setProfile(p);goTo("profile-detail");}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"#f2f2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{p.emoji}</div>
                <div style={{flex:1}}><div style={{fontSize:16,fontWeight:600}}>{p.name}</div><div style={{fontSize:13,color:"#aaa",marginTop:2}}>{p.age?p.age+" años · ":""}{p.studies} estudios</div></div>
                <div style={{fontSize:18,color:"#ddd"}}>›</div>
              </div>
              <div style={{height:1,background:"#f2f2f2",margin:"0 20px"}}/>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",cursor:"pointer"}} onClick={()=>goTo("create-profile")}>
            <div style={{width:52,height:52,borderRadius:"50%",border:"2px dashed #e5e5e5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#aaa"}}>+</div>
            <div style={{fontSize:16,color:"#666",fontWeight:500}}>Agregar perfil</div>
          </div>
          <div style={{height:20}}/>
        </div>
        <NavBar active="profiles" goTo={goTo}/>
      </div>
    ),

    "profile-detail": (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}>
          <button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button>
          <div style={{fontSize:18,fontWeight:800,flex:1}}>{profile?.name}</div>
          <button style={{fontSize:20,background:"none",border:"none",cursor:"pointer"}}>≡</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 0 12px",flexShrink:0}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"#f2f2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{profile?.emoji}</div>
          <div style={{fontSize:13,color:"#aaa",marginTop:5}}>{profile?.age?profile.age+" años · ":""}{profile?.studies} estudios</div>
        </div>
        <div style={{margin:"0 20px 8px",background:"#f5f5f5",borderRadius:12,display:"flex",alignItems:"center",gap:8,padding:"13px 16px",cursor:"pointer",border:"1.5px solid #e5e5e5"}} onClick={()=>goTo("search")}>
          <span style={{fontSize:16,color:"#aaa"}}>🔍</span>
          <span style={{fontSize:15,color:"#aaa"}}>Buscar estudios de {profile?.name}...</span>
        </div>
        <div style={css.scroll}>
          <div style={{padding:"0 20px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:.8,padding:"16px 0 8px"}}>Años</div>
            {Object.keys(DATA[profile?.id]||DATA.p2).sort((a,b)=>b-a).map(y=>{
              const cnt = Object.values((DATA[profile?.id]||DATA.p2)[y]).reduce((a,b)=>a+b.length,0);
              return (
                <div key={y} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0",borderBottom:"1px solid #f2f2f2",cursor:"pointer"}} onClick={()=>{setYear(y);goTo("year");}}>
                  <div style={{fontSize:24,fontWeight:800}}>{y}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{fontSize:13,color:"#aaa"}}>{cnt} estudio{cnt!==1?"s":""}</div>
                    <div style={{fontSize:18,color:"#ddd"}}>›</div>
                  </div>
                </div>
              );
            })}
            <div style={{height:90}}/>
          </div>
        </div>
        <NavBar active="profiles" goTo={goTo}/>
      </div>
    ),

    year: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}>
          <button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button>
          <div style={{fontSize:13,color:"#aaa",flex:1}}>{profile?.name} › <strong style={{color:"#000"}}>{year}</strong></div>
          <button style={{fontSize:20,background:"none",border:"none",cursor:"pointer"}}>≡</button>
        </div>
        <div style={{fontSize:36,fontWeight:800,padding:"12px 20px 16px"}}>{year}</div>
        <div style={css.scroll}>
          {(() => {
            const data = (DATA[profile?.id]||DATA.p2)[year]||{};
            const sorted = ["Laboratorio",...Object.keys(data).filter(s=>s!=="Laboratorio")].filter(s=>data[s]);
            return sorted.map((s,i) => {
              const cnt = data[s].length;
              const isLab = s === "Laboratorio";
              return isLab ? (
                <div key={s} style={{margin:"0 20px 12px",background:"#f9f9f9",borderRadius:16,padding:16,display:"flex",alignItems:"center",gap:14,cursor:"pointer",border:"1.5px solid #e5e5e5"}} onClick={()=>{setSpec(s);goTo("specialty");}}>
                  <div style={{width:48,height:48,background:"#fff",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 1px 8px rgba(0,0,0,.07)",flexShrink:0}}>🧪</div>
                  <div style={{flex:1}}><div style={{fontSize:16,fontWeight:700}}>Laboratorio</div><div style={{fontSize:12,color:"#aaa",marginTop:2}}>{cnt} estudio{cnt!==1?"s":""} · todos los médicos</div></div>
                  <div style={{fontSize:18,color:"#ddd"}}>›</div>
                </div>
              ) : (
                <div key={s}>
                  <div style={css.row} onClick={()=>{setSpec(s);goTo("specialty");}}>
                    <div style={css.rowIcon}>{ICONS[s]||"🩺"}</div>
                    <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>{s}</div><div style={{fontSize:13,color:"#aaa",marginTop:2}}>{cnt} estudio{cnt!==1?"s":""}</div></div>
                    <div style={{fontSize:18,color:"#ddd"}}>›</div>
                  </div>
                  <div style={{height:1,background:"#f2f2f2",margin:"0 20px"}}/>
                </div>
              );
            });
          })()}
          <div style={{height:90}}/>
        </div>
        <NavBar active="profiles" goTo={goTo}/>
      </div>
    ),

    specialty: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}>
          <button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button>
          <div style={{fontSize:13,color:"#aaa",flex:1}}>{profile?.name} › {year} › <strong style={{color:"#000"}}>{spec}</strong></div>
          <button style={{fontSize:20,background:"none",border:"none",cursor:"pointer"}}>≡</button>
        </div>
        <div style={{fontSize:26,fontWeight:800,padding:"12px 20px 16px"}}>{ICONS[spec]||"🩺"} {spec} {year}</div>
        <div style={css.scroll}>
          {((DATA[profile?.id]||DATA.p2)[year]||{})[spec]?.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 20px",cursor:"pointer",borderBottom:"1px solid #f2f2f2"}} onClick={()=>{setStudy(s);setSpec(spec);goTo("study");}}>
              <div style={{width:48,height:60,background:"#f2f2f2",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.emoji}</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div><div style={{fontSize:12,color:"#aaa",marginTop:3}}>{s.date}</div></div>
              <div style={{fontSize:18,color:"#ddd"}}>›</div>
            </div>
          ))}
          <div style={{height:90}}/>
        </div>
        <NavBar active="profiles" goTo={goTo}/>
      </div>
    ),

    study: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}>
          <button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button>
          <div style={{flex:1}}/>
          <button style={{fontSize:20,background:"none",border:"none",cursor:"pointer"}} onClick={()=>goTo("share")}>↗</button>
        </div>
        <div style={css.scroll}>
          <div style={{margin:"16px 20px",borderRadius:16,background:"#f2f2f2",height:180,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative",overflow:"hidden"}}>
            {study?.emoji}
            <div style={{position:"absolute",bottom:10,left:14,fontSize:11,color:"#aaa",background:"#fff",padding:"3px 8px",borderRadius:6}}>{study?.name?.toLowerCase().replace(/\s/g,"_")}.pdf</div>
          </div>
          <div style={{fontSize:20,fontWeight:800,padding:"0 20px 16px"}}>{study?.name}</div>
          <div style={{padding:"0 20px"}}>
            {[["Fecha",study?.date],["Especialidad",spec],["Clínica",study?.clinic],["Médico",study?.doctor],["Perfil",profile?.name]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #f2f2f2"}}>
                <span style={{fontSize:13,color:"#aaa"}}>{k}</span>
                <span style={{fontSize:13,fontWeight:600}}>{v||"—"}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:.5,padding:"14px 20px 6px"}}>Etiquetas</div>
          <div style={{display:"flex",gap:8,padding:"0 20px 20px",flexWrap:"wrap"}}>
            {(study?.tags||[]).map(t=><div key={t} style={css.tag}>{t}</div>)}
          </div>
        </div>
        <div style={{display:"flex",gap:8,padding:"12px 20px 20px",borderTop:"1px solid #f2f2f2",flexShrink:0}}>
          {[["↗","Compartir",()=>goTo("share")],["⬇","Descargar",()=>showToast("Descarga disponible")],["⭐","Importante",()=>showToast("Marcado como importante ⭐")],["⋯","Más",()=>showToast("Más opciones próximamente")]].map(([ic,lb,fn])=>(
            <button key={lb} onClick={fn} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5,border:"none",background:"#f2f2f2",borderRadius:12,padding:"12px 4px",cursor:"pointer",fontFamily:"inherit"}}>
              <span style={{fontSize:20}}>{ic}</span><span style={{fontSize:10,fontWeight:700}}>{lb}</span>
            </button>
          ))}
        </div>
      </div>
    ),

    add: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{padding:"20px 20px 8px"}}><div style={{fontSize:22,fontWeight:800}}>Agregar estudio</div><div style={{fontSize:14,color:"#666",marginTop:4}}>¿Cómo querés agregarlo?</div></div>
        <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>
          {[["📷","Cámara","Tomar foto del estudio","image/*;capture=environment"],["🖼️","Galería","Seleccionar imagen","image/*"],["📄","Archivo PDF","Seleccionar PDF","application/pdf"]].map(([ic,nm,sb,ac])=>(
            <label key={nm} style={{display:"flex",alignItems:"center",gap:16,background:"#f9f9f9",borderRadius:16,padding:18,cursor:"pointer",border:"1.5px solid #e5e5e5"}}>
              <input type="file" accept={ac} style={{display:"none"}} onChange={handleFile}/>
              <span style={{fontSize:28,width:44,textAlign:"center"}}>{ic}</span>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>{nm}</div><div style={{fontSize:13,color:"#aaa"}}>{sb}</div></div>
              <span style={{fontSize:18,color:"#ddd"}}>›</span>
            </label>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:16,background:"#f9f9f9",borderRadius:16,padding:18,cursor:"pointer",border:"1.5px solid #e5e5e5"}} onClick={()=>showToast("Compartí el archivo desde otra app → Mi Historia Médica")}>
            <span style={{fontSize:28,width:44,textAlign:"center"}}>📲</span>
            <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>Desde otra app</div><div style={{fontSize:13,color:"#aaa"}}>WhatsApp, Gmail, Drive...</div></div>
            <span style={{fontSize:18,color:"#ddd"}}>›</span>
          </div>
        </div>
      </div>
    ),

    ai: (
      <div style={{...S,background:"#000",alignItems:"center",justifyContent:"center",gap:32,padding:"60px 32px"}}>
        <div style={{width:120,height:120,borderRadius:"50%",border:"3px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:52}}>📄</div>
        <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Organizando estudio...</div><div style={{fontSize:14,color:"rgba(255,255,255,.5)",marginTop:8}}>La IA está leyendo y clasificando tu archivo</div></div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:14}}>
          {["Leyendo el documento","Extrayendo información","Clasificando especialidad","Guardando en tu historia"].map((t,i)=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0,background:aiStep>i?"rgba(255,255,255,.2)":aiStep===i?"transparent":"rgba(255,255,255,.07)",border:aiStep===i?"2px solid white":"none",color:"#fff"}}>
                {aiStep>i?"✓":""}
              </div>
              <div style={{fontSize:14,color:aiStep>i?"rgba(255,255,255,.3)":"rgba(255,255,255,.8)",textDecoration:aiStep>i?"line-through":"none"}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    review: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button><div style={{fontSize:16,fontWeight:700}}>Revisá antes de guardar</div></div>
        <div style={css.scroll}>
          <div style={{padding:"12px 20px 0",fontSize:13,color:"#666"}}>La IA detectó estos datos. Confirmá o editá lo que necesites.</div>
          <div style={{margin:"12px 20px",background:"#f9f9f9",borderRadius:16,overflow:"hidden",border:"1.5px solid #e5e5e5"}}>
            <div style={{height:120,background:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>
              {pendingFile?.type?.startsWith("image/") && pendingURL ? <img src={pendingURL} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : "📄"}
            </div>
            <div style={{padding:"0 16px"}}>
              {[["Perfil",(profile?.emoji||"")+" "+(profile?.name||"—")],["Año",pendingMeta?.year||new Date().getFullYear()],["Especialidad",(ICONS[pendingMeta?.spec]||"🩺")+" "+(pendingMeta?.spec||"Laboratorio")],["Fecha",pendingMeta?.date||"—"],["Médico","No detectado"],["Clínica","No detectada"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #ececec"}}>
                  <div style={{fontSize:12,color:"#aaa",width:86,flexShrink:0}}>{k}</div>
                  <div style={{fontSize:14,fontWeight:600,flex:1}}>{v}</div>
                  <div style={{fontSize:16,color:"#ccc",cursor:"pointer"}}>✏️</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"8px 20px 6px",fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:.5}}>Etiquetas detectadas</div>
          <div style={{display:"flex",gap:8,padding:"0 20px 14px",flexWrap:"wrap"}}>
            {(pendingMeta?.tags||["análisis","rutina"]).map(t=><div key={t} style={css.tag}>{t}</div>)}
            <div style={{...css.tag,border:"1.5px dashed #ccc",background:"#fff",cursor:"pointer"}}>+ agregar</div>
          </div>
          <div style={{margin:"0 20px 12px",background:"#FFFBE6",borderRadius:12,padding:"12px 14px",display:"flex",gap:10}}>
            <span style={{fontSize:16}}>⚠️</span>
            <span style={{fontSize:12,color:"#7A6000",lineHeight:1.5}}>La IA organiza y clasifica. <strong>Nunca diagnostica ni interpreta</strong> tus resultados médicos.</span>
          </div>
          <div style={{height:16}}/>
        </div>
        <div style={{display:"flex",gap:10,padding:"12px 20px 20px",borderTop:"1px solid #f0f0f0",flexShrink:0}}>
          <button onClick={goBack} style={{flex:1,background:"#f2f2f2",color:"#000",border:"none",borderRadius:12,padding:16,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer"}}>✏️ Editar</button>
          <button onClick={()=>{goTo("confirm");}} style={{flex:2,background:"#000",color:"#fff",border:"none",borderRadius:12,padding:16,fontFamily:"inherit",fontSize:15,fontWeight:700,cursor:"pointer"}}>✓ Guardar así</button>
        </div>
      </div>
    ),

    confirm: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",gap:18}}>
          <div style={{width:72,height:72,background:"#000",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,color:"#fff"}}>✓</div>
          <div style={{fontSize:28,fontWeight:800,textAlign:"center"}}>¡Listo!</div>
          <div style={{fontSize:14,color:"#666",textAlign:"center"}}>Tu estudio fue guardado correctamente.</div>
          <div style={{fontSize:13,color:"#aaa"}}>Ubicación</div>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#f2f2f2",padding:"12px 20px",borderRadius:50}}>
            <span style={{fontSize:13,fontWeight:600}}>{profile?.name||"—"}</span>
            <span style={{fontSize:12,color:"#aaa"}}>›</span>
            <span style={{fontSize:13,fontWeight:600}}>{pendingMeta?.year||"—"}</span>
            <span style={{fontSize:12,color:"#aaa"}}>›</span>
            <span style={{fontSize:13,fontWeight:600}}>{pendingMeta?.spec||"Laboratorio"}</span>
          </div>
          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:10}}>
            <button style={css.btnK} onClick={()=>goTo("study")}>Ver estudio</button>
            <button style={css.btnO} onClick={()=>goTo("add")}>Agregar otro</button>
            <button style={{...css.btnO,border:"none",color:"#666",fontSize:14}} onClick={()=>goTo("profiles")}>Volver al inicio</button>
          </div>
        </div>
      </div>
    ),

    activity: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px 8px"}}>
          <div style={{fontSize:24,fontWeight:800}}>Actividad</div>
          <button style={{fontSize:20,background:"none",border:"none",cursor:"pointer"}}>≡</button>
        </div>
        <div style={css.scroll}>
          {Object.entries(allStudies.reduce((acc,s)=>{if(!acc[s.y])acc[s.y]=[];acc[s.y].push(s);return acc;},{})).sort((a,b)=>b[0]-a[0]).map(([y,arr])=>(
            <div key={y}>
              <div style={{fontSize:13,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:.5,padding:"12px 20px 4px"}}>{y}</div>
              {arr.map(s=>{
                const parts=s.date.split(" ");
                return (
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 20px",cursor:"pointer",borderBottom:"1px solid #f2f2f2"}} onClick={()=>{setStudy(s);setSpec(s.sp);goTo("study");}}>
                    <div style={{width:44,flexShrink:0}}><div style={{fontSize:14,fontWeight:700}}>{parts[0]}</div><div style={{fontSize:11,color:"#aaa"}}>{parts[1]}</div></div>
                    <div style={{width:36,height:36,background:"#f2f2f2",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.emoji}</div>
                    <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{s.name}</div><div style={{fontSize:12,color:"#aaa"}}>{s.profName} · {s.sp}</div></div>
                    <div style={{fontSize:16,color:"#ddd"}}>›</div>
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{height:90}}/>
        </div>
        <NavBar active="activity" goTo={goTo}/>
      </div>
    ),

    vaccines: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button><div style={{fontSize:16,fontWeight:700}}>Vacunas</div></div>
        <div style={{fontSize:24,fontWeight:800,padding:"16px 20px 4px"}}>Vacunas</div>
        <div style={css.scroll}>
          {[["🟢","BCG","Recién nacido","✅"],["🟢","Hepatitis B","Recién nacido","✅"],["🟡","Neumococo","2 meses","✅"],["🟡","Pentavalente","2 meses","✅"],["🔵","Antigripal","10 mar 2026","✅"],["🔴","Fiebre amarilla","Pendiente","⏳"]].map(([ci,nm,dt,st])=>(
            <div key={nm} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",borderBottom:"1px solid #f2f2f2"}}>
              <div style={{width:42,height:42,background:"#f2f2f2",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ci}</div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{nm}</div><div style={{fontSize:12,color:"#aaa",marginTop:2}}>{dt}</div></div>
              <div style={{fontSize:18}}>{st}</div>
            </div>
          ))}
          <button onClick={()=>showToast("Próximamente")} style={{margin:"16px 20px",border:"2px dashed #e5e5e5",borderRadius:16,padding:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",background:"none",fontFamily:"inherit",fontSize:15,fontWeight:600,width:"calc(100% - 40px)"}}>+ Agregar vacuna</button>
          <div style={{height:20}}/>
        </div>
        <NavBar active="vaccines" goTo={goTo}/>
      </div>
    ),

    search: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={{display:"flex",gap:10,padding:"12px 20px",alignItems:"center"}}>
          <div style={{flex:1,background:"#f5f5f5",border:"2px solid #000",borderRadius:12,display:"flex",alignItems:"center",gap:8,padding:"12px 14px"}}>
            <span style={{fontSize:16,color:"#aaa"}}>🔍</span>
            <input autoFocus style={{border:"none",background:"none",fontFamily:"inherit",fontSize:15,color:"#000",outline:"none",flex:1}} placeholder="Buscar estudios..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
          </div>
          <button style={{fontSize:14,fontWeight:600,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}} onClick={goBack}>Cancelar</button>
        </div>
        <div style={css.scroll}>
          {!searchQ.trim() ? (
            <div style={{padding:"40px 20px",textAlign:"center",color:"#aaa"}}><div style={{fontSize:36,marginBottom:12}}>🔍</div><div style={{fontSize:14}}>Escribí para buscar estudios</div></div>
          ) : searchResults.length === 0 ? (
            <div style={{padding:"40px 20px",textAlign:"center",color:"#aaa"}}><div style={{fontSize:36,marginBottom:12}}>🤷</div><div style={{fontSize:14}}>Sin resultados para "{searchQ}"</div></div>
          ) : (
            <>
              <div style={{padding:"8px 20px",fontSize:13,color:"#aaa"}}>{searchResults.length} resultado{searchResults.length!==1?"s":""}</div>
              {searchResults.map(r=>(
                <div key={r.id} style={{padding:"13px 20px",borderBottom:"1px solid #f2f2f2",cursor:"pointer"}} onClick={()=>{setStudy(r);setSpec(r.sp);goTo("study");}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#1A5C4A",textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>{ICONS[r.sp]||"🩺"} {r.sp}</div>
                  <div style={{fontSize:14,fontWeight:600}}>{r.name}</div>
                  <div style={{fontSize:12,color:"#aaa",marginTop:3}}>{r.profName} › {r.y} › {r.sp} · {r.date}</div>
                </div>
              ))}
            </>
          )}
          <div style={{height:90}}/>
        </div>
        <NavBar active="search" goTo={goTo}/>
      </div>
    ),

    share: (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{fontSize:24,fontWeight:800,padding:"16px 20px 4px"}}>Compartir</div>
        <div style={{fontSize:13,color:"#aaa",padding:"0 20px 16px"}}>¿Qué querés compartir?</div>
        <div style={css.scroll}>
          {[["📄","Este estudio",(study?.name||"Estudio")+" (PDF)"],["📁","Carpeta completa",(spec||"Especialidad")+" "+(year||"")],["📅","Este año",(year||"")+" completo"],["👤","Perfil completo",(profile?.name||"")+" completo"]].map(([ic,nm,sb])=>(
            <div key={nm} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",cursor:"pointer",borderBottom:"1px solid #f2f2f2"}} onClick={()=>goTo("share-sent")}>
              <div style={{width:46,height:46,background:"#f2f2f2",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ic}</div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>{nm}</div><div style={{fontSize:13,color:"#aaa",marginTop:2}}>{sb}</div></div>
              <div style={{fontSize:18,color:"#ddd"}}>›</div>
            </div>
          ))}
          <div style={{padding:"16px 20px",fontSize:13,color:"#aaa",lineHeight:1.6}}>El link vence en 24 horas. Podés revocarlo cuando quieras.</div>
        </div>
      </div>
    ),

    "share-sent": (
      <div style={S}>
        <div style={css.sb}><span>9:41</span><span>🔋</span></div>
        <div style={css.nh}><button style={{fontSize:24,background:"none",border:"none",cursor:"pointer"}} onClick={goBack}>‹</button></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",gap:20}}>
          <div style={{fontSize:60}}>🔗</div>
          <div style={{fontSize:28,fontWeight:800,textAlign:"center"}}>¡Enlace creado!</div>
          <div style={{fontSize:14,color:"#666",textAlign:"center"}}>Compartí este enlace con quien necesites.</div>
          <div style={{background:"#f5f5f5",borderRadius:12,padding:16,width:"100%",display:"flex",alignItems:"center",gap:10,border:"1.5px solid #e5e5e5"}}>
            <div style={{fontSize:13,fontWeight:600,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>mhm.app/s/{Math.random().toString(36).substr(2,6)}</div>
            <button onClick={()=>showToast("✓ Link copiado")} style={{background:"#000",color:"#fff",border:"none",borderRadius:8,padding:"10px 16px",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>Copiar</button>
          </div>
          <div style={{fontSize:13,color:"#aaa",textAlign:"center",lineHeight:1.6}}>Vence en <strong style={{color:"#000"}}>24 horas</strong>. Podés revocarlo cuando quieras.</div>
          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:10}}>
            <button style={css.btnK} onClick={()=>goTo("profiles")}>Listo</button>
            <button style={css.btnO} onClick={goBack}>Compartir otra cosa</button>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div style={css.app}>
      {screens[screen] || screens.profiles}
      {toastVisible && (
        <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"#000",color:"#fff",borderRadius:20,padding:"12px 24px",fontSize:14,fontWeight:500,zIndex:999,whiteSpace:"nowrap",pointerEvents:"none"}}>
          {toast}
        </div>
      )}
    </div>
  );
}
