import { useState } from "react";

const COLORS = {
  bg: "#0f0f0f",
  card: "#1a1a1a",
  cardBorder: "#2a2a2a",
  accent: "#e8ff47",
  accentDim: "#b8cc2a",
  red: "#ff4747",
  green: "#47ff8a",
  blue: "#47b8ff",
  orange: "#ff9447",
  purple: "#c47aff",
  muted: "#6b6b6b",
  text: "#f0f0f0",
  textDim: "#aaaaaa",
};

const tabs = ["📅 Schedule", "🏋️ Workout", "🥗 Meals", "😴 Sleep", "📊 Goals"];

const scheduleData = [
  {
    time: "07:30",
    label: "WAKE UP — Zero Snooze",
    detail:
      "One alarm. Stand up immediately. Snooze fragments sleep and makes grogginess worse (sleep inertia). Open curtains right away — morning sunlight resets your circadian clock.",
    type: "sleep",
    icon: "🌅",
  },
  {
    time: "07:31",
    label: "☀️ Sunlight — 5 min",
    detail:
      "Step to window or outside for 2–5 min. Morning sunlight on face/arms triggers cortisol rise (your body's natural wake signal), suppresses residual melatonin, and sets your sleep timer for exactly 16 hours later — meaning you'll feel sleepy right at 23:00. Even on cloudy days, do this.",
    type: "health",
    icon: "☀️",
  },
  {
    time: "07:35",
    label: "💧 Water #1 — 400ml",
    detail:
      "2 full glasses immediately on waking. You've had zero water for 7.5 hours — most dehydrated point of your day. Do this before phone, before anything else.",
    type: "water",
    icon: "💧",
  },
  {
    time: "07:40",
    label: "Pre-Workout Power Shake",
    detail:
      "Blend: 2 bananas + 1.5 scoops whey + 3 tbsp oats + 300ml milk + 1 tbsp peanut butter + 1 tbsp ground alsi (flaxseeds) + 1 tsp creatine powder. ~560 kcal | 65g carbs | 46g protein. Drink fast — you leave in 15 min.",
    type: "food",
    icon: "🥤",
  },
  {
    time: "07:55",
    label: "Leave for Gym",
    detail:
      "Bag packed the night before. Carry: 1L water bottle, shaker with 1 dry scoop whey for post-workout, earphones.",
    type: "work",
    icon: "🎧",
  },
  {
    time: "08:30",
    label: "GYM — Dynamic Warm-Up (5 min)",
    detail:
      "Never skip: arm circles x10, hip circles x10, bodyweight squats x10, leg swings x10 each side, band pull-aparts if available. Cold muscles + heavy weights = injury. You woke up 1 hour ago.",
    type: "gym",
    icon: "🔥",
  },
  {
    time: "08:35",
    label: "💧 Water #2 — 500–750ml during gym",
    detail:
      "Sip every 2–3 sets throughout. Don't chug all at once — causes cramps mid-set. Finish the bottle by the time you're done. 1% dehydration = 10% drop in strength output.",
    type: "water",
    icon: "💧",
  },
  {
    time: "08:35",
    label: "GYM — Main Session (75 min)",
    detail:
      "Per weekly split (see Workout tab). Compounds first, accessories after. LOG EVERY SET — weight used + reps done — in your Notes app. This is how you track progressive overload. No log = no progress.",
    type: "gym",
    icon: "🏋️",
  },
  {
    time: "09:50",
    label: "GYM — Cool Down (5 min)",
    detail:
      "Static stretches: chest doorway stretch, lat stretch, quad stretch, hamstring stretch. 30 sec each. Reduces DOMS for the next day.",
    type: "health",
    icon: "🧘",
  },
  {
    time: "09:55",
    label: "Post-Workout Shake — AT GYM",
    detail:
      "Mix 1 scoop whey in 300ml water from shaker. Drink BEFORE showering — within 20 min of last set. Muscle protein synthesis peaks now. Don't wait until office (11:00+ = too late).",
    type: "food",
    icon: "🥛",
  },
  {
    time: "10:00",
    label: "Shower at Gym",
    detail:
      "End with 30–60 sec cold water on back and legs. Reduces muscle soreness, improves alertness. Gets you sharp before office.",
    type: "health",
    icon: "🚿",
  },
  {
    time: "11:00",
    label: "Office — Deep Work Block",
    detail:
      "Post-workout endorphins + focus window = your best cognitive time of day. Block meetings here if possible. No social media until 13:00.",
    type: "work",
    icon: "💻",
  },
  {
    time: "11:00",
    label: "💧 Water #3 — 500ml (11:00–13:00)",
    detail:
      "1 full bottle at desk over 2 hours. Sip constantly — don't wait until thirsty. Thirst = already 1–2% dehydrated. Urine check: should be pale yellow, not dark.",
    type: "water",
    icon: "💧",
  },
  {
    time: "13:30",
    label: "Mid-Morning Snack (only if hungry)",
    detail:
      "10–12 almonds + 1 apple OR small bowl makhana. Skip entirely if not hungry — don't force calories.",
    type: "food",
    icon: "🍎",
  },
  {
    time: "14:00",
    label: "💧 Water #4 — 200ml with lunch",
    detail:
      "Small glass with food only. Don't overdrink during meals — dilutes stomach acid and slows digestion. Small sips only.",
    type: "water",
    icon: "💧",
  },
  {
    time: "14:00",
    label: "LUNCH — Biggest Meal",
    detail:
      "Dal (per rotation) + paneer/tofu + sabzi (per rotation) + dahi + salad + 2 rotis or rice. Eat away from desk — no screens. 20 min minimum. 5 walnuts on the side.",
    type: "food",
    icon: "🍱",
  },
  {
    time: "14:25",
    label: "Post-Lunch Walk",
    detail:
      "5–10 min walk outside or around office block. Non-negotiable — regulates blood sugar and prevents the 3pm energy crash.",
    type: "health",
    icon: "🚶",
  },
  {
    time: "14:30",
    label: "💧 Water #5 — 400ml (14:30–17:00)",
    detail:
      "Another bottle at desk over the afternoon. This is the most neglected window. Afternoon dehydration shows up as 3pm brain fog — people blame the food, it's usually the water.",
    type: "water",
    icon: "💧",
  },
  {
    time: "16:00",
    label: "☕ Last Coffee Cut-Off",
    detail:
      "No caffeine after 16:00. Caffeine half-life is 5–6 hours — coffee at 4pm = half of it still in your bloodstream at 10pm. Switch to water or herbal tea from here.",
    type: "health",
    icon: "☕",
  },
  {
    time: "17:00",
    label: "💧 Water #6 — 200ml before snack",
    detail:
      "Glass of water before eating your pre-badminton snack. Pre-hydrates you for court and helps with satiety.",
    type: "water",
    icon: "💧",
  },
  {
    time: "17:00",
    label: "Pre-Badminton Snack (Tue/Wed/Thu/Sun)",
    detail:
      "150g Greek yogurt / hung curd + 1 banana OR 1 cup roasted makhana. Eat at 17:00 sharp — exactly 90 min before court. On non-badminton days (Mon/Fri/Sat): skip or have 10 almonds only.",
    type: "food",
    icon: "⚡",
  },
  {
    time: "18:50",
    label: "Leave Office",
    detail:
      "Carry electrolyte bottle for badminton: 500ml water + pinch salt + lemon, pre-mixed. No coffee since 16:00.",
    type: "work",
    icon: "🚗",
  },
  {
    time: "19:30",
    label: "💧 Water #7 — 500–600ml during badminton",
    detail:
      "Sip between every 2–3 rallies, not just at breaks. Electrolyte mix replaces sodium lost in sweat. On non-badminton Mon/Fri/Sat evenings: still drink 300ml water around this time.",
    type: "water",
    icon: "💧",
  },
  {
    time: "19:30",
    label: "BADMINTON (60 min)",
    detail:
      "Your cardio for the day. Tue + Thu evenings, Sat + Sun mornings. Play hard — this is HIIT-level intensity. No gym on these days.",
    type: "gym",
    icon: "🏸",
  },
  {
    time: "20:30",
    label: "Post-Badminton Stretch",
    detail:
      "10 min non-negotiable: hip flexors (lunge stretch 30s each), calves (wall stretch), hamstrings (seated), rotator cuff (cross-arm stretch). Badminton is brutal on ankles and knees long-term.",
    type: "health",
    icon: "🧘",
  },
  {
    time: "21:15",
    label: "💧 Water #8 — 200ml with dinner",
    detail: "Small glass with dinner. Last proper meal of the day.",
    type: "water",
    icon: "💧",
  },
  {
    time: "21:15",
    label: "DINNER",
    detail:
      "Ragi roti (or 1–2 wheat rotis) + greens sabzi per rotation + lighter dal (moong/masoor/toor only) + 150g dahi. Finish eating by 21:45. After dinner: 30g pumpkin seeds + 10–12 almonds = magnesium stack.",
    type: "food",
    icon: "🍽️",
  },
  {
    time: "21:45",
    label: "💧 Water #9 — LAST 200ml",
    detail:
      "Final water of the day. Hard stop here. Drinking after 22:00 = bathroom at 2–3am = broken sleep architecture. Your kidneys will thank you.",
    type: "water",
    icon: "💧",
  },
  {
    time: "22:00",
    label: "Wind-Down Begins",
    detail:
      "Dim all overhead lights — use a bedside lamp only. Bright light suppresses melatonin. Reply to urgent messages is fine but no reels, Twitter, or news from here.",
    type: "sleep",
    icon: "🌙",
  },
  {
    time: "22:15",
    label: "Pack Gym Bag + Soak Seeds/Nuts",
    detail:
      "1. Lay out gym clothes, refill water bottle, put dry whey scoop in shaker, earphones charged. 2. SOAK FOR TOMORROW: small bowl — 30g pumpkin seeds + 10–12 almonds + 5 walnuts in water. Cover and leave on counter or fridge. Eat them tomorrow evening after dinner. Soaking removes phytic acid which blocks magnesium and mineral absorption — dry seeds give ~40% less benefit.",
    type: "health",
    icon: "🎒",
  },
  {
    time: "22:30",
    label: "📵 PHONE DOWN — Non-Negotiable",
    detail:
      "Phone on charger outside the bedroom or face-down across the room. Phone in bedroom = average 45 min less sleep per night (clinical data). Alarm is fine — just make yourself get up to turn it off.",
    type: "sleep",
    icon: "📵",
  },
  {
    time: "22:30",
    label: "Read for 30 min",
    detail:
      "Physical book or Kindle on warm/night mode. Fiction works best — absorbing but not stimulating. No work content, no news. This shifts your brain from alert → sleep mode passively.",
    type: "sleep",
    icon: "📚",
  },
  {
    time: "22:45",
    label: "Magnesium Glycinate — 300mg",
    detail:
      "With a small sip of water only (you've hit cut-off). Reduces time to fall asleep and improves sleep depth. Not a sedative — removes nervous system friction. Take every night.",
    type: "health",
    icon: "💊",
  },
  {
    time: "23:00",
    label: "Lights Out",
    detail:
      "23:00 → 07:30 = 7.5 hrs = exactly 5 complete 90-min sleep cycles. Growth hormone, testosterone, muscle repair, and fat metabolism all peak during deep sleep. This is the most anabolic part of your day.",
    type: "sleep",
    icon: "😴",
  },
];

const workoutPlan = {
  split: "4-Day Upper/Lower Split — Mon, Tue, Wed, Fri",
  note: "4 gym days with badminton on Tue/Wed/Thu/Sun. Leg days are kept AWAY from Tue and Wed (you have badminton those evenings) — legs + evening badminton = injury risk. Upper body gym + badminton same day is totally fine. Saturday is full rest — the only complete recovery day in your week.",
  weekTemplate: [
    {
      day: "MON",
      gym: "Upper — Push",
      badminton: "❌ Rest evening",
      gymColor: COLORS.red,
      note: "Chest, shoulders, triceps. Hard push day. Full evening rest — no court. Best focus day of the week.",
    },
    {
      day: "TUE",
      gym: "Upper — Pull",
      badminton: "🏸 Badminton evening 19:30",
      gymColor: COLORS.orange,
      note: "Upper Pull gym in morning — back, biceps. Upper body gym + evening badminton is safe, legs are fresh for court. Pre-snack at 17:00 sharp.",
    },
    {
      day: "WED",
      gym: "Upper — Push OR Arms",
      badminton: "🏸 Badminton evening 19:30",
      gymColor: COLORS.red,
      note: "Lighter upper session — chest variation or arms/weak point. Keep it under 60 min. Evening badminton is your cardio. No leg work today.",
    },
    {
      day: "THU",
      gym: "❌ Rest",
      badminton: "🏸 Badminton evening 19:30",
      gymColor: COLORS.muted,
      note: "No gym. Third consecutive active day — body needs the morning off. Fresh legs = best court performance. Pre-snack at 17:00.",
    },
    {
      day: "FRI",
      gym: "Lower — Full (Squats + Deadlift)",
      badminton: "❌ Rest evening",
      gymColor: COLORS.purple,
      note: "The big leg day. Squats + deadlift + accessories. Friday evening is full rest — no court, no running. Legs need 48 hrs before Sunday badminton.",
    },
    {
      day: "SAT",
      gym: "❌ Full Rest",
      badminton: "❌ Full Rest",
      gymColor: COLORS.muted,
      note: "Complete recovery day. No gym, no court. Foam roll 15 min, go for a leisure walk, eat well. Your body rebuilds on rest days, not gym days.",
    },
    {
      day: "SUN",
      gym: "❌ Rest",
      badminton: "🏸 Morning 9–11",
      gymColor: COLORS.muted,
      note: "Morning badminton only. No gym after — legs had Friday's heavy session. Foam roll after court. Full recovery before Monday push day.",
    },
  ],
  mesocycleNote:
    "Every 4 weeks: keep ALL compound lifts the same (bench, squat, deadlift, rows, OHP) — these need consistency to progress. Swap 2–3 accessory exercises only. This is periodization done right — not random 'muscle confusion' which the science does not support.",
  days: [
    {
      day: "Monday",
      type: "UPPER — Push",
      color: COLORS.red,
      compounds: "Bench Press + OHP — keep these for 8–12 weeks",
      exercises: [
        {
          name: "Barbell Bench Press",
          tag: "COMPOUND — keep always",
          sets: "4",
          reps: "8–10",
          rest: "90s",
          note: "Control eccentric (3s down). Don't bounce off chest.",
          variations: [
            "Wk 1–4: Flat Barbell",
            "Wk 5–8: Flat Dumbbell (more range of motion)",
            "Wk 9–12: Back to Barbell, heavier",
          ],
        },
        {
          name: "Incline Press",
          tag: "COMPOUND",
          sets: "3",
          reps: "10–12",
          rest: "75s",
          note: "Upper chest. 30–45° incline only — too steep = shoulder press.",
          variations: [
            "Wk 1–4: Incline Dumbbell",
            "Wk 5–8: Incline Barbell",
            "Wk 9–12: Incline Cable Fly",
          ],
        },
        {
          name: "Overhead Press (OHP)",
          tag: "COMPOUND — keep always",
          sets: "3",
          reps: "8–10",
          rest: "75s",
          note: "Seated or standing. Brace core hard. No lower back arch.",
          variations: [
            "Wk 1–4: Seated DB Press",
            "Wk 5–8: Standing Barbell OHP",
            "Wk 9–12: Arnold Press",
          ],
        },
        {
          name: "Lateral Raises",
          tag: "ACCESSORY",
          sets: "3",
          reps: "15–20",
          rest: "45s",
          note: "Light weight only. Squeeze at top. No swinging.",
          variations: [
            "Wk 1–4: Dumbbell",
            "Wk 5–8: Cable (constant tension)",
            "Wk 9–12: Machine",
          ],
        },
        {
          name: "Tricep Isolation",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12–15",
          rest: "45s",
          note: "Full lockout at bottom.",
          variations: [
            "Wk 1–4: Cable Rope Pushdown",
            "Wk 5–8: Overhead DB Extension",
            "Wk 9–12: Close-Grip Bench Press",
          ],
        },
        {
          name: "Plank / Core",
          tag: "ACCESSORY",
          sets: "3",
          reps: "45–60s",
          rest: "30s",
          note: "Glutes squeezed. Don't let hips sag.",
          variations: [
            "Wk 1–4: Plank hold",
            "Wk 5–8: RKC Plank (harder)",
            "Wk 9–12: Plank + shoulder taps",
          ],
        },
      ],
    },
    {
      day: "Wednesday",
      type: "UPPER — Push Variation / Arms (Lighter)",
      color: COLORS.red,
      compounds: "Keep session under 60 min — badminton tonight",
      exercises: [
        {
          name: "Incline Dumbbell Press",
          tag: "COMPOUND",
          sets: "3",
          reps: "10–12",
          rest: "75s",
          note: "Upper chest. Different angle from Monday flat bench — hits upper pec. Keep weight moderate — badminton tonight.",
          variations: [
            "Wk 1–4: Incline DB Press",
            "Wk 5–8: Incline Cable Fly",
            "Wk 9–12: Incline Barbell Press",
          ],
        },
        {
          name: "Lateral Raises",
          tag: "ACCESSORY",
          sets: "3",
          reps: "15–20",
          rest: "45s",
          note: "Light weight, squeeze at top. Shoulder width comes from here.",
          variations: [
            "Wk 1–4: Dumbbell",
            "Wk 5–8: Cable (constant tension)",
            "Wk 9–12: Machine",
          ],
        },
        {
          name: "Barbell Bicep Curl",
          tag: "ACCESSORY",
          sets: "3",
          reps: "10–12",
          rest: "45s",
          note: "Full range. No swinging. Supinate at top.",
          variations: [
            "Wk 1–4: Barbell Curl",
            "Wk 5–8: Incline DB Curl (stretched position)",
            "Wk 9–12: Cable Curl",
          ],
        },
        {
          name: "Hammer Curls",
          tag: "ACCESSORY",
          sets: "2",
          reps: "12",
          rest: "45s",
          note: "Neutral grip. Brachialis + forearm thickness.",
          variations: [
            "Wk 1–4: Alternating DB",
            "Wk 5–8: Cross-body",
            "Wk 9–12: Rope Hammer",
          ],
        },
        {
          name: "Tricep Pushdown",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12–15",
          rest: "45s",
          note: "Full lockout. Arms only — no body swing.",
          variations: [
            "Wk 1–4: Cable Rope",
            "Wk 5–8: Overhead DB Extension",
            "Wk 9–12: Close-Grip Bench",
          ],
        },
        {
          name: "Face Pulls",
          tag: "ACCESSORY — shoulder health",
          sets: "3",
          reps: "15–20",
          rest: "45s",
          note: "Always do this on any upper day. Rotator cuff health = injury prevention for badminton.",
          variations: [
            "Wk 1–4: Cable Face Pull",
            "Wk 5–8: Band Face Pull",
            "Wk 9–12: Rear Delt Fly",
          ],
        },
      ],
    },
    {
      day: "Tuesday",
      type: "UPPER — Pull (Back, Biceps)",
      color: COLORS.orange,
      compounds: "Pull-Ups + Rows — keep these for 8–12 weeks",
      exercises: [
        {
          name: "Pull-Ups / Lat Pulldown",
          tag: "COMPOUND — keep always",
          sets: "4",
          reps: "6–10",
          rest: "90s",
          note: "Can't do 6 pull-ups yet? Use lat pulldown. Work toward bodyweight over months.",
          variations: [
            "Wk 1–4: Lat Pulldown (wide grip)",
            "Wk 5–8: Pull-Ups if ready / Close-grip",
            "Wk 9–12: Pull-Ups + weight if able",
          ],
        },
        {
          name: "Bent-Over Row",
          tag: "COMPOUND — keep always",
          sets: "3",
          reps: "8–10",
          rest: "90s",
          note: "Hinge at hips. Pull to belly button, not chest.",
          variations: [
            "Wk 1–4: Barbell Bent-Over Row",
            "Wk 5–8: Dumbbell Row (each side)",
            "Wk 9–12: Cable Row (seated)",
          ],
        },
        {
          name: "Face Pulls",
          tag: "ACCESSORY — shoulder health",
          sets: "3",
          reps: "15–20",
          rest: "45s",
          note: "Non-negotiable for rotator cuff health and posture. Cable rope at face height.",
          variations: [
            "Wk 1–4: Cable Face Pulls",
            "Wk 5–8: Band Face Pulls",
            "Wk 9–12: Rear Delt Fly",
          ],
        },
        {
          name: "Chest-Supported Row",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12",
          rest: "60s",
          note: "Chest on incline bench removes lower back from equation.",
          variations: [
            "Wk 1–4: Chest-Supported DB Row",
            "Wk 5–8: Machine Row",
            "Wk 9–12: TRX / Cable Row",
          ],
        },
        {
          name: "Bicep Curl",
          tag: "ACCESSORY",
          sets: "3",
          reps: "10–12",
          rest: "45s",
          note: "Full range. No swinging. Supinate at top.",
          variations: [
            "Wk 1–4: Barbell Curl",
            "Wk 5–8: Incline Dumbbell Curl (stretched position)",
            "Wk 9–12: Cable Curl (constant tension)",
          ],
        },
        {
          name: "Hammer Curls",
          tag: "ACCESSORY",
          sets: "2",
          reps: "12",
          rest: "45s",
          note: "Neutral grip. Builds brachialis and forearm thickness.",
          variations: [
            "Wk 1–4: Alternating DB Hammer",
            "Wk 5–8: Cross-body Hammer Curl",
            "Wk 9–12: Rope Hammer Curl",
          ],
        },
      ],
    },
    {
      day: "Friday",
      type: "LOWER — Full (Quads + Posterior Chain)",
      color: COLORS.purple,
      compounds: "Squat + Deadlift — both in one session, keep for 8–12 weeks",
      exercises: [
        {
          name: "Conventional Deadlift",
          tag: "COMPOUND — keep always",
          sets: "4",
          reps: "5–8",
          rest: "2 min",
          note: "Start light. Form is everything on this lift. No rounding the back.",
          variations: [
            "Wk 1–4: Conventional Deadlift",
            "Wk 5–8: Sumo Deadlift (hip variation)",
            "Wk 9–12: Trap Bar Deadlift if available / back to Conventional heavier",
          ],
        },
        {
          name: "Bulgarian Split Squat",
          tag: "COMPOUND",
          sets: "3",
          reps: "10 each leg",
          rest: "90s",
          note: "Hardest exercise in this program. Single-leg strength transfers directly to badminton movement.",
          variations: [
            "Wk 1–4: Bodyweight or light DB",
            "Wk 5–8: Heavier DB",
            "Wk 9–12: Barbell BSS",
          ],
        },
        {
          name: "Hip Thrust",
          tag: "COMPOUND",
          sets: "3",
          reps: "12–15",
          rest: "60s",
          note: "Full extension at top. Pause 1 second. Best glute builder.",
          variations: [
            "Wk 1–4: Barbell Hip Thrust",
            "Wk 5–8: Banded Hip Thrust",
            "Wk 9–12: Single-Leg Hip Thrust",
          ],
        },
        {
          name: "Leg Extension",
          tag: "ACCESSORY",
          sets: "3",
          reps: "15",
          rest: "45s",
          note: "VMO (teardrop quad) activation. Good knee health exercise.",
          variations: [
            "Wk 1–4: Machine Leg Extension",
            "Wk 5–8: Heel-Elevated Goblet Squat instead",
            "Wk 9–12: Machine again, slower tempo",
          ],
        },
        {
          name: "Seated Calf Raises",
          tag: "ACCESSORY",
          sets: "3",
          reps: "20",
          rest: "30s",
          note: "Soleus (deeper calf muscle). Different from standing calf raises.",
          variations: [
            "Wk 1–4: Seated Machine",
            "Wk 5–8: DB on knee",
            "Wk 9–12: Standing single-leg",
          ],
        },
        {
          name: "Reverse Hyper / Lower Back",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12–15",
          rest: "45s",
          note: "Protects lower back from deadlift stress. Important.",
          variations: [
            "Wk 1–4: Back Extensions (hyperextension bench)",
            "Wk 5–8: Good Mornings (light)",
            "Wk 9–12: Bird-Dog x 10 each side",
          ],
        },
      ],
    },
    {
      day: "Tue / Wed / Thu / Sun",
      type: "BADMINTON — Your Cardio Days",
      color: COLORS.green,
      compounds: "",
      exercises: [
        {
          name: "Badminton",
          tag: "",
          sets: "—",
          reps: "60–90 min",
          rest: "—",
          note: "This IS your cardio. No additional cardio needed on these days — you're already doing HIIT.",
          variations: [],
        },
        {
          name: "Post-session stretch",
          tag: "",
          sets: "1",
          reps: "10 min",
          rest: "—",
          note: "Hip flexors, hamstrings, calves, rotator cuff. Non-negotiable on weekend sessions.",
          variations: [],
        },
        {
          name: "Foam rolling (weekends)",
          tag: "",
          sets: "1",
          reps: "10–15 min",
          rest: "—",
          note: "Sunday especially. Full body foam roll reduces DOMS and preps you for Monday gym.",
          variations: [],
        },
      ],
    },
  ],
};

const mealPlan = {
  tdee: "~2,600–2,700 kcal",
  target: "~2,350–2,400 kcal/day",
  deficit: "~250–300 kcal below maintenance",
  macros: { protein: "155–165g", carbs: "260–280g", fat: "60–70g" },
  note: "Gentle 250–300 kcal deficit from your TDEE of ~2,650. This gives 0.25–0.4 kg fat loss per week — slow and sustainable. Crash dieting kills metabolism and muscle mass. Your carbs are kept HIGHER than most plans because you're lifting 4x/week + badminton 4x/week. You need fuel.",
  dalRotation: [
    {
      day: "Monday",
      dal: "Moong Dal (yellow, split)",
      protein: "~24g/cup",
      why: "Lightest and easiest to digest. Best post-gym when gut is tired from training. High in zinc.",
      cook: "Pressure cook 2 whistles. Tadka: ghee + jeera + hing + haldi + tomato + ginger. Finish with coriander.",
    },
    {
      day: "Tuesday",
      dal: "Rajma (kidney beans)",
      protein: "~29g/cup",
      why: "Highest protein of all dals. Also supports natural creatine synthesis via arginine. Classic Tue/Fri staple.",
      cook: "Soak overnight mandatory. Pressure cook 4–5 whistles. Thick gravy: onion + tomato + chole masala + garam masala.",
    },
    {
      day: "Wednesday",
      dal: "Masoor Dal (red lentils)",
      protein: "~26g/cup",
      why: "Cooks fastest — 15 min, no soaking needed. High iron + folate. Good on badminton day when time is short.",
      cook: "No soaking. 2 whistles. Tadka: mustard seeds + curry leaves + dried red chilli + tomato. Simple and quick.",
    },
    {
      day: "Thursday",
      dal: "Chana Dal (split chickpea)",
      protein: "~27g/cup",
      why: "Lowest glycemic index of all dals — blood sugar stays stable all afternoon. Good for sustained focus.",
      cook: "Soak 1 hour. 3 whistles. Works as dal or dry fry. Amchur at end adds flavour without extra calories.",
    },
    {
      day: "Friday",
      dal: "Mix Dal (moong + masoor + toor, equal parts)",
      protein: "~25g/cup",
      why: "Combining dals = complete amino acid profile. All essential amino acids covered in one bowl.",
      cook: "Equal parts. 2 whistles. Simple tadka: ghee + jeera + haldi + tomato + green chilli. Most nutritious option.",
    },
    {
      day: "Saturday",
      dal: "Toor Dal (arhar)",
      protein: "~22g/cup",
      why: "Classic comfort dal. Rich in B vitamins + phosphorus. Great for weekend recovery.",
      cook: "3 whistles. Tadka: ghee + jeera + hing + tomato + amchur for tanginess. Can make it thinner on rest days.",
    },
    {
      day: "Sunday",
      dal: "Chole (whole chickpeas)",
      protein: "~20g/cup",
      why: "Highest fibre of all — excellent gut health. Long satiety. Good for active recovery Sunday.",
      cook: "Soak overnight mandatory. 5–6 whistles. Bhature is optional — stick to kulcha or rotis on recomp.",
    },
  ],
  sabziRotation: [
    {
      day: "Monday",
      sabzi: "Palak Paneer (or Palak Tofu)",
      why: "Spinach = highest magnesium (~78mg/cup) + iron + Vit K. Paneer = 18g protein/100g. Most nutritionally dense sabzi.",
      cook: "Blanch spinach 2 min, blend smooth. Cook with paneer cubes 5 min. Use dahi instead of cream — same texture, less fat.",
      seasons: {
        available: "Winter (Oct–Mar) — peak season, use freely",
        summer:
          "🌞 Summer/Monsoon (Apr–Sep): Palak unavailable or wilted. Replace with → Tinda + Paneer (tinda sabzi with paneer cubes) OR Kaddu + Paneer (pumpkin) OR Paneer Bhurji with any available veg. Keep paneer in all cases — that's the protein.",
      },
    },
    {
      day: "Tuesday",
      sabzi: "Bhindi (Okra) Masala — dry",
      why: "Very low calorie (35 kcal/100g) but high zinc + magnesium. Good on upper pull day. High fibre.",
      cook: "Dry preparation only — no gravy. Mustard seeds + onion + tomato + amchur. Don't cover while cooking — keeps crispy.",
      seasons: {
        available:
          "Summer + Monsoon (Apr–Sep) — peak season, best availability",
        winter:
          "❄️ Winter (Oct–Mar): Bhindi out of season, expensive and limp. Replace with → Gobhi + Matar (cauliflower + peas, 5g protein from peas) OR Gajar Matar (carrots + peas) OR Beans Sabzi (French beans, high fibre).",
      },
    },
    {
      day: "Wednesday",
      sabzi: "Methi Sabzi (fresh fenugreek leaves)",
      why: "Methi = extremely high magnesium + iron + reduces inflammation. Great on badminton day.",
      cook: "Fresh methi leaves, roughly chopped. Light tadka: jeera + onion + garlic + tomato. 8 min max — don't overcook.",
      seasons: {
        available: "Winter (Oct–Mar) — peak season",
        summer:
          "🌞 Summer/Monsoon (Apr–Sep): Fresh methi unavailable. Replace with → Tori (ridge gourd) sabzi — similar anti-inflammatory properties, very light, 94% water. OR Karela (bitter gourd) — high chromium, controls blood sugar well on active badminton days. OR Raw Papaya sabzi.",
      },
    },
    {
      day: "Thursday",
      sabzi: "Gobhi + Matar (cauliflower + peas)",
      why: "Cauliflower: Vit C + B6 + folate. Peas: 5g protein per half cup + iron. Good carb source.",
      cook: "Dry sabzi. Jeera + onion + ginger-garlic + tomato + standard masalas. Finish with coriander.",
      seasons: {
        available: "Winter (Oct–Mar) — peak season",
        summer:
          "🌞 Summer/Monsoon (Apr–Sep): Gobhi and fresh matar both unavailable. Replace with → Arbi (colocasia/taro) sabzi — earthy, filling, good complex carbs. OR Kathal (raw jackfruit) dry sabzi — meaty texture, decent fibre. OR Tinda + Matar (frozen peas are fine year-round).",
      },
    },
    {
      day: "Friday",
      sabzi: "Baingan Bharta (roasted brinjal)",
      why: "Brinjal = 25 kcal/100g — filling but very low calorie. High in nasunin (antioxidant).",
      cook: "Roast whole baingan directly on gas flame until charred. Peel, mash. Tadka: mustard seeds + onion + tomato + green chilli.",
      seasons: {
        available:
          "Year-round ✅ — baingan is available all 12 months in Gurgaon. No swap needed.",
        winter:
          "❄️ Winter bonus: Add a handful of fresh matar into the bharta for extra protein.",
      },
    },
    {
      day: "Saturday",
      sabzi: "Lauki (bottle gourd) + Chana",
      why: "Lauki = 96% water — perfect hydration recovery. Full rest day so light digestion is ideal.",
      cook: "Cubed lauki + soaked chana together in pressure cooker. Light jeera + tomato tadka. Add dahi at end.",
      seasons: {
        available:
          "Summer + Monsoon (Apr–Sep) — peak season, cheapest and freshest",
        winter:
          "❄️ Winter (Oct–Mar): Lauki gets expensive and dry. Replace with → Sarson ka Saag (mustard greens) — winter superfood, extremely high iron + calcium. OR Gajar Halwa (small portion, rest day treat). OR Palak + Chana — spinach replaces lauki, keeps the chana protein.",
      },
    },
    {
      day: "Sunday",
      sabzi: "Shimla Mirch + Paneer Bhurji",
      why: "Capsicum = highest Vit C of any Indian sabzi. Paneer bhurji = 22g protein, 10 min prep.",
      cook: "Crumble paneer. Cook with onion + capsicum + tomato + haldi + red chilli. One pan, 10 min.",
      seasons: {
        available:
          "Year-round ✅ — capsicum available all 12 months. Paneer always available. No swap needed.",
        winter:
          "❄️ Winter bonus: Add chopped spinach or methi into the bhurji for extra micronutrients.",
      },
    },
  ],
  meals: [
    {
      label: "Pre-Workout Shake (07:40)",
      icon: "🥤",
      color: "#e8ff47",
      items: [
        "2 ripe bananas",
        "1.5 scoops whey protein (37g protein) — mix into shake",
        "3 tbsp rolled oats — blend in, gives sustained energy",
        "300ml low-fat milk",
        "1 tsp peanut butter",
        "1 tbsp ground flaxseeds (alsi) — grind DRY in mixer, do NOT soak. Add to shake after grinding. Soaking makes them slimy and unusable in shake.",
        "5g creatine powder (1 level tsp) — tasteless, dissolves fully",
        "→ BUY: AS-IT-IS or ON Micronised Creatine, unflavoured — Amazon India ~₹900/250g",
        "~560 kcal | 65g carbs | 46g protein | 14g fat",
      ],
      why: "Everything in one shake — whey, creatine, omega-3, oats. Zero extra tracking. Creatine is tasteless and odourless, you will not notice it. Takes 3–4 weeks to saturate muscles. Take every day including rest days — consistency beats timing.",
    },
    {
      label: "Post-Workout (09:55 — at gym)",
      icon: "🥛",
      color: "#47ff8a",
      items: [
        "1 scoop whey in 300ml water — carry dry powder in shaker",
        "1 small banana or 5 dates",
        "Drink BEFORE showering — within 20 min of last set",
        "~230 kcal | 28g protein | 25g carbs",
      ],
      why: "Muscle protein synthesis peaks 20–30 min post-workout. Don't wait until office (11:00+). Mix, drink, then shower. Two minutes.",
    },
    {
      label: "Lunch (14:00) — BIGGEST MEAL",
      icon: "🍱",
      color: "#47b8ff",
      items: [
        "2 whole wheat rotis OR 1 cup brown rice / quinoa",
        "1 cup dal — see Dal Rotation below ↓",
        "100g paneer OR 150g tofu (sautéed, not fried)",
        "1 cup sabzi — see Sabzi Rotation below ↓",
        "150g dahi (room temp, not cold from fridge)",
        "Salad: cucumber + tomato + onion + lemon + chaat masala",
        "With lunch: 5 soaked walnuts (soak overnight 6–8 hrs — removes tannins, improves omega-3 bioavailability)",
        "~640 kcal | 50g protein | 70g carbs",
      ],
      why: "Dal + paneer/tofu = complete amino acid profile. Walnuts with lunch = second omega-3 hit, habit-free. Dahi at room temp digests better and has more active probiotics than cold curd.",
    },
    {
      label: "Pre-Badminton Snack (17:00) — Tue, Wed, Thu, Sun only",
      icon: "⚡",
      color: "#ff9447",
      items: [
        "150g Greek yogurt / hung curd + 1 tsp honey",
        "1 banana OR 1 cup roasted makhana",
        "~270 kcal | 18g protein | 38g carbs",
        "Eat at 17:00 sharp — exactly 90 min before court",
        "On non-badminton days (Mon/Wed/Fri): skip this, have 10 almonds if hungry",
      ],
      why: "90 min timing is deliberate — carbs are in bloodstream by court time without heaviness. Eating closer = cramps. Makhana is better than chips or biscuits — same crunch, 4x the protein.",
    },
    {
      label: "Dinner (21:15) — LIGHTER",
      icon: "🍽️",
      color: "#c47aff",
      items: [
        "1–2 ragi rotis (preferred) OR whole wheat rotis — ragi = highest magnesium flour",
        "1 cup greens sabzi — spinach/methi/lauki per rotation",
        "1 bowl lighter dal — moong / masoor / toor (not rajma/chole at night — too heavy)",
        "150g dahi",
        "AFTER DINNER — Magnesium Stack: 30g soaked pumpkin seeds + 10–12 soaked almonds + 5 soaked walnuts",
        "→ SOAK TONIGHT for tomorrow: pumpkin seeds (4–8 hrs) + almonds (8 hrs overnight) + walnuts (6–8 hrs). Soaking removes phytic acid which BLOCKS magnesium + mineral absorption. Dry seeds = ~40% less absorption. Keep in a small bowl of water in fridge.",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Pumpkin seeds + almonds after dinner = full magnesium replacement, no pill needed. Ragi roti is the single best swap in this plan — swap one wheat roti for ragi every day. Also: SUNLIGHT for Vit D — 15 min morning sun on arms before 9am, 5x/week. Sun-treat mushrooms gills-up for 45 min before cooking 3x/week.",
    },
  ],
  calorieCycling: [
    {
      day: "Gym Day (Mon/Tue/Thu/Fri)",
      cal: "~2,400 kcal",
      note: "Near maintenance — fuel the workout and recovery",
    },
    {
      day: "Badminton Only (Wed/Sat/Sun)",
      cal: "~2,200 kcal",
      note: "Slightly lower — active but no resistance training",
    },
    {
      day: "Full Rest Day",
      cal: "~2,000 kcal",
      note: "Rare — just drop the pre-workout shake",
    },
  ],
  supplements: [
    {
      name: "Whey Protein ✅ Keep",
      timing: "Pre-workout shake (07:40) + Post-workout (09:55)",
      dose: "2.5 scoops/day",
      canReplace: true,
      foodAlt:
        "Whey is just concentrated milk protein — your parents likely won't object to this. If they do: add 250g paneer + extra dal + 200ml milk to replace 1 scoop.",
    },
    {
      name: "Creatine Monohydrate ✅ Added Back",
      timing:
        "In pre-workout shake (07:40) — just mix 5g into shake, tasteless",
      dose: "5g/day, every single day",
      canReplace: true,
      foodAlt:
        "BUY: AS-IT-IS Nutrition Creatine Monohydrate or Optimum Nutrition (ON) Micronised Creatine — both unflavoured, pure, third-party tested. Available on Amazon India. ~₹800–1,200 for 250g (50 days supply). Mix 1 level teaspoon (5g) into your morning shake — completely tasteless and odourless. Take every day including rest days — consistency matters more than timing. Takes 3–4 weeks to feel the effect (muscles saturate gradually). No loading phase needed — just 5g/day from day 1.",
    },
    {
      name: "Vitamin D3 ✅ Fully Replaceable",
      timing: "Morning sunlight + sun-treated mushrooms",
      dose: "~600–800 IU achievable",
      canReplace: true,
      foodAlt:
        "1. SUNLIGHT: 15–20 min direct sun on arms/face before 9am, 5x/week — your skin makes D3 directly. 2. MUSHROOMS: Place button/oyster mushrooms gills-up in direct sunlight for 45–60 min before cooking — 100g gives 300–400 IU. Do this 3–4x/week. 3. FORTIFIED MILK: 2 glasses/day. 4. Add ghee or peanut butter with every meal — Vit D is fat-soluble, needs fat to absorb.",
    },
    {
      name: "Magnesium ✅ Fully Replaceable",
      timing: "Pumpkin seeds + almonds after dinner",
      dose: "Target 340mg/day",
      canReplace: true,
      foodAlt:
        "MAGNESIUM EVENING STACK (eat after dinner for sleep benefit): 30g pumpkin seeds = 150mg. 10–12 almonds = 80mg. 1 cup spinach sabzi at dinner = 78mg. 1 ragi roti instead of wheat roti = 70mg. Dal at every meal + whole wheat rotis covers the rest. Total from above: ~380mg — meets the full daily target without any pill.",
    },
    {
      name: "Omega-3 ✅ Replaceable",
      timing: "Add to morning shake daily",
      dose: "2 tbsp flaxseeds + 5 walnuts",
      canReplace: true,
      foodAlt:
        "1 tbsp ground flaxseeds (alsi) in your morning shake = 1.6g ALA omega-3. 5 walnuts daily = 2.5g ALA. IMPORTANT: grind flaxseeds before adding — whole seeds pass through undigested. Note: plant-based ALA converts to EPA/DHA at only 5–10% efficiency. Good enough for general health. Chia seeds (sabja) are also a good option.",
    },
    {
      name: "Electrolytes ✅ Always food-based",
      timing: "During gym + badminton",
      dose: "Pinch salt + lemon in 500ml water",
      canReplace: true,
      foodAlt:
        "Already food-based. On badminton days: 1 glass coconut water after playing = natural electrolytes + potassium. Works better than most commercial sports drinks.",
    },
  ],
  avoid: [
    "Maida / refined flour (white bread, samosas, biscuits, namkeen) — swap to whole wheat always",
    "Fruit juices — eat whole fruit instead. Juice = sugar without fibre",
    "Eating dinner after 22:00 — digestion disrupts sleep quality",
    "Skipping the post-workout shake — the most common and costly mistake",
    "Alcohol — empty calories + kills testosterone + destroys sleep architecture",
    "Packaged 'healthy' snacks (protein bars, granola bars) — most are 40%+ sugar",
    "Under-eating (below 2,000 kcal) — slows metabolism and destroys muscle",
  ],
};

const sleepProtocol = [
  {
    time: "16:00",
    action: "Last caffeinated drink",
    why: "Caffeine half-life is 5–6 hours. Coffee at 4pm = half still active at 10pm. Switch to herbal tea or water after this.",
    icon: "☕",
  },
  {
    time: "22:00",
    action: "Dim all lights in the room",
    why: "Overhead lighting suppresses melatonin. Use a bedside lamp only. Your brain reads bright light as 'daytime'.",
    icon: "💡",
  },
  {
    time: "22:15",
    action: "Stop social media and news",
    why: "Doom scrolling raises cortisol. A 2025 study found each hour of screen time in bed raises insomnia risk by 59%. Reels are the worst offender.",
    icon: "📱",
  },
  {
    time: "22:30",
    action: "📵 PHONE ON CHARGER — NOT IN BEDROOM",
    why: "People with phones in their bedroom sleep 45 min less per night on average. Alarm on phone is fine — just put it on the far side of the room so you have to get up.",
    icon: "🔌",
  },
  {
    time: "22:30",
    action: "Read a physical book for 30 min",
    why: "Activates a different (slower) brain circuit than screens. Fiction is best — absorbing but not stimulating. Non-fiction about work = bad choice.",
    icon: "📖",
  },
  {
    time: "22:45",
    action: "Magnesium Glycinate 300mg",
    why: "Clinically shown to reduce time to fall asleep and improve sleep depth. Not habit-forming. Take with a small sip of water.",
    icon: "💊",
  },
  {
    time: "23:00",
    action: "Lights out. Non-negotiable.",
    why: "23:00 → 07:30 = 7.5 hrs = exactly 5 complete 90-min sleep cycles. This is where recovery, muscle building, fat loss, and hormones happen. Sleep is the most anabolic thing you can do.",
    icon: "😴",
  },
  {
    time: "07:30",
    action: "Wake up. ZERO snooze.",
    why: "Snooze fragmented sleep actually increases grogginess (sleep inertia). One alarm. Stand up immediately. Cold water on face.",
    icon: "⏰",
  },
  {
    time: "07:31",
    action: "Sunlight within 5 minutes",
    why: "Morning sunlight (even cloudy) resets your circadian clock, raises cortisol (good — this is your wake signal), and improves mood and energy all day. Open the window or step outside for 2 min.",
    icon: "🌞",
  },
];

const stats = {
  current: {
    Weight: "86–90 kg",
    Height: "183 cm",
    "Body Fat": "23–25%",
    "Muscle Mass": "~33 kg",
    BMI: "~26–27",
    TDEE: "~2,650 kcal",
  },
  targets: {
    Weight: "78–82 kg",
    "Body Fat": "14–16%",
    "Muscle Mass": "38–40 kg",
    Timeline: "10–14 months",
  },
  weeklyTargets: [
    {
      metric: "Fat loss rate",
      target: "0.3–0.4 kg/week",
      why: "Slow enough to preserve muscle and keep metabolism healthy",
    },
    {
      metric: "Protein daily",
      target: "155–165g",
      why: "~1.8g/kg bodyweight — the recomposition sweet spot",
    },
    {
      metric: "Gym sessions",
      target: "4x/week",
      why: "Every muscle hit twice a week = maximum stimulus",
    },
    {
      metric: "Badminton",
      target: "3–4x/week",
      why: "Cardio + athleticism + enjoyment = sustainable",
    },
    {
      metric: "Sleep",
      target: "7.5 hrs",
      why: "Non-negotiable. Sleep less = more fat, less muscle",
    },
    {
      metric: "Water",
      target: "3–3.5L/day",
      why: "Gym + badminton + Gurgaon summer = you need more than you think",
    },
  ],
  milestones: [
    {
      week: "1–2",
      goal: "Establish the routine. Don't miss gym. Hit protein target. Nothing else matters yet.",
    },
    {
      week: "3–4",
      goal: "Add creatine. Weight may go up 0.5–1kg (water in muscles) — that's a good sign, not fat.",
    },
    {
      week: "5–8",
      goal: "Strength increases noticeably on compounds. This is your signal the plan is working.",
    },
    {
      week: "9–12",
      goal: "First visible mirror change. Waist measurement drops. Arms and chest fuller.",
    },
    {
      week: "13–26",
      goal: "Significant recomposition. Reassess calories — your TDEE rises as you build muscle.",
    },
    {
      week: "26+",
      goal: "Maintenance phase. Higher calories. New baseline. The body you built is now easy to keep.",
    },
  ],
  trackingTips: [
    "Weigh yourself Mon + Wed + Fri morning, after bathroom, before food. Use the 3-day average — not single readings.",
    "Take front/side/back photos monthly. Same lighting, same time of day. Photos don't lie like the mirror does.",
    "Log every gym set in Notes app. Progressive overload IS the progress — if your lifts go up, your body is changing.",
    "Measure waist at navel every 2 weeks. This number dropping = fat loss even when the scale stalls.",
    "Notice: energy levels, sleep quality, mood, how clothes fit. These improve before the scale moves.",
  ],
};

function TagBadge({ type }: { type: string }) {
  const map = {
    sleep: { bg: "#1a1a3a", text: "#6a6aff", label: "SLEEP" },
    health: { bg: "#1a3a1a", text: "#47ff8a", label: "HEALTH" },
    food: { bg: "#3a1a00", text: "#ff9447", label: "FOOD" },
    work: { bg: "#1a2a3a", text: "#47b8ff", label: "WORK" },
    gym: { bg: "#3a1a1a", text: "#ff4747", label: "GYM" },
    water: { bg: "#001a2a", text: "#00ccff", label: "💧 WATER" },
  };
  const s =
    (map as Record<string, { bg: string; text: string; label: string }>)[
      type
    ] || map.health;
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.text,
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: 4,
        letterSpacing: 1,
      }}
    >
      {s.label}
    </span>
  );
}

function ExerciseTag({ tag }: { tag: string }) {
  if (!tag) return null;
  const isCompound = tag.startsWith("COMPOUND");
  const isHealth = tag.includes("health");
  return (
    <span
      style={{
        background: isCompound ? "#2a1a00" : "#1a1a2a",
        color: isCompound ? COLORS.orange : COLORS.blue,
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 6px",
        borderRadius: 4,
        letterSpacing: 0.5,
        flexShrink: 0,
      }}
    >
      {tag}
    </span>
  );
}

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const tabStyle = (i: number) => ({
    padding: "9px 13px",
    fontSize: 12,
    fontWeight: activeTab === i ? 700 : 500,
    color: activeTab === i ? COLORS.bg : COLORS.textDim,
    background: activeTab === i ? COLORS.accent : "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, sans-serif",
        color: COLORS.text,
        padding: "20px 16px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            💪
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>
              VAIBHAV'S TRANSFORMATION PLAN
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>
              27M · 183cm · 86–90kg · 23–25% BF · Vegetarian · Gurgaon · June
              2026
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#1a1a00",
            border: `1px solid ${COLORS.accentDim}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            color: COLORS.accent,
            lineHeight: 1.6,
          }}
        >
          🎯 Goal: Body recomposition — slow fat loss (0.3–0.4 kg/week), build
          muscle, raise metabolism. 10–14 months. No crash dieting.
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 22,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {(tabs as any[]).map((t: any, i: number) => (
          <button key={i} style={tabStyle(i)} onClick={() => setActiveTab(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB: SCHEDULE */}
      {activeTab === 0 && (
        <div>
          <div
            style={{
              fontSize: 11,
              color: COLORS.muted,
              marginBottom: 16,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Your optimised daily routine
          </div>
          {(scheduleData as any[]).map((item: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
              <div style={{ minWidth: 52, textAlign: "right", paddingTop: 10 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: COLORS.accent,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.time}
                </div>
              </div>
              <div
                style={{
                  width: 2,
                  background: COLORS.cardBorder,
                  borderRadius: 1,
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS.accent,
                    position: "absolute",
                    top: 12,
                    left: -3,
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {item.label}
                  </span>
                  <TagBadge type={item.type} />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textDim,
                    lineHeight: 1.6,
                  }}
                >
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: WORKOUT */}
      {activeTab === 1 && (
        <div>
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.accent,
                marginBottom: 4,
              }}
            >
              🏆 {workoutPlan.split}
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}
            >
              {workoutPlan.note}
            </div>
          </div>

          {/* Week template */}
          <div
            style={{
              fontSize: 11,
              color: COLORS.muted,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            📅 Weekly Template
          </div>
          {(workoutPlan.weekTemplate as any[]).map((d: any, i: number) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 8,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: 40,
                  background: COLORS.cardBorder,
                  borderRadius: 6,
                  padding: "4px 0",
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  color: COLORS.accent,
                }}
              >
                {d.day}
              </div>
              <div
                style={{
                  flex: 1,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: d.gymColor }}
                  >
                    {d.gym}
                  </span>
                  <span style={{ fontSize: 11, color: COLORS.muted }}>·</span>
                  <span style={{ fontSize: 11, color: COLORS.textDim }}>
                    {d.badminton}
                  </span>
                </div>
                <div
                  style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.5 }}
                >
                  {d.note}
                </div>
              </div>
            </div>
          ))}

          {/* Mesocycle note */}
          <div
            style={{
              background: "#1a1500",
              border: "1px solid #3a3000",
              borderRadius: 10,
              padding: 12,
              margin: "16px 0",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#ffcc00",
                marginBottom: 6,
              }}
            >
              📈 HOW VARIATIONS WORK (Every 4 Weeks)
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.7 }}
            >
              {workoutPlan.mesocycleNote}
            </div>
          </div>

          <div
            style={{
              background: "#001a0a",
              border: "1px solid #003a14",
              borderRadius: 10,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.green,
                marginBottom: 6,
              }}
            >
              📈 PROGRESSIVE OVERLOAD — The only thing that actually builds
              muscle
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.7 }}
            >
              Every 1–2 weeks: add 2.5–5kg to the bar, OR do 1 more rep, OR
              reduce rest by 10 seconds. Log every set. Muscle confusion is a
              marketing myth — muscles respond to measurable stress, not
              novelty. Keep your compounds the same for months.
            </div>
          </div>

          <div
            style={{
              fontSize: 11,
              color: COLORS.muted,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            🏋️ Tap day to see exercises + variations
          </div>
          {(workoutPlan.days as any[]).map((day: any, i: number) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 10,
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderLeft: `4px solid ${day.color}`,
                }}
                onClick={() => setExpandedDay(expandedDay === i ? null : i)}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: COLORS.muted,
                      marginBottom: 2,
                      letterSpacing: 1,
                    }}
                  >
                    {day.day.toUpperCase()}
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: day.color }}
                  >
                    {day.type}
                  </div>
                  {day.compounds ? (
                    <div
                      style={{
                        fontSize: 10,
                        color: COLORS.muted,
                        marginTop: 2,
                      }}
                    >
                      🔒 {day.compounds}
                    </div>
                  ) : null}
                </div>
                <div style={{ fontSize: 18, color: COLORS.muted }}>
                  {expandedDay === i ? "▲" : "▼"}
                </div>
              </div>
              {expandedDay === i && (
                <div style={{ padding: "0 16px 16px" }}>
                  {(day.exercises as any[]).map((ex: any, j: number) => {
                    const exKey = `${i}-${j}`;
                    return (
                      <div
                        key={j}
                        style={{
                          borderTop: `1px solid ${COLORS.cardBorder}`,
                          paddingTop: 10,
                          marginTop: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 4,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                marginBottom: 3,
                              }}
                            >
                              {ex.name}
                            </div>
                            {ex.tag && <ExerciseTag tag={ex.tag} />}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexShrink: 0,
                              marginLeft: 8,
                              flexWrap: "wrap",
                              justifyContent: "flex-end",
                            }}
                          >
                            {ex.sets !== "—" && (
                              <span
                                style={{
                                  background: "#2a2a00",
                                  color: COLORS.accent,
                                  fontSize: 11,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  fontWeight: 700,
                                }}
                              >
                                {ex.sets}×
                              </span>
                            )}
                            <span
                              style={{
                                background: "#1a2a1a",
                                color: COLORS.green,
                                fontSize: 11,
                                padding: "2px 6px",
                                borderRadius: 4,
                                fontWeight: 700,
                              }}
                            >
                              {ex.reps}
                            </span>
                            {ex.rest !== "—" && (
                              <span
                                style={{
                                  background: "#1a1a2a",
                                  color: COLORS.blue,
                                  fontSize: 11,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                }}
                              >
                                {ex.rest}
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: COLORS.muted,
                            fontStyle: "italic",
                            marginTop: 4,
                          }}
                        >
                          💬 {ex.note}
                        </div>
                        {ex.variations && ex.variations.length > 0 && (
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                color: COLORS.orange,
                                marginTop: 6,
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                              onClick={() =>
                                setExpandedExercise(
                                  expandedExercise === exKey ? null : exKey
                                )
                              }
                            >
                              🔄 {expandedExercise === exKey ? "Hide" : "Show"}{" "}
                              4-week variations
                            </div>
                            {expandedExercise === exKey && (
                              <div
                                style={{
                                  marginTop: 6,
                                  paddingLeft: 8,
                                  borderLeft: `2px solid ${COLORS.orange}`,
                                }}
                              >
                                {(ex.variations as any[]).map(
                                  (v: any, k: number) => (
                                    <div
                                      key={k}
                                      style={{
                                        fontSize: 11,
                                        color: COLORS.textDim,
                                        marginBottom: 4,
                                      }}
                                    >
                                      • {v}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: MEALS */}
      {activeTab === 2 && (
        <div>
          {/* Calorie reality check */}
          <div
            style={{
              background: "#1a0a00",
              border: "1px solid #3a1500",
              borderRadius: 10,
              padding: 14,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.orange,
                marginBottom: 8,
              }}
            >
              ⚠️ Calorie Reality Check — Why This Plan Isn't Low Cal
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {[
                { label: "Your TDEE", val: mealPlan.tdee, col: COLORS.textDim },
                {
                  label: "Target intake",
                  val: mealPlan.target,
                  col: COLORS.accent,
                },
                {
                  label: "Daily deficit",
                  val: mealPlan.deficit,
                  col: COLORS.green,
                },
              ].map((m: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.card,
                    borderRadius: 8,
                    padding: "8px 12px",
                    flex: "1 1 28%",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: COLORS.muted,
                      marginBottom: 2,
                    }}
                  >
                    {m.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: m.col }}>
                    {m.val}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.7 }}
            >
              {mealPlan.note}
            </div>
          </div>

          {/* Macros */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Protein",
                val: mealPlan.macros.protein,
                col: COLORS.green,
              },
              { label: "Carbs", val: mealPlan.macros.carbs, col: COLORS.blue },
              { label: "Fat", val: mealPlan.macros.fat, col: COLORS.orange },
            ].map((m: any, i: number) => (
              <div
                key={i}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  flex: "1 1 28%",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: COLORS.muted,
                    letterSpacing: 1,
                    marginBottom: 2,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: m.col }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          {/* Meals */}
          {(mealPlan.meals as any[]).map((meal: any, i: number) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderLeft: `4px solid ${meal.color}`,
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                {meal.icon} {meal.label}
              </div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {meal.items.map((item: any, j: number) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 12,
                      color: COLORS.textDim,
                      marginBottom: 4,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: meal.color,
                  background: `${meal.color}15`,
                  padding: "6px 10px",
                  borderRadius: 6,
                  lineHeight: 1.6,
                }}
              >
                🧠 {meal.why}
              </div>
            </div>
          ))}

          {/* Dal Rotation */}
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              🫘 Dal Rotation — One Per Day
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              Rotating dals weekly gives you different proteins, amino acids,
              and micronutrients. Never eat the same dal every day.
            </div>
            {(mealPlan.dalRotation as any[]).map((d: any, i: number) => (
              <div
                key={i}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderLeft: `4px solid ${COLORS.orange}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {d.day}: {d.dal}
                  </div>
                  <span
                    style={{
                      background: "#2a1a00",
                      color: COLORS.orange,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 4,
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {d.protein}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.textDim,
                    marginBottom: 6,
                    lineHeight: 1.5,
                  }}
                >
                  💡 {d.why}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.muted,
                    background: "#1a1200",
                    padding: "6px 8px",
                    borderRadius: 6,
                    lineHeight: 1.6,
                  }}
                >
                  🍳 {d.cook}
                </div>
              </div>
            ))}
          </div>

          {/* Sabzi Rotation */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              🥬 Sabzi Rotation — One Per Day
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              Each sabzi chosen for specific nutritional purpose. Seasonal swaps
              shown below each — use whatever is fresh and available in the
              market.
            </div>
            {(mealPlan.sabziRotation as any[]).map((s: any, i: number) => (
              <div
                key={i}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderLeft: `4px solid ${COLORS.green}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
                  {s.day}: {s.sabzi}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.textDim,
                    marginBottom: 6,
                    lineHeight: 1.5,
                  }}
                >
                  💡 {s.why}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.muted,
                    background: "#001a00",
                    padding: "6px 8px",
                    borderRadius: 6,
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}
                >
                  🍳 {s.cook}
                </div>
                {s.seasons && (
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: COLORS.green,
                        background: "#001a00",
                        padding: "5px 8px",
                        borderRadius: 6,
                        marginBottom: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      ✅ {s.seasons.available}
                    </div>
                    {s.seasons.summer && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#ffcc00",
                          background: "#1a1200",
                          padding: "5px 8px",
                          borderRadius: 6,
                          marginBottom: 4,
                          lineHeight: 1.6,
                        }}
                      >
                        {s.seasons.summer}
                      </div>
                    )}
                    {s.seasons.winter && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#88ccff",
                          background: "#001020",
                          padding: "5px 8px",
                          borderRadius: 6,
                          lineHeight: 1.6,
                        }}
                      >
                        {s.seasons.winter}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Calorie cycling */}
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              🔄 Calorie Cycling by Day Type
            </div>
            {(mealPlan.calorieCycling as any[]).map((c: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: COLORS.accent,
                    color: COLORS.bg,
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                    minWidth: 60,
                    textAlign: "center",
                  }}
                >
                  {c.cal}
                </div>
                <div
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 8,
                    padding: "8px 12px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}
                  >
                    {c.day}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>
                    {c.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Avoid */}
          <div
            style={{
              marginTop: 20,
              background: "#1a0000",
              border: "1px solid #3a0000",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.red,
                marginBottom: 10,
              }}
            >
              🚫 AVOID (These kill progress)
            </div>
            {(mealPlan.avoid as any[]).map((a: any, i: number) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  color: COLORS.textDim,
                  marginBottom: 7,
                  display: "flex",
                  gap: 8,
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: COLORS.red, flexShrink: 0 }}>✗</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SLEEP */}
      {activeTab === 3 && (
        <div>
          <div
            style={{
              background: "#0a0a1a",
              border: "1px solid #1a1a3a",
              borderRadius: 10,
              padding: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6a6aff",
                marginBottom: 6,
              }}
            >
              😴 Sleep is where you actually build muscle and lose fat
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.7 }}
            >
              You can train perfectly and eat perfectly — but sleeping 5–6 hours
              cuts your results by ~40%. Growth hormone, testosterone, and
              muscle protein synthesis all peak during deep sleep. Target:{" "}
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>
                23:00 → 07:30 = 7.5 hours = 5 full sleep cycles
              </span>
              .
            </div>
          </div>
          {(sleepProtocol as any[]).map((item: any, i: number) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12,
                display: "flex",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: COLORS.accent,
                    }}
                  >
                    {item.time}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {item.action}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textDim,
                    lineHeight: 1.6,
                  }}
                >
                  {item.why}
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              background: "#1a0a00",
              border: "1px solid #3a1a00",
              borderRadius: 10,
              padding: 14,
              marginTop: 4,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.orange,
                marginBottom: 8,
              }}
            >
              📚 Books for Night Reading (Start with These)
            </div>
            {[
              "Atomic Habits — James Clear (literally about building this exact system you're starting)",
              "Shoe Dog — Phil Knight (engaging non-fiction, no stress before bed)",
              "A Man Called Ove — Fredrik Backman (light fiction, absorbing)",
              "The Psychology of Money — Morgan Housel (short chapters, perfect for before bed)",
            ].map((b: any, i: number) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  color: COLORS.textDim,
                  marginBottom: 7,
                  display: "flex",
                  gap: 8,
                }}
              >
                <span style={{ color: COLORS.orange, flexShrink: 0 }}>→</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: GOALS */}
      {activeTab === 4 && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.muted,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                📍 Right Now
              </div>
              {Object.entries(stats.current).map(([k, v]: [string, any]) => (
                <div key={k} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: COLORS.muted,
                      marginBottom: 1,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: COLORS.red }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.muted,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                🎯 Target
              </div>
              {Object.entries(stats.targets).map(([k, v]: [string, any]) => (
                <div key={k} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: COLORS.muted,
                      marginBottom: 1,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.green,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              fontSize: 11,
              color: COLORS.muted,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            📊 Weekly Targets
          </div>
          {(stats.weeklyTargets as any[]).map((t: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  background: COLORS.accent,
                  color: COLORS.bg,
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 800,
                  flexShrink: 0,
                  alignSelf: "flex-start",
                }}
              >
                {t.target}
              </div>
              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  flex: 1,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
                  {t.metric}
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{t.why}</div>
              </div>
            </div>
          ))}

          <div
            style={{
              fontSize: 11,
              color: COLORS.muted,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 12,
              marginTop: 20,
            }}
          >
            📅 Milestone Timeline
          </div>
          {(stats.milestones as any[]).map((m: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  background: COLORS.accent,
                  color: COLORS.bg,
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 10,
                  fontWeight: 800,
                  alignSelf: "flex-start",
                  flexShrink: 0,
                  minWidth: 52,
                  textAlign: "center",
                }}
              >
                WK {m.week}
              </div>
              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  flex: 1,
                  fontSize: 12,
                  color: COLORS.textDim,
                  lineHeight: 1.6,
                }}
              >
                {m.goal}
              </div>
            </div>
          ))}

          <div
            style={{
              background: "#001a00",
              border: "1px solid #003a00",
              borderRadius: 10,
              padding: 14,
              marginTop: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.green,
                marginBottom: 10,
              }}
            >
              📏 How to Actually Track Progress
            </div>
            {(stats.trackingTips as any[]).map((tip: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 12,
                  color: COLORS.textDim,
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: COLORS.green,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}.
                </span>
                {tip}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#1a1500",
              border: "1px solid #3a3000",
              borderRadius: 10,
              padding: 14,
              marginTop: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#ffcc00",
                marginBottom: 8,
              }}
            >
              ⚠️ The Honest Truth
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.8 }}
            >
              At 23–25% body fat you're in the ideal zone for recomposition —
              your body can burn fat AND build muscle simultaneously. The first
              8 weeks feel slow. Months 4–9 are where you'll visibly transform.
              The biggest killer is{" "}
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>
                inconsistency, not imperfect execution
              </span>
              . A 70% plan done every single week beats a perfect plan done for
              3 weeks. Show up Monday.
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 32,
          textAlign: "center",
          fontSize: 10,
          color: COLORS.muted,
        }}
      >
        Built for Vaibhav · Gurgaon · June 2026 · Consult a physician before
        starting new supplements or exercise
      </div>
    </div>
  );
}
