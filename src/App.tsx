import { useState, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface SetLog {
  weight: string;
  reps: string;
  done: boolean;
}

interface ExerciseLog {
  [setIndex: number]: SetLog;
}

interface WorkoutDayLog {
  [exerciseKey: string]: ExerciseLog;
}

interface WorkoutLog {
  [dateKey: string]: WorkoutDayLog;
}

interface CalorieEntry {
  id: string;
  label: string;
  kcal: number;
  time: string;
}

interface CalorieLog {
  [dateKey: string]: CalorieEntry[];
}

interface SleepEntry {
  bedtime: string; // "23:00"
  wakeTime: string; // "07:30"
  quality: number; // 1–5
  notes: string;
}

interface SleepLog {
  [dateKey: string]: SleepEntry;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getTodayDayName(): string {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];
}

function loadLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ─── COLORS ───────────────────────────────────────────────────────────────────

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

const tabs = [
  "📅 Schedule",
  "🏋️ Workout",
  "🥗 Meals",
  "😴 Sleep",
  "📊 Goals",
  "🔥 Calories",
  "📋 Sets",
  "🌙 Sleep Log",
];

// ─── SCHEDULE DATA ────────────────────────────────────────────────────────────

const scheduleData = [
  {
    time: "07:30",
    label: "WAKE UP",
    detail:
      "No snooze. Open curtains — morning sunlight resets your circadian clock. Splash cold water on face.",
    type: "sleep",
    icon: "🌅",
  },
  {
    time: "07:35",
    label: "Hydrate First",
    detail:
      "400ml water immediately. You're dehydrated after 7+ hours of sleep. Do this before anything else.",
    type: "health",
    icon: "💧",
  },
  {
    time: "07:40",
    label: "Pre-Workout Power Shake",
    detail:
      "Blend: 2 bananas + 1.5 scoops whey + 3 tbsp oats + 300ml milk + 1 tsp peanut butter. ~550 kcal, 65g carbs, 45g protein. This is breakfast + pre-workout in one. Drink fast.",
    type: "food",
    icon: "🥤",
  },
  {
    time: "07:55",
    label: "Leave for Gym",
    detail:
      "Bag packed the night before. Carry: 1L water, shaker with dry post-workout scoop, earphones.",
    type: "work",
    icon: "🎧",
  },
  {
    time: "08:30",
    label: "GYM — Dynamic Warm-Up (5 min)",
    detail:
      "Never skip: arm circles, hip circles, bodyweight squats x10, leg swings. You've been asleep 1 hour ago — cold muscles = injury.",
    type: "gym",
    icon: "🔥",
  },
  {
    time: "08:35",
    label: "GYM — Main Session (75–80 min)",
    detail:
      "Per weekly split. Compounds first, accessories after. Log every set and weight in Notes app.",
    type: "gym",
    icon: "🏋️",
  },
  {
    time: "09:55",
    label: "Post-Workout Shake — AT GYM",
    detail:
      "Mix your dry scoop with water. Drink BEFORE showering. 20 min post-workout window = peak muscle protein synthesis. Don't skip.",
    type: "food",
    icon: "🥛",
  },
  {
    time: "10:00",
    label: "Shower at Gym",
    detail:
      "End with 30–60 sec cold water. Reduces DOMS, improves alertness before office.",
    type: "health",
    icon: "🚿",
  },
  {
    time: "11:00",
    label: "Office — Deep Work Block",
    detail:
      "Post-workout endorphin + focus window. Block meetings here if possible. No social media until 13:00.",
    type: "work",
    icon: "💻",
  },
  {
    time: "13:30",
    label: "Mid-Morning Snack (only if hungry)",
    detail:
      "10–12 almonds + 1 apple OR small bowl makhana. Skip entirely if you're not hungry — don't force calories.",
    type: "food",
    icon: "🍎",
  },
  {
    time: "14:00",
    label: "LUNCH — Biggest Meal",
    detail:
      "Full vegetarian meal. Eat away from desk — no screens. 20 min minimum. See Meals tab.",
    type: "food",
    icon: "🍱",
  },
  {
    time: "14:25",
    label: "Post-Lunch Walk",
    detail:
      "5–10 min walk outside or around office. Critical for blood sugar regulation and avoiding the 3pm crash.",
    type: "health",
    icon: "🚶",
  },
  {
    time: "17:00",
    label: "Pre-Badminton Snack",
    detail:
      "150g Greek yogurt + 1 banana OR 4 multigrain crackers + peanut butter. Eat at 17:00 sharp — 90 min before court is the sweet spot for sustained court energy.",
    type: "food",
    icon: "⚡",
  },
  {
    time: "18:50",
    label: "Leave Office",
    detail:
      "Drink 300ml water on the way. No coffee after 16:00 — it has a 5–6 hour half-life and will be in your bloodstream at midnight.",
    type: "work",
    icon: "🚗",
  },
  {
    time: "19:30",
    label: "BADMINTON (60 min)",
    detail:
      "Your cardio. Play hard. Electrolyte water: 500ml + pinch salt + lemon. On non-badminton evenings, this slot is full rest.",
    type: "gym",
    icon: "🏸",
  },
  {
    time: "20:30",
    label: "Post-Badminton Stretch",
    detail:
      "10 min non-negotiable — hip flexors, calves, hamstrings, rotator cuff. Badminton is brutal on ankles and knees. This is injury prevention.",
    type: "health",
    icon: "🧘",
  },
  {
    time: "21:15",
    label: "DINNER",
    detail:
      "Lighter than lunch. High protein, lower carbs. Finish by 21:45 latest. See Meals tab.",
    type: "food",
    icon: "🍽️",
  },
  {
    time: "22:00",
    label: "Wind-Down Begins",
    detail:
      "Dim all lights. Urgent messages OK but no reels/Twitter/news. Bright screens now = harder to fall asleep.",
    type: "sleep",
    icon: "🌙",
  },
  {
    time: "22:30",
    label: "📵 PHONE DOWN",
    detail:
      "Phone on charger outside the bedroom. Phone in bedroom = 45 min less sleep on average (clinical studies). Alarm is fine — just put it across the room.",
    type: "sleep",
    icon: "📵",
  },
  {
    time: "22:30",
    label: "Read for 30 min",
    detail:
      "Physical book or Kindle on warm mode. Fiction or light non-fiction. No work content. This transitions your brain from alert → sleep mode.",
    type: "sleep",
    icon: "📚",
  },
  {
    time: "22:45",
    label: "Magnesium Glycinate",
    detail:
      "300mg with water. Reduces time to fall asleep and improves sleep quality. Not a sedative — removes friction.",
    type: "health",
    icon: "💊",
  },
  {
    time: "23:00",
    label: "Lights Out",
    detail:
      "23:00 → 07:30 = 8.5 hrs in bed, ~7.5 hrs sleep = 5 full 90-min cycles. After 2–3 weeks of consistency, you'll wake naturally before the alarm.",
    type: "sleep",
    icon: "😴",
  },
];

// ─── WORKOUT DATA ─────────────────────────────────────────────────────────────

const workoutPlan = {
  split: "4-Day Upper/Lower Split — Mon, Wed, Fri, Sat",
  note: "Restructured around your fixed badminton days (Tue + Thu evenings, Sat + Sun mornings). Tue and Thu are now pure badminton days — zero gym. Leg days moved to Wed and Fri where there's no evening badminton conflict. Sat has optional Upper Pull after morning badminton if energy allows.",
  weekTemplate: [
    {
      day: "MON",
      gym: "Upper — Push",
      badminton: "❌ No badminton",
      gymColor: COLORS.red,
      note: "Upper body — safe before Tue badminton. Chest, shoulders, triceps. Legs fully fresh for evening court tomorrow.",
    },
    {
      day: "TUE",
      gym: "❌ No gym",
      badminton: "🏸 FIXED — Evening 19:30",
      gymColor: COLORS.muted,
      note: "No gym on Tue. Badminton IS your training. Legs must be fresh — any gym here kills your court performance and risks injury. Pre-snack at 17:00 sharp.",
    },
    {
      day: "WED",
      gym: "Lower — Quads",
      badminton: "❌ No badminton (occasional extra OK)",
      gymColor: COLORS.blue,
      note: "Leg day now lives here — safely away from Tue/Thu badminton. If you get an extra badminton invite Wed evening, skip gym or do Upper Push instead.",
    },
    {
      day: "THU",
      gym: "❌ No gym",
      badminton: "🏸 FIXED — Evening 19:30",
      gymColor: COLORS.muted,
      note: "No gym on Thu. Same as Tuesday — legs must be fresh. Upper body gym in morning + badminton evening is technically OK, but rest is better. You already trained Wed.",
    },
    {
      day: "FRI",
      gym: "Lower — Posterior",
      badminton: "❌ No badminton",
      gymColor: COLORS.purple,
      note: "Deadlift + split squat day. Fri evening is full rest — no court. This is the heavy leg session that drives most of your lower body progress.",
    },
    {
      day: "SAT",
      gym: "Upper — Pull (optional, after badminton)",
      badminton: "🏸 FIXED — Morning 9–11",
      gymColor: COLORS.orange,
      note: "Badminton first (morning). If energy allows, Upper Pull gym session in afternoon is fine — upper body doesn't conflict. Or full rest — both are valid.",
    },
    {
      day: "SUN",
      gym: "❌ Rest + Foam Roll 15 min",
      badminton: "🏸 FIXED — Morning 9–11",
      gymColor: COLORS.muted,
      note: "Badminton morning. No gym after — full recovery. Foam roll after badminton: calves, hamstrings, hip flexors. Prepares you for Monday push day.",
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
      type: "LOWER — Quads & Glutes",
      color: COLORS.blue,
      compounds: "Squat — keep this for 8–12 weeks",
      exercises: [
        {
          name: "Barbell Back Squat",
          tag: "COMPOUND — keep always",
          sets: "4",
          reps: "8–10",
          rest: "2 min",
          note: "Depth matters. Chest up, knees track toes. If badminton tonight, do Upper instead.",
          variations: [
            "Wk 1–4: Barbell Back Squat",
            "Wk 5–8: Barbell Front Squat (more quad focus)",
            "Wk 9–12: Back Squat heavier",
          ],
        },
        {
          name: "Romanian Deadlift",
          tag: "COMPOUND",
          sets: "3",
          reps: "10–12",
          rest: "90s",
          note: "Hip hinge — not a squat. Feel the hamstring stretch at bottom.",
          variations: [
            "Wk 1–4: Barbell RDL",
            "Wk 5–8: Dumbbell RDL (better balance)",
            "Wk 9–12: Single-Leg RDL (balance + stability)",
          ],
        },
        {
          name: "Leg Press",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12–15",
          rest: "60s",
          note: "Wide stance activates glutes more.",
          variations: [
            "Wk 1–4: Leg Press standard",
            "Wk 5–8: Leg Press feet high (hamstring focus)",
            "Wk 9–12: Walking Lunges instead",
          ],
        },
        {
          name: "Leg Curl",
          tag: "ACCESSORY",
          sets: "3",
          reps: "12–15",
          rest: "45s",
          note: "Slow eccentric (3s). Hamstrings are important for badminton knee protection.",
          variations: [
            "Wk 1–4: Seated Leg Curl",
            "Wk 5–8: Lying Leg Curl",
            "Wk 9–12: Nordic Curls (hardest)",
          ],
        },
        {
          name: "Calf Raises",
          tag: "ACCESSORY",
          sets: "4",
          reps: "20",
          rest: "30s",
          note: "Full stretch at bottom — most people do half reps and wonder why calves don't grow.",
          variations: [
            "Wk 1–4: Standing Calf Raise",
            "Wk 5–8: Seated Calf Raise (soleus)",
            "Wk 9–12: Single-Leg Calf Raise",
          ],
        },
        {
          name: "Ab Wheel / Core",
          tag: "ACCESSORY",
          sets: "3",
          reps: "10–12",
          rest: "45s",
          note: "Don't let lower back collapse.",
          variations: [
            "Wk 1–4: Ab Wheel Rollout",
            "Wk 5–8: Cable Crunch",
            "Wk 9–12: Hanging Knee Raises",
          ],
        },
      ],
    },
    {
      day: "Friday",
      type: "UPPER — Pull",
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
      day: "Saturday (after morning badminton)",
      type: "LOWER — Posterior Chain",
      color: COLORS.purple,
      compounds: "Deadlift — keep this for 8–12 weeks",
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
      day: "Tue / Thu / Sat / Sun",
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

// ─── MEAL DATA ────────────────────────────────────────────────────────────────

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
    },
    {
      day: "Tuesday",
      sabzi: "Bhindi (Okra) Masala — dry",
      why: "Very low calorie (35 kcal/100g) but high zinc + magnesium. Good on leg day when you want lighter food. High fibre.",
      cook: "Dry preparation only — no gravy. Mustard seeds + onion + tomato + amchur. Don't cover while cooking — keeps crispy.",
    },
    {
      day: "Wednesday",
      sabzi: "Methi Sabzi (fresh fenugreek leaves)",
      why: "Methi = extremely high magnesium + iron + reduces inflammation. Great on badminton recovery days.",
      cook: "Fresh methi leaves, roughly chopped. Light tadka: jeera + onion + tiny bit of garlic + tomato. 8 min max — don't overcook.",
    },
    {
      day: "Thursday",
      sabzi: "Gobhi + Matar (cauliflower + peas)",
      why: "Cauliflower: Vit C + B6 + folate. Peas: 5g protein per half cup + iron. Good carb source without being heavy.",
      cook: "Dry sabzi. Jeera + onion + ginger-garlic + tomato + standard masalas. Finish with fresh coriander.",
    },
    {
      day: "Friday",
      sabzi: "Baingan Bharta (roasted brinjal)",
      why: "Brinjal = 25 kcal/100g — filling but very low calorie. High in nasunin (powerful antioxidant for cell protection).",
      cook: "Roast whole baingan directly on gas flame until charred. Peel, mash. Tadka: mustard seeds + onion + tomato + green chilli.",
    },
    {
      day: "Saturday",
      sabzi: "Lauki (bottle gourd) + Chana",
      why: "Lauki = 96% water — perfect hydration recovery after morning badminton. Extremely easy on digestion.",
      cook: "Cubed lauki + soaked chana together in pressure cooker. Light jeera + tomato tadka. Add dahi at end for creaminess.",
    },
    {
      day: "Sunday",
      sabzi: "Shimla Mirch + Paneer Bhurji (capsicum + scrambled paneer)",
      why: "Capsicum = highest Vit C of any Indian sabzi — supports collagen for joint health. Paneer bhurji = 22g protein, 10 min prep.",
      cook: "Crumble paneer with fingers. Cook with chopped onion + capsicum + tomato + haldi + red chilli. One pan, 10 min.",
    },
  ],
  meals: [
    {
      label: "Pre-Workout Shake (07:40)",
      icon: "🥤",
      color: "#e8ff47",
      kcal: 560,
      items: [
        "2 ripe bananas",
        "1.5 scoops whey protein (37g protein) — mix into shake",
        "3 tbsp rolled oats — blend in, gives sustained energy",
        "300ml low-fat milk",
        "1 tsp peanut butter",
        "1 tbsp ground flaxseeds (alsi) — omega-3 source, grind before adding",
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
      kcal: 230,
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
      kcal: 640,
      items: [
        "2 whole wheat rotis OR 1 cup brown rice / quinoa",
        "1 cup dal — see Dal Rotation below ↓",
        "100g paneer OR 150g tofu (sautéed, not fried)",
        "1 cup sabzi — see Sabzi Rotation below ↓",
        "150g dahi (room temp, not cold from fridge)",
        "Salad: cucumber + tomato + onion + lemon + chaat masala",
        "With lunch: 5 walnuts (omega-3 boost, 2.5g ALA)",
        "~640 kcal | 50g protein | 70g carbs",
      ],
      why: "Dal + paneer/tofu = complete amino acid profile. Walnuts with lunch = second omega-3 hit, habit-free. Dahi at room temp digests better and has more active probiotics than cold curd.",
    },
    {
      label: "Pre-Badminton Snack (17:00) — Tue, Thu, Sat, Sun only",
      icon: "⚡",
      color: "#ff9447",
      kcal: 270,
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
      kcal: 530,
      items: [
        "1–2 ragi rotis (preferred) OR whole wheat rotis — ragi = highest magnesium flour",
        "1 cup greens sabzi — spinach/methi/lauki per rotation",
        "1 bowl lighter dal — moong / masoor / toor (not rajma/chole at night — too heavy)",
        "150g dahi",
        "AFTER DINNER — Magnesium Stack: 30g pumpkin seeds (kaddu ke beej) + 10–12 almonds",
        "→ Pumpkin seeds 150mg + almonds 80mg + spinach 78mg + ragi 70mg = ~380mg magnesium total",
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

// ─── SLEEP + STATS DATA ───────────────────────────────────────────────────────

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

// ─── QUICK-ADD MEAL PRESETS ───────────────────────────────────────────────────
// Pre-filled kcal from the meal plan for one-tap logging

const MEAL_PRESETS = [
  { label: "Pre-WO Shake", kcal: 560, icon: "🥤" },
  { label: "Post-WO Shake", kcal: 230, icon: "🥛" },
  { label: "Lunch", kcal: 640, icon: "🍱" },
  { label: "Pre-Badminton Snack", kcal: 270, icon: "⚡" },
  { label: "Dinner", kcal: 530, icon: "🍽️" },
  { label: "Almonds (12)", kcal: 84, icon: "🌰" },
  { label: "Banana", kcal: 90, icon: "🍌" },
  { label: "Apple", kcal: 72, icon: "🍎" },
  { label: "Dahi 150g", kcal: 90, icon: "🥛" },
  { label: "Paneer 100g", kcal: 265, icon: "🧀" },
  { label: "Roti (1)", kcal: 120, icon: "🫓" },
  { label: "Brown Rice 1c", kcal: 215, icon: "🍚" },
];

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function TagBadge({ type }: { type: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    sleep: { bg: "#1a1a3a", text: "#6a6aff", label: "SLEEP" },
    health: { bg: "#1a3a1a", text: "#47ff8a", label: "HEALTH" },
    food: { bg: "#3a1a00", text: "#ff9447", label: "FOOD" },
    work: { bg: "#1a2a3a", text: "#47b8ff", label: "WORK" },
    gym: { bg: "#3a1a1a", text: "#ff4747", label: "GYM" },
  };
  const s = map[type as keyof typeof map] || map.health;
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

// ─── CALORIE TRACKER TAB ─────────────────────────────────────────────────────

function CalorieTracker() {
  const [calorieLog, setCalorieLog] = useState<CalorieLog>(() =>
    loadLS("vb_calorie_log", {})
  );
  const [customLabel, setCustomLabel] = useState("");
  const [customKcal, setCustomKcal] = useState("");

  const today = todayKey();
  const dayName = getTodayDayName();
  const entries: CalorieEntry[] = calorieLog[today] || [];

  // Target depends on day type
  const isGymDay = ["Monday", "Tuesday", "Thursday", "Friday"].includes(
    dayName
  );
  const isBadmintonOnly = ["Wednesday", "Saturday", "Sunday"].includes(dayName);
  const target = isGymDay ? 2400 : isBadmintonOnly ? 2200 : 2000;
  const total = entries.reduce((s, e) => s + e.kcal, 0);
  const pct = Math.min(100, Math.round((total / target) * 100));
  const remaining = target - total;

  function addEntry(label: string, kcal: number) {
    const entry: CalorieEntry = {
      id: Date.now().toString(),
      label,
      kcal,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated: CalorieLog = { ...calorieLog, [today]: [...entries, entry] };
    setCalorieLog(updated);
    saveLS("vb_calorie_log", updated);
  }

  function removeEntry(id: string) {
    const updated: CalorieLog = {
      ...calorieLog,
      [today]: entries.filter((e) => e.id !== id),
    };
    setCalorieLog(updated);
    saveLS("vb_calorie_log", updated);
  }

  function addCustom() {
    const k = parseInt(customKcal, 10);
    if (!customLabel.trim() || isNaN(k) || k <= 0) return;
    addEntry(customLabel.trim(), k);
    setCustomLabel("");
    setCustomKcal("");
  }

  const barColor =
    pct >= 100 ? COLORS.red : pct >= 80 ? COLORS.orange : COLORS.green;

  return (
    <div>
      {/* Day header */}
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <div>
            <div
              style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}
            >
              {dayName} — {today}
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>
              {isGymDay
                ? "🏋️ Gym day — 2,400 kcal target"
                : isBadmintonOnly
                ? "🏸 Badminton day — 2,200 kcal target"
                : "😴 Rest day — 2,000 kcal target"}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: barColor }}>
              {total}
            </div>
            <div style={{ fontSize: 10, color: COLORS.muted }}>
              of {target} kcal
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div
          style={{
            background: "#2a2a2a",
            borderRadius: 6,
            height: 8,
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: barColor,
              borderRadius: 6,
              transition: "width 0.3s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: COLORS.muted,
          }}
        >
          <span>{pct}% of target</span>
          <span style={{ color: remaining > 0 ? COLORS.green : COLORS.red }}>
            {remaining > 0
              ? `${remaining} kcal remaining`
              : `${Math.abs(remaining)} kcal over`}
          </span>
        </div>
        {/* Macro summary (approximate) */}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[
            { label: "Protein goal", val: "155–165g", color: COLORS.green },
            { label: "Carbs goal", val: "260–280g", color: COLORS.blue },
            { label: "Fat goal", val: "60–70g", color: COLORS.orange },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "#111",
                borderRadius: 6,
                padding: "6px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 9, color: COLORS.muted }}>{m.label}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: m.color }}>
                {m.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-add presets */}
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        ⚡ Quick Add
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}
      >
        {MEAL_PRESETS.map((p, i) => (
          <button
            key={i}
            onClick={() => addEntry(p.label, p.kcal)}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              color: COLORS.text,
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
            <span style={{ color: COLORS.accent, fontWeight: 700 }}>
              {p.kcal}
            </span>
          </button>
        ))}
      </div>

      {/* Custom entry */}
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        ✏️ Custom Entry
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          placeholder="Food / meal name"
          style={{
            flex: 2,
            background: COLORS.card,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 8,
            padding: "8px 12px",
            color: COLORS.text,
            fontSize: 12,
            outline: "none",
          }}
        />
        <input
          value={customKcal}
          onChange={(e) => setCustomKcal(e.target.value)}
          placeholder="kcal"
          type="number"
          style={{
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 8,
            padding: "8px 12px",
            color: COLORS.text,
            fontSize: 12,
            outline: "none",
          }}
        />
        <button
          onClick={addCustom}
          style={{
            background: COLORS.accent,
            color: COLORS.bg,
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          Add
        </button>
      </div>

      {/* Today's log */}
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        📋 Today's Log{" "}
        {entries.length > 0 && (
          <span style={{ color: COLORS.accent }}>
            ({entries.length} entries)
          </span>
        )}
      </div>
      {entries.length === 0 ? (
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 10,
            padding: 20,
            textAlign: "center",
            color: COLORS.muted,
            fontSize: 12,
          }}
        >
          Nothing logged yet. Use Quick Add above or add a custom entry.
        </div>
      ) : (
        <div>
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  {entry.label}
                </div>
                <div
                  style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}
                >
                  {entry.time}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: COLORS.accent,
                  }}
                >
                  {entry.kcal} kcal
                </span>
                <button
                  onClick={() => removeEntry(entry.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: COLORS.muted,
                    cursor: "pointer",
                    fontSize: 14,
                    padding: "0 4px",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              background: "#1a1500",
              border: "1px solid #3a3000",
              borderRadius: 8,
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <span
              style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}
            >
              TOTAL TODAY
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: barColor }}>
              {total} / {target} kcal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SET TRACKER TAB ─────────────────────────────────────────────────────────

function SetTracker() {
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog>(() =>
    loadLS("vb_workout_log", {})
  );
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const today = todayKey();
  const dayName = getTodayDayName();

  // Map today's day name → workout plan index
  const dayMap: Record<string, number> = {
    Monday: 0,
    Wednesday: 1,
    Friday: 2,
    Saturday: 3,
    Tuesday: 4,
    Thursday: 4,
    Sunday: 4,
  };
  const todayPlanIdx = dayMap[dayName] ?? -1;

  function getSetLog(dayIdx: number, exIdx: number, setIdx: number): SetLog {
    const dateStr = today;
    return (
      workoutLog[dateStr]?.[`${dayIdx}-${exIdx}`]?.[setIdx] ?? {
        weight: "",
        reps: "",
        done: false,
      }
    );
  }

  function updateSetLog(
    dayIdx: number,
    exIdx: number,
    setIdx: number,
    field: keyof SetLog,
    value: string | boolean
  ) {
    const dateStr = today;
    const exKey = `${dayIdx}-${exIdx}`;
    const prev = workoutLog[dateStr] ?? {};
    const prevEx = prev[exKey] ?? {};
    const prevSet = prevEx[setIdx] ?? { weight: "", reps: "", done: false };
    const updated: WorkoutLog = {
      ...workoutLog,
      [dateStr]: {
        ...prev,
        [exKey]: {
          ...prevEx,
          [setIdx]: { ...prevSet, [field]: value },
        },
      },
    };
    setWorkoutLog(updated);
    saveLS("vb_workout_log", updated);
  }

  function countCompletedSets(
    dayIdx: number,
    exIdx: number,
    totalSets: number
  ): number {
    const exKey = `${dayIdx}-${exIdx}`;
    const exLog = workoutLog[today]?.[exKey] ?? {};
    return Array.from({ length: totalSets }, (_, i) => exLog[i]?.done).filter(
      Boolean
    ).length;
  }

  function isDayComplete(dayIdx: number): boolean {
    const plan = workoutPlan.days[dayIdx];
    if (!plan) return false;
    return plan.exercises.every((ex, exIdx) => {
      const total = parseInt(ex.sets) || 0;
      if (total === 0) return true;
      return countCompletedSets(dayIdx, exIdx, total) >= total;
    });
  }

  // History: last 7 days for a given exercise
  function getHistory(
    dayIdx: number,
    exIdx: number
  ): { date: string; sets: SetLog[] }[] {
    const exKey = `${dayIdx}-${exIdx}`;
    const results: { date: string; sets: SetLog[] }[] = [];
    const plan = workoutPlan.days[dayIdx];
    if (!plan) return results;
    const totalSets = parseInt(plan.exercises[exIdx]?.sets) || 0;
    Object.keys(workoutLog)
      .filter((d) => d !== today)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 5)
      .forEach((date) => {
        const exLog = workoutLog[date]?.[exKey];
        if (exLog) {
          const sets = Array.from(
            { length: totalSets },
            (_, i) => exLog[i]
          ).filter(Boolean) as SetLog[];
          if (sets.some((s) => s.weight || s.reps))
            results.push({ date, sets });
        }
      });
    return results;
  }

  return (
    <div>
      {/* Today badge */}
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
          {dayName} — {today}
        </div>
        {todayPlanIdx >= 0 ? (
          <div style={{ fontSize: 12, color: COLORS.textDim }}>
            Today's plan:{" "}
            <span
              style={{
                color: workoutPlan.days[todayPlanIdx].color,
                fontWeight: 700,
              }}
            >
              {workoutPlan.days[todayPlanIdx].type}
            </span>
            {isDayComplete(todayPlanIdx) && (
              <span style={{ color: COLORS.green, marginLeft: 8 }}>
                ✅ Complete!
              </span>
            )}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: COLORS.muted }}>
            No gym today — rest or badminton day.
          </div>
        )}
      </div>

      {/* All workout days */}
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        🏋️ Tap a day to log sets
      </div>
      {workoutPlan.days.map((plan, dayIdx) => {
        const isToday = dayIdx === todayPlanIdx;
        const complete = isDayComplete(dayIdx);
        return (
          <div
            key={dayIdx}
            style={{
              background: COLORS.card,
              border: `1px solid ${isToday ? plan.color : COLORS.cardBorder}`,
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
                borderLeft: `4px solid ${plan.color}`,
              }}
              onClick={() =>
                setExpandedDay(expandedDay === dayIdx ? null : dayIdx)
              }
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: plan.color }}
                  >
                    {plan.type}
                  </div>
                  {isToday && (
                    <span
                      style={{
                        background: COLORS.accent,
                        color: COLORS.bg,
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      TODAY
                    </span>
                  )}
                  {complete && <span style={{ fontSize: 14 }}>✅</span>}
                </div>
                <div
                  style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}
                >
                  {plan.day}
                </div>
              </div>
              <div style={{ fontSize: 18, color: COLORS.muted }}>
                {expandedDay === dayIdx ? "▲" : "▼"}
              </div>
            </div>

            {expandedDay === dayIdx && (
              <div style={{ padding: "0 16px 16px" }}>
                {plan.exercises.map((ex, exIdx) => {
                  const totalSets = parseInt(ex.sets) || 0;
                  const doneSets = countCompletedSets(dayIdx, exIdx, totalSets);
                  const history = getHistory(dayIdx, exIdx);
                  if (totalSets === 0)
                    return (
                      <div
                        key={exIdx}
                        style={{
                          borderTop: `1px solid ${COLORS.cardBorder}`,
                          paddingTop: 10,
                          marginTop: 10,
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {ex.name}
                        </div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>
                          {ex.reps}
                        </div>
                      </div>
                    );
                  return (
                    <div
                      key={exIdx}
                      style={{
                        borderTop: `1px solid ${COLORS.cardBorder}`,
                        paddingTop: 12,
                        marginTop: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>
                            {ex.name}
                          </div>
                          {ex.tag && <ExerciseTag tag={ex.tag} />}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color:
                              doneSets >= totalSets
                                ? COLORS.green
                                : COLORS.muted,
                            fontWeight: 700,
                          }}
                        >
                          {doneSets}/{totalSets} sets
                        </div>
                      </div>

                      {/* Header row */}
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          marginBottom: 4,
                          fontSize: 9,
                          color: COLORS.muted,
                          letterSpacing: 1,
                          paddingLeft: 2,
                        }}
                      >
                        <div style={{ width: 24 }}></div>
                        <div style={{ flex: 1 }}>WEIGHT (kg)</div>
                        <div style={{ flex: 1 }}>REPS</div>
                        <div style={{ width: 36, textAlign: "center" }}>
                          DONE
                        </div>
                      </div>

                      {/* Set rows */}
                      {Array.from({ length: totalSets }, (_, setIdx) => {
                        const s = getSetLog(dayIdx, exIdx, setIdx);
                        return (
                          <div
                            key={setIdx}
                            style={{
                              display: "flex",
                              gap: 6,
                              marginBottom: 6,
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: 24,
                                fontSize: 10,
                                color: COLORS.muted,
                                fontWeight: 700,
                                textAlign: "center",
                              }}
                            >
                              S{setIdx + 1}
                            </div>
                            <input
                              value={s.weight}
                              onChange={(e) =>
                                updateSetLog(
                                  dayIdx,
                                  exIdx,
                                  setIdx,
                                  "weight",
                                  e.target.value
                                )
                              }
                              placeholder={
                                history[0]?.sets[setIdx]?.weight
                                  ? `last: ${history[0].sets[setIdx].weight}`
                                  : "kg"
                              }
                              style={{
                                flex: 1,
                                background: s.done ? "#1a2a1a" : "#111",
                                border: `1px solid ${
                                  s.done
                                    ? COLORS.green + "44"
                                    : COLORS.cardBorder
                                }`,
                                borderRadius: 6,
                                padding: "6px 8px",
                                color: COLORS.text,
                                fontSize: 12,
                                outline: "none",
                              }}
                            />
                            <input
                              value={s.reps}
                              onChange={(e) =>
                                updateSetLog(
                                  dayIdx,
                                  exIdx,
                                  setIdx,
                                  "reps",
                                  e.target.value
                                )
                              }
                              placeholder={
                                history[0]?.sets[setIdx]?.reps
                                  ? `last: ${history[0].sets[setIdx].reps}`
                                  : ex.reps
                              }
                              style={{
                                flex: 1,
                                background: s.done ? "#1a2a1a" : "#111",
                                border: `1px solid ${
                                  s.done
                                    ? COLORS.green + "44"
                                    : COLORS.cardBorder
                                }`,
                                borderRadius: 6,
                                padding: "6px 8px",
                                color: COLORS.text,
                                fontSize: 12,
                                outline: "none",
                              }}
                            />
                            <button
                              onClick={() =>
                                updateSetLog(
                                  dayIdx,
                                  exIdx,
                                  setIdx,
                                  "done",
                                  !s.done
                                )
                              }
                              style={{
                                width: 36,
                                height: 34,
                                borderRadius: 6,
                                border: `1px solid ${
                                  s.done ? COLORS.green : COLORS.cardBorder
                                }`,
                                background: s.done
                                  ? COLORS.green + "22"
                                  : "transparent",
                                cursor: "pointer",
                                fontSize: 14,
                                color: s.done ? COLORS.green : COLORS.muted,
                              }}
                            >
                              {s.done ? "✓" : "○"}
                            </button>
                          </div>
                        );
                      })}

                      {/* Last session history */}
                      {history.length > 0 && (
                        <div
                          style={{
                            marginTop: 6,
                            padding: "6px 8px",
                            background: "#111",
                            borderRadius: 6,
                            fontSize: 10,
                            color: COLORS.muted,
                          }}
                        >
                          <span style={{ color: COLORS.blue, fontWeight: 700 }}>
                            Last session ({history[0].date}):{" "}
                          </span>
                          {history[0].sets.map((hs, i) => (
                            <span key={i} style={{ marginRight: 8 }}>
                              S{i + 1}: {hs.weight ? `${hs.weight}kg` : "—"} ×{" "}
                              {hs.reps || "—"}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SLEEP TRACKER ───────────────────────────────────────────────────────────

function calcDuration(bed: string, wake: string): number | null {
  if (!bed || !wake) return null;
  const [bh, bm] = bed.split(":").map(Number);
  const [wh, wm] = wake.split(":").map(Number);
  let mins = wh * 60 + wm - (bh * 60 + bm);
  if (mins < 0) mins += 24 * 60; // crossed midnight
  return Math.round((mins / 60) * 10) / 10;
}

function sleepQualityLabel(q: number): { label: string; color: string } {
  return (
    [
      { label: "Terrible", color: "#ff4747" },
      { label: "Poor", color: "#ff9447" },
      { label: "Okay", color: "#ffcc00" },
      { label: "Good", color: "#a0ff47" },
      { label: "Great", color: "#47ff8a" },
    ][q - 1] ?? { label: "—", color: COLORS.muted }
  );
}

function SleepTracker() {
  const [sleepLog, setSleepLog] = useState<SleepLog>(() =>
    loadLS("vb_sleep_log", {})
  );
  const today = todayKey();

  // We log sleep for the *previous* night, so show last 7 days
  const last7: string[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  });

  function updateEntry(
    date: string,
    field: keyof SleepEntry,
    value: string | number
  ) {
    const prev = sleepLog[date] ?? {
      bedtime: "",
      wakeTime: "",
      quality: 0,
      notes: "",
    };
    const updated: SleepLog = {
      ...sleepLog,
      [date]: { ...prev, [field]: value },
    };
    setSleepLog(updated);
    saveLS("vb_sleep_log", updated);
  }

  // Streak: how many consecutive days hit ≥7h
  function calcStreak(): number {
    let streak = 0;
    for (const date of last7) {
      const e = sleepLog[date];
      if (!e) break;
      const dur = calcDuration(e.bedtime, e.wakeTime);
      if (dur === null || dur < 7) break;
      streak++;
    }
    return streak;
  }

  const streak = calcStreak();
  const todayEntry = sleepLog[today] ?? {
    bedtime: "",
    wakeTime: "",
    quality: 0,
    notes: "",
  };
  const todayDur = calcDuration(todayEntry.bedtime, todayEntry.wakeTime);

  // Weekly average
  const validDurs = last7
    .map((d) => {
      const e = sleepLog[d];
      return e ? calcDuration(e.bedtime, e.wakeTime) : null;
    })
    .filter((d): d is number => d !== null && d > 0);
  const avgDur = validDurs.length
    ? Math.round(
        (validDurs.reduce((a, b) => a + b, 0) / validDurs.length) * 10
      ) / 10
    : null;

  return (
    <div>
      {/* Summary strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        {[
          { label: "Tonight's target", val: "7.5 hrs", color: COLORS.accent },
          {
            label: "7-day avg",
            val: avgDur ? `${avgDur}h` : "—",
            color: avgDur && avgDur >= 7 ? COLORS.green : COLORS.red,
          },
          {
            label: "≥7h streak",
            val: streak > 0 ? `${streak}d 🔥` : "0d",
            color: streak >= 3 ? COLORS.green : COLORS.muted,
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: COLORS.muted,
                letterSpacing: 1,
                marginBottom: 4,
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Log tonight (today's entry = last night for most users) */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.accent}44`,
          borderRadius: 10,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.accent,
            marginBottom: 12,
          }}
        >
          🌙 Log Last Night ({today})
          {todayDur !== null && (
            <span
              style={{
                marginLeft: 10,
                color:
                  todayDur >= 7.5
                    ? COLORS.green
                    : todayDur >= 6
                    ? COLORS.orange
                    : COLORS.red,
                fontWeight: 800,
              }}
            >
              {todayDur}h {todayDur >= 7.5 ? "✅" : todayDur >= 6 ? "⚠️" : "❌"}
            </span>
          )}
        </div>

        {/* Bedtime + Wake */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color: COLORS.muted,
                marginBottom: 4,
                letterSpacing: 1,
              }}
            >
              LIGHTS OUT
            </div>
            <input
              type="time"
              value={todayEntry.bedtime}
              onChange={(e) => updateEntry(today, "bedtime", e.target.value)}
              style={{
                width: "100%",
                background: "#111",
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 8,
                padding: "8px 10px",
                color: COLORS.text,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3 }}>
              Target: 23:00
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color: COLORS.muted,
                marginBottom: 4,
                letterSpacing: 1,
              }}
            >
              WAKE UP
            </div>
            <input
              type="time"
              value={todayEntry.wakeTime}
              onChange={(e) => updateEntry(today, "wakeTime", e.target.value)}
              style={{
                width: "100%",
                background: "#111",
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 8,
                padding: "8px 10px",
                color: COLORS.text,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3 }}>
              Target: 07:30
            </div>
          </div>
        </div>

        {/* Quality */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 10,
              color: COLORS.muted,
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            SLEEP QUALITY
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map((q) => {
              const { label, color } = sleepQualityLabel(q);
              const active = todayEntry.quality === q;
              return (
                <button
                  key={q}
                  onClick={() => updateEntry(today, "quality", q)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    borderRadius: 8,
                    border: `1px solid ${active ? color : COLORS.cardBorder}`,
                    background: active ? color + "22" : "transparent",
                    cursor: "pointer",
                    color: active ? color : COLORS.muted,
                    fontSize: 10,
                    fontWeight: active ? 700 : 400,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 14 }}>
                    {["😫", "😕", "😐", "🙂", "😄"][q - 1]}
                  </div>
                  <div>{label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <div
            style={{
              fontSize: 10,
              color: COLORS.muted,
              marginBottom: 4,
              letterSpacing: 1,
            }}
          >
            NOTES (optional — late coffee? stress? woke up early?)
          </div>
          <textarea
            value={todayEntry.notes}
            onChange={(e) => updateEntry(today, "notes", e.target.value)}
            placeholder="e.g. Woke at 4am, couldn't sleep. Had coffee at 5pm."
            rows={2}
            style={{
              width: "100%",
              background: "#111",
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 8,
              padding: "8px 10px",
              color: COLORS.text,
              fontSize: 12,
              outline: "none",
              resize: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* 7-day history */}
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        📅 Last 7 Nights
      </div>
      {last7.map((date, i) => {
        const e = sleepLog[date] ?? {
          bedtime: "",
          wakeTime: "",
          quality: 0,
          notes: "",
        };
        const dur = calcDuration(e.bedtime, e.wakeTime);
        const durColor =
          dur === null
            ? COLORS.muted
            : dur >= 7.5
            ? COLORS.green
            : dur >= 6
            ? COLORS.orange
            : COLORS.red;
        const dayLabel =
          i === 0
            ? "Today"
            : i === 1
            ? "Yesterday"
            : new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              });
        const { label: qLabel, color: qColor } = e.quality
          ? sleepQualityLabel(e.quality)
          : { label: "—", color: COLORS.muted };
        const pct = dur ? Math.min(100, Math.round((dur / 8) * 100)) : 0;

        return (
          <div
            key={date}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 8,
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
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: i === 0 ? COLORS.accent : COLORS.text,
                  }}
                >
                  {dayLabel}
                </span>
                <span
                  style={{ fontSize: 10, color: COLORS.muted, marginLeft: 8 }}
                >
                  {date}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {e.quality > 0 && (
                  <span
                    style={{ fontSize: 11, color: qColor, fontWeight: 600 }}
                  >
                    {qLabel}
                  </span>
                )}
                <span
                  style={{ fontSize: 14, fontWeight: 800, color: durColor }}
                >
                  {dur !== null ? `${dur}h` : "—"}
                </span>
              </div>
            </div>
            {/* Sleep bar */}
            <div
              style={{
                background: "#2a2a2a",
                borderRadius: 4,
                height: 5,
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: durColor,
                  borderRadius: 4,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: COLORS.muted,
              }}
            >
              <span>
                {e.bedtime ? `Bed: ${e.bedtime}` : "No bedtime logged"}
              </span>
              <span>{e.wakeTime ? `Wake: ${e.wakeTime}` : ""}</span>
            </div>
            {e.notes ? (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: COLORS.textDim,
                  fontStyle: "italic",
                  padding: "4px 8px",
                  background: "#111",
                  borderRadius: 6,
                }}
              >
                💬 {e.notes}
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Reminder box */}
      <div
        style={{
          background: "#0a0a1a",
          border: "1px solid #1a1a3a",
          borderRadius: 10,
          padding: 14,
          marginTop: 8,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6a6aff",
            marginBottom: 8,
          }}
        >
          🎯 Your sleep targets
        </div>
        {[
          ["In bed by", "23:00 — gives 7.5h before 07:30 alarm"],
          ["Minimum", "7h — below this recovery is compromised"],
          ["Ideal", "7.5h = 5 complete 90-min cycles"],
          [
            "Consistency",
            "Same bedtime ±30 min is more important than duration alone",
          ],
        ].map(([k, v], i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 11 }}
          >
            <span
              style={{ color: COLORS.accent, fontWeight: 700, flexShrink: 0 }}
            >
              {k}:
            </span>
            <span style={{ color: COLORS.textDim }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  // Auto-open today's workout when landing on Workout tab
  useEffect(() => {
    if (activeTab === 1) {
      const dayName = getTodayDayName();
      const dayMap: Record<string, number> = {
        Monday: 0,
        Wednesday: 1,
        Friday: 2,
        Saturday: 3,
        Tuesday: 4,
        Thursday: 4,
        Sunday: 4,
      };
      const idx = dayMap[dayName];
      if (idx !== undefined) setExpandedDay(idx);
    }
  }, [activeTab]);

  const tabStyle = (i: number) => ({
    padding: "9px 13px",
    fontSize: 12,
    fontWeight: activeTab === i ? 700 : 500,
    color: activeTab === i ? COLORS.bg : COLORS.textDim,
    background: activeTab === i ? COLORS.accent : "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
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
        {tabs.map((t, i) => (
          <button key={i} style={tabStyle(i)} onClick={() => setActiveTab(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── TAB: SCHEDULE ── */}
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
          {scheduleData.map((item, i) => (
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

      {/* ── TAB: WORKOUT ── */}
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
          {workoutPlan.weekTemplate.map((d, i) => (
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
          {workoutPlan.days.map((day, i) => (
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
                  {day.exercises.map((ex, j) => {
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
                                {ex.variations.map((v, k) => (
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
                                ))}
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

      {/* ── TAB: MEALS ── */}
      {activeTab === 2 && (
        <div>
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
              ].map((m, i) => (
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
            ].map((m, i) => (
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
          {mealPlan.meals.map((meal, i) => (
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
                {meal.items.map((item, j) => (
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
            {mealPlan.dalRotation.map((d, i) => (
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
              Each sabzi is chosen for specific nutritional purpose — not just
              taste. Follow this as a default, swap if not available.
            </div>
            {mealPlan.sabziRotation.map((s, i) => (
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
                  }}
                >
                  🍳 {s.cook}
                </div>
              </div>
            ))}
          </div>
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
            {mealPlan.calorieCycling.map((c, i) => (
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
            {mealPlan.avoid.map((a, i) => (
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

      {/* ── TAB: SLEEP ── */}
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
          {sleepProtocol.map((item, i) => (
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
            ].map((b, i) => (
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

      {/* ── TAB: GOALS ── */}
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
              {Object.entries(stats.current).map(([k, v]) => (
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
              {Object.entries(stats.targets).map(([k, v]) => (
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
          {stats.weeklyTargets.map((t, i) => (
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
          {stats.milestones.map((m, i) => (
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
            {stats.trackingTips.map((tip, i) => (
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

      {/* ── TAB: CALORIES ── */}
      {activeTab === 5 && <CalorieTracker />}

      {/* ── TAB: SETS ── */}
      {activeTab === 6 && <SetTracker />}

      {/* ── TAB: SLEEP LOG ── */}
      {activeTab === 7 && <SleepTracker />}

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
