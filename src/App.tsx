import { useState } from "react";

const C = {
  bg: "#0f0f0f",
  card: "#1a1a1a",
  border: "#2a2a2a",
  accent: "#e8ff47",
  dim: "#b8cc2a",
  red: "#ff4747",
  green: "#47ff8a",
  blue: "#47b8ff",
  orange: "#ff9447",
  purple: "#c47aff",
  muted: "#6b6b6b",
  text: "#f0f0f0",
  textDim: "#aaaaaa",
};

const TABS = ["Schedule", "Workout", "Meals", "Sleep", "Goals", "Ingredients"];

const BADGE_MAP = {
  sleep: { bg: "#1a1a3a", color: "#6a6aff", label: "SLEEP" },
  health: { bg: "#1a3a1a", color: "#47ff8a", label: "HEALTH" },
  food: { bg: "#3a1a00", color: "#ff9447", label: "FOOD" },
  work: { bg: "#1a2a3a", color: "#47b8ff", label: "WORK" },
  gym: { bg: "#3a1a1a", color: "#ff4747", label: "GYM" },
  water: { bg: "#001a2a", color: "#00ccff", label: "WATER" },
};

function Badge({ type }: { type: string }) {
  const b = (BADGE_MAP as any)[type] || BADGE_MAP.health;
  return (
    <span
      style={{
        background: b.bg,
        color: b.color,
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 6px",
        borderRadius: 4,
        letterSpacing: 1,
      }}
    >
      {b.label}
    </span>
  );
}

// ─── SHARED BLOCKS ────────────────────────────────────────────────
const WAKE = [
  {
    time: "07:30",
    label: "Wake Up — Zero Snooze",
    detail: "One alarm. Stand up immediately. Open curtains.",
    type: "sleep",
  },
  {
    time: "07:31",
    label: "Sunlight 5 min",
    detail:
      "Window or outside. Triggers cortisol rise, sets your sleep timer for 23:00 tonight.",
    type: "health",
  },
  {
    time: "07:35",
    label: "Water — 400ml",
    detail:
      "2 full glasses. Most dehydrated point of the day. Before phone, before anything.",
    type: "water",
  },
];
const OFFICE = [
  {
    time: "11:00",
    label: "Office — Deep Work Block",
    detail:
      "Post-workout endorphins = best cognitive window. Block meetings here.",
    type: "work",
  },
  {
    time: "11:00",
    label: "Water — 500ml (11-13)",
    detail: "1 bottle at desk over 2 hours. Sip constantly.",
    type: "water",
  },
  {
    time: "13:30",
    label: "Snack if hungry",
    detail: "Soaked almonds + apple OR makhana. Skip if not hungry.",
    type: "food",
  },
  {
    time: "14:00",
    label: "Water — 200ml with lunch",
    detail: "Small glass only. Don't overdrink during meals.",
    type: "water",
  },
];
const POST_LUNCH = [
  {
    time: "14:25",
    label: "Post-Lunch Walk",
    detail: "5-10 min walk outside. Regulates blood sugar, prevents 3pm crash.",
    type: "health",
  },
  {
    time: "14:30",
    label: "Water — 400ml (14:30-17)",
    detail: "Bottle at desk. Most neglected window.",
    type: "water",
  },
  {
    time: "16:00",
    label: "Last Coffee Cut-Off",
    detail:
      "No caffeine after 16:00. Half-life 5-6 hrs — coffee at 4pm = half in blood at 10pm.",
    type: "health",
  },
];
const WIND_DOWN = [
  {
    time: "22:00",
    label: "Wind-Down Begins",
    detail: "Dim lights — bedside lamp only. No reels or news.",
    type: "sleep",
  },
  {
    time: "22:15",
    label: "Pack Bag + Soak Seeds",
    detail:
      "Gym bag prepped. Soak: 30g pumpkin seeds + almonds + walnuts in bowl of water overnight. Soaking removes phytic acid — dry seeds give 40% less magnesium absorption.",
    type: "health",
  },
  {
    time: "22:30",
    label: "Phone Down",
    detail: "Phone outside bedroom. 45 min more sleep without phone in room.",
    type: "sleep",
  },
  {
    time: "22:30",
    label: "Read 30 min",
    detail: "Physical book or Kindle warm mode. Fiction. No work or news.",
    type: "sleep",
  },
  {
    time: "23:00",
    label: "Lights Out",
    detail:
      "23:00 to 07:30 = 7.5 hrs = 5 full 90-min cycles. Growth hormone, muscle repair, fat metabolism all peak here.",
    type: "sleep",
  },
];
const GYM_BLOCK = [
  {
    time: "07:40",
    label: "Power Shake",
    detail:
      "Blend: 2 bananas + 1.5 scoops whey + 3 tbsp oats + 300ml Calci+ milk + 1 tbsp peanut butter + 1 tbsp ground alsi + 1 tsp creatine. ~560 kcal. Drink fast.",
    type: "food",
  },
  {
    time: "07:55",
    label: "Leave for Gym",
    detail:
      "Bag packed last night. 1L water, shaker with 1 dry scoop whey, earphones.",
    type: "work",
  },
  {
    time: "08:30",
    label: "Gym — Warm-Up 5 min",
    detail:
      "Arm circles, hip circles, squats x10, leg swings x10. Cold muscles + heavy weights = injury.",
    type: "gym",
  },
  {
    time: "08:35",
    label: "Water — 500-750ml during gym",
    detail: "Sip every 2-3 sets. 1% dehydration = 10% drop in strength.",
    type: "water",
  },
  {
    time: "08:35",
    label: "Gym — Main Session 75 min",
    detail:
      "Per weekly split (Workout tab). Compounds first. LOG EVERY SET — weight + reps in Notes app.",
    type: "gym",
  },
  {
    time: "09:50",
    label: "Cool Down 5 min",
    detail: "Chest, lat, quad, hamstring stretches. 30 sec each.",
    type: "health",
  },
  {
    time: "09:55",
    label: "Post-Workout Shake at Gym",
    detail:
      "1 scoop whey in 300ml water. Drink BEFORE showering — within 20 min of last set.",
    type: "food",
  },
  {
    time: "10:00",
    label: "Shower",
    detail:
      "Cold water 30-60 sec at end. Reduces soreness, improves alertness.",
    type: "health",
  },
];
const BADMINTON_BLOCK = [
  {
    time: "17:00",
    label: "Water — 200ml before snack",
    detail: "Pre-hydrate before eating.",
    type: "water",
  },
  {
    time: "17:00",
    label: "Pre-Badminton Snack — 17:00 SHARP",
    detail:
      "150g Milky Mist Skyr yogurt + 2 baby bananas or 1 banana. ~250 kcal. Eat at exactly 17:00 — 90 min before 19:30 court. Eating closer = cramps.",
    type: "food",
  },
  {
    time: "18:50",
    label: "Leave Office",
    detail: "Carry electrolyte bottle: 500ml water + pinch salt + half lemon.",
    type: "work",
  },
  {
    time: "19:30",
    label: "Water — 500-600ml during badminton",
    detail:
      "Sip between rallies. Electrolyte mix replaces sodium lost in sweat.",
    type: "water",
  },
  {
    time: "19:30",
    label: "BADMINTON — 60 min",
    detail: "Play hard. HIIT level intensity. This is your cardio for the day.",
    type: "gym",
  },
  {
    time: "20:30",
    label: "Post-Badminton Stretch — 10 min",
    detail:
      "Hip flexors 30s each, calves, hamstrings, rotator cuff. Non-negotiable — prevents long-term knee and ankle injury.",
    type: "health",
  },
];
const LATE_DINNER = [
  {
    time: "21:15",
    label: "Water — 200ml with dinner",
    detail: "Small glass with dinner.",
    type: "water",
  },
  {
    time: "21:45",
    label: "Last Water — 200ml",
    detail: "Hard cut-off. Nothing after this.",
    type: "water",
  },
];
const EARLY_DINNER = [
  {
    time: "21:00",
    label: "Water — 200ml with dinner",
    detail: "Small glass with dinner.",
    type: "water",
  },
  {
    time: "21:30",
    label: "Last Water — 200ml",
    detail: "Hard cut-off. Nothing after this.",
    type: "water",
  },
];

// ─── PER-DAY SCHEDULES ────────────────────────────────────────────
const MON_SCHEDULE = [
  ...WAKE,
  ...GYM_BLOCK,
  ...OFFICE,
  {
    time: "14:00",
    label: "LUNCH — Mediterranean Paneer Bowl",
    detail:
      "Quinoa + grilled paneer + chickpeas + cucumber + capsicum + olive oil lemon dressing + dahi. 15 min at home or Greenr Cafe. Alternate weeks: regular dal + paneer + sabzi is also fine.",
    type: "food",
  },
  ...POST_LUNCH,
  {
    time: "18:30",
    label: "Leave Office",
    detail: "No badminton tonight. Head home. Full rest evening.",
    type: "work",
  },
  {
    time: "19:00",
    label: "Light Evening Walk",
    detail:
      "Optional 15-20 min easy walk. Not cardio — just keeps metabolism active.",
    type: "health",
  },
  ...EARLY_DINNER,
  {
    time: "21:00",
    label: "DINNER",
    detail:
      "Ragi roti + greens sabzi + lighter dal (moong/masoor/toor only) + dahi. Finish by 21:30. After: soaked pumpkin seeds + soaked almonds.",
    type: "food",
  },
  ...WIND_DOWN,
];

const TUE_SCHEDULE = [
  ...WAKE,
  ...GYM_BLOCK,
  ...OFFICE,
  {
    time: "14:00",
    label: "LUNCH — Rajma Rice Bowl",
    detail:
      "Rajma over brown rice + raw onion rings + lemon + coriander + dahi on side. Variety day — same macros, different experience. Order from dhaba or home cooked.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER — Dal + Sabzi",
    detail:
      "Ragi roti + greens sabzi + lighter dal + dahi. Finish by 21:45. After: soaked pumpkin seeds + soaked almonds.",
    type: "food",
  },
  ...WIND_DOWN,
];

const WED_SCHEDULE = [
  ...WAKE,
  ...GYM_BLOCK,
  ...OFFICE,
  {
    time: "14:00",
    label: "LUNCH — Dal + Paneer + Sabzi",
    detail:
      "Dal (Wed = Masoor) + paneer + sabzi (Wed = Methi or summer: Tori) + dahi + salad + 2 rotis. 5 soaked walnuts. 20 min, away from desk.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER — Mexican Paneer Bowl",
    detail:
      "Mexican Paneer Bowl tonight — variety day. Burrp or Burrito Project on Zomato, or home in 20 min. Paneer + brown rice + rajma + capsicum + corn + fresh salsa + hung curd. See Ingredients tab.",
    type: "food",
  },
  ...WIND_DOWN,
];

const THU_SCHEDULE = [
  ...WAKE,
  {
    time: "07:40",
    label: "Light Breakfast — No Gym Today",
    detail:
      "1 banana + 1 scoop whey in water + soaked almonds + soaked walnuts. ~280 kcal. Not lifting this morning — save energy for court tonight.",
    type: "food",
  },
  {
    time: "08:00",
    label: "Morning Walk or Stretch",
    detail:
      "15 min walk outside OR 10 min hip flexor + hamstring stretch. Active recovery from Wed badminton. Enjoy the slow morning.",
    type: "health",
  },
  {
    time: "08:30",
    label: "Leave for Office",
    detail: "No gym today — straight to office.",
    type: "work",
  },
  ...OFFICE,
  {
    time: "14:00",
    label: "LUNCH — High Protein Salad Bowl",
    detail:
      "Variety day — order Salad Days (Udyog Vihar) or Green Bunz (Sector 31) on Zomato. BYOS: quinoa + paneer + chickpeas + cucumber + capsicum + olive oil lemon dressing. Add Skyr dahi at home. See Ingredients tab.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER",
    detail:
      "Ragi roti + Masoor Dal (fastest digest) + Gobhi sabzi + dahi. Finish by 21:45. After: soaked pumpkin seeds + soaked almonds.",
    type: "food",
  },
  ...WIND_DOWN,
];

const FRI_SCHEDULE = [
  ...WAKE,
  ...GYM_BLOCK,
  ...OFFICE,
  {
    time: "14:00",
    label: "LUNCH — Dal + Paneer + Sabzi",
    detail:
      "Dal (Fri = Mix Dal) + paneer + sabzi (Fri = Baingan Bharta — year round) + dahi + salad + 2 rotis. 5 soaked walnuts. 20 min, away from desk.",
    type: "food",
  },
  ...POST_LUNCH,
  {
    time: "18:30",
    label: "Leave Office",
    detail:
      "No badminton tonight. Head home. Heavy leg day — full rest evening.",
    type: "work",
  },
  {
    time: "19:00",
    label: "Light Evening Walk",
    detail:
      "Optional 15-20 min easy walk only. No running — legs need recovery after squats and deadlifts.",
    type: "health",
  },
  ...EARLY_DINNER,
  {
    time: "21:00",
    label: "DINNER — Thai Peanut Noodles with Paneer",
    detail:
      "Variety day — make at home in 15 min or Burma Burma Cyber Hub (book ahead). 50g noodles + 100g paneer + capsicum + carrot + peanut sauce (PB + soy + honey + lemon + chilli). See Ingredients tab.",
    type: "food",
  },
  ...WIND_DOWN,
];

const SAT_SCHEDULE = [
  ...WAKE,
  {
    time: "07:40",
    label: "Relaxed Breakfast",
    detail:
      "2 rotis + dahi + 1 fruit OR Paneer Poha (poha + crumbled paneer + onion + mustard seeds + haldi + lemon). Sit down and enjoy slowly. 1 tsp creatine in water or milk.",
    type: "food",
  },
  {
    time: "08:30",
    label: "Foam Roll + Walk",
    detail:
      "15 min foam rolling: calves, IT band, upper back, hip flexors. Then 20-30 min easy walk. No intensity — body rebuilds on rest days.",
    type: "health",
  },
  {
    time: "14:00",
    label: "Water — 200ml",
    detail: "Stay hydrated even on rest days.",
    type: "water",
  },
  {
    time: "13:30",
    label: "LUNCH or CHEAT MEAL — Your Choice",
    detail:
      "OPTION A Clean: Dal (Sat = Toor) + paneer + sabzi (Sat = Lauki+Chana) + dahi + rotis. OPTION B Cheat: Chole bhature / biryani / pizza / burger / paneer tikka — anything. Greenr Cafe (Golf Course Road): Garden Veg Pizza + Pesto Spaghetti. Roots Cafe (Sector 29): wood-fired pizza. Can be breakfast, lunch or dinner — one meal only.",
    type: "food",
  },
  {
    time: "15:00",
    label: "Afternoon Rest",
    detail:
      "Nap max 20 min. Reading, family time, leisure. No intense activity.",
    type: "health",
  },
  {
    time: "17:00",
    label: "Light Snack",
    detail: "Soaked almonds + 1 fruit OR makhana. No badminton today.",
    type: "food",
  },
  {
    time: "20:30",
    label: "Water — 200ml with dinner",
    detail: "Earlier dinner on weekends.",
    type: "water",
  },
  {
    time: "20:30",
    label: "DINNER",
    detail:
      "Ragi roti + greens sabzi + lighter dal + dahi. Eat by 21:00. After: soaked pumpkin seeds + soaked almonds.",
    type: "food",
  },
  {
    time: "21:00",
    label: "Last Water — 200ml",
    detail: "Earlier cut-off on weekends.",
    type: "water",
  },
  ...WIND_DOWN,
];

const SUN_SCHEDULE = [
  ...WAKE,
  {
    time: "07:40",
    label: "Pre-Badminton Breakfast — Eat by 07:45",
    detail:
      "150g Milky Mist Skyr yogurt + 1 banana (or 2 baby bananas). ~230 kcal. No nuts — fat too slow to digest, heavy on court. 1 tsp creatine mixed into yogurt.",
    type: "food",
  },
  {
    time: "08:30",
    label: "Leave for Court",
    detail:
      "Carry electrolyte water: 500ml + pinch salt + half lemon. Light 3 min jog warm-up before starting.",
    type: "work",
  },
  {
    time: "09:00",
    label: "Water — 500-600ml during badminton",
    detail:
      "Morning Gurgaon heat = more sweat than evening sessions. Electrolyte mix essential.",
    type: "water",
  },
  {
    time: "09:00",
    label: "BADMINTON — Morning 9-11am",
    detail:
      "Two hours. Best session of the week — fresh legs after Saturday rest. Play your best game.",
    type: "gym",
  },
  {
    time: "11:00",
    label: "Post-Badminton Stretch — 10 min",
    detail:
      "Hip flexors, calves, hamstrings, shoulders. 2 hours of badminton is serious load.",
    type: "health",
  },
  {
    time: "11:15",
    label: "Water — 300ml rehydrate",
    detail: "Rehydrate before eating after session.",
    type: "water",
  },
  {
    time: "12:00",
    label: "LUNCH — Japanese Poke Bowl",
    detail:
      "Variety day. Best option: EatFit High Protein Paneer Bowl on Zomato — order immediately after court (30 min delivery = perfect timing). OR home Poke Bowl: marinated paneer + quinoa + edamame + cucumber + carrot + soy sesame sauce. See Ingredients tab.",
    type: "food",
  },
  {
    time: "14:00",
    label: "Water — 400ml afternoon",
    detail: "Easy to forget on weekends. Set a reminder.",
    type: "water",
  },
  {
    time: "15:00",
    label: "Afternoon Rest",
    detail: "Nap max 20 min. Reading, leisure. No intense activity.",
    type: "health",
  },
  {
    time: "17:00",
    label: "Light Snack",
    detail: "Soaked almonds + 1 fruit. No evening court today.",
    type: "food",
  },
  {
    time: "20:30",
    label: "Water — 200ml with dinner",
    detail: "Earlier dinner on weekends.",
    type: "water",
  },
  {
    time: "20:30",
    label: "DINNER",
    detail:
      "Ragi roti + Moong Dal (lightest — best for sleep) + Shimla Mirch Bhurji + dahi. Eat by 21:00. After: soaked pumpkin seeds + soaked almonds. Prep Monday gym bag tonight.",
    type: "food",
  },
  {
    time: "21:00",
    label: "Last Water — 200ml",
    detail: "Earlier cut-off.",
    type: "water",
  },
  {
    time: "22:00",
    label: "Wind-Down — Protect Monday",
    detail:
      "Dim lights. Sun night especially — staying up destroys Monday energy.",
    type: "sleep",
  },
  {
    time: "22:15",
    label: "Prep Monday Gym Bag + Soak Seeds",
    detail:
      "Gym clothes out, bottle refilled, dry whey scoop in shaker, earphones charged. Soak: pumpkin seeds + almonds + walnuts overnight.",
    type: "health",
  },
  {
    time: "22:30",
    label: "Phone Down",
    detail: "Especially on weekends. Late scrolling destroys Monday energy.",
    type: "sleep",
  },
  {
    time: "22:30",
    label: "Read 30 min",
    detail: "Fiction. Light. Same every night.",
    type: "sleep",
  },
  {
    time: "23:00",
    label: "Lights Out",
    detail:
      "Same time every night. This single habit determines everything else.",
    type: "sleep",
  },
];

const SCHEDULE_TYPES = [
  { label: "Monday", sub: "Gym — Upper Push", data: MON_SCHEDULE },
  { label: "Tuesday", sub: "Gym + Badminton", data: TUE_SCHEDULE },
  { label: "Wednesday", sub: "Gym + Badminton", data: WED_SCHEDULE },
  { label: "Thursday", sub: "Badminton Only", data: THU_SCHEDULE },
  { label: "Friday", sub: "Gym — Lower Body", data: FRI_SCHEDULE },
  { label: "Saturday", sub: "Full Rest", data: SAT_SCHEDULE },
  { label: "Sunday", sub: "Morning Badminton", data: SUN_SCHEDULE },
];

// ─── WORKOUT DATA ─────────────────────────────────────────────────
const WEEKLY_TEMPLATE = [
  {
    day: "MON",
    gym: "Upper Push",
    badminton: "No badminton",
    gymColor: C.red,
    note: "Chest, shoulders, triceps. Full rest evening.",
  },
  {
    day: "TUE",
    gym: "Upper Pull",
    badminton: "Badminton 19:30",
    gymColor: C.orange,
    note: "Upper body gym + evening badminton is safe. Legs fresh for court.",
  },
  {
    day: "WED",
    gym: "Light Upper / Arms",
    badminton: "Badminton 19:30",
    gymColor: C.red,
    note: "Shorter session under 60 min. Badminton is main training today.",
  },
  {
    day: "THU",
    gym: "No gym",
    badminton: "Badminton 19:30",
    gymColor: C.muted,
    note: "Rest morning. Three consecutive active days — body needs recovery.",
  },
  {
    day: "FRI",
    gym: "Lower Full (Squat+Deadlift)",
    badminton: "No badminton",
    gymColor: C.purple,
    note: "Big leg day. Full rest evening. 48 hrs before Sunday badminton.",
  },
  {
    day: "SAT",
    gym: "Full Rest",
    badminton: "Full Rest",
    gymColor: C.muted,
    note: "Only complete rest day. Body rebuilds on rest not gym days.",
  },
  {
    day: "SUN",
    gym: "No gym",
    badminton: "Badminton 9-11am",
    gymColor: C.muted,
    note: "Morning court. Foam roll after. Full recovery before Monday.",
  },
];

const EXERCISES = [
  {
    day: "Monday",
    type: "UPPER Push",
    color: C.red,
    compounds: "Bench Press + OHP — keep 8-12 weeks",
    exercises: [
      {
        name: "Barbell Bench Press",
        tag: "COMPOUND",
        sets: "4",
        reps: "8-10",
        rest: "90s",
        note: "3s down. No bouncing.",
        vars: [
          "Wk 1-4: Flat Barbell",
          "Wk 5-8: Flat Dumbbell",
          "Wk 9-12: Barbell heavier",
        ],
      },
      {
        name: "Incline Press",
        tag: "COMPOUND",
        sets: "3",
        reps: "10-12",
        rest: "75s",
        note: "30-45 degrees. Upper chest.",
        vars: [
          "Wk 1-4: Incline DB",
          "Wk 5-8: Incline Barbell",
          "Wk 9-12: Incline Cable Fly",
        ],
      },
      {
        name: "OHP",
        tag: "COMPOUND",
        sets: "3",
        reps: "8-10",
        rest: "75s",
        note: "Brace core. No lower back arch.",
        vars: [
          "Wk 1-4: Seated DB",
          "Wk 5-8: Standing Barbell",
          "Wk 9-12: Arnold Press",
        ],
      },
      {
        name: "Lateral Raises",
        tag: "ACCESSORY",
        sets: "3",
        reps: "15-20",
        rest: "45s",
        note: "Light weight. Squeeze at top.",
        vars: ["Wk 1-4: Dumbbell", "Wk 5-8: Cable", "Wk 9-12: Machine"],
      },
      {
        name: "Tricep Isolation",
        tag: "ACCESSORY",
        sets: "3",
        reps: "12-15",
        rest: "45s",
        note: "Full lockout.",
        vars: [
          "Wk 1-4: Cable Rope Pushdown",
          "Wk 5-8: Overhead DB",
          "Wk 9-12: Close-Grip Bench",
        ],
      },
      {
        name: "Plank",
        tag: "ACCESSORY",
        sets: "3",
        reps: "45-60s",
        rest: "30s",
        note: "Glutes squeezed. No hip sag.",
        vars: [
          "Wk 1-4: Plank hold",
          "Wk 5-8: RKC Plank",
          "Wk 9-12: Shoulder taps",
        ],
      },
    ],
  },
  {
    day: "Tuesday",
    type: "UPPER Pull",
    color: C.orange,
    compounds: "Pull-Ups + Rows — keep 8-12 weeks",
    exercises: [
      {
        name: "Pull-Ups / Lat Pulldown",
        tag: "COMPOUND",
        sets: "4",
        reps: "6-10",
        rest: "90s",
        note: "Can't do 6? Use lat pulldown. Work toward bodyweight.",
        vars: [
          "Wk 1-4: Lat Pulldown wide",
          "Wk 5-8: Pull-Ups",
          "Wk 9-12: Pull-Ups + weight",
        ],
      },
      {
        name: "Bent-Over Row",
        tag: "COMPOUND",
        sets: "3",
        reps: "8-10",
        rest: "90s",
        note: "Hinge at hips. Pull to belly button.",
        vars: [
          "Wk 1-4: Barbell Row",
          "Wk 5-8: Dumbbell Row",
          "Wk 9-12: Cable Row",
        ],
      },
      {
        name: "Face Pulls",
        tag: "ACCESSORY",
        sets: "3",
        reps: "15-20",
        rest: "45s",
        note: "Crucial for posture and rotator cuff. Never skip.",
        vars: ["Wk 1-4: Cable", "Wk 5-8: Band", "Wk 9-12: Rear Delt Fly"],
      },
      {
        name: "Chest-Supported Row",
        tag: "ACCESSORY",
        sets: "3",
        reps: "12",
        rest: "60s",
        note: "Removes lower back from equation.",
        vars: ["Wk 1-4: DB on bench", "Wk 5-8: Machine", "Wk 9-12: TRX"],
      },
      {
        name: "Bicep Curl",
        tag: "ACCESSORY",
        sets: "3",
        reps: "10-12",
        rest: "45s",
        note: "Full range. No swinging.",
        vars: ["Wk 1-4: Barbell", "Wk 5-8: Incline DB", "Wk 9-12: Cable"],
      },
      {
        name: "Hammer Curls",
        tag: "ACCESSORY",
        sets: "2",
        reps: "12",
        rest: "45s",
        note: "Brachialis + forearm thickness.",
        vars: ["Wk 1-4: Alternating DB", "Wk 5-8: Cross-body", "Wk 9-12: Rope"],
      },
    ],
  },
  {
    day: "Wednesday",
    type: "Light Upper / Arms",
    color: C.red,
    compounds: "Keep under 60 min — badminton tonight",
    exercises: [
      {
        name: "Incline DB Press",
        tag: "COMPOUND",
        sets: "3",
        reps: "10-12",
        rest: "75s",
        note: "Moderate weight. Badminton tonight.",
        vars: [
          "Wk 1-4: Incline DB",
          "Wk 5-8: Cable Fly",
          "Wk 9-12: Incline Barbell",
        ],
      },
      {
        name: "Lateral Raises",
        tag: "ACCESSORY",
        sets: "3",
        reps: "15-20",
        rest: "45s",
        note: "Shoulder width.",
        vars: ["Wk 1-4: Dumbbell", "Wk 5-8: Cable", "Wk 9-12: Machine"],
      },
      {
        name: "Bicep Curl",
        tag: "ACCESSORY",
        sets: "3",
        reps: "10-12",
        rest: "45s",
        note: "Full range.",
        vars: ["Wk 1-4: Barbell", "Wk 5-8: Incline DB", "Wk 9-12: Cable"],
      },
      {
        name: "Hammer Curls",
        tag: "ACCESSORY",
        sets: "2",
        reps: "12",
        rest: "45s",
        note: "Neutral grip.",
        vars: ["Wk 1-4: Alternating DB", "Wk 5-8: Cross-body", "Wk 9-12: Rope"],
      },
      {
        name: "Tricep Pushdown",
        tag: "ACCESSORY",
        sets: "3",
        reps: "12-15",
        rest: "45s",
        note: "Full lockout. Arms only.",
        vars: [
          "Wk 1-4: Cable Rope",
          "Wk 5-8: Overhead DB",
          "Wk 9-12: Close-Grip Bench",
        ],
      },
      {
        name: "Face Pulls",
        tag: "ACCESSORY",
        sets: "3",
        reps: "15-20",
        rest: "45s",
        note: "Shoulder health. Always do on upper days.",
        vars: ["Wk 1-4: Cable", "Wk 5-8: Band", "Wk 9-12: Rear Delt Fly"],
      },
    ],
  },
  {
    day: "Friday",
    type: "LOWER Full (Squat + Deadlift)",
    color: C.purple,
    compounds: "Squat + Deadlift both — keep 8-12 weeks",
    exercises: [
      {
        name: "Barbell Back Squat",
        tag: "COMPOUND",
        sets: "4",
        reps: "8-10",
        rest: "2 min",
        note: "Depth matters. Chest up.",
        vars: [
          "Wk 1-4: Back Squat",
          "Wk 5-8: Front Squat",
          "Wk 9-12: Back Squat heavier",
        ],
      },
      {
        name: "Conventional Deadlift",
        tag: "COMPOUND",
        sets: "4",
        reps: "5-8",
        rest: "2 min",
        note: "Form first. No rounding the back.",
        vars: ["Wk 1-4: Conventional", "Wk 5-8: Sumo", "Wk 9-12: Trap Bar"],
      },
      {
        name: "Romanian Deadlift",
        tag: "COMPOUND",
        sets: "3",
        reps: "10-12",
        rest: "90s",
        note: "Hip hinge. Feel hamstring stretch.",
        vars: [
          "Wk 1-4: Barbell RDL",
          "Wk 5-8: DB RDL",
          "Wk 9-12: Single-Leg RDL",
        ],
      },
      {
        name: "Bulgarian Split Squat",
        tag: "COMPOUND",
        sets: "3",
        reps: "10 each",
        rest: "90s",
        note: "Hardest exercise. Single-leg strength for badminton.",
        vars: [
          "Wk 1-4: Bodyweight/light DB",
          "Wk 5-8: Heavier DB",
          "Wk 9-12: Barbell BSS",
        ],
      },
      {
        name: "Leg Curl",
        tag: "ACCESSORY",
        sets: "3",
        reps: "12-15",
        rest: "45s",
        note: "Slow 3s eccentric.",
        vars: ["Wk 1-4: Seated", "Wk 5-8: Lying", "Wk 9-12: Nordic Curls"],
      },
      {
        name: "Calf Raises",
        tag: "ACCESSORY",
        sets: "4",
        reps: "20",
        rest: "30s",
        note: "Full stretch at bottom.",
        vars: ["Wk 1-4: Standing", "Wk 5-8: Seated", "Wk 9-12: Single-Leg"],
      },
    ],
  },
  {
    day: "Tue/Wed/Thu/Sun",
    type: "BADMINTON — Your Cardio",
    color: C.green,
    compounds: "",
    exercises: [
      {
        name: "Badminton",
        tag: "",
        sets: "—",
        reps: "60-90 min",
        rest: "—",
        note: "This IS your cardio. No additional cardio needed.",
        vars: [],
      },
      {
        name: "Post-session stretch",
        tag: "",
        sets: "1",
        reps: "10 min",
        rest: "—",
        note: "Hip flexors, hamstrings, calves, rotator cuff.",
        vars: [],
      },
    ],
  },
];

// ─── MEAL DATA ─────────────────────────────────────────────────────
const MEAL_DAYS = [
  {
    label: "Monday",
    sub: "Gym Day",
    cal: "2,190 kcal",
    protein: "172g",
    carbs: "223g",
    fat: "62g",
    fiber: "35g",
    note: "Full power shake + post-workout shake.",
  },
  {
    label: "Tuesday",
    sub: "Gym + Badminton",
    cal: "2,440 kcal",
    protein: "189g",
    carbs: "258g",
    fat: "65g",
    fiber: "38g",
    note: "Highest calorie day. Rajma Rice Bowl for lunch.",
  },
  {
    label: "Wednesday",
    sub: "Gym + Badminton",
    cal: "2,440 kcal",
    protein: "189g",
    carbs: "258g",
    fat: "65g",
    fiber: "38g",
    note: "Highest calorie day. Mexican Paneer Bowl for dinner.",
  },
  {
    label: "Thursday",
    sub: "Badminton Only",
    cal: "1,940 kcal",
    protein: "143g",
    carbs: "198g",
    fat: "59g",
    fiber: "31g",
    note: "Light breakfast. Salad Bowl for lunch.",
  },
  {
    label: "Friday",
    sub: "Gym Day",
    cal: "2,190 kcal",
    protein: "172g",
    carbs: "223g",
    fat: "62g",
    fiber: "35g",
    note: "Full power shake + post-workout. Thai Noodles for dinner.",
  },
  {
    label: "Saturday",
    sub: "Full Rest",
    cal: "1,910 kcal",
    protein: "121g",
    carbs: "201g",
    fat: "62g",
    fiber: "33g",
    note: "Relaxed meals. Cheat meal optional.",
  },
  {
    label: "Sunday",
    sub: "Morning Badminton",
    cal: "1,830 kcal",
    protein: "121g",
    carbs: "191g",
    fat: "57g",
    fiber: "31g",
    note: "Light pre-court breakfast. Poke Bowl post-badminton.",
  },
];

const MEALS_BY_DAY = {
  0: [
    // Monday
    {
      label: "Power Shake",
      color: C.accent,
      items: [
        "2 bananas",
        "1.5 scoops whey (37g protein)",
        "3 tbsp rolled oats",
        "300ml Calci+ milk",
        "1 tbsp peanut butter",
        "1 tbsp ground alsi (grind DRY)",
        "1 tsp creatine (5g) — tasteless",
        "~560 kcal | 65g carbs | 46g protein",
      ],
      why: "Creatine is tasteless here. Oats give sustained energy so you don't crash mid-session.",
    },
    {
      label: "Post-Workout Shake (at gym)",
      color: C.green,
      items: [
        "1 scoop whey in 300ml water — carry dry powder",
        "1 small banana or 5 dates",
        "Drink BEFORE showering — within 20 min of last set",
        "~230 kcal | 28g protein | 25g carbs",
      ],
      why: "Muscle protein synthesis peaks now. Don't wait until office.",
    },
    {
      label: "LUNCH — Mediterranean Paneer Bowl (Mon)",
      color: C.blue,
      items: [
        "1 cup cooked quinoa OR brown rice",
        "100g paneer — grilled on dry pan with olive oil + oregano",
        "1/2 cup chickpeas — boiled",
        "Cucumber + capsicum + cherry tomatoes + red onion",
        "Dressing: 1 tbsp olive oil + lemon + salt + dried oregano",
        "150g dahi on side",
        "5 soaked walnuts",
        "~580 kcal | 36g protein | 55g carbs",
        "Alternate week: regular dal + paneer + sabzi is also fine",
      ],
      why: "Monday variety — feels restaurant quality, very clean macros. Quinoa + paneer + chickpeas = complete protein. Takes 15 min. Greenr Cafe (Golf Course Road) also has a version if ordering out.",
    },
    {
      label: "DINNER",
      color: C.purple,
      items: [
        "1-2 ragi rotis",
        "1 cup Moong Dal — lightest dal, best post-gym recovery",
        "1 cup Palak Paneer sabzi (Mon) — summer: Tinda+Paneer",
        "150g dahi",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Moong dal digests in 2 hrs — perfect for sleep quality after gym day. Ragi roti + pumpkin seeds = full magnesium coverage without any pill.",
    },
  ],
  1: [
    // Tuesday
    {
      label: "Power Shake",
      color: C.accent,
      items: [
        "2 bananas",
        "1.5 scoops whey",
        "3 tbsp oats",
        "300ml Calci+ milk",
        "1 tbsp peanut butter",
        "1 tbsp ground alsi",
        "1 tsp creatine",
        "~560 kcal | 65g carbs | 46g protein",
      ],
      why: "Gym AND badminton today — need full fuel.",
    },
    {
      label: "Post-Workout Shake (at gym)",
      color: C.green,
      items: [
        "1 scoop whey in 300ml water",
        "1 small banana or 5 dates",
        "Drink BEFORE showering",
        "~230 kcal | 28g protein",
      ],
      why: "Within 20 min of last set. Don't wait until office.",
    },
    {
      label: "LUNCH — Rajma Rice Bowl",
      color: C.blue,
      items: [
        "1 cup Rajma (Tue rotation — highest protein 29g/cup)",
        "1 cup brown rice",
        "Raw onion rings + lemon + coriander + green chilli",
        "150g dahi on side",
        "5 soaked walnuts",
        "~640 kcal | 45g protein | 75g carbs",
      ],
      why: "Same macros as regular dal/sabzi lunch, completely different experience. Highest protein dal day.",
    },
    {
      label: "Pre-Badminton Snack — 17:00 SHARP",
      color: C.orange,
      items: [
        "150g Milky Mist Skyr yogurt",
        "2 baby bananas OR 1 regular banana",
        "Eat at exactly 17:00 — 90 min before 19:30 court",
        "~250 kcal | 17g protein | 48g carbs",
      ],
      why: "90 min timing is deliberate. Eating closer = heavy legs and cramps on court.",
    },
    {
      label: "DINNER",
      color: C.purple,
      items: [
        "1-2 ragi rotis",
        "1 cup Toor Dal — light, classic comfort",
        "1 cup Bhindi sabzi (Tue) — winter: Gobhi+Matar",
        "150g dahi",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Toor dal is light enough for night after gym + badminton double session. Bhindi is low calorie (35 kcal/100g) — perfect light dinner sabzi.",
    },
  ],
  2: [
    // Wednesday
    {
      label: "Power Shake",
      color: C.accent,
      items: [
        "2 bananas",
        "1.5 scoops whey",
        "3 tbsp oats",
        "300ml Calci+ milk",
        "1 tbsp peanut butter",
        "1 tbsp ground alsi",
        "1 tsp creatine",
        "~560 kcal | 65g carbs | 46g protein",
      ],
      why: "Gym AND badminton today — need full fuel.",
    },
    {
      label: "Post-Workout Shake (at gym)",
      color: C.green,
      items: [
        "1 scoop whey in 300ml water",
        "1 small banana or 5 dates",
        "Drink BEFORE showering",
        "~230 kcal | 28g protein",
      ],
      why: "Within 20 min of last set.",
    },
    {
      label: "LUNCH — Dal + Paneer + Sabzi",
      color: C.blue,
      items: [
        "2 whole wheat rotis OR 1 cup brown rice",
        "1 cup Masoor Dal (Wed rotation — fastest, no soak)",
        "100g paneer OR 150g tofu",
        "1 cup Methi sabzi (Wed) — summer: Tori",
        "150g dahi",
        "Salad + 5 soaked walnuts",
        "~640 kcal | 50g protein | 70g carbs",
      ],
      why: "Masoor cooks in 15 min — good for Wed when you're busy with gym + office + badminton.",
    },
    {
      label: "Pre-Badminton Snack — 17:00 SHARP",
      color: C.orange,
      items: [
        "150g Milky Mist Skyr yogurt",
        "2 baby bananas OR 1 regular banana",
        "Eat at exactly 17:00 — 90 min before court",
        "~250 kcal | 17g protein | 48g carbs",
      ],
      why: "90 min timing. Eating closer = cramps.",
    },
    {
      label: "DINNER — Mexican Paneer Bowl",
      color: C.purple,
      items: [
        "Order: Burrp or Burrito Project on Zomato",
        "OR make at home in 20 min",
        "100g paneer + brown rice/quinoa + rajma + capsicum + corn + fresh salsa + hung curd",
        "Skip sour cream. Ask extra paneer.",
        "~580 kcal | 38g protein | 65g carbs",
      ],
      why: "Wed is highest calorie day — Mexican Bowl hits macros perfectly and feels like a treat.",
    },
  ],
  3: [
    // Thursday
    {
      label: "Light Breakfast — No Gym Today",
      color: C.orange,
      items: [
        "1 banana",
        "1 scoop whey in 250ml water",
        "Soaked almonds + soaked walnuts",
        "1 tsp creatine in the whey water",
        "~280 kcal | 32g carbs | 28g protein",
      ],
      why: "No gym today. Lighter breakfast keeps calorie deficit. Creatine daily even on non-gym days.",
    },
    {
      label: "LUNCH — High Protein Salad Bowl",
      color: C.blue,
      items: [
        "Order Salad Days (Udyog Vihar) or Green Bunz (Sector 31) on Zomato",
        "BYOS: quinoa + paneer (extra) + chickpeas + cucumber + capsicum + olive oil lemon dressing",
        "Add 150g Skyr dahi at home for extra protein",
        "~520 kcal | 34g protein | 48g carbs",
      ],
      why: "Thu badminton-only — lighter lunch, fresh legs for 19:30 court.",
    },
    {
      label: "Pre-Badminton Snack — 17:00 SHARP",
      color: C.orange,
      items: [
        "150g Milky Mist Skyr yogurt",
        "2 baby bananas OR 1 regular banana",
        "Eat at exactly 17:00 — 90 min before court",
        "~250 kcal | 17g protein | 48g carbs",
      ],
      why: "90 min timing. Eating closer = heavy legs.",
    },
    {
      label: "DINNER",
      color: C.purple,
      items: [
        "1-2 ragi rotis",
        "1 cup Masoor Dal — fastest digest, no soaking needed",
        "1 cup greens sabzi (Gobhi+Matar — winter / Arbi — summer)",
        "150g dahi",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Masoor at night is lighter than Chana Dal — digests faster after evening badminton. Chana Dal reserved for Thu lunch rotation.",
    },
  ],
  4: [
    // Friday
    {
      label: "Power Shake",
      color: C.accent,
      items: [
        "2 bananas",
        "1.5 scoops whey",
        "3 tbsp oats",
        "300ml Calci+ milk",
        "1 tbsp peanut butter",
        "1 tbsp ground alsi",
        "1 tsp creatine",
        "~560 kcal | 65g carbs | 46g protein",
      ],
      why: "Full fuel for heavy leg day — squats and deadlifts need maximum energy.",
    },
    {
      label: "Post-Workout Shake (at gym)",
      color: C.green,
      items: [
        "1 scoop whey in 300ml water",
        "1 small banana or 5 dates",
        "Drink BEFORE showering",
        "~230 kcal | 28g protein",
      ],
      why: "Within 20 min of last set. Muscle protein synthesis peaks now.",
    },
    {
      label: "LUNCH — Dal + Paneer + Sabzi",
      color: C.blue,
      items: [
        "2 whole wheat rotis OR 1 cup brown rice",
        "1 cup Mix Dal (Fri — moong+masoor+toor = complete amino acids)",
        "100g paneer OR 150g tofu",
        "1 cup Baingan Bharta (Fri — year round)",
        "150g dahi",
        "Salad + 5 soaked walnuts",
        "~640 kcal | 50g protein | 70g carbs",
      ],
      why: "Mix Dal = complete amino acid profile in one bowl. Friday is your best nutrition day.",
    },
    {
      label: "DINNER — Thai Peanut Noodles with Paneer",
      color: C.purple,
      items: [
        "50g whole wheat or rice noodles",
        "100g paneer — cubed and pan fried golden",
        "1 capsicum + 1 carrot — sliced",
        "Peanut sauce: 1 tbsp PB + 1 tbsp soy + 1 tsp honey + lemon + chilli flakes + 2 tbsp water",
        "Sesame seeds + spring onion on top",
        "~520 kcal | 34g protein | 48g carbs",
        "OR: Burma Burma Cyber Hub dine-in (book ahead)",
      ],
      why: "Friday leg day — you deserve something special. 15 min at home or dine-in Burma Burma.",
    },
  ],
  5: [
    // Saturday
    {
      label: "Relaxed Breakfast — Paneer Poha",
      color: C.orange,
      items: [
        "1.5 cups poha — washed and soaked 5 min",
        "50-75g paneer — crumbled in at the end",
        "Tadka: mustard seeds + curry leaves + onion + haldi + green chilli",
        "Squeeze of lemon + coriander on top",
        "150g dahi on side",
        "1 tsp creatine in water or milk",
        "~420 kcal | 22g protein | 52g carbs",
      ],
      why: "Paneer poha hits protein + carbs for Saturday. Sit down and enjoy slowly. Rest day.",
    },
    {
      label: "LUNCH or CHEAT MEAL — Your Choice",
      color: C.purple,
      items: [
        "OPTION A Clean: Toor Dal + Lauki+Chana sabzi + rotis + dahi",
        "OPTION B Cheat: Anything you want — chole bhature, biryani, pizza, burger, paneer tikka",
        "Greenr Cafe (Golf Course Road): Garden Veg Pizza + Pesto Spaghetti",
        "Roots Cafe (Sector 29): wood-fired pizza + shikanji",
        "Can be breakfast, lunch or dinner — ONE meal only",
        "Rules: still have protein today, creatine taken, +500ml water",
      ],
      why: "One cheat meal per week resets leptin and keeps you consistent long term. You earned it.",
    },
    {
      label: "DINNER",
      color: C.purple,
      items: [
        "1-2 ragi rotis",
        "1 cup Toor Dal (Sat rotation)",
        "1 cup Lauki sabzi or greens",
        "150g dahi",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "Eat by 21:00",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Light dinner on rest day. Earlier than weekdays — better sleep quality.",
    },
  ],
  6: [
    // Sunday
    {
      label: "Pre-Badminton Breakfast — Eat by 07:45",
      color: C.orange,
      items: [
        "150g Milky Mist Skyr yogurt",
        "1 banana or 2 baby bananas",
        "1 tsp creatine mixed into yogurt",
        "Eat by 07:30-07:45 — 90 min before 9am court",
        "~230 kcal | 17g protein | 32g carbs",
        "NO almonds or nuts — fat too slow to digest, heavy on court",
      ],
      why: "Same 90 min window as evening badminton, just earlier for morning court.",
    },
    {
      label: "LUNCH — Japanese Poke Bowl",
      color: C.blue,
      items: [
        "Best: EatFit High Protein Paneer Bowl on Zomato — order within 30 min of finishing court",
        "OR home: 100g marinated paneer + 1 cup quinoa + edamame + cucumber + carrot + soy sesame sauce",
        "~600 kcal | 40g protein | 65g carbs",
      ],
      why: "Order EatFit immediately after badminton — 30 min delivery = perfect post-sport timing.",
    },
    {
      label: "DINNER",
      color: C.purple,
      items: [
        "1-2 ragi rotis",
        "1 cup Moong Dal — lightest, best for sleep",
        "1 cup greens sabzi (Shimla Mirch Bhurji — year round)",
        "150g dahi",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "Eat by 21:00",
        "~530 kcal | 40g protein | 55g carbs",
      ],
      why: "Moong dal at night = lightest dal, digests in 2 hrs. Chole moved to Sunday lunch where it belongs. Ragi roti = magnesium for deep sleep.",
    },
  ],
};

const CHEAT_FOODS = [
  { item: "Chole Bhature", note: "Classic. Go for it.", ok: true },
  { item: "Veg Biryani", note: "Comfort perfection.", ok: true },
  { item: "Pizza 2-3 slices", note: "Fine. Not the whole box.", ok: true },
  { item: "Burger", note: "Fine. Skip triple fries.", ok: true },
  {
    item: "Paneer Tikka",
    note: "Actually high protein — barely a cheat.",
    ok: true,
  },
  { item: "Pani Puri or Chaat", note: "Light, fun.", ok: true },
  {
    item: "Alcohol",
    note: "Max 2 drinks. Ruins sleep and recovery more than any food cheat.",
    ok: false,
  },
  {
    item: "Eating junk all day",
    note: "One cheat MEAL not a full cheat DAY.",
    ok: false,
  },
  {
    item: "Skipping creatine",
    note: "Still 5g in water. 10 seconds.",
    ok: false,
  },
];

const VARIETY_ROTATION = [
  {
    day: "Monday",
    meal: "LUNCH",
    dish: "Mediterranean Paneer Bowl",
    restaurant: "Home cooked (15 min) OR Greenr Cafe (Golf Course Road)",
    zomato:
      "Greenr Cafe on Zomato: Grilled Paneer Bowl. OR Salad Days BYOS: quinoa + paneer + chickpeas + olive oil lemon dressing.",
    order:
      "Quinoa + grilled paneer + chickpeas + cucumber + capsicum + cherry tomatoes + olive oil lemon dressing. Dahi on side.",
    macros: "580 kcal | 36g protein | 55g carbs",
  },
  {
    day: "Tuesday",
    meal: "LUNCH",
    dish: "Rajma Rice Bowl",
    restaurant: "Any dhaba near office OR home",
    zomato: "Search Rajma Rice on Zomato — most dhabas Rs 150-200",
    order: "Rajma + brown rice + raw onion + lemon + coriander + dahi on side",
    macros: "640 kcal | 45g protein | 75g carbs",
  },
  {
    day: "Wednesday",
    meal: "DINNER",
    dish: "Mexican Paneer Bowl",
    restaurant: "Burrp / The Burrito Project on Zomato Gurgaon",
    zomato:
      "Search Burrito Bowl Paneer. Ask: brown rice, extra paneer, no sour cream.",
    order: "Paneer bowl + rajma + capsicum + corn + salsa. No sour cream.",
    macros: "580 kcal | 38g protein | 65g carbs",
  },
  {
    day: "Thursday",
    meal: "LUNCH",
    dish: "High Protein Salad Bowl",
    restaurant: "Salad Days (Udyog Vihar) or Green Bunz (Sector 31) on Zomato",
    zomato: "Salad Days: Build Your Own. Green Bunz: Green Rice Bowl.",
    order:
      "BYOS: quinoa + paneer + chickpeas + cucumber + capsicum + olive oil lemon dressing. Add Skyr dahi at home.",
    macros: "520 kcal | 34g protein | 48g carbs",
  },
  {
    day: "Friday",
    meal: "DINNER",
    dish: "Thai Peanut Noodles with Paneer",
    restaurant:
      "Home cooked 15 min OR Burma Burma Cyber Hub (dine-in, book ahead)",
    zomato:
      "Burma Burma Cyber Hub — dine-in only. Order: Khao Suey + Shan Noodles.",
    order:
      "Home: 50g noodles + 100g paneer + peanut sauce (PB + soy + honey + lemon + chilli)",
    macros: "520 kcal | 34g protein | 48g carbs",
  },
  {
    day: "Saturday",
    meal: "LUNCH Cheat",
    dish: "Wood-Fired Pizza or Pasta",
    restaurant: "Greenr Cafe (Golf Course Road) — best veg pizza in Gurgaon",
    zomato: "Greenr on Zomato: Garden Veg Pizza + Pesto Spaghetti",
    order:
      "Garden Veg Pizza (whole wheat base) + Pesto Spaghetti. Dine-in Saturday afternoon.",
    macros: "Cheat meal — enjoy it",
  },
  {
    day: "Sunday",
    meal: "LUNCH Post-Badminton",
    dish: "Japanese Poke Bowl",
    restaurant: "EatFit on Zomato (quickest) OR Imly Cafe (Sector 47) dine-in",
    zomato:
      "EatFit: any paneer bowl 500+ kcal. Order within 30 min of finishing badminton.",
    order: "EatFit High Protein Paneer Bowl + dahi on side.",
    macros: "600 kcal | 40g protein | 65g carbs",
  },
];

const DAL_ROTATION = [
  {
    day: "Mon",
    dal: "Moong Dal",
    protein: "~24g/cup",
    why: "Lightest, easiest to digest. Best post-gym day.",
    cook: "2 whistles. Tadka: ghee + jeera + hing + haldi + tomato + ginger.",
  },
  {
    day: "Tue",
    dal: "Rajma",
    protein: "~29g/cup",
    why: "Highest protein. Make as Rice Bowl for variety.",
    cook: "Soak overnight. 4-5 whistles. Thick masala gravy.",
  },
  {
    day: "Wed",
    dal: "Masoor Dal",
    protein: "~26g/cup",
    why: "Fastest — 15 min, no soaking needed.",
    cook: "No soak. 2 whistles. Mustard seeds + curry leaves + tomato.",
  },
  {
    day: "Thu",
    dal: "Chana Dal",
    protein: "~27g/cup",
    why: "Lowest glycemic index. Stable energy for court.",
    cook: "Soak 1 hour. 3 whistles. Works as dal or dry fry.",
  },
  {
    day: "Fri",
    dal: "Mix Dal (moong+masoor+toor)",
    protein: "~25g/cup",
    why: "Complete amino acid profile in one bowl.",
    cook: "Equal parts. 2 whistles. Simple jeera + haldi + tomato.",
  },
  {
    day: "Sat",
    dal: "Toor Dal",
    protein: "~22g/cup",
    why: "Classic comfort. B vitamins. Rest day.",
    cook: "3 whistles. Ghee + jeera + hing + tomato + amchur.",
  },
  {
    day: "Sun",
    dal: "Chole",
    protein: "~20g/cup",
    why: "Highest fibre. Gut health. Active recovery day.",
    cook: "Soak overnight. 5-6 whistles.",
  },
];

const SABZI_ROTATION = [
  {
    day: "Mon",
    sabzi: "Palak Paneer",
    why: "Highest magnesium + iron + Vit K. Paneer = 18g protein/100g.",
    cook: "Blanch spinach, blend. Cook with paneer. Use dahi instead of cream.",
    seasons: {
      avail: "Winter (Oct-Mar) peak",
      alt: "Summer/Monsoon: Tinda+Paneer OR Kaddu+Paneer OR Paneer Bhurji",
    },
  },
  {
    day: "Tue",
    sabzi: "Bhindi Masala (dry)",
    why: "35 kcal/100g. High zinc. Light on upper pull day.",
    cook: "Dry only. Mustard seeds + onion + tomato + amchur. Don't cover.",
    seasons: {
      avail: "Summer+Monsoon (Apr-Sep) peak",
      alt: "Winter: Gobhi+Matar OR Gajar Matar OR French Beans",
    },
  },
  {
    day: "Wed",
    sabzi: "Methi Sabzi",
    why: "High magnesium + iron. Reduces inflammation.",
    cook: "Rough chop. Jeera + onion + garlic + tomato. 8 min max.",
    seasons: {
      avail: "Winter (Oct-Mar) peak",
      alt: "Summer/Monsoon: Tori (ridge gourd) OR Karela",
    },
  },
  {
    day: "Thu",
    sabzi: "Gobhi + Matar",
    why: "Vit C + B6. Peas = 5g protein/half cup.",
    cook: "Dry sabzi. Jeera + onion + ginger-garlic + tomato.",
    seasons: {
      avail: "Winter (Oct-Mar) peak",
      alt: "Summer/Monsoon: Arbi OR Kathal OR Tinda+Matar (frozen peas ok)",
    },
  },
  {
    day: "Fri",
    sabzi: "Baingan Bharta",
    why: "25 kcal/100g. Nasunin antioxidant. Year-round.",
    cook: "Roast on flame until charred. Peel, mash. Mustard seeds + onion + tomato.",
    seasons: {
      avail: "Year-round — no swap needed",
      alt: "Winter bonus: Add fresh matar into bharta",
    },
  },
  {
    day: "Sat",
    sabzi: "Lauki + Chana",
    why: "Lauki = 96% water. Perfect rest day light digestion.",
    cook: "Lauki + soaked chana in pressure cooker. Jeera + tomato. Dahi at end.",
    seasons: {
      avail: "Summer+Monsoon (Apr-Sep) peak",
      alt: "Winter: Sarson ka Saag OR Palak+Chana",
    },
  },
  {
    day: "Sun",
    sabzi: "Shimla Mirch + Paneer Bhurji",
    why: "Capsicum = highest Vit C. Bhurji = 22g protein, 10 min.",
    cook: "Crumble paneer. Cook with onion + capsicum + tomato + haldi.",
    seasons: {
      avail: "Year-round — no swap needed",
      alt: "Winter bonus: Add spinach or methi into bhurji",
    },
  },
];

const CALORIE_CYCLING = [
  {
    day: "Gym Day (Mon/Fri)",
    cal: "2,190 kcal",
    note: "Full shake + post-workout shake.",
  },
  {
    day: "Gym + Badminton (Tue/Wed)",
    cal: "2,440 kcal",
    note: "Highest calorie day — gym AND court.",
  },
  {
    day: "Badminton Only (Thu)",
    cal: "1,940 kcal",
    note: "Light breakfast, no post-workout shake.",
  },
  {
    day: "Full Rest (Sat)",
    cal: "1,910 kcal",
    note: "Relaxed meals. Cheat meal optional.",
  },
  {
    day: "Morning Badminton (Sun)",
    cal: "1,830 kcal",
    note: "Light pre-court breakfast. Bigger post-badminton lunch.",
  },
];

const AVOID = [
  "Maida / refined flour — swap to whole wheat always",
  "Fruit juices — eat whole fruit. Juice = sugar without fibre",
  "Eating dinner after 22:00 — disrupts sleep quality",
  "Skipping post-workout shake — the most common mistake",
  "Alcohol — empty calories + kills testosterone + destroys sleep",
  "Packaged healthy snacks — most protein bars are 40%+ sugar",
  "Under-eating below 2,000 kcal — slows metabolism, destroys muscle",
];

// ─── SLEEP DATA ────────────────────────────────────────────────────
const SLEEP_PROTOCOL = [
  {
    time: "16:00",
    action: "Last Coffee Cut-Off",
    why: "Half-life 5-6 hrs. Coffee at 4pm = half in blood at 10pm.",
  },
  {
    time: "22:00",
    action: "Dim All Lights",
    why: "Overhead lighting suppresses melatonin. Bedside lamp only.",
  },
  {
    time: "22:15",
    action: "No Social Media or News",
    why: "Doom scrolling raises cortisol. 50+ min less sleep for regular phone-before-bed users.",
  },
  {
    time: "22:30",
    action: "Phone Outside Bedroom",
    why: "45 min more sleep on average without phone in room.",
  },
  {
    time: "22:30",
    action: "Read for 30 min",
    why: "Physical book or Kindle warm mode. Fiction best. Shifts brain to sleep mode.",
  },
  {
    time: "23:00",
    action: "Lights Out",
    why: "7.5 hrs = 5 full 90-min cycles. Growth hormone, muscle repair, fat metabolism all peak here.",
  },
  {
    time: "07:30",
    action: "Wake Up — Zero Snooze",
    why: "Snooze fragments sleep and worsens grogginess. One alarm.",
  },
  {
    time: "07:31",
    action: "Sunlight Within 5 Min",
    why: "Resets circadian clock. Sets you up to feel sleepy at 23:00 tonight.",
  },
];

const BOOKS = [
  "Atomic Habits — James Clear (literally about building this exact system)",
  "Shoe Dog — Phil Knight (engaging non-fiction, not stressful)",
  "A Man Called Ove — Fredrik Backman (light fiction, absorbing)",
  "The Psychology of Money — Morgan Housel (short chapters, perfect before bed)",
];

// ─── GOALS DATA ────────────────────────────────────────────────────
const STATS_CURRENT = {
  Weight: "86-90 kg",
  Height: "183 cm",
  "Body Fat": "23-25%",
  "Muscle Mass": "~33 kg",
  TDEE: "~2,650 kcal",
};
const STATS_TARGET = {
  Weight: "78-82 kg",
  "Body Fat": "14-16%",
  "Muscle Mass": "38-40 kg",
  Timeline: "10-14 months",
};

const WEEKLY_TARGETS = [
  {
    metric: "Gym sessions",
    target: "4x/week (Mon/Tue/Wed/Fri)",
    why: "Every muscle hit twice a week = maximum stimulus",
  },
  {
    metric: "Badminton",
    target: "4x/week (Tue/Wed/Thu/Sun)",
    why: "Built-in cardio. No treadmill needed.",
  },
  {
    metric: "Protein daily",
    target: "121-189g by day type",
    why: "~1.8g/kg bodyweight",
  },
  {
    metric: "Sleep",
    target: "7.5 hrs (23:00-07:30)",
    why: "Non-negotiable. Sleep less = more fat, less muscle",
  },
  {
    metric: "Water",
    target: "3.5-4L active / 3L rest",
    why: "Gym + badminton + Gurgaon summer",
  },
];

const MILESTONES = [
  {
    week: "1-2",
    goal: "Establish routine. Don't miss gym. Hit protein target.",
  },
  {
    week: "3-4",
    goal: "Add creatine. Weight may go up 0.5-1kg (water in muscles) — good sign.",
  },
  {
    week: "5-8",
    goal: "Strength increases noticeably on compounds. Plan is working.",
  },
  {
    week: "9-12",
    goal: "First visible mirror change. Waist drops. Arms and chest fuller.",
  },
  {
    week: "13-26",
    goal: "Significant recomposition. Reassess calories as you build muscle.",
  },
  {
    week: "26+",
    goal: "Maintenance phase. Higher calories. New baseline. Easy to keep.",
  },
];

const TRACKING = [
  "Weigh Mon+Wed+Fri morning after bathroom before food. Use 3-day average.",
  "Monthly photos: front, side, back. Same lighting, same time.",
  "Log every gym set in Notes app. Progressive overload IS the metric.",
  "Measure waist at navel every 2 weeks. Dropping = fat loss.",
  "Energy, mood, how clothes fit all improve before scale moves.",
];

// ─── INGREDIENTS DATA ──────────────────────────────────────────────
const INGREDIENTS = [
  {
    day: "Monday",
    meal: "Lunch",
    dish: "Mediterranean Paneer Bowl",
    note: "15 min at home. Grill paneer on a dry pan — makes a huge difference vs plain paneer. Alternate weeks use regular dal/sabzi if you prefer.",
    sections: [
      {
        title: "Ingredients",
        items: [
          "1 cup quinoa OR brown rice — cooked",
          "100g paneer — grilled with olive oil + oregano + salt",
          "1/2 cup chickpeas — boiled or canned",
          "1 cucumber — diced",
          "1 capsicum (any colour) — diced",
          "10 cherry tomatoes — halved",
          "1 small red onion — sliced",
          "5 soaked walnuts — on the side",
          "150g Skyr dahi — on the side",
        ],
      },
      {
        title: "Dressing (mix together)",
        items: [
          "1 tbsp olive oil",
          "Juice of half lemon",
          "Pinch of dried oregano",
          "Salt and pepper to taste",
        ],
      },
      {
        title: "If ordering out",
        items: [
          "Greenr Cafe (Golf Course Road) — Grilled Paneer Bowl",
          "Salad Days BYOS: quinoa + paneer + chickpeas + cucumber + capsicum + olive oil lemon dressing (NOT creamy dressing)",
          "Skip: croutons, cheese, ranch",
        ],
      },
    ],
  },
  {
    day: "Tuesday",
    meal: "Lunch",
    dish: "Rajma Rice Bowl",
    note: "Soak rajma overnight — mandatory. Make extra, refrigerate, use through week.",
    sections: [
      {
        title: "Rajma",
        items: [
          "1 cup dry rajma — soaked overnight",
          "2 onions — chopped",
          "2 tomatoes — pureed",
          "1 tsp grated ginger",
          "4 garlic cloves",
          "1 green chilli",
          "1 bay leaf",
          "1 tsp cumin seeds",
          "1 tsp rajma masala",
          "1/2 tsp haldi",
          "1/2 tsp red chilli powder",
          "1/2 tsp garam masala",
          "Salt to taste",
          "1 tsp ghee",
        ],
      },
      {
        title: "Bowl Assembly",
        items: [
          "1 cup brown rice — cooked",
          "Raw onion rings",
          "Fresh coriander",
          "Half lemon squeezed",
          "150g dahi on side",
        ],
      },
    ],
  },
  {
    day: "Wednesday",
    meal: "Dinner",
    dish: "Mexican Paneer Bowl",
    note: "20 min. Make salsa fresh — takes 5 min and makes huge difference.",
    sections: [
      {
        title: "Paneer",
        items: [
          "100g paneer — cubed",
          "1/2 tsp cumin powder",
          "1/2 tsp red chilli powder",
          "1/2 tsp paprika",
          "1 garlic clove minced",
          "Salt + 1 tsp oil",
        ],
      },
      {
        title: "Bowl",
        items: [
          "1 cup brown rice or quinoa",
          "1/2 cup rajma or chole",
          "1/2 cup sweet corn",
          "1 capsicum — diced",
          "1 onion — diced",
          "2 tbsp hung curd",
        ],
      },
      {
        title: "Fresh Salsa (5 min)",
        items: [
          "2 tomatoes — chopped",
          "1 small onion — chopped",
          "1 green chilli",
          "Fresh coriander",
          "Half lemon + salt + chaat masala",
        ],
      },
    ],
  },
  {
    day: "Thursday",
    meal: "Lunch",
    dish: "High Protein Salad Bowl",
    note: "Order Salad Days or Green Bunz on Zomato. Or 15 min at home.",
    sections: [
      {
        title: "Salad Days BYOS — Tell them",
        items: [
          "Base: Quinoa",
          "Protein: Paneer extra portion",
          "Add: Chickpeas",
          "Add: Cucumber, capsicum, tomatoes",
          "Dressing: Olive oil + lemon (NOT creamy)",
          "Skip: Croutons, cheese, ranch",
        ],
      },
      {
        title: "Home Version",
        items: [
          "1 cup cooked quinoa",
          "100g paneer — grilled on dry pan",
          "1/2 cup chickpeas — boiled",
          "1 cucumber + 1 capsicum + tomatoes",
          "Dressing: 1 tbsp olive oil + lemon + salt + oregano",
          "150g Skyr yogurt on side",
        ],
      },
    ],
  },
  {
    day: "Friday",
    meal: "Dinner",
    dish: "Thai Peanut Noodles with Paneer",
    note: "15 min at home. Peanut sauce is the star. Or Burma Burma Cyber Hub.",
    sections: [
      {
        title: "Noodles + Paneer",
        items: [
          "50g whole wheat or rice noodles",
          "100g paneer — cubed",
          "1 capsicum — sliced",
          "1 carrot — julienned",
          "2 spring onions",
          "1 tsp sesame seeds + 1 tsp oil",
        ],
      },
      {
        title: "Peanut Sauce",
        items: [
          "1 tbsp peanut butter (natural)",
          "1 tbsp soy sauce",
          "1 tsp honey",
          "Half lemon squeezed",
          "1/2 tsp red chilli flakes",
          "2 tbsp water to thin",
          "1 garlic clove (optional)",
        ],
      },
      {
        title: "Burma Burma (Cyber Hub dine-in)",
        items: [
          "Order: Khao Suey — must order",
          "Add: Shan Noodles or Tea Leaf Rice",
          "Book table 2 hrs ahead",
          "20 min from Sector 83 via NH48",
        ],
      },
    ],
  },
  {
    day: "Saturday",
    meal: "Breakfast",
    dish: "Paneer Poha",
    note: "Quick 15 min. Paneer adds the protein that plain poha lacks.",
    sections: [
      {
        title: "Ingredients",
        items: [
          "1.5 cups poha — rinse and soak 5 min",
          "50-75g paneer — crumbled",
          "1 small onion — finely chopped",
          "1 tsp mustard seeds",
          "1/2 tsp haldi",
          "1-2 green chillies",
          "8-10 curry leaves",
          "Salt to taste",
          "1 tsp oil",
          "Half lemon + fresh coriander",
          "150g dahi on side",
        ],
      },
      {
        title: "Method",
        items: [
          "Heat oil, add mustard seeds till they pop",
          "Add curry leaves + green chilli + onion — cook 2 min",
          "Add haldi + soaked poha — mix gently",
          "Cook 3-4 min on low heat",
          "Add crumbled paneer at the very end — mix gently (don't overcook paneer)",
          "Squeeze lemon + coriander on top",
          "Serve with dahi on side",
        ],
      },
    ],
  },
  {
    day: "Saturday",
    meal: "Cheat Meal Options",
    dish: "Greenr Cafe or Roots Cafe",
    note: "Dine-in Saturday afternoon — great outing.",
    sections: [
      {
        title: "Greenr Cafe (Golf Course Road)",
        items: [
          "Garden Vegetable Pizza — ask for whole wheat base",
          "Pesto Spaghetti — their best dish per reviews",
          "Asparagus Tempura Sushi (optional)",
        ],
      },
      {
        title: "Roots Cafe (Sector 29)",
        items: [
          "Wood-fired pizza (any veg topping)",
          "Shikanji — their signature drink",
          "Outdoor seating in greenery",
          "Opposite Kingdom of Dreams",
        ],
      },
    ],
  },
  {
    day: "Sunday",
    meal: "Lunch",
    dish: "Japanese Poke Bowl",
    note: "Order EatFit within 30 min of finishing. Or marinate paneer night before.",
    sections: [
      {
        title: "EatFit on Zomato (quickest)",
        items: [
          "Any High Protein Paneer Bowl 500+ kcal",
          "Add dahi on side",
          "Order immediately after badminton — 30 min delivery = perfect timing",
        ],
      },
      {
        title: "Home Poke Bowl",
        items: [
          "100g paneer — marinate overnight: soy sauce + sesame oil + honey + garlic",
          "1 cup brown rice or quinoa",
          "1/2 cup edamame — boil 3 min from frozen (Big Basket)",
          "1 cucumber + 1 carrot — sliced",
          "Half avocado if available",
          "Sesame seeds on top",
          "Sauce: 1 tbsp soy + 1/2 tsp sesame oil + 1 tsp rice vinegar + 1 tsp honey",
        ],
      },
    ],
  },
];

const GROCERY = [
  "Rajma (500g) — soak overnight before Tuesday",
  "Brown rice (1kg) — Tue/Wed/Sun base",
  "Quinoa (500g) — Thu salad + Sun poke bowl",
  "Paneer (500g) — used in all 6 dishes",
  "Whole wheat or rice noodles (250g) — Friday",
  "Edamame frozen (200g) — Sunday (Big Basket)",
  "Peanut butter natural (1 jar) — Friday sauce",
  "Soy sauce (1 bottle) — Friday + Sunday marinade",
  "Sesame oil (small bottle) — Friday + Sunday",
  "Sesame seeds — garnish Fri + Sun",
  "Capsicum 3-4 — Wed/Thu/Fri",
  "Cherry tomatoes — Thursday salad",
  "Sweet corn frozen or canned — Wednesday",
  "Avocado — Sunday (optional)",
  "Poha (500g) — Saturday breakfast",
];

// ─── COMPONENT ─────────────────────────────────────────────────────
export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [scheduleDay, setScheduleDay] = useState(0);
  const [mealDay, setMealDay] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedEx, setExpandedEx] = useState<string | null>(null);

  const btn = (active: boolean) => ({
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${active ? C.accent : C.border}`,
    cursor: "pointer",
    fontSize: 11,
    textAlign: "left" as const,
    background: active ? "#1a1a00" : C.card,
    color: active ? C.accent : C.textDim,
    fontWeight: active ? 700 : 400,
  });

  const currentSchedule = SCHEDULE_TYPES[scheduleDay].data;
  const currentMeals = (MEALS_BY_DAY as any)[mealDay] || [];

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: "Inter,-apple-system,sans-serif",
        color: C.text,
        padding: "16px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: C.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: C.bg,
            }}
          >
            V
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>
              VAIBHAV TRANSFORMATION PLAN
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>
              27M · 183cm · 86-90kg · 23-25% BF · Vegetarian · Gurgaon
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#1a1a00",
            border: `1px solid ${C.dim}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 11,
            color: C.accent,
          }}
        >
          Goal: Body recomposition — slow fat loss 0.3-0.4kg/week, build muscle,
          raise metabolism. 10-14 months.
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 5,
          marginBottom: 16,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {TABS.map((t: string, i: number) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              ...btn(activeTab === i),
              whiteSpace: "nowrap",
              padding: "8px 12px",
              fontSize: 12,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SCHEDULE TAB */}
      {activeTab === 0 && (
        <div>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              SELECT DAY
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {SCHEDULE_TYPES.map((st: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setScheduleDay(i)}
                  style={btn(scheduleDay === i)}
                >
                  <div style={{ fontSize: 12, fontWeight: 700 }}>
                    {st.label}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                    {st.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {currentSchedule.map((item: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{ minWidth: 48, textAlign: "right", paddingTop: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>
                  {item.time}
                </div>
              </div>
              <div
                style={{
                  width: 2,
                  background: C.border,
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.accent,
                    position: "absolute",
                    top: 12,
                    left: -3,
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "10px 12px",
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
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {item.label}
                  </span>
                  <Badge type={item.type} />
                </div>
                <div
                  style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}
                >
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WORKOUT TAB */}
      {activeTab === 1 && (
        <div>
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.accent,
                marginBottom: 4,
              }}
            >
              4-Day Upper/Lower Split — Mon, Tue, Wed, Fri
            </div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>
              Leg days only on Friday — never on Tue/Wed/Thu when you have
              evening badminton. Upper body gym + same-day badminton is fine.
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            WEEKLY TEMPLATE
          </div>
          {WEEKLY_TEMPLATE.map((d: any, i: number) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  minWidth: 36,
                  background: C.border,
                  borderRadius: 6,
                  padding: "4px 0",
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.accent,
                }}
              >
                {d.day}
              </div>
              <div
                style={{
                  flex: 1,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                }}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: d.gymColor }}
                  >
                    {d.gym}
                  </span>
                  <span style={{ fontSize: 11, color: C.muted }}>·</span>
                  <span style={{ fontSize: 11, color: C.textDim }}>
                    {d.badminton}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
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
              margin: "12px 0",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#ffcc00",
                marginBottom: 4,
              }}
            >
              PROGRESSIVE OVERLOAD
            </div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.7 }}>
              Every 1-2 weeks: add 2.5-5kg to bar, OR 1 more rep, OR reduce rest
              by 10s. Log every set. Keep compounds same for months — swap 1-2
              accessories every 4 weeks only.
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            TAP DAY TO SEE EXERCISES
          </div>
          {EXERCISES.map((day: any, i: number) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                marginBottom: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  cursor: "pointer",
                  borderLeft: `4px solid ${day.color}`,
                }}
                onClick={() => setExpandedDay(expandedDay === i ? null : i)}
              >
                <div>
                  <div
                    style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}
                  >
                    {day.day}
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: day.color }}
                  >
                    {day.type}
                  </div>
                  {day.compounds ? (
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                      {day.compounds}
                    </div>
                  ) : null}
                </div>
                <div style={{ fontSize: 16, color: C.muted }}>
                  {expandedDay === i ? "▲" : "▼"}
                </div>
              </div>
              {expandedDay === i && (
                <div style={{ padding: "0 14px 14px" }}>
                  {day.exercises.map((ex: any, j: number) => {
                    const k = i + "-" + j;
                    return (
                      <div
                        key={j}
                        style={{
                          borderTop: `1px solid ${C.border}`,
                          paddingTop: 10,
                          marginTop: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
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
                            {ex.tag ? (
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  background: ex.tag.startsWith("C")
                                    ? "#2a1a00"
                                    : "#1a1a2a",
                                  color: ex.tag.startsWith("C")
                                    ? C.orange
                                    : C.blue,
                                }}
                              >
                                {ex.tag}
                              </span>
                            ) : null}
                          </div>
                          <div
                            style={{ display: "flex", gap: 4, marginLeft: 8 }}
                          >
                            {ex.sets !== "—" && (
                              <span
                                style={{
                                  fontSize: 11,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  background: "#2a2a00",
                                  color: C.accent,
                                  fontWeight: 700,
                                }}
                              >
                                {ex.sets}x
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: 11,
                                padding: "2px 6px",
                                borderRadius: 4,
                                background: "#1a2a1a",
                                color: C.green,
                                fontWeight: 700,
                              }}
                            >
                              {ex.reps}
                            </span>
                            {ex.rest !== "—" && (
                              <span
                                style={{
                                  fontSize: 11,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  background: "#1a1a2a",
                                  color: C.blue,
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
                            color: C.muted,
                            fontStyle: "italic",
                            marginBottom: 4,
                          }}
                        >
                          {ex.note}
                        </div>
                        {ex.vars && ex.vars.length > 0 && (
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                color: C.orange,
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                              onClick={() =>
                                setExpandedEx(expandedEx === k ? null : k)
                              }
                            >
                              {expandedEx === k
                                ? "Hide variations"
                                : "Show 4-week variations"}
                            </div>
                            {expandedEx === k && (
                              <div
                                style={{
                                  marginTop: 4,
                                  paddingLeft: 8,
                                  borderLeft: `2px solid ${C.orange}`,
                                }}
                              >
                                {ex.vars.map((v: string, m: number) => (
                                  <div
                                    key={m}
                                    style={{
                                      fontSize: 11,
                                      color: C.textDim,
                                      marginBottom: 3,
                                    }}
                                  >
                                    {v}
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

      {/* MEALS TAB */}
      {activeTab === 2 && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              SELECT DAY
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {MEAL_DAYS.map((d: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setMealDay(i)}
                  style={btn(mealDay === i)}
                >
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.label}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                    {d.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Macro banner */}
          <div
            style={{
              background: "#1a1a00",
              border: `1px solid ${C.dim}`,
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 12,
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
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>
                  Today target
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>
                  {MEAL_DAYS[mealDay].cal}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.textDim,
                  maxWidth: "50%",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                {MEAL_DAYS[mealDay].note}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { l: "Protein", v: MEAL_DAYS[mealDay].protein, c: C.green },
                { l: "Carbs", v: MEAL_DAYS[mealDay].carbs, c: C.blue },
                { l: "Fat", v: MEAL_DAYS[mealDay].fat, c: C.orange },
                { l: "Fiber", v: MEAL_DAYS[mealDay].fiber, c: C.purple },
              ].map((m: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: C.card,
                    borderRadius: 6,
                    padding: "5px 8px",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}
                  >
                    {m.l}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: m.c }}>
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Meal cards */}
          {currentMeals.map((meal: any, i: number) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `4px solid ${meal.color}`,
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                {meal.label}
              </div>
              {meal.items.map((item: string, j: number) => (
                <div
                  key={j}
                  style={{
                    fontSize: 12,
                    color: C.textDim,
                    marginBottom: 4,
                    paddingLeft: 10,
                    borderLeft: `2px solid ${C.border}`,
                  }}
                >
                  {item}
                </div>
              ))}
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: meal.color,
                  background: meal.color + "18",
                  padding: "6px 10px",
                  borderRadius: 6,
                  lineHeight: 1.6,
                }}
              >
                {meal.why}
              </div>
            </div>
          ))}
          {/* Sat cheat guide */}
          {mealDay === 5 && (
            <div
              style={{
                background: "#1a0a1a",
                border: "1px solid #7a1a7a",
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#e87aff",
                  marginBottom: 4,
                }}
              >
                Cheat Meal Guide — Any One Meal
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>
                Breakfast, lunch, or dinner — your choice. Other two stay clean.
              </div>
              {CHEAT_FOODS.map((f: any, i: number) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 8, marginBottom: 6 }}
                >
                  <span
                    style={{
                      color: f.ok ? C.green : C.red,
                      flexShrink: 0,
                      fontSize: 12,
                    }}
                  >
                    {f.ok ? "v" : "x"}
                  </span>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {f.item}{" "}
                    </span>
                    <span style={{ fontSize: 11, color: C.muted }}>
                      {f.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Variety rotation */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              VARIETY ROTATION — 3 DAYS/WEEK
            </div>
            {VARIETY_ROTATION.map((v: any, i: number) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `4px solid ${C.accent}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.accent,
                        fontWeight: 700,
                        marginBottom: 2,
                      }}
                    >
                      {v.day} · {v.meal}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {v.dish}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      background: "#1a1a00",
                      color: C.accent,
                      padding: "2px 8px",
                      borderRadius: 4,
                      marginLeft: 8,
                      flexShrink: 0,
                    }}
                  >
                    {v.macros.split("|")[0]}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.green,
                    background: "#001a00",
                    padding: "5px 8px",
                    borderRadius: 6,
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {v.restaurant}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.blue,
                    background: "#001020",
                    padding: "5px 8px",
                    borderRadius: 6,
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {v.zomato}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    background: "#0a0a00",
                    padding: "5px 8px",
                    borderRadius: 6,
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {v.order}
                </div>
                <div style={{ fontSize: 10, color: C.textDim }}>{v.macros}</div>
              </div>
            ))}
          </div>
          {/* Dal rotation */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              DAL ROTATION — ONE PER DAY
            </div>
            {DAL_ROTATION.map((d: any, i: number) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `4px solid ${C.orange}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {d.day}: {d.dal}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      background: "#2a1a00",
                      color: C.orange,
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {d.protein}
                  </span>
                </div>
                <div
                  style={{ fontSize: 11, color: C.textDim, marginBottom: 4 }}
                >
                  {d.why}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    background: "#1a1200",
                    padding: "5px 8px",
                    borderRadius: 6,
                  }}
                >
                  {d.cook}
                </div>
              </div>
            ))}
          </div>
          {/* Sabzi rotation */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              SABZI ROTATION — ONE PER DAY
            </div>
            {SABZI_ROTATION.map((s: any, i: number) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `4px solid ${C.green}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                  {s.day}: {s.sabzi}
                </div>
                <div
                  style={{ fontSize: 11, color: C.textDim, marginBottom: 4 }}
                >
                  {s.why}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    background: "#001a00",
                    padding: "5px 8px",
                    borderRadius: 6,
                    marginBottom: 4,
                  }}
                >
                  {s.cook}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.green,
                    background: "#001500",
                    padding: "4px 8px",
                    borderRadius: 6,
                    marginBottom: 4,
                  }}
                >
                  {s.seasons.avail}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#ffcc00",
                    background: "#1a1200",
                    padding: "4px 8px",
                    borderRadius: 6,
                    lineHeight: 1.5,
                  }}
                >
                  {s.seasons.alt}
                </div>
              </div>
            ))}
          </div>
          {/* Calorie cycling */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              CALORIE CYCLING BY DAY TYPE
            </div>
            {CALORIE_CYCLING.map((c: any, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div
                  style={{
                    background: C.accent,
                    color: C.bg,
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                    minWidth: 68,
                    textAlign: "center",
                  }}
                >
                  {c.cal}
                </div>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}
                  >
                    {c.day}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>{c.note}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Avoid */}
          <div
            style={{
              marginTop: 14,
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
                color: C.red,
                marginBottom: 8,
              }}
            >
              AVOID — These Kill Progress
            </div>
            {AVOID.map((a: string, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                  fontSize: 12,
                  color: C.textDim,
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: C.red, flexShrink: 0 }}>x</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLEEP TAB */}
      {activeTab === 3 && (
        <div>
          <div
            style={{
              background: "#0a0a1a",
              border: "1px solid #1a1a3a",
              borderRadius: 10,
              padding: 14,
              marginBottom: 14,
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
              Sleep is where you build muscle and lose fat
            </div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.7 }}>
              Train perfectly and eat perfectly — but sleeping 5-6 hours cuts
              results by ~40%. Target:{" "}
              <span style={{ color: C.accent, fontWeight: 700 }}>
                23:00 to 07:30 = 7.5 hrs = 5 full sleep cycles
              </span>
            </div>
          </div>
          {SLEEP_PROTOCOL.map((item: any, i: number) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 10,
                display: "flex",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 48, textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>
                  {item.time}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                  {item.action}
                </div>
                <div
                  style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}
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
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.orange,
                marginBottom: 8,
              }}
            >
              Books for Night Reading
            </div>
            {BOOKS.map((b: string, i: number) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  color: C.textDim,
                  marginBottom: 6,
                  display: "flex",
                  gap: 8,
                }}
              >
                <span style={{ color: C.orange, flexShrink: 0 }}>-</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GOALS TAB */}
      {activeTab === 4 && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                RIGHT NOW
              </div>
              {Object.entries(STATS_CURRENT).map(([k, v]: [string, string]) => (
                <div key={k} style={{ marginBottom: 6 }}>
                  <div
                    style={{ fontSize: 10, color: C.muted, marginBottom: 1 }}
                  >
                    {k}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                TARGET
              </div>
              {Object.entries(STATS_TARGET).map(([k, v]: [string, string]) => (
                <div key={k} style={{ marginBottom: 6 }}>
                  <div
                    style={{ fontSize: 10, color: C.muted, marginBottom: 1 }}
                  >
                    {k}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: C.green }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              DAILY MACROS BY DAY
            </div>
            {MEAL_DAYS.map((d: any, i: number) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `4px solid ${
                    [
                      C.red,
                      C.orange,
                      C.orange,
                      C.blue,
                      C.purple,
                      C.muted,
                      C.green,
                    ][i]
                  }`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
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
                    <div style={{ fontSize: 13, fontWeight: 700 }}>
                      {d.label}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted }}>{d.sub}</div>
                  </div>
                  <div
                    style={{
                      background: "#1a1a00",
                      color: C.accent,
                      fontSize: 14,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {d.cal}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { l: "Protein", v: d.protein, c: C.green },
                    { l: "Carbs", v: d.carbs, c: C.blue },
                    { l: "Fat", v: d.fat, c: C.orange },
                    { l: "Fiber", v: d.fiber, c: C.purple },
                  ].map((m: any, j: number) => (
                    <div
                      key={j}
                      style={{
                        background: C.bg,
                        borderRadius: 6,
                        padding: "4px 8px",
                        flex: "1 1 20%",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: C.muted,
                          marginBottom: 1,
                        }}
                      >
                        {m.l}
                      </div>
                      <div
                        style={{ fontSize: 13, fontWeight: 700, color: m.c }}
                      >
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              WEEKLY TARGETS
            </div>
            {WEEKLY_TARGETS.map((t: any, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div
                  style={{
                    background: C.accent,
                    color: C.bg,
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 10,
                    fontWeight: 800,
                    flexShrink: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  {t.target}
                </div>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}
                  >
                    {t.metric}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>{t.why}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              MILESTONE TIMELINE
            </div>
            {MILESTONES.map((m: any, i: number) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, marginBottom: 8 }}
              >
                <div
                  style={{
                    background: C.accent,
                    color: C.bg,
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 10,
                    fontWeight: 800,
                    flexShrink: 0,
                    minWidth: 52,
                    textAlign: "center",
                  }}
                >
                  Wk {m.week}
                </div>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    flex: 1,
                    fontSize: 12,
                    color: C.textDim,
                    lineHeight: 1.6,
                  }}
                >
                  {m.goal}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#001a00",
              border: "1px solid #003a00",
              borderRadius: 10,
              padding: 14,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.green,
                marginBottom: 8,
              }}
            >
              How to Track Progress
            </div>
            {TRACKING.map((t: string, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                  fontSize: 12,
                  color: C.textDim,
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}
                >
                  {i + 1}.
                </span>
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#1a1500",
              border: "1px solid #3a3000",
              borderRadius: 10,
              padding: 14,
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
              The Honest Truth
            </div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.8 }}>
              At 23-25% body fat you are in the ideal zone for recomposition.
              The first 8 weeks feel slow. Months 4-9 are where you will visibly
              transform. The biggest killer is{" "}
              <span style={{ color: C.accent, fontWeight: 700 }}>
                inconsistency not imperfect execution
              </span>
              . A 70% plan done every week beats a perfect plan done 3 weeks
              then abandoned. Show up Monday.
            </div>
          </div>
        </div>
      )}

      {/* INGREDIENTS TAB */}
      {activeTab === 5 && (
        <div>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              marginBottom: 4,
              letterSpacing: 1,
            }}
          >
            VARIETY MEAL INGREDIENTS
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              marginBottom: 14,
              lineHeight: 1.6,
            }}
          >
            Full ingredient lists for all variety dishes. Save before grocery
            shopping.
          </div>
          {INGREDIENTS.map((dish: any, i: number) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                marginBottom: 14,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#1a1a00",
                  padding: "10px 12px",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: C.accent,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {dish.day} · {dish.meal}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{dish.dish}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {dish.note}
                </div>
              </div>
              <div style={{ padding: "10px 12px" }}>
                {dish.sections.map((section: any, j: number) => (
                  <div
                    key={j}
                    style={{
                      marginBottom: j < dish.sections.length - 1 ? 12 : 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.accent,
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {section.title}
                    </div>
                    {section.items.map((item: string, k: number) => (
                      <div
                        key={k}
                        style={{ display: "flex", gap: 8, marginBottom: 4 }}
                      >
                        <span
                          style={{
                            color: C.green,
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          -
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: C.textDim,
                            lineHeight: 1.5,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                    {j < dish.sections.length - 1 && (
                      <div
                        style={{
                          borderBottom: `1px solid ${C.border}`,
                          marginTop: 10,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            style={{
              background: "#001a00",
              border: "1px solid #003a00",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.green,
                marginBottom: 8,
              }}
            >
              Weekly Grocery List
            </div>
            {GROCERY.map((item: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: C.accent, fontSize: 12, flexShrink: 0 }}>
                  □
                </span>
                <span style={{ fontSize: 12, color: C.textDim }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 32,
          textAlign: "center",
          fontSize: 10,
          color: C.muted,
        }}
      >
        Built for Vaibhav · Gurgaon · June 2026
      </div>
    </div>
  );
}
