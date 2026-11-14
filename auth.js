import { firebaseConfig, SUPPORT_CONTACT, ADMIN_EMAILS } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, setPersistence, browserLocalPersistence }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const KEY = "shadowlab_v2";              // نفس المفتاح اللي التطبيق بيحفظ عليه
const APP_FILES = ["coreA", "coreB", "bizA", "bizB", "bizC", "phrases", "exprs", "app"];
const $ = id => document.getElementById(id);

const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb);
const db = getFirestore(fb);
setPersistence(auth, browserLocalPersistence).catch(() => {});

// كل جهاز بياخد رقم جلسة. لو نفس الحساب دخل من جهاز تاني، الجهاز القديم بيخرج تلقائي.
const SESSION = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2)) ;
let started = false, pushTimer = null, stopWatch = null, currentUid = null;

function msg(t) { $("lgMsg").textContent = t || ""; }
function busy(b) { $("lgBtn").disabled = b; $("lgBtn").textContent = b ? "Signing in…" : "Sign in"; }

const ERR = {
  "auth/invalid-credential": "الإيميل أو الباسورد غلط.",
  "auth/wrong-password": "الإيميل أو الباسورد غلط.",
  "auth/user-not-found": "الإيميل أو الباسورد غلط.",
  "auth/invalid-email": "اكتب إيميل صحيح.",
  "auth/user-disabled": "الحساب ده متوقف. " + SUPPORT_CONTACT,
  "auth/too-many-requests": "محاولات كتير. استنى دقيقة وجرب تاني.",
  "auth/network-request-failed": "مفيش إنترنت. اتأكد من الاتصال."
};

$("loginForm").addEventListener("submit", async e => {
  e.preventDefault(); msg(""); busy(true);
  try { await signInWithEmailAndPassword(auth, $("lgEmail").value.trim(), $("lgPass").value); }
  catch (err) { msg(ERR[err.code] || "حصلت مشكلة، جرب تاني."); busy(false); }
});

$("lgForgot").addEventListener("click", async () => {
  const email = $("lgEmail").value.trim();
  if (!email) { msg("اكتب الإيميل الأول، وبعدين دوس Forgot password."); return; }
  try { await sendPasswordResetEmail(auth, email); msg("لو الإيميل مسجل، هيوصلك لينك تغيير الباسورد."); }
  catch (err) { msg(ERR[err.code] || "مقدرناش نبعت الإيميل."); }
});

$("lgOut").addEventListener("click", async () => {
  await flush();
  try { localStorage.removeItem(KEY); } catch (e) {}
  await signOut(auth);
  location.reload();
});

// نقل التقدم من النسخة القديمة
$("impOpen").addEventListener("click", () => { $("impMsg").textContent = ""; $("impText").value = ""; $("imp").hidden = false; $("impText").focus(); });
$("impClose").addEventListener("click", () => { $("imp").hidden = true; });
$("impGo").addEventListener("click", async () => {
  const raw = $("impText").value.trim();
  let data = null; try { data = JSON.parse(raw); } catch (e) {}
  if (!data || typeof data !== "object" || !(data.u || data.done || data.mine || data.bank)) { $("impMsg").textContent = "الكلام ده مش تقدم صحيح. انسخه تاني من زرار Export progress."; return; }
  $("impGo").disabled = true; $("impMsg").textContent = "جاري النقل…";
  nativeSet.call(localStorage, KEY, JSON.stringify(data));
  await flush();
  location.reload();
});

// حفظ التقدم على السيرفر: أي حفظ يعمله التطبيق بيتبعت للحساب بعد ثانيتين
const nativeSet = Storage.prototype.setItem;
Storage.prototype.setItem = function (k, v) {
  nativeSet.call(this, k, v);
  if (k === KEY && currentUid) { clearTimeout(pushTimer); pushTimer = setTimeout(flush, 2000); }
};
async function flush() {
  if (!currentUid) return;
  clearTimeout(pushTimer);
  let raw = null; try { raw = localStorage.getItem(KEY); } catch (e) {}
  if (!raw) return;
  try { await setDoc(doc(db, "users", currentUid), { state: raw, updated: serverTimestamp() }, { merge: true }); } catch (e) {}
}
window.addEventListener("pagehide", flush);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });

function loadScript(name) {
  return new Promise((ok, bad) => {
    const s = document.createElement("script");
    s.src = name + ".js"; s.onload = ok; s.onerror = () => bad(name);
    document.body.appendChild(s);
  });
}

const isAdmin = u => !!(u && u.email && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(u.email.toLowerCase()));
async function checkAccess(user) {
  if (isAdmin(user)) return "ok";
  // لازم يكون فيه مستند access/{uid} فيه until (تاريخ انتهاء الاشتراك)، وإلا الحساب ميفتحش
  try {
    const a = await getDoc(doc(db, "access", user.uid));
    if (!a.exists()) return "none";
    const d = a.data();
    if (d.active === false) return "off";
    if (d.until) {
      const until = d.until.toDate ? d.until.toDate() : new Date(d.until);
      if (until < new Date()) return "expired";
    }
    return "ok";
  } catch (e) { return "error"; }
}

onAuthStateChanged(auth, async user => {
  if (!user) { currentUid = null; $("gate").hidden = false; $("acct").hidden = true; busy(false); return; }
  if (started) return;
  busy(true);

  const acc = await checkAccess(user);
  if (acc !== "ok") {
    msg(acc === "expired" ? "اشتراكك انتهى. للتجديد: " + SUPPORT_CONTACT
      : acc === "error" ? "مقدرناش نتأكد من اشتراكك. اتأكد من الإنترنت وجرب تاني."
      : "الحساب ده مش مفعّل. للتفعيل: " + SUPPORT_CONTACT);
    await signOut(auth); busy(false); return;
  }

  const ref = doc(db, "users", user.uid);
  try {
    const snap = await getDoc(ref);
    const saved = snap.exists() ? snap.data().state : null;
    if (saved) nativeSet.call(localStorage, KEY, saved);
    else localStorage.removeItem(KEY);   // حساب جديد يبدأ من الصفر حتى لو حد تاني استخدم نفس الجهاز
    await setDoc(ref, { session: SESSION, email: user.email, lastLogin: serverTimestamp() }, { merge: true });
  } catch (e) {
    msg("مقدرناش نحمّل تقدمك. اتأكد من الإنترنت وجرب تاني.");
    await signOut(auth); busy(false); return;
  }

  currentUid = user.uid; started = true;
  stopWatch = onSnapshot(ref, s => {
    const d = s.data();
    if (d && d.session && d.session !== SESSION) {
      if (stopWatch) stopWatch();
      currentUid = null;
      try { localStorage.removeItem(KEY); } catch (e) {}
      signOut(auth).then(() => { alert("تم تسجيل الدخول بالحساب ده من جهاز تاني، فخرجنا من هنا."); location.reload(); });
    }
  });

  $("gate").hidden = true;
  $("acctMail").textContent = user.email;
  $("acct").hidden = false;
  $("impOpen").hidden = !isAdmin(user);
  try { for (const f of APP_FILES) await loadScript(f); }
  catch (name) { document.body.insertAdjacentHTML("beforeend", `<p style="padding:20px">ملف ناقص: ${name}.js</p>`); }
});
