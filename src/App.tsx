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
      "Blend: 2 bananas + 1.5 scoops whey + 3 tbsp oats + 300ml Calci+ milk + 1 tbsp peanut butter + 1 tbsp ground alsi + 1 tsp creatine. ~810 kcal (verified — the old 560 figure was wrong). Drink fast.",
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
    label: "LUNCH — Rajma Chawal Bowl",
    detail:
      "1 cup rajma + 1 cup brown rice + raw onion rings + lemon + coriander + 150g dahi on side + 5 soaked walnuts. Rajma cooks once on Sunday, eats through the week. ~620 kcal | 41g protein.",
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
    label: "DINNER — Paneer Poke Bowl",
    detail:
      "120g marinated paneer (soy + lemon + garlic) pan fried + brown rice or quinoa + cucumber + carrot + edamame (boiled from frozen, NOT roasted) + sesame soy sauce. Light, high protein, digests well before sleep. 15 min. ~735 kcal | 39g protein. See Ingredients tab.",
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
    label: "LUNCH — Mexican Paneer Bowl",
    detail:
      "120g paneer + brown rice or quinoa + 1/2 cup rajma + capsicum + corn + fresh salsa. Burrp / Burrito Project on Zomato, or home in 20 min. ~780 kcal | 38g protein.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER — Tofu Buddha Bowl",
    detail:
      "200g tofu (non-dairy — lighter after the gym + badminton double) + quinoa + broccoli + French beans + peanut-tahini sauce. NO dahi at night — triggers cough. Finish by 21:45. After: soaked pumpkin seeds + soaked almonds. ~610 kcal | 39g protein.",
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
    label: "LUNCH — Chole Chawal Bowl",
    detail:
      "1 cup chole + 1 cup brown rice + 100g paneer + raw onion + lemon + 150g dahi on side. Highest-calorie day, and the burn matches it. ~860 kcal | 45g protein.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER — Paneer Burrito Bowl",
    detail:
      "120g paneer + brown rice or quinoa + rajma + capsicum + corn + fresh salsa. Burrp or Burrito Project on Zomato, or home in 20 min. Ask for no sour cream, no hung curd — dairy at night triggers cough. ~780 kcal | 38g protein. See Ingredients tab.",
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
    label: "LUNCH — Masoor Dal + Paneer Bhurji",
    detail:
      "Dal-sabzi slot 1 of 3. 2 rotis + 1 cup masoor dal + paneer bhurji with 120g paneer (onion + capsicum + tomato). Winter: add palak or methi into the bhurji. Summer: extra capsicum. ~760 kcal | 49g protein.",
    type: "food",
  },
  ...POST_LUNCH,
  ...BADMINTON_BLOCK,
  ...LATE_DINNER,
  {
    time: "21:15",
    label: "DINNER — Soya Keema Bowl",
    detail:
      "Your one soya day of the week. 50g dry soya chunks (soaked, squeezed, minced) cooked keema-style with onion + tomato + peas, over brown rice. NO dahi at night — triggers cough. Finish by 21:45. After: soaked pumpkin seeds + soaked almonds. ~560 kcal | 33g protein.",
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
    label: "LUNCH — Mexican Paneer Bowl",
    detail:
      "120g paneer + brown rice or quinoa + 1/2 cup rajma + capsicum + corn + fresh salsa. Best nutrition day of the week — leg day earns it. ~780 kcal | 38g protein.",
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
    label: "DINNER — Thai Peanut Paneer Bowl",
    detail:
      "Home in 15 min, or Burma Burma Cyber Hub (book ahead). 120g paneer + brown rice or quinoa base + capsicum + carrot + peanut sauce (PB + soy + honey + lemon + chilli). Bowl base, not noodles. ~700 kcal | 34g protein. See Ingredients tab.",
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
      "Paneer Poha — 1.5 cups poha + 100g crumbled paneer + onion + mustard seeds + haldi + lemon, 150g dahi on side. Sit down and enjoy slowly. 1 tsp creatine in water or milk. ~690 kcal | 32g protein.",
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
    label: "LUNCH — WEEKLY CHEAT MEAL",
    detail:
      "This is the cheat meal, not an option. Chole bhature / biryani / pizza / burger / paneer tikka — whatever you're craving. Greenr Cafe (Golf Course Road): Garden Veg Pizza + Pesto Spaghetti. Roots Cafe (Sector 29): wood-fired pizza. Rules stay: get some protein in, take creatine, +500ml water. Clean fallback if you'd rather: 150g paneer bowl.",
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
    label: "DINNER — Toor Dal + Baingan Bharta",
    detail:
      "Dal-sabzi slot 2 of 3. 2 ragi rotis + 1.5 cups Toor Dal + Baingan Bharta as a pure sabzi — no paneer forced in, that combo isn't a real dish. Winter swap: Sarson ka Saag or Palak. NO dahi at night — triggers cough. Eat by 21:00. After: soaked pumpkin seeds + soaked almonds. ~570 kcal | 24g protein.",
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
      "Best option: EatFit High Protein Paneer Bowl on Zomato — order immediately after court (30 min delivery = perfect timing). OR home Poke Bowl: 130g marinated paneer + quinoa + edamame (boiled from frozen, NOT roasted) + cucumber + carrot + soy sesame sauce. ~760 kcal | 43g protein. See Ingredients tab.",
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
    label: "DINNER — Moong Dal + Shimla Mirch Paneer Bhurji",
    detail:
      "Dal-sabzi slot 3 of 3. 2 ragi rotis + 1 cup Moong Dal (lightest, best for sleep) + Shimla Mirch + Paneer Bhurji with 120g paneer — a real everyday combo, year-round. Winter bonus: palak or methi into the bhurji. NO dahi at night — triggers cough. Eat by 21:00. After: soaked pumpkin seeds + soaked almonds. Prep Monday gym bag. ~640 kcal | 36g protein.",
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
// Totals recomputed from published per-ingredient values (Jul 20 audit).
// The old numbers under-counted calorie-dense staples — besan, oats, paneer,
// rice, milk — by 200-250 kcal a meal on the heavy days.
const MEAL_DAYS = [
  {
    label: "Monday",
    sub: "Gym Day",
    cal: "2,395 kcal",
    protein: "166g",
    carbs: "279g",
    fat: "68g",
    fiber: "36g",
    note: "Power shake (real 810 kcal) + post-workout. Rajma Chawal lunch, Poke Bowl dinner.",
  },
  {
    label: "Tuesday",
    sub: "Gym + Badminton",
    cal: "2,680 kcal",
    protein: "180g",
    carbs: "306g",
    fat: "81g",
    fiber: "40g",
    note: "Mexican Paneer Bowl lunch. Tofu Buddha Bowl dinner — non-dairy after the double session.",
  },
  {
    label: "Wednesday",
    sub: "Gym + Badminton",
    cal: "2,930 kcal",
    protein: "186g",
    carbs: "351g",
    fat: "87g",
    fiber: "42g",
    note: "Highest day both ways — burn on gym+court days runs 3,000-3,500, so this still sits in deficit.",
  },
  {
    label: "Thursday",
    sub: "Badminton Only",
    cal: "1,850 kcal",
    protein: "127g",
    carbs: "212g",
    fat: "54g",
    fiber: "33g",
    note: "Dal-sabzi lunch (Masoor + Paneer Bhurji). Soya Keema dinner — the one soya day.",
  },
  {
    label: "Friday",
    sub: "Gym Day",
    cal: "2,520 kcal",
    protein: "158g",
    carbs: "266g",
    fat: "85g",
    fiber: "36g",
    note: "Leg day. Mexican Paneer Bowl lunch, Thai Peanut Paneer Bowl dinner.",
  },
  {
    label: "Saturday",
    sub: "Full Rest",
    cal: "~2,300 kcal",
    protein: "85g",
    carbs: "230g",
    fat: "70g",
    fiber: "30g",
    note: "Includes the weekly cheat lunch (~800-1,000 kcal, varies). Clean part is ~1,460 kcal / 62g protein.",
  },
  {
    label: "Sunday",
    sub: "Morning Badminton",
    cal: "1,830 kcal",
    protein: "102g",
    carbs: "179g",
    fat: "75g",
    fiber: "30g",
    note: "Light pre-court breakfast. Poke Bowl (130g paneer) post-badminton, dal-sabzi dinner.",
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
        "~810 kcal | 93g carbs | 58g protein (verified — old 560 figure was wrong)",
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
      label: "LUNCH — Rajma Chawal Bowl (Mon)",
      color: C.blue,
      items: [
        "1 cup rajma — cooked (highest-protein legume you eat, 29g/cup)",
        "1 cup brown rice",
        "Raw onion rings + lemon + coriander + green chilli",
        "150g dahi on side — dahi at lunch is fine, only nights are the problem",
        "5 soaked walnuts",
        "~620 kcal | 41g protein | 92g carbs",
      ],
      why: "Cook rajma once on Sunday, eat it Monday and Thursday. Chilla/paratha lunch dropped — besan is 387 kcal/100g and the old card under-counted it by ~180 kcal.",
    },
    {
      label: "DINNER — Paneer Poke Bowl",
      color: C.purple,
      items: [
        "120g paneer — marinate 10 min in soy sauce + lemon + garlic + chilli flakes, then pan fry golden",
        "1 cup brown rice or quinoa — cooked",
        "1/2 cup edamame — boil from frozen 3 min in salted water. NOT roasted — needs to be soft for the bowl",
        "1 cucumber — sliced",
        "1 carrot — julienned",
        "Sesame soy sauce: 1 tbsp soy + 1/2 tsp sesame oil + 1 tsp honey + 1 tsp rice vinegar",
        "Sesame seeds on top",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~735 kcal | 39g protein | 69g carbs",
      ],
      why: "Light, no heavy spices, digests in 2 hrs — ideal before sleep. Paneer up to 120g so the bowl carries real protein. Much better recovery sleep than dal + sabzi on gym nights.",
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
        "~810 kcal | 93g carbs | 58g protein (verified — old 560 figure was wrong)",
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
      label: "LUNCH — Mexican Paneer Bowl",
      color: C.blue,
      items: [
        "120g paneer — cubed, cooked with cumin + paprika + chilli",
        "1 cup brown rice or quinoa",
        "1/2 cup rajma (leftover from Monday)",
        "1 capsicum + 1/2 cup sweet corn + fresh salsa",
        "Order: Burrp or The Burrito Project on Zomato — extra paneer, no sour cream",
        "~780 kcal | 38g protein | 85g carbs",
      ],
      why: "Gym + badminton day needs the calories. Order it or build it at home in 20 min from Monday's leftover rajma.",
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
      label: "DINNER — Tofu Buddha Bowl",
      color: C.purple,
      items: [
        "200g tofu — cubed, pan fried with soy + garlic",
        "1 cup quinoa",
        "1 cup broccoli + French beans — steamed 4 min",
        "Peanut-tahini sauce: 1 tbsp PB + 1 tbsp soy + lemon + chilli + water to thin",
        "NO dahi at night — triggers cough",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~610 kcal | 39g protein | 55g carbs",
      ],
      why: "Fully non-dairy, which is what you want at night after a gym + badminton double. Tofu is ~12g protein/100g, so 200g carries the meal without paneer's fat load. Tofu is not the soya-chunk day — that stays Thursday only.",
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
        "~810 kcal | 93g carbs | 58g protein (verified — old 560 figure was wrong)",
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
      label: "LUNCH — Chole Chawal Bowl",
      color: C.blue,
      items: [
        "1 cup chole — soaked overnight, pressure cooked",
        "1 cup brown rice",
        "100g paneer — cubed, pan fried, tossed in",
        "Raw onion + lemon + green chilli + coriander",
        "150g dahi on side",
        "~860 kcal | 45g protein | 100g carbs",
      ],
      why: "Wednesday is the biggest day — gym plus court, burn runs 3,000-3,500. This is the one lunch that earns its calories. Old card said 640 kcal; verified, it was 890.",
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
      label: "DINNER — Paneer Burrito Bowl",
      color: C.purple,
      items: [
        "Order: Burrp or Burrito Project on Zomato",
        "OR make at home in 20 min",
        "120g paneer + 1 cup brown rice or quinoa + 1/2 cup rajma + 1 capsicum + 1/2 cup sweet corn + fresh salsa",
        "Skip sour cream AND hung curd — dairy at night triggers cough. Ask extra paneer instead.",
        "~780 kcal | 38g protein | 85g carbs",
      ],
      why: "Wed is the highest calorie day and the burn matches it. No burrito place nearby? Home shortcut: rajma + rice + chopped onion + tomato + lemon + coriander + green chilli = same flavour in 10 min with leftover rajma. Extra paneer replaces the protein hung curd used to add.",
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
      label: "LUNCH — Masoor Dal + Paneer Bhurji (dal-sabzi day)",
      color: C.blue,
      items: [
        "2 whole wheat rotis",
        "1 cup Masoor Dal — no soak, 15 min",
        "Paneer Bhurji with 120g paneer — onion + capsicum + tomato + haldi, 10 min, no gravy",
        "Winter: add palak or methi into the bhurji. Summer: extra capsicum.",
        "150g dahi on side — lunch only",
        "~760 kcal | 49g protein | 74g carbs",
      ],
      why: "One of your 3 dal-sabzi slots. Bhurji cooks in 10 min with no gravy, and the extra paneer is what pulls Thursday's protein up. Paneer bhurji also shows up Sunday dinner — same dish, different dal, so vary the veg if it starts feeling repetitive.",
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
      label: "DINNER — Soya Keema Bowl",
      color: C.purple,
      items: [
        "50g dry soya chunks — soak 15 min in hot water, squeeze dry, mince in a grinder",
        "Cook keema-style: onion + tomato + ginger-garlic + garam masala + 1/2 cup peas",
        "1 cup brown rice",
        "NO dahi at night — triggers cough",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "~560 kcal | 33g protein | 58g carbs",
      ],
      why: "Your one soya day of the week — this is the only slot it appears in, as you asked. Soya chunks are ~52g protein per 100g dry, so 50g does the work of 250g paneer at a fraction of the calories, which is what keeps Thursday light before court.",
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
        "~810 kcal | 93g carbs | 58g protein (verified — old 560 figure was wrong)",
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
      label: "LUNCH — Mexican Paneer Bowl",
      color: C.blue,
      items: [
        "120g paneer — cubed, cooked with cumin + paprika + chilli",
        "1 cup brown rice or quinoa",
        "1/2 cup rajma",
        "1 capsicum + 1/2 cup sweet corn + fresh salsa",
        "Order: Burrp or The Burrito Project on Zomato — extra paneer, no sour cream",
        "~780 kcal | 38g protein | 85g carbs",
      ],
      why: "Same bowl as Tuesday, and that's deliberate — one ordering habit, two days. Leg day earns the calories.",
    },
    {
      label: "DINNER — Thai Peanut Paneer Bowl",
      color: C.purple,
      items: [
        "120g paneer — cubed and pan fried golden",
        "1 cup brown rice or quinoa — bowl base, not noodles",
        "1 capsicum + 1 carrot — sliced",
        "Peanut sauce: 1 tbsp PB + 1 tbsp soy + 1 tsp honey + lemon + chilli flakes + 2 tbsp water",
        "Sesame seeds + spring onion on top",
        "~700 kcal | 34g protein | 63g carbs",
        "OR: Burma Burma Cyber Hub dine-in (book ahead)",
      ],
      why: "Friday leg day — you deserve something different. 15 min at home. Noodles swapped for a rice/quinoa base so it matches the rest of the week's bowls and carries more protein. No paneer? Burma Burma Cyber Hub (book ahead) or any EatFit paneer bowl on Zomato.",
    },
  ],
  5: [
    // Saturday
    {
      label: "Relaxed Breakfast — Paneer Poha",
      color: C.orange,
      items: [
        "1.5 cups poha — washed and soaked 5 min",
        "100g paneer — crumbled in at the end",
        "Tadka: mustard seeds + curry leaves + onion + haldi + green chilli",
        "Squeeze of lemon + coriander on top",
        "150g dahi on side",
        "1 tsp creatine in water or milk",
        "~690 kcal | 32g protein | 70g carbs",
      ],
      why: "Paneer up from 60g to 100g — Saturday was the weakest protein day of the week and breakfast is the easiest place to fix it. Sit down and enjoy slowly. Rest day.",
    },
    {
      label: "LUNCH — WEEKLY CHEAT MEAL",
      color: C.purple,
      items: [
        "This is the cheat meal — not an option, the plan",
        "Chole bhature, biryani, pizza, burger, paneer tikka, pav bhaji — whatever you're craving",
        "Greenr Cafe (Golf Course Road): Garden Veg Pizza + Pesto Spaghetti",
        "Roots Cafe (Sector 29): wood-fired pizza + shikanji",
        "Rules that stay: get some protein in, creatine taken, +500ml water",
        "Clean fallback if you'd rather: 150g paneer bowl + salad",
        "Typically ~800-1,000 kcal — varies, and that's fine",
      ],
      why: "One cheat meal per week resets leptin and keeps you consistent long term. Fixed to Saturday lunch so it's a decision you don't make seven times a week.",
    },
    {
      label: "DINNER — Toor Dal + Baingan Bharta (dal-sabzi day)",
      color: C.purple,
      items: [
        "2 ragi rotis",
        "1.5 cups Toor Dal — bumped from 1 cup to carry the protein",
        "Baingan Bharta as a pure sabzi — no paneer in it",
        "Winter swap: Sarson ka Saag or Palak. Summer: Bhindi or Tori.",
        "NO dahi at night — triggers cough",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "Eat by 21:00",
        "~570 kcal | 24g protein | 95g carbs",
      ],
      why: "Baingan bharta + paneer is not a dish anyone makes — it got forced in to hit a protein number and then removed. The dal portion carries it instead. Rest day, so 24g at dinner is fine; the cheat lunch already covered the calories.",
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
        "OR home: 130g marinated paneer + 1 cup quinoa + 1/2 cup edamame (boil from frozen 3 min in salted water — NOT roasted) + 1 cucumber + 1 carrot + soy sesame sauce",
        "~760 kcal | 43g protein | 62g carbs",
      ],
      why: "Order EatFit within 30 min of finishing court — delivery timing = perfect. No EatFit? Alternatives: (1) Home: leftover dal + rice + dahi — quick and clean. (2) Any nearby restaurant: paneer dish + roti + dahi. (3) Dhaba: dal fry + 2 rotis + salad. The poke bowl is the ideal but any protein + carb combo works post-badminton.",
    },
    {
      label: "DINNER — Moong Dal + Shimla Mirch Paneer Bhurji (dal-sabzi day)",
      color: C.purple,
      items: [
        "2 ragi rotis",
        "1 cup Moong Dal — lightest, best for sleep",
        "Shimla Mirch + Paneer Bhurji with 120g paneer — a real everyday combo, year-round",
        "Winter bonus: palak or methi into the bhurji",
        "NO dahi at night — triggers cough",
        "AFTER: soaked pumpkin seeds + soaked almonds",
        "Eat by 21:00",
        "~640 kcal | 36g protein | 60g carbs",
      ],
      why: "Moong dal at night = lightest dal, digests in 2 hrs. Paneer up to 120g — Sunday was one of the low-protein days and the bhurji is the natural place to fix it. Ragi roti = magnesium for deep sleep.",
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

// Weekly bowl plan — every lunch and dinner, one entry per day.
const VARIETY_ROTATION = [
  {
    day: "Monday",
    meal: "LUNCH + DINNER",
    dish: "Rajma Chawal Bowl / Paneer Poke Bowl",
    restaurant: "Home cooked — rajma from Sunday's batch, poke bowl 15 min",
    zomato:
      "Nothing to order. Edamame from the Big Basket frozen section — frozen, never roasted.",
    order:
      "Lunch: rajma + brown rice + onion + lemon + dahi. Dinner: 120g marinated paneer + rice/quinoa + edamame + cucumber + carrot + sesame soy sauce.",
    macros: "Lunch 620 kcal | 41g protein  ·  Dinner 735 kcal | 39g protein",
  },
  {
    day: "Tuesday",
    meal: "LUNCH + DINNER",
    dish: "Mexican Paneer Bowl / Tofu Buddha Bowl",
    restaurant: "Burrp or The Burrito Project on Zomato — dinner is home, 20 min",
    zomato:
      "Search Burrito Bowl Paneer. Ask: brown rice, extra paneer, no sour cream.",
    order:
      "Lunch: 120g paneer + rice + rajma + capsicum + corn + salsa. Dinner: 200g tofu + quinoa + broccoli + beans + peanut-tahini sauce.",
    macros: "Lunch 780 kcal | 38g protein  ·  Dinner 610 kcal | 39g protein",
  },
  {
    day: "Wednesday",
    meal: "LUNCH + DINNER",
    dish: "Chole Chawal Bowl / Paneer Burrito Bowl",
    restaurant: "Home lunch, Burrp or Burrito Project for dinner",
    zomato: "Same burrito order as Tuesday lunch — no sour cream, no hung curd.",
    order:
      "Lunch: chole + brown rice + 100g paneer + onion + dahi. Dinner: 120g paneer burrito bowl + rajma + corn + salsa.",
    macros: "Lunch 860 kcal | 45g protein  ·  Dinner 780 kcal | 38g protein",
  },
  {
    day: "Thursday",
    meal: "LUNCH + DINNER",
    dish: "Masoor Dal + Paneer Bhurji / Soya Keema Bowl",
    restaurant: "Both home cooked — bhurji 10 min, keema 20 min",
    zomato: "No order. Soya chunks keep in the pantry — this is the one soya day.",
    order:
      "Lunch: 2 rotis + masoor dal + 120g paneer bhurji. Dinner: 50g dry soya chunks minced keema-style + peas + brown rice.",
    macros: "Lunch 760 kcal | 49g protein  ·  Dinner 560 kcal | 33g protein",
  },
  {
    day: "Friday",
    meal: "LUNCH + DINNER",
    dish: "Mexican Paneer Bowl / Thai Peanut Paneer Bowl",
    restaurant:
      "Burrp or Burrito Project for lunch. Dinner home 15 min, OR Burma Burma Cyber Hub (dine-in, book ahead)",
    zomato: "Burma Burma Cyber Hub — dine-in only. Khao Suey + Shan Noodles.",
    order:
      "Lunch: same Mexican bowl as Tuesday. Dinner: 120g paneer + rice/quinoa base + capsicum + carrot + peanut sauce.",
    macros: "Lunch 780 kcal | 38g protein  ·  Dinner 700 kcal | 34g protein",
  },
  {
    day: "Saturday",
    meal: "CHEAT LUNCH + DINNER",
    dish: "Weekly Cheat Meal / Toor Dal + Baingan Bharta",
    restaurant:
      "Greenr Cafe (Golf Course Road) or Roots Cafe (Sector 29) — dine-in afternoon",
    zomato: "Greenr on Zomato: Garden Veg Pizza + Pesto Spaghetti.",
    order:
      "Lunch: whatever you're craving — this is the cheat. Dinner: 2 ragi rotis + 1.5 cups toor dal + baingan bharta as a pure sabzi.",
    macros: "Cheat lunch ~800-1,000 kcal  ·  Dinner 570 kcal | 24g protein",
  },
  {
    day: "Sunday",
    meal: "LUNCH + DINNER",
    dish: "Japanese Poke Bowl / Moong Dal + Shimla Mirch Paneer Bhurji",
    restaurant: "EatFit on Zomato (quickest) OR home. Dinner home cooked.",
    zomato:
      "EatFit: any High Protein Paneer Bowl 500+ kcal. Order within 30 min of finishing badminton.",
    order:
      "Lunch: 130g marinated paneer + quinoa + edamame + cucumber + carrot. Dinner: 2 ragi rotis + moong dal + 120g paneer bhurji with capsicum.",
    macros: "Lunch 760 kcal | 43g protein  ·  Dinner 640 kcal | 36g protein",
  },
];

// Only 3 dal slots left in the week — the other 11 meals are bowls.
const DAL_ROTATION = [
  {
    day: "Thu lunch",
    dal: "Masoor Dal",
    protein: "~26g/cup",
    why: "Fastest dal you have — 15 min, no soaking. Pairs with the paneer bhurji.",
    cook: "No soak. 2 whistles. Mustard seeds + curry leaves + tomato.",
  },
  {
    day: "Sat dinner",
    dal: "Toor Dal — 1.5 cups",
    protein: "~22g/cup",
    why: "Bumped to 1.5 cups because the baingan bharta beside it carries no protein. Rest day, classic comfort.",
    cook: "3 whistles. Ghee + jeera + hing + tomato + amchur.",
  },
  {
    day: "Sun dinner",
    dal: "Moong Dal",
    protein: "~24g/cup",
    why: "Lightest dal, digests in 2 hrs — the right one before an early Sunday night.",
    cook: "No soak. 2 whistles. Jeera + haldi + ghee tadka at the end.",
  },
];

// Seasonal swaps apply to the 3 dal-sabzi slots only. The bowls are year-round.
const SABZI_ROTATION = [
  {
    day: "Thu lunch",
    sabzi: "Paneer Bhurji (120g paneer)",
    why: "10 min, no gravy, and the extra paneer is what lifts Thursday's protein.",
    cook: "Crumble paneer. Onion + capsicum + tomato + haldi. Add paneer at the end — don't overcook it.",
    seasons: {
      avail: "Year-round",
      alt: "Winter (Oct-Mar): fold palak or methi into the bhurji. Summer/Monsoon (Apr-Sep): extra capsicum.",
    },
  },
  {
    day: "Sat dinner",
    sabzi: "Baingan Bharta — pure sabzi, no paneer",
    why: "25 kcal/100g, nasunin antioxidant, year-round. Paneer does NOT go in this — that combo isn't a real dish.",
    cook: "Roast on flame until charred. Peel, mash. Mustard seeds + onion + tomato.",
    seasons: {
      avail: "Year-round",
      alt: "Winter (Oct-Mar): Sarson ka Saag, Palak, Methi, Gobhi+Matar. Summer/Monsoon (Apr-Sep): Bhindi, Tori, Tinda, Arbi.",
    },
  },
  {
    day: "Sun dinner",
    sabzi: "Shimla Mirch + Paneer Bhurji (120g paneer)",
    why: "Capsicum = highest Vit C. Bhurji is a genuine everyday combo — capsicum and paneer belong together.",
    cook: "Crumble paneer. Cook with onion + capsicum + tomato + haldi. 10 min.",
    seasons: {
      avail: "Year-round",
      alt: "Winter (Oct-Mar): add spinach or methi. Summer/Monsoon (Apr-Sep): as written, capsicum is year-round.",
    },
  },
];

const CALORIE_CYCLING = [
  {
    day: "Gym Day (Mon)",
    cal: "2,395 kcal",
    note: "Real burn ~2,700-3,000. Still a deficit.",
  },
  {
    day: "Gym Day (Fri)",
    cal: "2,520 kcal",
    note: "Leg day — biggest single session of the week.",
  },
  {
    day: "Gym + Badminton (Tue)",
    cal: "2,680 kcal",
    note: "Double session. Burn runs 3,000-3,500.",
  },
  {
    day: "Gym + Badminton (Wed)",
    cal: "2,930 kcal",
    note: "Highest intake day, and the highest burn day. Near maintenance, by design.",
  },
  {
    day: "Badminton Only (Thu)",
    cal: "1,850 kcal",
    note: "Light breakfast, no post-workout shake.",
  },
  {
    day: "Full Rest (Sat)",
    cal: "~2,300 kcal",
    note: "Includes the weekly cheat lunch. Burn ~1,900-2,000 — this is the one day near maintenance without training.",
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
  TDEE: "~2,730 kcal (Whoop measured)",
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
    meal: "Dinner",
    dish: "Paneer Poke Bowl",
    note: "15 min. Lighter than dal + sabzi, digests faster before sleep. All ingredients available at home or Big Basket.",
    sections: [
      {
        title: "Paneer Marinade + Cook",
        items: [
          "120g paneer — cut into cubes",
          "1 tbsp soy sauce",
          "Half lemon squeezed",
          "1 garlic clove — minced",
          "1/2 tsp chilli flakes (optional)",
          "Marinate 10 min, then pan fry on medium heat until golden — 5 min",
        ],
      },
      {
        title: "Bowl Base",
        items: [
          "1 cup brown rice OR quinoa — cooked (can use leftover from week)",
          "1/2 cup edamame — boil frozen edamame 3 min in salted water, drain. NOT roasted — roasted edamame is a dry snack, wrong texture for a bowl. Buy frozen from Big Basket (Veeba or similar brand)",
          "1 cucumber — sliced or diced",
          "1 carrot — julienned or grated",
          "Sesame seeds for garnish",
        ],
      },
      {
        title: "Sesame Soy Sauce (2 min)",
        items: [
          "1 tbsp soy sauce",
          "1/2 tsp sesame oil",
          "1 tsp honey",
          "1 tsp rice vinegar (or regular vinegar)",
          "Mix together, drizzle over bowl",
        ],
      },
      {
        title: "After dinner",
        items: [
          "Soaked pumpkin seeds + soaked almonds",
          "These were soaked last night — grab from bowl in water",
        ],
      },
    ],
  },
  {
    day: "Monday",
    meal: "Lunch",
    dish: "Rajma Chawal Bowl",
    note: "Soak rajma Sunday night — mandatory. Make extra: it feeds Monday lunch and the Tue/Wed/Fri burrito bowls.",
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
    day: "Tuesday",
    meal: "Dinner",
    dish: "Tofu Buddha Bowl",
    note: "20 min, fully non-dairy — the right dinner after a gym + badminton double. Tofu is NOT the soya day; soya chunks stay Thursday only.",
    sections: [
      {
        title: "Tofu",
        items: [
          "200g firm tofu — pressed 10 min, cubed",
          "1 tbsp soy sauce + 1 garlic clove minced",
          "Pan fry on medium until edges are golden — 6-7 min",
        ],
      },
      {
        title: "Bowl",
        items: [
          "1 cup quinoa — cooked",
          "1 cup broccoli florets + French beans — steamed 4 min, still crunchy",
          "1 carrot — julienned raw",
          "Sesame seeds + spring onion on top",
        ],
      },
      {
        title: "Peanut-Tahini Sauce",
        items: [
          "1 tbsp peanut butter (natural)",
          "1 tbsp soy sauce",
          "Half lemon squeezed",
          "1/2 tsp chilli flakes",
          "2-3 tbsp water to thin — should pour, not sit",
        ],
      },
    ],
  },
  {
    day: "Wednesday",
    meal: "Dinner",
    dish: "Paneer Burrito Bowl",
    note: "20 min. Make salsa fresh — takes 5 min and makes huge difference.",
    sections: [
      {
        title: "Paneer",
        items: [
          "120g paneer — cubed",
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
          "NO hung curd or sour cream — dairy at night triggers cough",
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
    dish: "Masoor Dal + Paneer Bhurji",
    note: "Dal-sabzi slot 1 of 3. Bhurji is 10 min with no gravy — quicker than matar paneer and lets the paneer go up.",
    sections: [
      {
        title: "Masoor Dal",
        items: [
          "1 cup masoor dal — no soaking needed",
          "1 tomato + 1/2 onion + 1/2 tsp haldi + salt",
          "2 whistles. Tadka: ghee + jeera + hing + curry leaves",
        ],
      },
      {
        title: "Paneer Bhurji (10 min)",
        items: [
          "120g paneer — crumbled by hand",
          "1 onion + 1 capsicum + 1 tomato — finely chopped",
          "1/2 tsp haldi + 1/2 tsp red chilli + salt + 1 tsp oil",
          "Winter: fold in palak or methi. Summer: extra capsicum.",
          "Add paneer at the very end — 2 min only, or it goes rubbery",
        ],
      },
      {
        title: "Plate",
        items: [
          "2 whole wheat rotis",
          "150g dahi on side — lunch dahi is fine",
          "Salad: cucumber + tomato + onion + lemon",
        ],
      },
    ],
  },
  {
    day: "Thursday",
    meal: "Dinner",
    dish: "Soya Keema Bowl",
    note: "The one soya day of the week. 50g dry soya = ~26g protein for 260 kcal — nothing else comes close on a light day.",
    sections: [
      {
        title: "Soya Prep",
        items: [
          "50g dry soya chunks — soak 15 min in hot salted water",
          "Squeeze out ALL the water — this is what kills the raw soya smell",
          "Pulse 3-4 times in a grinder to a keema texture (don't make paste)",
        ],
      },
      {
        title: "Keema",
        items: [
          "1 onion + 1 tomato + ginger-garlic paste",
          "1/2 tsp haldi + 1/2 tsp red chilli + 1/2 tsp garam masala",
          "1/2 cup green peas (frozen fine)",
          "1 tsp oil. Cook 12-15 min until dry, not saucy",
          "Fresh coriander + lemon at the end",
        ],
      },
      {
        title: "Bowl",
        items: [
          "1 cup brown rice",
          "NO dahi at night — triggers cough",
          "AFTER: soaked pumpkin seeds + soaked almonds",
        ],
      },
    ],
  },
  {
    day: "Friday",
    meal: "Dinner",
    dish: "Thai Peanut Paneer Bowl",
    note: "15 min at home. Peanut sauce is the star. Rice or quinoa base, not noodles. Or Burma Burma Cyber Hub.",
    sections: [
      {
        title: "Base + Paneer",
        items: [
          "1 cup brown rice or quinoa — cooked",
          "120g paneer — cubed",
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
          "100g paneer — crumbled (up from 60g — Saturday needs the protein)",
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
    meal: "Dinner",
    dish: "Toor Dal + Baingan Bharta",
    note: "Dal-sabzi slot 2 of 3. Baingan bharta stands alone — no paneer forced into it.",
    sections: [
      {
        title: "Toor Dal — 1.5 cups",
        items: [
          "1.5 cups toor dal cooked (up from 1 cup — it carries the protein here)",
          "1 tomato + 1/2 tsp haldi + salt",
          "3 whistles",
          "Tadka: ghee + jeera + hing + amchur",
        ],
      },
      {
        title: "Baingan Bharta",
        items: [
          "1 large baingan — roast directly on the flame until the skin chars and it collapses",
          "Peel under cold water, mash roughly",
          "Mustard seeds + 1 onion + 2 tomatoes + green chilli + garlic",
          "Cook 10 min until the oil separates. Coriander on top.",
          "Winter swap: Sarson ka Saag or Palak. Summer: Bhindi or Tori.",
        ],
      },
      {
        title: "Plate",
        items: [
          "2 ragi rotis",
          "NO dahi at night — triggers cough",
          "Eat by 21:00. AFTER: soaked pumpkin seeds + soaked almonds",
        ],
      },
    ],
  },
  {
    day: "Saturday",
    meal: "Weekly Cheat Meal (lunch)",
    dish: "Greenr Cafe or Roots Cafe",
    note: "Dine-in Saturday afternoon — great outing. This is the cheat slot, fixed.",
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
          "130g paneer — marinate overnight: soy sauce + sesame oil + honey + garlic",
          "1 cup brown rice or quinoa",
          "1/2 cup edamame — boil 3 min from frozen in salted water, drain. NOT roasted — needs to be soft and bright green for the bowl. Frozen only (Big Basket)",
          "1 cucumber + 1 carrot — sliced",
          "Half avocado if available",
          "Sesame seeds on top",
          "Sauce: 1 tbsp soy + 1/2 tsp sesame oil + 1 tsp rice vinegar + 1 tsp honey",
        ],
      },
    ],
  },
  {
    day: "Sunday",
    meal: "Dinner",
    dish: "Moong Dal + Shimla Mirch Paneer Bhurji",
    note: "Dal-sabzi slot 3 of 3. Capsicum + paneer bhurji is a genuine everyday combo — this one belongs together.",
    sections: [
      {
        title: "Moong Dal",
        items: [
          "1 cup moong dal — lightest, digests in 2 hrs",
          "1/2 tsp haldi + salt, 2 whistles",
          "Tadka: ghee + jeera + hing",
        ],
      },
      {
        title: "Shimla Mirch Paneer Bhurji",
        items: [
          "120g paneer — crumbled by hand",
          "2 capsicum + 1 onion + 1 tomato — finely chopped",
          "1/2 tsp haldi + 1/2 tsp red chilli + salt + 1 tsp oil",
          "Winter bonus: add spinach or methi",
          "Paneer goes in last — 2 min, no longer",
        ],
      },
      {
        title: "Plate",
        items: [
          "2 ragi rotis — magnesium for deep sleep",
          "NO dahi at night — triggers cough",
          "Eat by 21:00. AFTER: soaked pumpkin seeds + soaked almonds",
          "Prep Monday gym bag before bed",
        ],
      },
    ],
  },
];

const GROCERY = [
  "Paneer (900g) — Mon 120g, Tue 120g, Wed 220g, Thu 120g, Fri 240g, Sat 100g, Sun 250g. Buy twice a week, it does not keep.",
  "Tofu firm (200g) — Tuesday dinner only",
  "Soya chunks (100g pack) — Thursday dinner ONLY. One soya day a week, that is the rule.",
  "Rajma (500g) — soak Sunday night. Monday lunch + Tue/Wed/Fri bowls.",
  "Chole (500g) — Wednesday lunch, soak overnight",
  "Masoor dal (500g) — Thursday lunch, no soak needed",
  "Toor dal (500g) — Saturday dinner, 1.5 cups",
  "Moong dal (500g) — Sunday dinner",
  "Brown rice (1kg) — the base of five bowls",
  "Quinoa (500g) — Tue Buddha bowl + Sun poke bowl + any bowl you want lighter",
  "Ragi flour — Sat + Sun dinner rotis",
  "Baingan (2 large) — Saturday dinner bharta",
  "Capsicum (6-7) — Tue/Wed/Thu/Fri/Sun",
  "Broccoli + French beans — Tuesday Buddha bowl",
  "Green peas frozen — Thursday soya keema",
  "Edamame frozen (200g) — Monday dinner + Sunday poke bowl. Buy FROZEN not roasted (Big Basket). Boil 3 min in salted water.",
  "Sweet corn frozen or canned — Wed dinner + Tue/Fri lunch bowls",
  "Soy sauce (1 bottle) — Mon/Tue/Fri/Sun",
  "Sesame oil (small bottle) — Monday + Sunday sauce",
  "Sesame seeds — garnish Mon + Tue + Fri + Sun",
  "Rice vinegar (small bottle) — Monday + Sunday sauce",
  "Peanut butter natural (1 jar) — Tue tahini sauce + Fri peanut sauce + power shake",
  "Poha (500g) — Saturday breakfast",
  "Avocado — Sunday (optional)",
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
              WEEKLY BOWL PLAN — LUNCH + DINNER
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
              DAL — 3 DAL-SABZI SLOTS
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
              SEASONAL SABZI — 3 DAL-SABZI SLOTS
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
