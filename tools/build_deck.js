const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
p.layout = 'W';

// ---- palette ----
const INK = '1E2761';     // deep indigo (dominant)
const INK2 = '2B3A7A';
const ICE = 'CADCFC';     // ice blue
const MINT = '02C39A';    // accent (energy/clarity)
const CORAL = 'F96167';   // sharp accent, sparing
const LIGHT = 'F4F7FC';   // light card bg
const GRAY = '4A4A55';
const WHITE = 'FFFFFF';
const HF = 'Cambria';     // header serif
const BF = 'Calibri';     // body sans
const W = 13.333, H = 7.5;

const notes = {
  1: 'Welcome. This deck is the live version of the CharmEd Minds Employee Training Guide. Set the tone: we help people understand their brains without shame.',
  2: 'CharmEd Minds is more than diagnosis. Walk through the seven components as one connected process, built inside primary care.',
  3: 'The promise is our north star. Emphasize the two principles: optimize the body first, and behavior is communication.',
  4: 'We serve ages 5 to 90 across seven population tracks. Nobody is turned away for being "too old" or "too complex."',
  5: 'Tiers are set by the Provider based on need and medical necessity. Gold adds behavioral health integration and coaching.',
  6: 'Every patient gets these core components. The three clinical pillars are how we assess and train.',
  7: 'This seven-step logic is the same for every track. Step 5, Education, is the most important - people need language before change.',
  8: 'Clear roles keep us safe and efficient. Diagnosis and clinical interpretation belong to the Provider.',
  9: 'Memorize this line. Non-clinical staff report scores and trends in plain language; they never diagnose.',
  10: 'The APD owns operations and finds problems before they surface. Read the principle aloud.',
  11: 'Walk the 13-step journey. Note the hard deadlines: referral same day, 24-hour assignment, 48-hour testing, same-day documentation.',
  12: 'Each track tailors the concern list, battery, modules, and outcomes - but shares the same pathway.',
  13: 'Screening is never one test. It is a battery matched to age, concern, and track. These are screens, not diagnoses.',
  14: 'Quick reference for the per-population batteries. Coordinators pull the right set at intake.',
  15: 'All results roll into one Cognitive Profile that drives education, accommodations, referrals, and the care plan.',
  16: 'Optimize the body before psychiatry. Staff screen and flag; the Provider evaluates and treats.',
  17: 'Same-day documentation is the standard. Every 97127 note needs five elements. The APD audits weekly.',
  18: 'How we talk IS the intervention. Practice the scripts. Behavior is communication.',
  19: 'The review rhythm and escalation paths. APD routes red flags same day; the Provider decides.',
  20: 'Close on the promise. Point staff to the full guide and their role competency checklist.',
};

function base(slide, dark) {
  slide.background = { color: dark ? INK : WHITE };
}
function pageNum(slide, n) {
  slide.addText(`${n}`, { x: W - 0.7, y: H - 0.45, w: 0.4, h: 0.3, fontFace: BF, fontSize: 10, color: n <= 1 ? ICE : '9AA3B2', align: 'right' });
  slide.addText('CharmEd Minds™ · Employee Training', { x: 0.5, y: H - 0.45, w: 6, h: 0.3, fontFace: BF, fontSize: 9, color: n <= 1 ? ICE : 'AAB2C0' });
}
// eyebrow + title header for light slides
function header(slide, eyebrow, title) {
  slide.addText(eyebrow.toUpperCase(), { x: 0.6, y: 0.45, w: 12, h: 0.3, fontFace: BF, fontSize: 12, bold: true, color: MINT, charSpacing: 2 });
  slide.addText(title, { x: 0.6, y: 0.72, w: 12.1, h: 0.8, fontFace: HF, fontSize: 30, bold: true, color: INK });
}
function chipNum(slide, x, y, n, color) {
  slide.addShape(p.ShapeType.ellipse, { x, y, w: 0.5, h: 0.5, fill: { color: color || MINT } });
  slide.addText(String(n), { x, y, w: 0.5, h: 0.5, align: 'center', valign: 'middle', fontFace: BF, fontSize: 18, bold: true, color: WHITE });
}
function card(slide, x, y, w, h, fill) {
  slide.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: fill || LIGHT }, line: { color: 'E2E9F3', width: 1 },
    shadow: { type: 'outer', color: 'BAC4D6', blur: 6, offset: 2, angle: 90, opacity: 0.35 } });
}

let s;

// ===== 1. TITLE =====
s = p.addSlide(); base(s, true);
s.addShape(p.ShapeType.ellipse, { x: -1.8, y: -2.2, w: 5.2, h: 5.2, fill: { color: INK2 } });
s.addShape(p.ShapeType.ellipse, { x: 10.6, y: 4.4, w: 4.6, h: 4.6, fill: { color: INK2 } });
s.addShape(p.ShapeType.ellipse, { x: 11.6, y: 0.7, w: 0.55, h: 0.55, fill: { color: MINT } });
s.addText('CharmEd Minds™', { x: 0.9, y: 2.15, w: 11.5, h: 1.1, fontFace: HF, fontSize: 54, bold: true, color: WHITE });
s.addText('EMPLOYEE TRAINING GUIDE', { x: 0.95, y: 3.25, w: 11.5, h: 0.5, fontFace: BF, fontSize: 22, bold: true, color: ICE, charSpacing: 4 });
s.addText('Confidence Through Cognition and Education', { x: 0.95, y: 3.95, w: 11.5, h: 0.5, fontFace: HF, fontSize: 20, italic: true, color: MINT });
s.addText('BHW Medical Group   ·   Lifespan Cognitive Health & Executive Functioning   ·   Ages 5–90',
  { x: 0.95, y: 5.5, w: 11.5, h: 0.4, fontFace: BF, fontSize: 14, color: 'C7CEDC' });
pageNum(s, 1);

// ===== 2. WHAT IS IT =====
s = p.addSlide(); base(s);
header(s, 'Module 1 · Foundations', 'What CharmEd Minds Is');
s.addText([
  { text: 'A lifespan cognition, executive function, and brain-health program', options: { bold: true, color: INK, breakLine: true } },
  { text: 'that helps people understand how their brain is functioning, why they may be struggling, and what supports improve daily life. It is not limited to diagnosis — and it is built inside primary care.', options: { color: GRAY } },
], { x: 0.6, y: 1.7, w: 5.4, h: 2.2, fontFace: BF, fontSize: 16, lineSpacingMultiple: 1.15, valign: 'top' });
s.addText('Seven connected components:', { x: 0.6, y: 3.95, w: 5.4, h: 0.4, fontFace: BF, fontSize: 13, bold: true, color: MINT });
const comps = ['Cognitive screening', 'Executive function mapping', 'Medical review', 'Lifestyle optimization', 'Education', 'Skills training', 'Care planning'];
comps.forEach((c, i) => {
  const x = 0.6 + (i % 2) * 2.7, y = 4.35 + Math.floor(i / 2) * 0.55;
  s.addShape(p.ShapeType.ellipse, { x, y: y + 0.03, w: 0.16, h: 0.16, fill: { color: MINT } });
  s.addText(c, { x: x + 0.28, y, w: 2.5, h: 0.4, fontFace: BF, fontSize: 12.5, color: INK, valign: 'middle' });
});
// right visual: nested rounded panel
card(s, 6.6, 1.7, 6.1, 4.9, INK);
s.addText('Confidence\nThrough\nCognition &\nEducation', { x: 6.6, y: 2.0, w: 6.1, h: 3.4, align: 'center', valign: 'middle', fontFace: HF, fontSize: 34, bold: true, color: WHITE, lineSpacingMultiple: 1.05 });
s.addText('The central promise', { x: 6.6, y: 5.5, w: 6.1, h: 0.4, align: 'center', fontFace: BF, fontSize: 14, italic: true, color: MINT });
pageNum(s, 2);

// ===== 3. PROMISE + PRINCIPLES =====
s = p.addSlide(); base(s, true);
s.addText('Two principles guide everything we do', { x: 0.7, y: 0.7, w: 12, h: 0.7, fontFace: HF, fontSize: 30, bold: true, color: WHITE });
const princ = [
  ['01', 'Optimize the body before (or alongside) psychiatry', 'Sleep, nutrition, inflammation, deficiencies, hormones, and medications can all suppress cognition. A "noncompliant" patient is often cognitively overloaded or medically unstable — not unwilling. We look for reversible contributors first.'],
  ['02', 'Behavior is communication', 'Struggles are rarely laziness or defiance. We explain WHY the brain is struggling and build supports around it — reducing shame and giving people language for their experience.'],
];
princ.forEach((pr, i) => {
  const y = 1.9 + i * 2.5;
  s.addShape(p.ShapeType.roundRect, { x: 0.7, y, w: 11.9, h: 2.2, rectRadius: 0.1, fill: { color: INK2 } });
  s.addText(pr[0], { x: 1.0, y: y + 0.35, w: 1.3, h: 1.3, fontFace: HF, fontSize: 46, bold: true, color: MINT });
  s.addText(pr[1], { x: 2.5, y: y + 0.28, w: 9.8, h: 0.6, fontFace: HF, fontSize: 20, bold: true, color: WHITE });
  s.addText(pr[2], { x: 2.5, y: y + 0.9, w: 9.9, h: 1.15, fontFace: BF, fontSize: 13.5, color: 'D3DAE8', lineSpacingMultiple: 1.1, valign: 'top' });
});
pageNum(s, 3);

// ===== 4. WHO WE SERVE — 7 TRACKS =====
s = p.addSlide(); base(s);
header(s, 'Module 1 · Lifespan Model', 'Who We Serve — Seven Population Tracks');
const tracks = [
  ['1', 'Children (5–12)', 'Learning, attention, behavior, parent/school support'],
  ['2', 'Teens & Young Adults', 'Executive function, independence, emotional capacity'],
  ['3', 'Adults (18–64)', 'Focus, burnout, brain fog, daily function'],
  ['4', 'Neurodivergent Adults', 'ADHD, autism, AuDHD, masking, burnout'],
  ['5', 'Recovery Patients', 'Cognitive repair, life skills, relapse prevention'],
  ['6', 'Chronic Disease', 'Brain fog, care-plan adherence, stabilization'],
  ['7', 'Seniors (60+)', 'Memory, safety, reversible causes, caregivers'],
];
tracks.forEach((t, i) => {
  const col = i % 4, row = Math.floor(i / 4);
  const x = 0.6 + col * 3.1, y = 1.75 + row * 2.35, w = 2.9, h = 2.1;
  card(s, x, y, w, h);
  chipNum(s, x + 0.25, y + 0.25, t[0], INK);
  s.addText(t[1], { x: x + 0.2, y: y + 0.85, w: w - 0.4, h: 0.55, fontFace: BF, fontSize: 14, bold: true, color: INK, valign: 'top' });
  s.addText(t[2], { x: x + 0.2, y: y + 1.35, w: w - 0.4, h: 0.65, fontFace: BF, fontSize: 11, color: GRAY, valign: 'top', lineSpacingMultiple: 1.05 });
});
// 8th cell: promise chip
card(s, 9.9, 4.1, 2.9, 2.1, MINT);
s.addText('Ages\n5–90', { x: 9.9, y: 4.35, w: 2.9, h: 1.6, align: 'center', valign: 'middle', fontFace: HF, fontSize: 30, bold: true, color: WHITE });
pageNum(s, 4);

// ===== 5. TIERS =====
s = p.addSlide(); base(s);
header(s, 'Module 2 · Care Model', 'Bronze · Silver · Gold Tiers');
const tiers = [
  ['BRONZE', 'AE7C3C', ['Baseline assessment', 'Weekly cognitive training (97127)', 'Basic digital modules']],
  ['SILVER', '7C8794', ['Everything in Bronze', 'Academic add-ons (97535)', 'Weekly skill-building curriculum']],
  ['GOLD', 'C9A227', ['Bronze + Silver', 'Behavioral Health Integration (BHI)', 'Monthly provider review', 'Care coordination + family coaching']],
];
tiers.forEach((t, i) => {
  const x = 0.6 + i * 4.15, y = 1.8, w = 3.9, h = 4.5;
  card(s, x, y, w, h, i === 2 ? INK : LIGHT);
  s.addShape(p.ShapeType.roundRect, { x: x + 0.3, y: y + 0.35, w: w - 0.6, h: 0.7, rectRadius: 0.08, fill: { color: t[1] } });
  s.addText(t[0], { x: x + 0.3, y: y + 0.35, w: w - 0.6, h: 0.7, align: 'center', valign: 'middle', fontFace: HF, fontSize: 22, bold: true, color: WHITE });
  const items = t[2].map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, breakLine: j !== t[2].length - 1, color: i === 2 ? 'E7ECF6' : GRAY } }));
  s.addText(items, { x: x + 0.35, y: y + 1.3, w: w - 0.65, h: 2.9, fontFace: BF, fontSize: 14, paraSpaceAfter: 10, valign: 'top' });
});
s.addText('Tier is set by the Provider based on need and medical necessity.', { x: 0.6, y: 6.5, w: 12, h: 0.4, fontFace: BF, fontSize: 12.5, italic: true, color: INK });
pageNum(s, 5);

// ===== 6. COMPONENTS + PILLARS =====
s = p.addSlide(); base(s);
header(s, 'Module 2 · Care Model', 'Core Components & Three Clinical Pillars');
s.addText('What every patient gets', { x: 0.6, y: 1.7, w: 6, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: MINT });
const core = ['Baseline cognitive assessment', 'Digital testing (CogniFit, Creyos)', 'Quick Cognitive Test Kits (by age)', 'Weekly EF sessions (97127)', 'Monthly progress reviews', 'Quarterly full retesting', 'Provider interpretation & care plan', 'Coaching: academic / work / decline', 'BHI when mood impacts cognition'];
s.addText(core.map((c, j) => ({ text: c, options: { bullet: { indent: 14 }, breakLine: j !== core.length - 1 } })),
  { x: 0.65, y: 2.15, w: 6.1, h: 4.2, fontFace: BF, fontSize: 14, color: GRAY, paraSpaceAfter: 8, valign: 'top' });
const pillars = [['1', 'Digital Cognitive Testing', 'CogniFit · Creyos'], ['2', 'Quick Cognitive Test Kits', 'Child · Adult · Senior batteries'], ['3', 'Weekly EF Interventions', '97127 templates · real-world tasks · digital modules · coaching scripts']];
pillars.forEach((pl, i) => {
  const x = 7.1, y = 1.75 + i * 1.6, w = 5.6, h = 1.4;
  card(s, x, y, w, h, INK);
  chipNum(s, x + 0.3, y + 0.45, pl[0], MINT);
  s.addText(pl[1], { x: x + 1.0, y: y + 0.25, w: w - 1.2, h: 0.5, fontFace: BF, fontSize: 15, bold: true, color: WHITE });
  s.addText(pl[2], { x: x + 1.0, y: y + 0.72, w: w - 1.2, h: 0.6, fontFace: BF, fontSize: 11.5, color: 'C7CEDC', valign: 'top' });
});
pageNum(s, 6);

// ===== 7. PATHWAY 7 STEPS =====
s = p.addSlide(); base(s, true);
s.addText('The Cross-Population Pathway', { x: 0.7, y: 0.55, w: 12, h: 0.7, fontFace: HF, fontSize: 30, bold: true, color: WHITE });
s.addText('Same seven-step logic for every track', { x: 0.72, y: 1.2, w: 12, h: 0.4, fontFace: BF, fontSize: 14, color: ICE });
const steps = [
  ['1', 'Intake & Concern Mapping'], ['2', 'Cognitive & EF Screening'], ['3', 'Medical & Lifestyle Review'],
  ['4', 'Pattern Identification'], ['5', 'Education'], ['6', 'Care Plan'], ['7', 'Follow-Up & Tracking'],
];
steps.forEach((st, i) => {
  const col = i % 4, row = Math.floor(i / 4);
  const x = 0.7 + col * 3.05, y = 2.0 + row * 2.35, w = 2.75, h = 2.0;
  const hot = st[0] === '5';
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: hot ? MINT : INK2 } });
  s.addText(st[0], { x: x + 0.2, y: y + 0.2, w: 1, h: 0.9, fontFace: HF, fontSize: 40, bold: true, color: hot ? INK : MINT });
  s.addText(st[1], { x: x + 0.25, y: y + 1.05, w: w - 0.5, h: 0.85, fontFace: BF, fontSize: 14.5, bold: true, color: WHITE, valign: 'top' });
});
s.addText('Step 5 — Education — is the most important: people need language for their experience before they can change it.',
  { x: 3.85, y: 4.35, w: 8.8, h: 2.0, fontFace: BF, fontSize: 14, italic: true, color: ICE, valign: 'middle', lineSpacingMultiple: 1.15 });
pageNum(s, 7);

// ===== 8. ROLES =====
s = p.addSlide(); base(s);
header(s, 'Module 3 · The Team', 'Your Role on the Team');
const roles = [
  ['Provider / NP', CORAL, ['Interprets testing (clinical)', 'Assigns diagnosis / ICD-10', 'Builds & approves care plan', 'Bills 96132 / 96136', 'Orders & reads labs']],
  ['Assistant Program Director', INK, ['Owns program operations', 'Runs weekly sessions', 'Audits docs & attendance', 'Routes red flags same day', 'Interprets trends (non-clinical)']],
  ['Care Coordinator', MINT, ['Runs 45–60 min intake', 'Administers test kits', 'Delivers 97127 sessions', 'Documents same day', 'Tracks testing/homework']],
  ['Medical Assistant', INK2, ['Intro handout & expectations', 'Confirms device access', 'Schedules intake (≤7 days)', 'Sends referral task', 'Login troubleshooting']],
  ['Front Desk', '7C8794', ['Schedules 12-week series', 'Appointment reminders', 'Attendance compliance', 'Rescheduling', 'No-show follow-up']],
];
roles.forEach((r, i) => {
  const positions = [[0.6, 1.7], [4.9, 1.7], [9.2, 1.7], [2.75, 4.35], [7.05, 4.35]];
  const [x, y] = positions[i]; const w = 3.5, h = 2.45;
  card(s, x, y, w, h);
  s.addShape(p.ShapeType.roundRect, { x: x + 0.25, y: y + 0.22, w: w - 0.5, h: 0.55, rectRadius: 0.06, fill: { color: r[1] } });
  s.addText(r[0], { x: x + 0.25, y: y + 0.22, w: w - 0.5, h: 0.55, align: 'center', valign: 'middle', fontFace: BF, fontSize: 13.5, bold: true, color: WHITE });
  s.addText(r[2].map((it, j) => ({ text: it, options: { bullet: { indent: 12 }, breakLine: j !== r[2].length - 1 } })),
    { x: x + 0.3, y: y + 0.9, w: w - 0.55, h: 1.45, fontFace: BF, fontSize: 11, color: GRAY, paraSpaceAfter: 4, valign: 'top' });
});
pageNum(s, 8);

// ===== 9. CLINICAL / NON-CLINICAL LINE =====
s = p.addSlide(); base(s);
header(s, 'Module 3 · Scope', 'The Clinical / Non-Clinical Line');
card(s, 0.6, 1.75, 6.0, 4.6, LIGHT);
card(s, 6.85, 1.75, 5.85, 4.6, 'FCEEEE');
s.addShape(p.ShapeType.roundRect, { x: 0.85, y: 2.0, w: 5.5, h: 0.55, rectRadius: 0.06, fill: { color: MINT } });
s.addText('Non-clinical staff MAY', { x: 0.85, y: 2.0, w: 5.5, h: 0.55, align: 'center', valign: 'middle', fontFace: BF, fontSize: 15, bold: true, color: WHITE });
s.addShape(p.ShapeType.roundRect, { x: 7.1, y: 2.0, w: 5.35, h: 0.55, rectRadius: 0.06, fill: { color: CORAL } });
s.addText('Non-clinical staff MAY NOT', { x: 7.1, y: 2.0, w: 5.35, h: 0.55, align: 'center', valign: 'middle', fontFace: BF, fontSize: 15, bold: true, color: WHITE });
const may = ['Administer standardized screens & test kits', 'Record and report raw scores', 'Describe observed trends ("memory scores improved")', 'Educate from approved handouts & scripts', 'Escalate concerns to the APD / Provider'];
const mayNot = ['Diagnose or "rule out" a condition', 'Interpret scores clinically or predict prognosis', 'Tell a patient they "have ADHD / autism / dementia"', 'Give medical advice, adjust meds, or order labs', 'Decide medical necessity or change the care plan'];
s.addText(may.map((it, j) => ({ text: it, options: { bullet: { code: '2713', indent: 16 }, color: '1D6B57', breakLine: j !== may.length - 1 } })),
  { x: 0.95, y: 2.75, w: 5.35, h: 3.4, fontFace: BF, fontSize: 13, paraSpaceAfter: 12, valign: 'top' });
s.addText(mayNot.map((it, j) => ({ text: it, options: { bullet: { code: '2717', indent: 16 }, color: '9C2D2D', breakLine: j !== mayNot.length - 1 } })),
  { x: 7.2, y: 2.75, w: 5.15, h: 3.4, fontFace: BF, fontSize: 13, paraSpaceAfter: 12, valign: 'top' });
pageNum(s, 9);

// ===== 10. APD OWNERSHIP =====
s = p.addSlide(); base(s, true);
s.addShape(p.ShapeType.ellipse, { x: 10.2, y: -1.6, w: 5, h: 5, fill: { color: INK2 } });
s.addText('The APD Ownership Principle', { x: 0.8, y: 1.0, w: 11.5, h: 0.8, fontFace: HF, fontSize: 32, bold: true, color: WHITE });
s.addShape(p.ShapeType.roundRect, { x: 0.8, y: 2.1, w: 11.7, h: 2.4, rectRadius: 0.12, fill: { color: MINT } });
s.addText('"The APD does not wait for problems to surface. Every untracked patient, overdue note, missed session, and unassigned referral is the APD’s responsibility to find and resolve — without being told."',
  { x: 1.2, y: 2.1, w: 10.9, h: 2.4, valign: 'middle', fontFace: HF, fontSize: 20, italic: true, bold: true, color: INK, lineSpacingMultiple: 1.15 });
const owns = ['Daily referral queue — no patient unassigned > 24 hrs', 'Weekly documentation audit — every 97127 note complete', 'Attendance tracking before it becomes a billing issue', 'Monthly review gatekeeping — coordinator summary first', 'Same-day red-flag routing (APD routes, NP decides)'];
s.addText(owns.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, color: 'E7ECF6', breakLine: j !== owns.length - 1 } })),
  { x: 0.9, y: 4.8, w: 11.6, h: 2.3, fontFace: BF, fontSize: 14, paraSpaceAfter: 8, valign: 'top' });
pageNum(s, 10);

// ===== 11. PATIENT JOURNEY =====
s = p.addSlide(); base(s);
header(s, 'Module 4 · Patient Journey', 'Identification → Discharge (13 Steps)');
const journey = [
  ['1', 'Provider screening', 'NP'], ['2', 'Referral (same day)', 'NP'], ['3', 'MA intake steps', 'MA'],
  ['4', 'Assignment (<24 hrs)', 'APD'], ['5', 'Intake 45–60 min', 'Coord'], ['6', 'Digital testing (48 hrs)', 'Patient'],
  ['7', 'Baseline review · 96132', 'NP'], ['8', 'Plan handoff', 'APD'], ['9', 'Weekly 97127', 'Coord'],
  ['10', 'Monthly review (Wk 4)', 'Team'], ['11', 'Quarterly retest (Wk 12)', 'Team'], ['12', 'Continuation decision', 'NP+APD'], ['13', 'Discharge / maintenance', 'Team'],
];
journey.forEach((j, i) => {
  const col = i % 5, row = Math.floor(i / 5);
  const x = 0.6 + col * 2.48, y = 1.75 + row * 1.35, w = 2.32, h = 1.18;
  card(s, x, y, w, h);
  s.addText(j[0], { x: x + 0.15, y: y + 0.12, w: 0.7, h: 0.5, fontFace: HF, fontSize: 22, bold: true, color: MINT });
  s.addText(j[2], { x: x + 0.7, y: y + 0.16, w: w - 0.85, h: 0.35, align: 'right', fontFace: BF, fontSize: 9.5, bold: true, color: CORAL });
  s.addText(j[1], { x: x + 0.17, y: y + 0.6, w: w - 0.32, h: 0.5, fontFace: BF, fontSize: 11, color: INK, valign: 'top', lineSpacingMultiple: 0.95 });
});
s.addText('Hard deadlines: referral same day · assignment < 24 hrs · home testing < 48 hrs · documentation same day.',
  { x: 0.6, y: 6.55, w: 12.1, h: 0.4, fontFace: BF, fontSize: 12.5, italic: true, bold: true, color: INK });
pageNum(s, 11);

// ===== 12. SEVEN TRACKS DETAIL =====
s = p.addSlide(); base(s);
header(s, 'Module 5 · Population Tracks', 'One Pathway, Seven Tailored Tracks');
const td = [
  ['Children', 'Medical optimization before psychiatry · parent education · 504/IEP support'],
  ['Teens & Young Adults', 'Motivation vs. cognitive overload · school/work systems · independence readiness'],
  ['Adults', 'Burnout vs. ADHD vs. brain fog · daily-function systems · accommodations'],
  ['Neurodivergent Adults', 'Masking & burnout · sensory regulation · self-advocacy · capacity planning'],
  ['Recovery', 'Cognitive repair · life-skills restoration · trigger & coping map · care coordination'],
  ['Chronic Disease', 'Brain-fog contributor map · care-plan simplification · medical-cognitive stabilization'],
  ['Seniors', 'Reversible causes · vascular/metabolic brain health · medication safety · caregivers'],
];
td.forEach((t, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  if (i === 6) { // last one full width bottom-left area handled below
  }
  const x = 0.6 + col * 6.15, y = 1.72 + row * 1.18, w = 5.95, h = 1.02;
  card(s, x, y, w, h);
  s.addShape(p.ShapeType.ellipse, { x: x + 0.22, y: y + 0.32, w: 0.38, h: 0.38, fill: { color: MINT } });
  s.addText(String(i + 1), { x: x + 0.22, y: y + 0.32, w: 0.38, h: 0.38, align: 'center', valign: 'middle', fontFace: BF, fontSize: 14, bold: true, color: WHITE });
  s.addText(t[0], { x: x + 0.75, y: y + 0.1, w: w - 0.9, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: INK });
  s.addText(t[1], { x: x + 0.75, y: y + 0.46, w: w - 0.95, h: 0.5, fontFace: BF, fontSize: 10.5, color: GRAY, valign: 'top', lineSpacingMultiple: 0.95 });
});
pageNum(s, 12);

// ===== 13. SCREENING BY DOMAIN =====
s = p.addSlide(); base(s);
header(s, 'Module 6 · Screening', 'A Battery, Not One Test');
const dom = [
  ['Core cognition', 'CogniFit · Creyos · NIH Toolbox · MoCA · SLUMS · Mini-Cog · MindPrint'],
  ['ADHD / attention', 'Vanderbilt · Conners · ADHD-RS-5 · ASRS v1.1 · Brown · QbCheck/QbTest'],
  ['Executive function', 'BRIEF-2 · BRIEF-A · BDEFS · CEFI · Brown EF/A'],
  ['Autism / AuDHD', 'SRS-2 · SCQ · AQ · RAADS-R · CAT-Q · Sensory Profile'],
  ['Mood / trauma', 'PHQ-9/PHQ-A · GAD-7 · SCARED · DERS · PCL-5 / PC-PTSD-5 · GDS'],
  ['Sleep', 'BEARS · Pediatric Sleep Q · STOP-Bang · Epworth · ISI · PSQI'],
  ['Recovery', 'AUDIT-C · DAST-10 · ASSIST · BAM · craving scale'],
  ['Brain fog / function', 'PROMIS Cog · Fatigue Severity · med-adherence · Lawton IADL'],
];
dom.forEach((d, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 0.6 + col * 6.15, y = 1.7 + row * 1.12, w = 5.95, h = 0.96;
  card(s, x, y, w, h);
  s.addText(d[0], { x: x + 0.25, y: y + 0.13, w: w - 0.5, h: 0.35, fontFace: BF, fontSize: 13, bold: true, color: MINT });
  s.addText(d[1], { x: x + 0.25, y: y + 0.47, w: w - 0.5, h: 0.42, fontFace: BF, fontSize: 10.5, color: INK, valign: 'top', lineSpacingMultiple: 0.95 });
});
s.addText('Screens identify patterns & referral needs — they do NOT replace formal diagnostic evaluation.',
  { x: 0.6, y: 6.5, w: 12.1, h: 0.4, fontFace: BF, fontSize: 12, italic: true, bold: true, color: CORAL });
pageNum(s, 13);

// ===== 14. BATTERIES BY POPULATION =====
s = p.addSlide(); base(s);
header(s, 'Module 6 · Quick Reference', 'Screening Batteries by Population');
const bat = [
  ['Children', 'Vanderbilt (P+T) · BRIEF-2/CEFI · PSC-17/SDQ · SCARED · BEARS · SRS-2/SCQ · Sensory Profile 2'],
  ['Teens', 'Vanderbilt/Conners · BRIEF-2/A · PHQ-A · GAD-7 · ISI · SRS-2/AQ/CAT-Q · CogniFit/QbCheck'],
  ['Adults', 'ASRS v1.1 · BRIEF-A/BDEFS · PHQ-9 · GAD-7 · STOP-Bang · Epworth · PROMIS Cog'],
  ['ADHD/Autism/AuDHD', 'ASRS · BRIEF-A/BDEFS · AQ/RAADS-R · CAT-Q · Sensory Profile · PCL-5/PC-PTSD-5'],
  ['Recovery', 'MoCA/CogniFit · BRIEF-A/BDEFS · PHQ-9 · GAD-7 · PCL-5 · BAM · AUDIT-C/DAST-10 · craving'],
  ['Chronic Disease', 'PROMIS Cog · MoCA · BRIEF-A · PHQ-9/GAD-7 · STOP-Bang · Fatigue · Lawton IADL'],
  ['Seniors', 'Mini-Cog · MoCA/SLUMS · AD8 · FAQ/Lawton · GDS/PHQ-9 · STOP-Bang · CAM · anticholinergic review'],
];
bat.forEach((b, i) => {
  const y = 1.7 + i * 0.72, x = 0.6, w = 12.1, h = 0.62;
  card(s, x, y, w, h, i % 2 ? LIGHT : 'FFFFFF');
  s.addShape(p.ShapeType.roundRect, { x: x + 0.15, y: y + 0.11, w: 2.55, h: 0.4, rectRadius: 0.05, fill: { color: INK } });
  s.addText(b[0], { x: x + 0.15, y: y + 0.11, w: 2.55, h: 0.4, align: 'center', valign: 'middle', fontFace: BF, fontSize: 11.5, bold: true, color: WHITE });
  s.addText(b[1], { x: x + 2.85, y: y + 0.06, w: w - 3.0, h: 0.5, valign: 'middle', fontFace: BF, fontSize: 10.5, color: GRAY });
});
pageNum(s, 14);

// ===== 15. COGNITIVE PROFILE =====
s = p.addSlide(); base(s, true);
s.addText('From Screening → the Cognitive Profile', { x: 0.7, y: 0.7, w: 12, h: 0.8, fontFace: HF, fontSize: 30, bold: true, color: WHITE });
card(s, 0.7, 1.85, 5.7, 4.7, INK2);
s.addText('The profile identifies', { x: 0.95, y: 2.05, w: 5.2, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: MINT });
const prof = ['Cognitive strengths & weaknesses', 'EF · attention · memory · processing patterns', 'Emotional-regulation concerns', 'Sleep & medical contributors', 'Autism/AuDHD traits when present', 'Recovery or chronic-disease barriers', 'Older-adult safety / memory concerns', 'Recommended next steps'];
s.addText(prof.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, color: 'E7ECF6', breakLine: j !== prof.length - 1 } })),
  { x: 1.0, y: 2.5, w: 5.2, h: 3.9, fontFace: BF, fontSize: 13, paraSpaceAfter: 7, valign: 'top' });
card(s, 6.7, 1.85, 5.95, 4.7, MINT);
s.addText('It then guides', { x: 6.95, y: 2.05, w: 5.4, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: INK });
const guide = ['Parent & patient education', 'School / work accommodations', 'Medical optimization', 'Cognitive training', 'Therapy / psychiatry referral', 'Neuropsychology / neurology referral', 'Recovery & chronic-care supports', 'Caregiver education & follow-up'];
s.addText(guide.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, color: '10352B', breakLine: j !== guide.length - 1 } })),
  { x: 7.0, y: 2.5, w: 5.4, h: 3.9, fontFace: BF, fontSize: 13, bold: true, paraSpaceAfter: 7, valign: 'top' });
pageNum(s, 15);

// ===== 16. MEDICAL CONTRIBUTORS =====
s = p.addSlide(); base(s);
header(s, 'Module 7 · Contributors', 'Optimize the Body Before Psychiatry');
s.addText('Cognition can be suppressed by physiologic factors that are often reversible. Staff SCREEN and FLAG; the Provider evaluates, orders labs, and treats.',
  { x: 0.6, y: 1.65, w: 12.1, h: 0.7, fontFace: BF, fontSize: 14, color: GRAY, valign: 'top', lineSpacingMultiple: 1.1 });
const buckets = [
  ['Sleep & breathing', 'Sleep apnea · snoring / mouth breathing · insomnia · poor sleep quality'],
  ['Nutrition & labs', 'Iron / ferritin · B12 / folate · vitamin D · thyroid · A1C / glucose'],
  ['Inflammation & vascular', 'Autoimmune · chronic inflammation · hypertension · vascular risk'],
  ['Hormones & metabolic', 'Peri/menopause · testosterone · insulin resistance · MASLD'],
  ['Medication & load', 'Polypharmacy · anticholinergic burden · side effects · pain'],
  ['Stress & lifestyle', 'Trauma burden · chronic stress · dehydration · movement · screens'],
];
buckets.forEach((b, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.6 + col * 4.1, y = 2.55 + row * 1.9, w = 3.9, h = 1.7;
  card(s, x, y, w, h);
  s.addText(b[0], { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: INK });
  s.addText(b[1], { x: x + 0.25, y: y + 0.65, w: w - 0.5, h: 0.95, fontFace: BF, fontSize: 11.5, color: GRAY, valign: 'top', lineSpacingMultiple: 1.05 });
});
pageNum(s, 16);

// ===== 17. DOCUMENTATION & BILLING =====
s = p.addSlide(); base(s);
header(s, 'Module 8 · Compliance', 'Documentation & Billing');
card(s, 0.6, 1.75, 6.0, 4.7, LIGHT);
s.addText('Billing codes', { x: 0.85, y: 1.95, w: 5.5, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: MINT });
const codes = [['97127', 'Weekly cognitive/EF training'], ['97535', 'Academic add-ons (Silver)'], ['96132', 'Provider interpretation (baseline & quarterly)'], ['96136', 'Test administration / scoring'], ['BHI codes', 'Behavioral Health Integration (Gold)']];
codes.forEach((c, i) => {
  const y = 2.4 + i * 0.78;
  s.addShape(p.ShapeType.roundRect, { x: 0.85, y, w: 1.5, h: 0.55, rectRadius: 0.05, fill: { color: INK } });
  s.addText(c[0], { x: 0.85, y, w: 1.5, h: 0.55, align: 'center', valign: 'middle', fontFace: BF, fontSize: 13, bold: true, color: WHITE });
  s.addText(c[1], { x: 2.5, y, w: 3.9, h: 0.55, valign: 'middle', fontFace: BF, fontSize: 11.5, color: GRAY });
});
card(s, 6.85, 1.75, 5.85, 4.7, INK);
s.addText('Every 97127 note needs 5 elements', { x: 7.1, y: 1.95, w: 5.4, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: MINT });
const five = ['ICD-10 diagnosis', 'Deficits targeted', 'Interventions delivered', 'Functional response', 'Homework assigned'];
five.forEach((f, i) => {
  const y = 2.5 + i * 0.62;
  chipNum(s, 7.1, y, i + 1, MINT);
  s.addText(f, { x: 7.75, y, w: 4.6, h: 0.5, valign: 'middle', fontFace: BF, fontSize: 14, color: WHITE });
});
s.addText('Same-day documentation is the standard. The APD audits all notes weekly.', { x: 7.1, y: 5.75, w: 5.3, h: 0.6, fontFace: BF, fontSize: 12, italic: true, color: ICE, valign: 'top', lineSpacingMultiple: 1.05 });
pageNum(s, 17);

// ===== 18. COMMUNICATION =====
s = p.addSlide(); base(s);
header(s, 'Module 9 · Communication', 'How We Talk IS the Intervention');
const prin2 = ['Behavior is communication — not defiance or laziness', 'Name the pattern, not the person', 'Reduce shame — struggles are brain-based and workable', 'Give language first', 'Cognition is a muscle — it fatigues, then strengthens'];
s.addText('Core principles', { x: 0.6, y: 1.7, w: 5.5, h: 0.4, fontFace: BF, fontSize: 14, bold: true, color: MINT });
s.addText(prin2.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, breakLine: j !== prin2.length - 1 } })),
  { x: 0.65, y: 2.15, w: 5.5, h: 4.2, fontFace: BF, fontSize: 14, color: GRAY, paraSpaceAfter: 12, valign: 'top' });
const scripts = [
  ['When a patient asks for a diagnosis', '"These are screening tools that map how your brain is working. The provider reviews it all together and talks with you about what it means — I’ll make sure that’s on your review list."'],
  ['Encouraging a fatigued patient', '"Executive function is like a muscle — it gets tired but grows stronger with consistent training. If you’re fatigued, try a shorter session today."'],
];
scripts.forEach((sc, i) => {
  const y = 1.75 + i * 2.35, x = 6.6, w = 6.1, h = 2.15;
  card(s, x, y, w, h, LIGHT);
  s.addText(sc[0], { x: x + 0.3, y: y + 0.2, w: w - 0.6, h: 0.4, fontFace: BF, fontSize: 13, bold: true, color: MINT });
  s.addText(sc[1], { x: x + 0.3, y: y + 0.65, w: w - 0.6, h: 1.4, fontFace: HF, fontSize: 13.5, italic: true, color: INK, valign: 'top', lineSpacingMultiple: 1.1 });
});
pageNum(s, 18);

// ===== 19. FOLLOW-UP & ESCALATION =====
s = p.addSlide(); base(s);
header(s, 'Module 10 · Follow-Up', 'Review Rhythm & Escalation');
const rhythm = [['Weekly', '97127 session + same-day note; track homework & digital compliance'], ['Monthly (Wk 4)', 'Coordinator summary → APD reviews first → NP updates plan'], ['Quarterly (Wk 12)', 'Full retest; APD compiles; NP interprets & bills 96132'], ['Continuation', 'Continue · modify tier · maintenance · discharge · refer']];
rhythm.forEach((r, i) => {
  const y = 1.75 + i * 1.12, x = 0.6, w = 7.2, h = 0.98;
  card(s, x, y, w, h);
  s.addShape(p.ShapeType.roundRect, { x: x + 0.2, y: y + 0.19, w: 1.9, h: 0.6, rectRadius: 0.05, fill: { color: INK } });
  s.addText(r[0], { x: x + 0.2, y: y + 0.19, w: 1.9, h: 0.6, align: 'center', valign: 'middle', fontFace: BF, fontSize: 12.5, bold: true, color: WHITE });
  s.addText(r[1], { x: x + 2.25, y: y + 0.1, w: w - 2.45, h: 0.8, valign: 'middle', fontFace: BF, fontSize: 12, color: GRAY, lineSpacingMultiple: 1.0 });
});
card(s, 8.1, 1.75, 4.6, 4.55, CORAL);
s.addText('Escalation', { x: 8.35, y: 1.95, w: 4.1, h: 0.4, fontFace: BF, fontSize: 15, bold: true, color: WHITE });
const esc = ['Red flag or medical concern → APD routes to Provider SAME DAY', 'Formal diagnosis needed → Provider refers for full evaluation', 'Crisis / safety → follow BHW crisis protocol immediately'];
s.addText(esc.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, color: WHITE, breakLine: j !== esc.length - 1 } })),
  { x: 8.4, y: 2.5, w: 4.1, h: 3.6, fontFace: BF, fontSize: 13.5, paraSpaceAfter: 16, valign: 'top', lineSpacingMultiple: 1.05 });
pageNum(s, 19);

// ===== 20. CLOSING =====
s = p.addSlide(); base(s, true);
s.addShape(p.ShapeType.ellipse, { x: -2, y: 3.6, w: 5.4, h: 5.4, fill: { color: INK2 } });
s.addShape(p.ShapeType.ellipse, { x: 10.8, y: -2, w: 5, h: 5, fill: { color: INK2 } });
s.addText('Confidence Through\nCognition and Education', { x: 1.0, y: 2.2, w: 11.3, h: 1.8, fontFace: HF, fontSize: 40, bold: true, color: WHITE, lineSpacingMultiple: 1.05 });
s.addText('Read the full Employee Training Guide · Complete your role competency checklist · Ask your APD', { x: 1.05, y: 4.3, w: 11.2, h: 0.5, fontFace: BF, fontSize: 15, color: ICE });
s.addShape(p.ShapeType.roundRect, { x: 1.05, y: 5.15, w: 3.0, h: 0.6, rectRadius: 0.3, fill: { color: MINT } });
s.addText('CharmEd Minds™', { x: 1.05, y: 5.15, w: 3.0, h: 0.6, align: 'center', valign: 'middle', fontFace: BF, fontSize: 14, bold: true, color: INK });
pageNum(s, 20);

// speaker notes
p.slides.forEach((sl, i) => { if (notes[i + 1]) sl.addNotes(notes[i + 1]); });

p.writeFile({ fileName: 'CharmEd Minds Onboarding Deck.pptx' }).then(f => console.log('wrote', f));
