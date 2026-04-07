export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuestionData {
  id: string;
  title: string;
  question: string;
  stars: number;
  options: Option[];
}

export const level1QuizQuestions: QuestionData[] = [
  {
    id: 'q1',
    title: 'Q1 — The vague refactor request',
    question: "You're about to ask Claude Code to 'refactor the auth module to be cleaner.' Which of these is the most useful first step?",
    stars: 2,
    options: [
      { id: 'A', text: 'Send the prompt as-is and review the diff afterward', isCorrect: false, explanation: 'Reviewing afterward is too late. By the time you have a diff, the AI has already made dozens of decisions you\'d have pushed back on. Frontload the discipline.' },
      { id: 'B', text: 'Add "follow best practices" to the prompt', isCorrect: false, explanation: '"Best practices" is the canonical empty phrase. The AI can\'t act on it; it just lets the AI pick whatever it pattern-matched on most recently. You\'re not steering, you\'re praying.' },
      { id: 'C', text: 'Specify the concrete target state (file structure, what should move where) and the constraints (what cannot change)', isCorrect: false, explanation: 'C is better than A or B, but it skips the step where you verify the AI understands the current code. You might specify a target that doesn\'t make sense given what\'s actually there. Always validate the model\'s mental model of the current state before locking in a target.' },
      { id: 'D', text: 'Ask Claude Code to first analyze the current auth module and propose a refactor plan, before any changes', isCorrect: true, explanation: '"Cleaner" is not executable. Before any changes, you need (a) a shared understanding of the current state, and (b) a plan you can review. D gets both for free, and it doesn\'t commit you to a specific target state until you\'ve seen what the AI thinks the current code is. If its understanding of the current state is wrong, you find out before any files get touched.' }
    ]
  },
  {
    id: 'q2',
    title: 'Q2 — Tab completion is suggesting nonsense',
    question: "You're typing in your editor with Copilot enabled. The completions it's suggesting reference functions that don't exist in your codebase. What's the most likely cause?",
    stars: 2,
    options: [
      { id: 'A', text: 'Copilot is broken; restart your editor', isCorrect: false, explanation: 'Restarting fixes nothing here. The "problem" is correct behavior given a context-poor situation.' },
      { id: 'B', text: 'Your file lacks enough context for Copilot to ground its suggestions — open the relevant files in adjacent tabs', isCorrect: true, explanation: 'Inline completion tools like Copilot use the surrounding context — current file, open tabs, recently edited files — as their grounding. If you\'re working in a fresh file with no related tabs open, the AI has nothing to ground on and will invent plausible-looking nonsense based on its training data. Opening 2-3 related files in adjacent tabs immediately improves suggestion quality.' },
      { id: 'C', text: 'Copilot needs a longer prompt; write a comment describing what you want', isCorrect: false, explanation: 'A comment can help, but only if the surrounding context is also good. A comment in a fresh file with no other tabs still produces hallucinations.' },
      { id: 'D', text: 'The model has hallucinated; switch to a different AI tool', isCorrect: false, explanation: 'Tool-switching is a non-fix. Every inline completion tool has the same dependency on surrounding context. You\'ll get the same nonsense from Cursor, Windsurf, or any other tool in the same situation.' }
    ]
  },
  {
    id: 'q3',
    title: 'Q3 — The AI just renamed a bunch of things',
    question: "You asked Claude Code to add a new endpoint. It did, but the diff also includes 12 renamed variables in unrelated files because 'they were inconsistent with the new naming convention.' What do you do?",
    stars: 3,
    options: [
      { id: 'A', text: 'Accept the diff — the renames are improvements', isCorrect: false, explanation: 'Even if the renames are good, they don\'t belong in this PR. PR review breaks down when changes mix concerns. Your reviewer also can\'t tell which changes were intended and which were the AI being "helpful."' },
      { id: 'B', text: 'Reject the entire diff; the AI broke scope', isCorrect: true, explanation: 'Scope discipline matters more than any individual "improvement." If you accept scope creep once, you\'ve trained yourself to accept it always, and your AI sessions will routinely produce sprawling diffs that are impossible to review. The right move is to reject everything, then re-prompt with explicit scope boundaries: "add the endpoint. Do not modify any other files. Do not rename anything."' },
      { id: 'C', text: 'Accept the new endpoint changes but reject the renames', isCorrect: false, explanation: 'Manually splitting a diff is slow and error-prone. You\'ll miss something. The renames also might depend on each other or on the new endpoint code in ways you don\'t notice. Reject and redo cleanly.' },
      { id: 'D', text: 'Accept everything but ask the AI to explain why each rename was needed', isCorrect: false, explanation: 'You\'re asking the AI to justify decisions you didn\'t authorize. The AI will produce confident justifications for anything. The justifications don\'t make the scope creep okay.' }
    ]
  },
  {
    id: 'q4',
    title: 'Q4 — The AI is faster than you',
    question: "You're a senior dev and you've noticed Claude Code can write working code faster than you can think through it. You're getting in the habit of just accepting suggestions and moving on. What's the risk?",
    stars: 3,
    options: [
      { id: 'A', text: 'No risk — speed is the whole point', isCorrect: false, explanation: 'Speed without verification is just shipping bugs faster. The whole point of the verification toolkit handout is that "the AI is fast" makes verification more important, not less.' },
      { id: 'B', text: 'You\'ll lose your debugging skills over time', isCorrect: false, explanation: 'Skill atrophy is real but slow — it takes years to matter. The AI bugs will burn you next week.' },
      { id: 'C', text: 'The AI\'s bugs cluster differently from human bugs; your normal review instincts won\'t catch them', isCorrect: true, explanation: 'Human bugs cluster around tired-engineer mistakes (off-by-one, copy-paste errors, forgetting null checks). AI bugs cluster around different things (subtle floating-point issues, concurrency races, async/await traps, hallucinated APIs that "look real," tests that test the wrong thing). Your instincts as a reviewer were trained on human bugs. AI-generated code routes around those instincts, and you\'ll wave through bugs you\'d have caught in a teammate\'s PR.' },
      { id: 'D', text: 'Your team will resent you for shipping faster', isCorrect: false, explanation: 'Probably true, but it\'s a social issue, not a technical one, and it\'s not the failure mode the question is about.' }
    ]
  },
  {
    id: 'q5',
    title: 'Q5 — Choosing which tool for which task',
    question: "You have GitHub Copilot, Claude Code, and Windsurf all available. For which task is Claude Code (CLI agent) the best fit?",
    stars: 2,
    options: [
      { id: 'A', text: 'Adding a missing semicolon', isCorrect: false, explanation: 'Trivial fixes don\'t need any AI. Just type the semicolon. Reaching for an AI tool for one-character edits is the senior version of "use a chainsaw to peel an apple."' },
      { id: 'B', text: 'Renaming a variable consistently in one file', isCorrect: false, explanation: 'Single-file refactors are better handled by your editor\'s built-in refactor (F2 rename in VS Code) or by an inline tool. Agents are slower for tasks where the human knows exactly what to do.' },
      { id: 'C', text: 'Refactoring code across 8 files in a service', isCorrect: true, explanation: 'Multi-file agentic refactors are exactly what CLI agents like Claude Code are built for. They can read, plan, edit, and verify across files with minimal human steering between steps. This is the workflow plan mode and checkpoints exist for.' },
      { id: 'D', text: 'Generating boilerplate for a new React component you\'re typing out', isCorrect: false, explanation: 'Inline completion tools like Copilot are better at "I\'m typing right now, finish my thought" tasks. Spinning up an agent for a single React component is overkill — you\'d type it faster with tab completion.' }
    ]
  },
  {
    id: 'q6',
    title: 'Q6 — The "explain this code" trap',
    question: "You inherit a confusing 300-line function. You ask Claude Code: 'Explain what this function does.' It produces a clear, confident explanation. What's the right next step?",
    stars: 3,
    options: [
      { id: 'A', text: 'Trust the explanation and move on — it sounds right', isCorrect: false, explanation: 'Trusting the AI\'s explanation of confusing code is exactly how subtle bugs survive. The AI is excellent at producing plausible explanations of code it doesn\'t actually understand.' },
      { id: 'B', text: 'Verify the explanation by tracing through one specific input by hand', isCorrect: false, explanation: 'Hand-tracing one input is fine for short functions but doesn\'t scale to 300 lines, and you\'ll only check one path. D gives you many paths automatically.' },
      { id: 'C', text: 'Ask Claude Code to explain it again in a fresh session and compare answers', isCorrect: false, explanation: 'Two confident explanations from two sessions might be confidently wrong in the same way (they\'re sampled from the same model). You\'re checking consistency, not correctness.' },
      { id: 'D', text: 'Ask Claude Code to write tests that exercise its understanding', isCorrect: true, explanation: 'Tests are an operationalized version of the explanation. If the AI\'s understanding is correct, the tests will pass against the real code. If the understanding is wrong, the tests will fail — and the failure tells you exactly where the explanation diverged from reality. This is the cheapest, most rigorous way to verify a code explanation.' }
    ]
  },
  {
    id: 'q7',
    title: 'Q7 — When "looks fine" means trouble',
    question: "Claude Code finishes a task. You scan the diff. Your gut says something's off, but the tests pass and TypeScript is green. Most likely cause?",
    stars: 3,
    options: [
      { id: 'A', text: 'Your gut is wrong; the AI verified it works', isCorrect: false, explanation: 'Senior gut instinct about diffs is calibrated by years of finding bugs. It\'s almost never wrong about "something\'s off." It\'s frequently wrong about what\'s off, but the smell is real. Don\'t override it because the easy checks pass.' },
      { id: 'B', text: 'The tests don\'t actually exercise the code paths you\'re worried about', isCorrect: true, explanation: 'Green tests prove only what they test. If the AI wrote the code AND the tests, the tests are biased toward the implementation and will pass even if the code is subtly wrong. Your gut is reacting to something specific in the diff — the absence of a check, a strange branch order, an unusual error handling pattern. Green tests don\'t address that specific concern; they address the average concern.' },
      { id: 'C', text: 'TypeScript is missing type annotations somewhere', isCorrect: false, explanation: 'Missing type annotations are a TypeScript problem, and "TypeScript is green" already rules them out at the level you can check.' },
      { id: 'D', text: 'The AI used a feature you don\'t recognize', isCorrect: false, explanation: 'If you don\'t recognize a feature, the right move is to look it up — but recognition gaps usually feel like "I don\'t know what this does," not "something feels off."' }
    ]
  },
  {
    id: 'q8',
    title: 'Q8 — The 200-line prompt trap',
    question: "You're crafting a complex prompt. After 15 minutes of writing, you have ~200 lines of context, examples, edge cases, and constraints. Before sending, you should:",
    stars: 4,
    options: [
      { id: 'A', text: 'Send it — careful prompt engineering is the senior skill', isCorrect: false, explanation: 'Long prompts are a code smell, not a senior skill. The senior skill is recognizing that a long prompt today should become a short prompt + a rules file tomorrow. Permanent context belongs in permanent places.' },
      { id: 'B', text: 'Cut it in half — you\'re pre-loading information the AI doesn\'t need', isCorrect: false, explanation: 'Cutting "in half" without thought just removes half the constraints, some of which might matter. The discipline is to relocate the persistent stuff, not delete it.' },
      { id: 'C', text: 'Split it into two prompts: a planning prompt and an execution prompt', isCorrect: false, explanation: 'Splitting helps if the prompt is genuinely two distinct steps. But if the bulk is constraints rather than steps, splitting doesn\'t reduce the constraint load.' },
      { id: 'D', text: 'Move the constraints into your CLAUDE.md and re-prompt with just the task', isCorrect: true, explanation: 'A 200-line prompt is a signal that you\'re carrying context manually that should live in the rules file. If the constraints apply to this task, they probably apply to every similar task — which means they belong in CLAUDE.md (or a skill, if they\'re procedural) where they\'ll automatically apply next time without you re-typing them. Your prompt should describe the task, not the entire codebase.' }
    ]
  }
];
