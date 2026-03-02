# Stage 3.4 — SOL Color System Integration (Locked Tokens)

## Objective

Integrate the finalized SOL 16-hue pill system into production.

This stage:

- Locks exact pre-validated hex tokens
- Removes all runtime color math
- Ensures ≥5.5:1 contrast floor
- Preserves light/dark symmetry
- Ensures outline pills do NOT increase overall height
- Eliminates all experimental/test code

No HSL calculations are allowed in production.

---

# 1️⃣ LOCKED COLOR TOKENS

Create:

/src/styles/tokens/colors.css

Use the exact hex values below.
Do NOT recompute.
Do NOT adjust luminance.
Do NOT regenerate from HSL.

---

## Deep Cluster

H0  
Light BG: #f4d6d6  
Light FG: #4d0a0a  
Dark BG: #3f0a0a  
Dark FG: #f7bfbf  

H18  
Light BG: #f4ddd6  
Light FG: #4d1c0a  
Dark BG: #3f140a  
Dark FG: #f7ccb8  

H210  
Light BG: #d6e4f4  
Light FG: #0a2e4d  
Dark BG: #0a2340  
Dark FG: #bfd9f7  

H225  
Light BG: #d6dcf4  
Light FG: #0a1f4d  
Dark BG: #0a1740  
Dark FG: #bfcaf7  

H245  
Light BG: #dbd6f4  
Light FG: #170a4d  
Dark BG: #120a40  
Dark FG: #c9bff7  

H265  
Light BG: #e6d6f4  
Light FG: #260a4d  
Dark BG: #1c0a40  
Dark FG: #d9bff7  

H290  
Light BG: #f0d6f4  
Light FG: #380a4d  
Dark BG: #2b0a40  
Dark FG: #eabff7  

H325  
Light BG: #f4d6e8  
Light FG: #4d0a2f  
Dark BG: #400a26  
Dark FG: #f7bfdc  

---

## Mid Cluster

H32  
Light BG: #f4e2d6  
Light FG: #4d230a  
Dark BG: #40200a  
Dark FG: #f7d2bf  

H190  
Light BG: #d6edf4  
Light FG: #0a3d4d  
Dark BG: #083340  
Dark FG: #bfe9f7  

---

## Yellow/Green Cluster

H45  
Light BG: #f4efd6  
Light FG: #4d3f0a  
Dark BG: #40370a  
Dark FG: #f7efbf  

H62  
Light BG: #eef4d6  
Light FG: #444d0a  
Dark BG: #38400a  
Dark FG: #eaf7bf  

H85  
Light BG: #e3f4d6  
Light FG: #334d0a  
Dark BG: #2b400a  
Dark FG: #daf7bf  

H110  
Light BG: #dbf4d6  
Light FG: #1f4d0a  
Dark BG: #16400a  
Dark FG: #cdf7bf  

H145  
Light BG: #d6f4e2  
Light FG: #0a4d26  
Dark BG: #0a401d  
Dark FG: #bff7d9  

H165  
Light BG: #d6f4ed  
Light FG: #0a4d3c  
Dark BG: #0a4033  
Dark FG: #bff7ea  

---

# 2️⃣ Create `<Pill />` Component

Create:

/src/components/ui/Pill.astro

Props:

- type: "subject" | "grade"
- hue: number
- label: string
- href?: string

---

# 3️⃣ Pill Rendering Rules

## SOLID (Subject)

Light Mode:
- background: Light BG
- color: Light FG

Dark Mode:
- background: Dark BG
- color: Dark FG

---

## OUTLINE (Grade)

Light Mode:
- border: 3px solid Light BG
- color: Light FG
- background: transparent

Dark Mode:
- border: 3px solid Dark BG
- color: Dark FG
- background: transparent

---

# 4️⃣ CRITICAL: Height Parity Requirement

Outline pills MUST maintain identical visual height as solid pills.

Implementation requirements:

- Use `box-sizing: border-box`
- Explicitly set fixed vertical padding
- Compensate for 3px stroke by reducing internal padding
- Outline height must equal solid height exactly

Example guideline:

If solid uses:
padding: 0.35rem 0.75rem;

Outline must use:
padding: calc(0.35rem - 3px) 0.75rem;

OR

Use:
height: Xpx;
line-height: Xpx;
and remove vertical padding entirely.

Under no circumstances should outline pills increase vertical rhythm or dominate the layout.

---

# 5️⃣ SOL Subject Mapping (Staggered)

Subjects in this exact order:

Adult Education  
Family Life Education  
Career and Technical (CTE)  
Fine Arts  
Computer Science  
Health Education  
Digital Learning Integration  
History and Social Science  
Driver Education  
Mathematics  
Economics & Personal Finance  
Physical Education  
English  
Science  
English as a Second Language  
World Language  

---

# 6️⃣ Grade Mapping (Staggered)

Grade 1  
Grade 9  
Grade 2  
Grade 10  
Grade 3  
Grade 11  
Grade 4  
Grade 12  
Grade 5  
Grade 13  
Grade 6  
Grade 14  
Grade 7  
Grade 15  
Grade 8  
Grade 16  

---

# 7️⃣ Integration Locations

Replace legacy pills on:

- Browse by Subject
- Browse by Grade
- Lesson cards
- Lesson plan metadata header

No inline color values allowed.

All colors must reference locked tokens.

---

# 8️⃣ Hover Behavior

Hover must:

- translateY(-1px)
- subtle box-shadow
- no hue change
- no saturation change

---

# 9️⃣ Remove Experimental Code

Delete:

/experimental/
Any contrast calculators
Any runtime HSL math

---

# Acceptance Criteria

- All solids ≥ 5.5:1
- Outline pills identical height to solids
- No layout shift
- No color recomputation
- Build passes
- Lighthouse accessibility ≥ 95