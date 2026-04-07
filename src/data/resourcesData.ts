import { Resource } from '../types';

const level1Resources: Omit<Resource, 'workshopId'>[] = [
  {
    id: 'facilitator-guide',
    title: 'Facilitator Guide',
    category: 'Guide',
    content: `# Facilitator Guide

> 2-hour workshop for junior devs on productive use of Copilot, Claude Code, and Windsurf with TypeScript + Node.js.

---

## Before you start

### Technical setup (30 min before)

- [ ] Projector / screen sharing working
- [ ] Your editor with **all 3 tools installed and logged in** (Copilot, Claude Code, Windsurf) — you'll switch between them during demos
- [ ] Workshop repo cloned and \`npm install\` run
- [ ] Terminal with large font (minimum 18pt)
- [ ] Shared document open (Notion, Google Doc, or similar) for the "wall of good prompts"
- [ ] Visible timer

### Pedagogical setup

- [ ] Confirm every participant has **at least one** of the tools working
- [ ] Pair up participants (pairs or trios max)
- [ ] Hand out \`01-civr-framework.md\` (printed or digital)
- [ ] Have the shared "prompt wall" doc ready

---

## Block 1 — Intro with contrast (15 min) · 0:00 → 0:15

### Goal
Create the "aha moment" in the first 10 minutes. Let them see the difference between misusing AI vs using it well — without explaining it yet.

### Live demo (10 min)

Open your editor with Copilot Chat or Claude Code. Paste this code (it's in \`exercises/01-async-debugging.md\`):

\`\`\`typescript
app.get("/users/:id/profile", async (req, res) => {
  try {
    const user = await fetchUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    const orders = fetchUserOrders(user.id); // bug: missing await
    return res.json({ user, orders });
  } catch (error) {
    return res.status(500).json({ error: "Internal error" });
  }
});
\`\`\`

**Round 1 — Bad prompt:**
> "it's not working, fix it"

Show how the AI gives a generic answer, possibly rewrites things it shouldn't, or asks vaguely.

**Round 2 — Prompt with context:**
> "I'm in Express + TypeScript. This endpoint returns \`orders\` as an empty \`{}\` object in production instead of an array. The unit test passes, but QA reports the bug in staging. I need you to: (1) identify the root cause, (2) explain WHY it happens before applying the fix, (3) propose the minimal fix. Here's the code: [paste]"

Show how the response is dramatically better: it spots the missing \`await\`, explains why \`JSON.stringify\` turns a Promise into \`{}\`, and proposes the fix.

### Quick discussion (5 min)

Open question to the group:
> "What was different between the two prompts?"

Collect answers in the shared doc. You'll use them to build the CIVR framework in the next block.

### ⚠️ Traps to avoid

- **Don't explain the framework yet.** Let them discover it.
- **Don't make the demo too perfect.** It's fine for the first round to give a bad answer.

---

## Block 2 — The 3 tools (10 min) · 0:15 → 0:25

### Goal
They should understand it's **not the same tool for everything**. Each one has its sweet spot.

### Key message

> "Copilot, Claude Code, and Windsurf aren't competitors. They're different tools for different moments of the workflow."

### Comparison table (project this)

| Tool | Lives in | Best for | Not great at |
|---|---|---|---|
| **GitHub Copilot** | Inline in your editor | Autocomplete, writing short functions, repetitive tests, boilerplate | Multi-file changes, big refactors, complex debugging |
| **Claude Code** | Terminal (CLI) | Multi-file tasks, refactors, debugging with full repo context, agentic scripts | Line-by-line suggestions while you type |
| **Windsurf** | Full IDE (VS Code fork) | Agentic pair programming, coordinated changes across files, "build this feature for me" | Offline work, pure terminal flows |

### Quick demo (3 min)

Show the same trivial task: adding a \`GET /health\` endpoint.

- **With Copilot**: start typing \`app.get("/health"\` and let it autocomplete.
- **With Claude Code**: in the terminal, run \`claude "add a GET /health endpoint that returns { status: 'ok', timestamp }"\`.
- **With Windsurf**: in the side chat, "add a health endpoint with timestamp".

Let them see the **three visually distinct flows** for the same task.

### Practical rule for juniors

> "If you already know what you want to write → **Copilot**.
> If you want someone to write it for you → **Claude Code** or **Windsurf**.
> If you're going to touch multiple files → **Claude Code** or **Windsurf**, never Copilot."

---

## Block 3 — Rules files and skills (15 min) · 0:25 → 0:40

### Goal
Teach them that modern AI tools **are not memoryless chats**. You can and should configure them to know the project.

### Key concept (explain it like this)

> "Imagine you hire a new dev. On day one you give them a README, a style guide, you tell them which libraries you use, which patterns you avoid. You have to do the same with the AI. Without that setup, it suggests code that doesn't fit your project."

### The 3 life-changing files (5 min)

Project this summary:

| Tool | File | Where it goes |
|---|---|---|
| GitHub Copilot | \`.github/copilot-instructions.md\` | Repo root |
| Claude Code | \`CLAUDE.md\` | Repo root (or subfolders) |
| Windsurf | \`.windsurfrules\` | Repo root |

All 3 tools read these files automatically and inject them as context in every interaction. **You don't have to repeat the same thing in every prompt.**

### Live demo (8 min)

1. Open the workshop repo with no rules file.
2. Ask Copilot/Claude Code to create a new endpoint \`POST /products\`.
3. Notice: it probably uses \`app.post(...)\` directly, no validation, no types, throws in \`any\`, doesn't write tests.
4. Now **add** a \`CLAUDE.md\` (you have one ready in \`rules-and-skills/03-claude-md.md\`) that says:
   - "We use Express + strict TypeScript, no \`any\`."
   - "Every route lives in \`src/routes/\` and delegates to a controller in \`src/controllers/\`."
   - "Validation with Zod."
   - "Every new endpoint needs a test in \`tests/\` with Vitest."
5. Repeat the same prompt. Now the AI respects every convention without you saying it.

### Skills (quick concept, 2 min)

> "Skills are like rules files but **modular and reusable**. Instead of dumping everything into one giant file, you split by topic: one skill for 'how to write migrations', another for 'how to test endpoints'. The AI loads only the one it needs at the moment."

Don't go deep here. Just plant the seed. Anyone who wants more finds it in \`rules-and-skills/05-reusable-skills.md\`.

---

## Block 4 — Exercise 1: Debugging with CIVR (25 min) · 0:40 → 1:05

### Goal
Internalize the CIVR framework by practicing it on a real bug.

### Introduce the CIVR framework (3 min)

Write it on the whiteboard or project it. It's the simplified version of the contrast they already saw:

| Letter | Means | Example |
|---|---|---|
| **C** | Context | "Express + TS, checkout endpoint, test passes but QA reports a bug" |
| **I** | Input | The code, the error, the logs, the stack trace |
| **V** | Validate | "Explain your reasoning BEFORE applying the fix" |
| **R** | Refine | "If the first answer doesn't convince you, ask for alternatives or more detail" |

### Exercise setup (2 min)

Each pair opens \`exercises/01-async-debugging.md\` and reads only the "Your task" section. **They should not look at the solutions section.**

### Practice (15 min)

- **5 min** — Each pair tries to fix the bug with a deliberately bad prompt ("it's not working, fix it").
- **10 min** — They rewrite the prompt using CIVR and try again.

While they practice: walk between the pairs. **Don't correct them immediately.** If you see them stuck, ask "which part of CIVR are you missing?". Let them get there themselves.

### Debrief (5 min)

Ask 2 pairs:
1. "Which prompt worked better? Read it out loud."
2. "Which part of CIVR did you forget at first?"

Stick the best prompts on the shared doc (prompt wall).

### ⚠️ If they finish fast
Have them do a second iteration: "now ask the AI to write a test that would prevent this bug in the future".

---

## Block 5 — Exercise 2: Feature + tests (30 min) · 1:05 → 1:35

### Goal
Practice an **iterative 3-step flow** instead of asking for everything at once.

### Introduce the flow (3 min)

Write this on the whiteboard:

\`\`\`
Step 1 → PLAN     "Before writing code, give me a list of steps"
Step 2 → BUILD    Implement step by step, validating each one
Step 3 → TEST     "Now generate tests with edge cases"
\`\`\`

> "The most common mistake I see in juniors is asking 'build me the complete products endpoint with tests'. The AI hands you 200 lines, you don't understand all of them, and when something fails you don't know where to look."

### Setup (2 min)

Open \`exercises/02-feature-endpoint.md\`. The task: build a \`POST /api/products\` endpoint with validation, in-memory persistence, and tests.

### Practice (20 min)

- **5 min** — Step 1: ask the AI for the plan and discuss it as a pair before accepting
- **10 min** — Step 2: implement step by step (ideally with Claude Code or Windsurf)
- **5 min** — Step 3: ask for tests with edge cases

### Debrief (5 min)

- "Which steps from the original plan changed as you implemented?"
- "How many edge cases did the AI find that you wouldn't have thought of?"
- "Did anyone use all 3 different tools? For what?"

### ⚠️ If they finish fast
Tell them: "now add a \`GET /api/products/:id\` endpoint reusing the rules file".

---

## Block 6 — Exercise 3: Understand unfamiliar code (15 min) · 1:35 → 1:50

### Goal
Show them **the most underrated use case**: using AI as an onboarding tutor when you land in a new codebase.

### Setup (2 min)

Open \`exercises/03-understand-code.md\`. It's a ~120-line file with an order processing service that mixes validation, tax calculation, discounts, and persistence. **They didn't write it.**

### Practice (10 min)

Each pair must use their favorite tool to answer these 4 questions **without reading the code line by line**:

1. What does this file do in one sentence?
2. What are the public functions (entry points)?
3. If I change the tax calculation, which tests might break?
4. Are there any obvious code smells or risks?

### Debrief (3 min)

- "How many minutes would it have taken you to understand this on your own vs with the AI?"
- "Did the AI catch anything you wouldn't have seen?"
- Key point: **"This is what you're going to do every time you land on someone else's PR or a new repo."**

---

## Block 7 — Closing and anti-patterns (10 min) · 1:50 → 2:00

### Anti-patterns (5 min)

Project this list (also in \`handouts/03-anti-patterns.md\`):

1. **Pasting code without context** → "it's not working"
2. **Accepting the first answer without reading it**
3. **Asking for huge changes in one go**
4. **Trusting libraries or functions the AI invents** → always verify they exist
5. **No rules file** → every conversation starts from zero
6. **Pasting credentials, tokens, or sensitive data** in the prompt

### Final golden rule

Repeat it three times, slowly:

> **"If you don't understand what the AI gave you, don't paste it."**

This is critical for juniors. The AI can produce code that looks right, compiles, even passes superficial tests, but if you don't understand what it does, you're responsible for any bug it causes in production.

### Closing (3 min)

- Hand out (or link) the final handouts
- Point at the workshop's "prompt wall" as a resource
- Optional homework: \`Exercise 4\` on safe refactoring
- Quick Q&A (max 2 min)

### Success metric

If anyone says "I already knew this" at the end → you failed to push them.
If anyone says "I'm setting up my rules file on Monday" → you won.

---

## Appendix: time management

| If you're behind... | Cut this |
|---|---|
| 5 min | The 3-tools demo (just mention them) |
| 10 min | Exercise 3 (leave as homework) |
| 15 min | Exercise 2: only do Step 1 (plan) and Step 3 (tests), skip the build |

| If you're ahead... | Add this |
|---|---|
| 10 min | Exercise 4 — Safe refactor |
| 5 min  | Live demo of building a custom skill |
| 5 min  | Round of "share your best prompt of the workshop" |

---

## Appendix: questions you'll get

**Q: Which tool is best?**
A: None. Each one solves a different problem. The skill is knowing which to use when.

**Q: Will AI replace devs?**
A: No, but devs who know how to use AI will replace devs who don't.

**Q: Is it safe to paste company code into these tools?**
A: Depends on the plan. Check with your lead/security on data retention policies. Copilot Business and Claude for enterprises have different policies than the free versions.

**Q: How many tokens / how much does it cost?**
A: Don't worry about that at first. Focus on learning the flow. Optimization comes later.

**Q: What if the AI gives me code that doesn't work?**
A: Welcome to the real world. That's exactly the value of CIVR: iterate.`,
  },
  {
    id: 'exercise-1',
    title: 'Exercise 1 — Debugging with CIVR',
    category: 'Exercise',
    content: `# Exercise 1 — Debugging with CIVR

> ⏱️ 25 minutes · 👥 Pairs · 🛠️ Any of the 3 tools

---

## Your task

Your QA team reports an intermittent bug in production:

> "The \`GET /users/:id/profile\` endpoint sometimes returns \`orders\` as an empty \`{}\` object instead of an array of orders. The unit tests pass in CI. We can reproduce it in staging but not locally."

Your job: **find the root cause and fix it properly**, not just patch the symptom.

---

## The code

Create a file \`src/routes/users.ts\` with this:

\`\`\`typescript
import express, { Request, Response } from "express";

const app = express();

interface User {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  createdAt: Date;
}

// Database simulation
async function fetchUserById(id: string): Promise<User | null> {
  await new Promise((r) => setTimeout(r, 50));
  if (id === "404") return null;
  return { id, name: "Ana Pérez", email: "ana@example.com" };
}

async function fetchUserOrders(userId: string): Promise<Order[]> {
  await new Promise((r) => setTimeout(r, 100));
  return [
    { id: "o1", userId, total: 120, createdAt: new Date() },
    { id: "o2", userId, total: 80, createdAt: new Date() },
  ];
}

app.get("/users/:id/profile", async (req: Request, res: Response) => {
  try {
    const user = await fetchUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = fetchUserOrders(user.id);

    return res.json({
      user,
      orders,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal error" });
  }
});

app.listen(3000, () => console.log("Server on :3000"));
\`\`\`

---

## Part 1 — Bad prompt (5 min)

First, try with a **deliberately bad** prompt:

> "this code isn't working, fix it: [paste code]"

📝 **Note:** what did it answer? Did it identify the real problem or invent things? Did it make changes it shouldn't?

---

## Part 2 — Prompt with CIVR (15 min)

Now rewrite your prompt using the **CIVR** framework:

- **C**ontext: stack, what the endpoint does, where the bug reproduces
- **I**nput: the code + the logs (or "no visible logs")
- **V**alidate: ask for explanation before the fix
- **R**efine: if the first answer doesn't convince you, iterate

---

## Part 3 — Bonus (5 min, if you finish early)

Ask the AI to:

> "Write a test with Vitest + supertest that would prevent this bug in the future. The test should fail against the original code and pass after the fix."

---

## ⚠️ Don't read this until you've finished

<details>
<summary>👀 Solution (spoiler)</summary>

### Root cause

There are **two bugs**, and only one is obvious:

**Bug 1 — Missing \`await\` (the obvious one):**
\`\`\`typescript
const orders = fetchUserOrders(user.id); // ❌ returns an unresolved Promise
\`\`\`

When JSON.stringify tries to serialize an unresolved Promise, it returns \`{}\` (empty object). That's why the frontend receives \`orders: {}\` instead of an array.

The fix:
\`\`\`typescript
const orders = await fetchUserOrders(user.id);
\`\`\`

**Bug 2 — Silent try/catch (the subtle one):**

Even though the \`try/catch\` is there, since \`fetchUserOrders\` is **never awaited**, any error that promise throws becomes an *unhandled promise rejection* that the \`catch\` doesn't catch. That means in production you could be losing errors silently.

Once you add the \`await\`, the catch will work correctly.

### Why the unit tests pass

The tests probably mock \`fetchUserOrders\` and only check the 200 status code, not the contents of the \`orders\` field. That's why the bug passes CI but fails manual QA.

### Test that would catch the bug

\`\`\`typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/routes/users";

describe("GET /users/:id/profile", () => {
  it("returns orders as an array, not an empty object", async () => {
    const res = await request(app).get("/users/123/profile");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.orders)).toBe(true); // <- this catches the bug
    expect(res.body.orders.length).toBeGreaterThan(0);
  });
});
\`\`\`

</details>`,
  },
  {
    id: 'handout-1',
    title: 'Handout 1 — CIVR Framework',
    category: 'Handout',
    content: `# Handout 1 — CIVR Framework

> Print it or keep it open for the whole workshop. It's your cheat sheet.

---

## The 4 letters

| Letter | Means | Ask yourself... |
|---|---|---|
| **C** | **Context** | Does the AI know what stack I use, what this project does, what file this is? |
| **I** | **Input** | Did I give it the code, the full error, the logs, examples of input/output? |
| **V** | **Validate** | Did I ask it to explain its reasoning BEFORE applying the change? |
| **R** | **Refine** | Did I iterate at least once instead of accepting the first answer? |

---

## Template 1 — Debugging

\`\`\`
Context:
- Stack: TypeScript + Node + Express
- File: src/routes/users.ts
- Symptom: the GET /users/:id/profile endpoint returns
  \`orders: {}\` in production (should be an array). Locally
  the test passes.

Code:
[paste the code here]

Error / logs:
[paste what you see in console, or "no visible error"]

Task:
1. Identify the root cause
2. Explain WHY it happens before applying the fix
3. Propose the minimal fix
4. Suggest a test that prevents the regression
\`\`\`

---

## Template 2 — Building a feature

**Step 1: ask for the plan**

\`\`\`
Context: Express + TypeScript, I already have a rules file with
the project conventions in CLAUDE.md.

I want to build: POST /api/products that takes { name, price,
stock } and stores it in memory.

DO NOT write code yet. Give me a numbered list of the steps you
would follow, indicating which files you would create or touch
in each step.
\`\`\`

**Step 2: implement step by step**

\`\`\`
Perfect, now execute only step 1 of your plan: create the Zod
validation schema. Show me the code and wait for my confirmation
before continuing.
\`\`\`

**Step 3: tests with edge cases**

\`\`\`
Now generate Vitest tests for this endpoint. Include:
- happy path
- negative price
- non-integer stock
- empty name
- payload missing required fields
- payload with unexpected extra fields

Use supertest for the HTTP requests.
\`\`\`

---

## Template 3 — Understanding unfamiliar code

\`\`\`
I'm sending you a file from a repo I'm new to. I didn't write it.

[paste file or use @file in your IDE]

Answer in this order:
1. What does this file do in ONE sentence?
2. What are the public functions (entry points)?
3. Which other modules does it depend on? Who imports it?
4. If I change [X specific thing], what could break?
5. Are there code smells or obvious risks?

Be concise. Bullet points, not paragraphs.
\`\`\`

---

## Template 4 — Safe refactor

\`\`\`
I want to refactor this function to improve readability.
I do NOT want to change the behavior.

Current code:
[paste]

Task:
1. Before refactoring, list the expected inputs and outputs
2. Generate tests that capture the CURRENT behavior (even if
   it's weird or ugly) — this is my safety net
3. Only then propose the refactor
4. Confirm the tests from step 2 still pass with the
   refactored code
\`\`\`

---

## Rules you must NOT forget

✅ **Always give context** — stack, file, what you're trying to achieve
✅ **Ask for reasoning before code** — "explain why" before "fix it"
✅ **Iterate 2-3 times** — the first answer is almost never the best
✅ **Read what it gave you before pasting** — if you don't get it, it's not yours
✅ **Verify invented functions and libraries** — the AI hallucinates names

❌ **Never paste credentials, API keys, or personal data**
❌ **Never accept huge refactors without prior tests**
❌ **Never ask "do it all at once"** — divide and conquer`,
  },
  {
    id: 'rules-intro',
    title: 'Rules files and skills',
    category: 'Guide',
    content: `# Rules files and skills — what they are and why they matter

> If you take only ONE thing from this workshop, make it this: **set up your rules files**. It's the highest-impact, lowest-effort change you can make.

---

## The problem they solve

Every time you open ChatGPT, Copilot Chat, Claude Code, or Windsurf, the AI starts from **zero**. It doesn't know:

- What stack you use
- What conventions your team follows
- Which libraries are allowed (and which are banned)
- How your repo is structured
- Which patterns you avoid
- Which test framework you use

Without this information, the AI suggests code that **technically works** but doesn't fit your project. You have to fix the style, swap the libraries, move files. Every time. In every conversation.

**Solution:** a file at the root of your repo that the AI reads automatically in every interaction.

---

## Rules vs Skills — key difference

| Concept | What it is | When it loads |
|---|---|---|
| **Rules file** | A single file with the project's rules | **Always**, in every interaction |
| **Skill** | A modular file with a specific procedure | **On demand**, when the task needs it |

---

## The 3 tools and their files

| Tool | Rules file | Supports modular skills |
|---|---|---|
| GitHub Copilot | \`.github/copilot-instructions.md\` | Yes (via instruction files with scope) |
| Claude Code | \`CLAUDE.md\` | Yes (via the skills system) |
| Windsurf | \`.windsurfrules\` | Yes (via workflows) |

---

## Anatomy of a good rules file

An effective rules file answers these questions:

1. **What IS this project?**
2. **What stack does it use?**
3. **How is it organized?**
4. **What conventions do we follow?**
5. **What do we AVOID?**
6. **How do you run the commands?**`,
  },
  {
    id: 'copilot-guide',
    title: 'GitHub Copilot — Instructions',
    category: 'Guide',
    content: `# GitHub Copilot — \`.github/copilot-instructions.md\`

> Copilot reads this file automatically in VS Code, JetBrains, and Neovim when you work in this repo. It saves you from repeating conventions in every chat.

---

## Where it goes

\`\`\`
your-repo/
├── .github/
│   └── copilot-instructions.md   ← here
├── src/
└── package.json
\`\`\`

---

## Ready-to-copy template

\`\`\`markdown
# Instructions for GitHub Copilot

You are helping develop a TypeScript + Node.js backend API. Follow
these conventions strictly.

## Project context

- **What it is:** REST API for product inventory management.
- **Stack:** Node 20, TypeScript 5.4 (strict mode), Express 4, Zod 3
  for validation, Vitest 1 for tests, Prisma for the DB layer.

## Code conventions

- Use TypeScript strict mode. **Never use \`any\`**.
- Prefer type unions over \`enum\`.
- No default exports — use named exports.
- Use \`async/await\`, never raw \`.then()\` chains.

## Project structure

src/
  routes/        ← Express route definitions only.
  controllers/   ← Request parsing, calls services.
  services/      ← Business logic.
  schemas/       ← Zod schemas.
  db/            ← Prisma client.
tests/           ← Vitest tests.

## What to avoid

- ❌ Do not use \`axios\`. Use the native \`fetch\` API.
- ❌ Do not use \`class\` syntax except for error classes.
- ❌ Do not use \`enum\`.
\`\`\``,
  },
  {
    id: 'exercise-2',
    title: 'Exercise 2 — Build an endpoint',
    category: 'Exercise',
    content: `# Exercise 2 — Build an endpoint with iterative flow

> ⏱️ 30 minutes · 👥 Pairs · 🛠️ Recommended: Claude Code or Windsurf

---

## Your task

Build a \`POST /api/products\` endpoint that takes a new product, validates it, stores it in memory, and returns the created product with its ID.

**Product requirements:**
- \`name\`: string, minimum 3 characters, maximum 100
- \`price\`: positive number (greater than 0)
- \`stock\`: non-negative integer
- \`category\`: one of \`"electronics" | "clothing" | "food" | "other"\`

---

## The iterative flow (3 steps)

### Step 1 — Ask for the plan (5 min)

Your first prompt **must NOT ask for code**. Ask only for the plan.

### Step 2 — Implement step by step (15 min)

Now execute the plan **one step at a time**. After each step, **read the code**, make sure you understand it, and only then move to the next.

### Step 3 — Tests with edge cases (10 min)

Once the endpoint works, ask for tests.`,
  },
  {
    id: 'handout-2',
    title: 'Handout 2 — Tools cheatsheet',
    category: 'Handout',
    content: `# Handout 2 — Tools cheatsheet

| Feature | GitHub Copilot | Claude Code | Windsurf |
|---|---|---|---|
| **Lives in** | Inline editor | Terminal (CLI) | Full IDE |
| **Main mode** | Autocomplete | Agent | Agent |
| **Sees repo** | Limited | Yes | Yes |
| **Edits files** | Hard | Yes | Yes |
| **Runs cmds** | No | Yes | Yes |

---

## When to use each

### 🟢 GitHub Copilot
- Writing line by line
- Smart autocomplete
- Repetitive boilerplate

### 🟣 Claude Code
- Multi-file coordinated changes
- Debugging across modules
- Running commands (tests, lint)

### 🔵 Windsurf
- Full IDE experience
- Visual pair programming
- Accept/reject changes via UI`,
  },
  {
    id: 'handout-3',
    title: 'Handout 3 — Anti-patterns',
    category: 'Handout',
    content: `# Handout 3 — Anti-patterns (what NOT to do)

1. **"It's not working, fix it"** → No context, no logs.
2. **Accepting without reading** → You are responsible for the code.
3. **Huge changes in one go** → Divide and conquer.
4. **Trusting hallucinations** → Verify libraries and functions.
5. **No rules file** → Every chat starts from zero.
6. **Pasting credentials** → Security risk.
7. **Wrong tool for the job** → Use the right tool for the task.
8. **Not iterating** → First answer is rarely the best.
9. **Not verifying output** → Run the tests!
10. **Treating AI as absolute truth** → It can be wrong.`,
  },
  {
    id: 'claude-code-guide',
    title: 'Claude Code — CLAUDE.md',
    category: 'Guide',
    content: `# Claude Code — \`CLAUDE.md\`

> Claude Code reads this file automatically. It's the most powerful because Claude Code is agentic.

---

## Ready-to-copy template

\`\`\`markdown
# CLAUDE.md

## Project
REST API for product inventory management.

## Stack
- Node 20, TypeScript 5.4 strict
- Express 4, Zod 3, Vitest 1
- Prisma + Postgres

## Conventions
- No \`any\`, ever.
- Named exports only.
- All thrown errors extend \`AppError\`.
- AAA pattern for tests.

## Commands
- Test: \`npm test\`
- Lint: \`npm run lint\`
- Dev: \`npm run dev\`
\`\`\``,
  },
  {
    id: 'exercise-3',
    title: 'Exercise 3 — Understand code',
    category: 'Exercise',
    content: `# Exercise 3 — Understand unfamiliar code

> ⏱️ 15 minutes · 👥 Pairs · 🛠️ Any tool

---

## Your task

Use AI as an **onboarding tutor** for a file you didn't write.

Answer these 4 questions **without reading the code line by line**:

1. What does this file do in one sentence?
2. What are the public functions (entry points)?
3. If I change the tax calculation, what might break?
4. Are there any obvious code smells or risks?`,
  },
  {
    id: 'exercise-4',
    title: 'Exercise 4 — Safe refactor',
    category: 'Exercise',
    content: `# Exercise 4 (BONUS) — Safe refactor

> ⏱️ 20 minutes · 👥 Solo or pairs · 🛠️ Recommended: Claude Code

---

## The safe refactor flow

1. **Understand** what it does (ask for summary).
2. **Characterization tests** (capture current behavior).
3. **Refactor** with safety net (tests must still pass).
4. **Validate** (functional equivalence).`,
  },
  {
    id: 'windsurf-guide',
    title: 'Windsurf — .windsurfrules',
    category: 'Guide',
    content: `# Windsurf — \`.windsurfrules\`

> Windsurf is an agentic IDE that can orchestrate multi-step workflows.

---

## Ready-to-copy template

\`\`\`markdown
# Windsurf rules

## Project context
REST API for product inventory management.

## Hard rules
- Never use \`any\`.
- Never use default exports.
- Never use \`class\` except for errors.

## Workflow for new endpoints
1. Zod schema
2. Service
3. Controller
4. Route
5. Tests
\`\`\``,
  },
  {
    id: 'windsurf-context-hierarchy',
    title: 'Windsurf Context Hierarchy',
    category: 'Guide',
    content: `# Windsurf Context Hierarchy — Deep Dive

> Windsurf's context system is more powerful than a flat \`CLAUDE.md\` model, but only if you use the **trigger modes** correctly.

---

## The 5 Layers of Context

Windsurf searches for rules from your current working directory up to the git root, plus global and system locations.

| Layer | Path | Limit | Best for... |
|---|---|---|---|
| **1. System** | \`/etc/windsurf/...\` | N/A | Enterprise-wide security or legal policies. |
| **2. Global** | \`~/.codeium/windsurf/memories/global_rules.md\` | 6,000 chars | Your personal coding style, "always use" rules. |
| **3. Workspace** | \`<repo>/.windsurf/rules/*.md\` | 12,000 chars | Project-specific tech stack, team conventions. |
| **4. Directory** | \`.../sub/.windsurf/rules/*.md\` | 12,000 chars | Module-specific logic (e.g. \`src/payments/\`). |
| **5. Fallback** | \`./AGENTS.md\` | N/A | Cross-tool instructions (Claude Code / Windsurf). |

---

## The 4 Trigger Modes

This is where the leverage lives. Most teams miss this and treat rules as one big "always on" file.

1. **\`always_on\`**
   - **Behavior:** Included in every single interaction.
   - **Risk:** Eats your context budget fast. Use only for the most critical project facts.
2. **\`glob\`**
   - **Behavior:** Fires only when you are working on files that match a pattern.
   - **Example:** \`trigger: glob: "src/payments/**/*.ts"\`.
   - **Benefit:** The right default for most rules. Keeps context clean.
3. **\`model_decision\`**
   - **Behavior:** Cascade decides whether to load the rule based on its description.
   - **Benefit:** Similar to a "skill". Great for complex procedures like "how to run a migration".
4. **\`manual\`**
   - **Behavior:** Only loaded when you explicitly \`@mention\` the rule in chat.
   - **Benefit:** For power-user invocations or rare tasks.

---

## The Character Budget Reality

Windsurf has a total context budget for rules (roughly 12K per interaction).

- **Silent Truncation:** If you blow past the budget, Windsurf **silently drops** the end of your rules.
- **The Symptom:** "Windsurf is ignoring my rules!" usually means your rules are too long.
- **The Fix:** Use \`glob\` triggers to ensure only relevant rules are loaded.

---

## 7 Common Windsurf Mistakes

1. **Everything in \`always_on\`** → Truncation happens, AI gets "stupid".
2. **Using the legacy \`.windsurfrules\` format** → Single-file format is harder to manage than \`.windsurf/rules/*.md\`.
3. **No descriptions for \`model_decision\`** → Cascade can't figure out when to use the rule.
4. **Confusing Memories vs Rules** → Memories are for learned facts; Rules are for enforced constraints.
5. **Ignoring the 6K global limit** → Your global rules get cut off without warning.
6. **Nested \`.windsurf/\` dirs for simple projects** → Use \`glob\` patterns from the root instead.
7. **Pasting PII in rules** → Rules are sent to the model; keep them clean.

---

## Decision Tree: Where does this rule belong?

- Is it about **YOU** (e.g. "always use tabs")? → **Global**
- Is it about the **PROJECT** (e.g. "use Vitest")? → **Workspace** (\`always_on\`)
- Is it about a **MODULE** (e.g. "payments must use Stripe")? → **Workspace** (\`glob\`)
- Is it a **PROCEDURE** (e.g. "how to deploy")? → **Workspace** (\`model_decision\`)
- Is it for **RARE USE** (e.g. "legal header template")? → **Workspace** (\`manual\`)`
  },
  {
    id: 'reusable-skills',
    title: 'Reusable skills',
    category: 'Guide',
    content: `# Reusable skills

> Modular procedures loaded on demand.

- **Rules file** = the Constitution (always in force).
- **Skills** = specific laws (consulted when needed).

### Example skill topics:
- How to write a DB migration
- How to add a new REST endpoint
- How to write integration tests for Stripe
- How to handle errors in a controller`,
  },
  {
    id: 'claude-code-tricks',
    title: 'Bonus — Claude Code power user tricks',
    category: 'Bonus',
    content: `# Bonus — Claude Code power user tricks

> A collection of tricks that turn Claude Code from "AI in a terminal" into a serious productivity tool. Not essential for the workshop, but every one of these will save you hours once you make it a habit.

---

## 🎯 Context management

### 1. Use \`/clear\` aggressively

Every conversation eats context. When you switch tasks — even slightly — run \`/clear\` to start fresh. A polluted context is the #1 reason Claude Code suddenly "gets worse" mid-session.

**Rule of thumb:** if you finished one task and are starting another, clear. It costs nothing and keeps answers sharp.

### 2. Use \`/compact\` for long sessions

If you're deep in a task and don't want to lose the thread but context is filling up, run \`/compact\`. It summarizes the conversation so far and keeps working. Better than losing everything, worse than \`/clear\` when you can afford it.

### 3. Reference files with \`@\`

Instead of pasting code, type \`@\` and Claude Code autocompletes file paths from your repo:

\`\`\`
explain what @src/services/orderProcessor.ts does and how it interacts with @src/db/orders.ts
\`\`\`

Cleaner, faster, and doesn't eat your context with boilerplate.

### 4. Drop images into the terminal

You can paste screenshots directly. Useful for:
- Error screenshots from a coworker's Slack message
- Screenshots of an error in the browser devtools
- A whiteboard photo of an architecture sketch
- A Figma export you want turned into a component

> On macOS: \`Ctrl+V\` pastes the image. On Linux, drag-and-drop works in most terminals.

---

## 🚀 Workflow tricks

### 5. Plan mode — \`Shift+Tab\` twice

Press \`Shift+Tab\` twice to enter **plan mode**. Claude Code will think through the task and propose a plan **without touching any files**. Only when you approve does it execute.

Use this for anything non-trivial. It's the single biggest habit change you can make.

### 6. Let it loop on tests

Tell Claude Code: "run the tests and fix them until they pass". It will actually do this — running \`npm test\`, reading the output, editing, running again. Grab a coffee.

**Caveat:** set a stopping rule: "if after 3 iterations they still fail, stop and ask me".

### 7. Give it the "definition of done"

Agentic tools love to declare tasks complete when they're not. Fix this in your CLAUDE.md **and** in each prompt:

> "Not done until \`npm run lint && npm test && npm run typecheck\` all pass."

### 8. Use \`--resume\` to continue yesterday's session

Ran out of time yesterday? \`claude --resume\` reopens your last conversation. Your context, plans, and pending tasks come back.

### 9. Pipe stuff into Claude Code

Claude Code is a CLI tool, so Unix pipes work:

\`\`\`bash
git diff | claude "review this diff, looking for bugs and security issues"

npm test 2>&1 | claude "explain these test failures and fix them"

cat error.log | claude "what's going wrong here?"
\`\`\`

This is where Claude Code shines over IDE-based tools.

### 10. Use it in scripts and git hooks

You can run Claude Code non-interactively with \`claude -p "your prompt"\`. Combine with git hooks, CI, or cron jobs:

\`\`\`bash
# Pre-commit hook: sanity-check your commit message
git diff --cached | claude -p "suggest a better commit message for this diff"
\`\`\`

---

## 🧠 Prompting tricks specific to Claude Code

### 11. "Think first, code second"

Add this to any non-trivial prompt:

> "Before writing code, list 3 different approaches and the tradeoffs of each. Then recommend one and wait for my confirmation."

This single phrase dramatically improves the quality of what comes out.

### 12. Ask it to read before writing

Claude Code will guess structure if you don't stop it. Anchor it:

> "First, read the existing files in src/services/ to understand the pattern we use, then create a new service following the same conventions."

### 13. "Show me the diff before applying"

For risky changes:

> "Show me the exact diff you would apply, in a code block, before making any changes. I'll confirm before you write anything."

### 14. Force it to use your test framework

Claude Code sometimes invents test setups. Prevent it:

> "Use ONLY the patterns already present in tests/ — don't introduce new helpers, matchers, or setup files."

### 15. Ask for the "WHY" in commits and PRs

Before commit:

> "Write a commit message for the changes on my staged files. Include a short WHY section explaining the motivation, not just the WHAT."

---

## 🛡️ Safety tricks

### 16. Use \`--dangerously-skip-permissions\` with extreme caution

There's a flag that skips permission prompts for file edits and commands. It's tempting for unattended runs, but **never use it on code you care about without a clean git state**. If things go sideways, \`git reset --hard\` is your friend.

**Rule:** only use skip-permissions when:
- You're in a fresh branch
- Everything is committed
- You're OK with \`git reset --hard\` as your undo button

### 17. Keep a scratch branch for Claude Code experiments

\`\`\`bash
git checkout -b claude-scratch
\`\`\`

Let Claude Code go wild. If the result is good, cherry-pick into your real branch. If not, delete the branch. Zero risk.

### 18. Review diffs before committing — always

Never \`git commit -am\` after a Claude Code session. Always \`git diff --staged\` and read every change. The AI can sneak in:
- Unrelated "improvements" to files you didn't ask about
- Commented-out code that shouldn't be there
- Debug \`console.log\`s it forgot to remove

---

## ⚡ Speed tricks

### 19. Create shell aliases

Put these in your \`.bashrc\` / \`.zshrc\`:

\`\`\`bash
alias cc="claude"
alias ccr="claude --resume"
alias ccp="claude -p"
alias review="git diff | claude -p 'review this diff for bugs, unclear names, and missing tests'"
alias explain="claude -p 'explain this file in plain language: '"
\`\`\`

Now \`review\` gives you an instant code review on your current diff.

### 20. Use custom slash commands

Claude Code supports custom slash commands in \`.claude/commands/\`. Create \`.claude/commands/review.md\`:

\`\`\`markdown
Review the current git diff for:
- Potential bugs
- Missing edge cases
- Unclear names
- Opportunities to simplify

Be specific. Cite file:line. Don't suggest cosmetic changes.
\`\`\`

Now typing \`/review\` in Claude Code runs that prompt. You can build a whole library: \`/explain\`, \`/test\`, \`/migrate\`, \`/pr-description\`, etc.

### 21. Have a "triage" prompt ready

When you open a new repo for the first time, paste this:

> "Give me a 2-minute tour of this repo: (1) what it does, (2) main entry points, (3) which folders matter most, (4) any gotchas or unusual patterns I should know about. Be concise."

Best 30 seconds you'll spend in an unfamiliar codebase.

---

## 🎨 Niche but gold

### 22. Use it for git surgery

Claude Code is surprisingly good at messy git operations:

> "I have 12 commits on this branch. Help me squash them into 3 logical commits with good messages. Show me the interactive rebase plan first."

> "I accidentally committed a secret to this branch 4 commits ago. Help me remove it from history."

It will walk you through the commands step by step.

### 23. Generate seed data from schemas

> "Look at @prisma/schema.prisma and generate a seed script that creates 20 realistic products across all categories, with varied prices and stock levels."

Much faster than writing seed data by hand.

### 24. Explain test failures in plain English

When a test fails with a cryptic diff:

\`\`\`bash
npm test 2>&1 | claude -p "explain in plain English what this test expected vs what it got, and what likely caused the difference"
\`\`\`

### 25. Use it as a rubber duck

Sometimes you don't want code — you want to think out loud. Claude Code is an excellent rubber duck:

> "I'm trying to decide between putting this logic in a middleware or in each controller. Don't write code. Walk me through the tradeoffs for MY specific project (you can see the repo)."

---

## 🏆 The meta-trick

The biggest productivity unlock isn't any single trick on this list. It's this habit:

> **After every Claude Code session, ask yourself: "what prompt or CLAUDE.md rule would have made this smoother?" Then add it.**

Your setup compounds. Six months from now, your CLAUDE.md, your \`.claude/commands/\`, and your muscle memory of which tricks to use when — that's what separates devs who use AI well from devs who use AI.

---

## Quick reference card

| When you want to... | Do this |
|---|---|
| Start a new task cleanly | \`/clear\` |
| Keep going but free up context | \`/compact\` |
| Reference a file | \`@path/to/file\` |
| Propose a plan without editing | \`Shift+Tab\` twice (plan mode) |
| Resume yesterday's session | \`claude --resume\` |
| Review your current diff | \`git diff \\| claude -p "review this"\` |
| Explain test failures | \`npm test 2>&1 \\| claude -p "explain"\` |
| Get a repo tour | Paste the "2-minute tour" prompt |
| Do risky stuff safely | Fresh branch + review diff before commit |`,
  },
  {
    id: 'context-hierarchy',
    title: 'Context Hierarchy — Where to put rules',
    category: 'Guide',
    content: `# Context Hierarchy: The Three Layers

AI rules files work best when they are organized by "specificity". Instead of one giant file, use layers.

---

## 🏗️ The Three Layers

| Layer | Path Example | Purpose |
|---|---|---|
| **Global** | \`~/.claude/CLAUDE.md\` | Your personal coding style, preferred libraries, and "always" rules. |
| **Project** | \`<repo>/CLAUDE.md\` | Project-wide tech stack, folder structure, and team conventions. |
| **Directory** | \`<repo>/src/payments/CLAUDE.md\` | Specific logic for a module (e.g., Stripe integration rules, specific types). |

### Exact paths by tool:
- **Claude Code**: \`CLAUDE.md\` (Project/Directory), \`~/.claude/CLAUDE.md\` (Global)
- **Copilot**: \`.github/copilot-instructions.md\`
- **Windsurf**: \`.windsurfrules\`
- **Cursor**: \`.cursorrules\`

---

## 📂 What belongs where?

### 1. Global Layer (You)
- "Always use functional components in React."
- "Never use semicolons."
- "Explain your reasoning before writing code."

### 2. Project Layer (The App)
- "This is a Next.js 14 app using App Router."
- "Use Tailwind CSS for styling."
- "Tests go in \`__tests__\` folders."

### 3. Directory Layer (The Module)
- **Example: \`src/payments/CLAUDE.md\`**
- "Always use the \`PaymentResult\` type for return values."
- "Log all failed transactions to the \`audit\` service."
- "Never mock the Stripe SDK; use the test helper in \`@/lib/stripe-test\`."

---

## 🔄 How they combine
At runtime, the AI combines these files. **Specificity wins.**
If the Project file says "Use Jest" but the Directory file says "Use Vitest for this module," the AI will use Vitest when working in that directory.

---

## ⚠️ Six Common Mistakes

1. **"The Junk Drawer"**: Putting everything in the project file.
   - *Symptom*: AI gets confused by too many rules.
   - *Fix*: Move module-specific rules to directory-level files.
2. **Conflicting Rules**: Global says "No semicolons," Project says "Always semicolons."
   - *Symptom*: AI flickers between styles.
   - *Fix*: Ensure project rules override global ones intentionally.
3. **Missing "Why"**: Rules that say "Do X" without explaining why.
   - *Fix*: Add a brief comment: "Use X because Y."
4. **Outdated Rules**: Keeping rules for a library you deleted.
   - *Fix*: Audit rules files when you refactor.
5. **Too Many Rules**: Having 50+ rules in one file.
   - *Fix*: If a file is > 100 lines, it's too big. Split it.
6. **Ignoring the Hierarchy**: Not using directory-level files for complex modules.

---

## 🌲 Decision Tree: Where does this rule belong?

1. **Does it apply to every project I ever touch?** → **Global**
2. **Does it apply to this entire repo?** → **Project**
3. **Does it only matter for this specific folder/module?** → **Directory**

---

## 🏆 Senior Insight
The gain isn't from adding *more* rules; it's from putting *existing* rules in the right layer. This reduces "noise" for the AI and keeps it focused on what matters for the current file.
`,
  },
];

const level2Resources: Omit<Resource, 'workshopId'>[] = [
  {
    id: 'l2-intro',
    title: 'Level 2 Introduction',
    category: 'Guide',
    content: '# Level 2: Advanced Patterns\n\nWelcome to the advanced workshop.'
  }
];

export const resources: Resource[] = [
  ...level1Resources.map(r => ({ ...r, workshopId: 'level-1' } as Resource)),
  ...level2Resources.map(r => ({ ...r, workshopId: 'level-2' } as Resource)),
];
