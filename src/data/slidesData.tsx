import React from 'react';
import { Slide } from '../types';
import { HierarchyLayers, LoadingOrder, FolderAnatomy, WindsurfHierarchy } from '../components/graphics/HierarchyGraphics';
import { InteractiveQuestion } from '../components/InteractiveQuestion';
import { Zap } from 'lucide-react';

export const slides: Slide[] = [
  {
    id: 1,
    section: 'Intro',
    title: 'The Augmented Engineer',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Zap className="text-[#8B5CF6] fill-[#8B5CF6]" size={56} />
          <h1 className="text-7xl font-black text-[#1E293B] font-display tracking-tight">
            The Augmented Engineer
          </h1>
        </div>
        
        <div className="relative inline-block">
          <p className="text-2xl font-bold text-[#2563EB] font-sans">
            From passive user to <span className="relative">
              productive Engineer
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C084FC] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mt-12 w-full max-w-4xl">
          <ul className="text-left space-y-4 text-gray-600 font-medium">
            <li className="flex items-center">
              <div className="bg-indigo-50 p-2 rounded-xl mr-4">
                <Zap size={24} className="text-indigo-600" />
              </div>
              <span className="text-lg">AWS Lambda & TypeScript Workshop</span>
            </li>
            <li className="flex items-center">
              <div className="bg-gray-50 p-2 rounded-xl mr-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <span className="text-lg">Hands-on · 2 hours</span>
            </li>
            <li className="flex items-center">
              <div className="bg-gray-50 p-2 rounded-xl mr-4">
                <span className="text-2xl">🤖</span>
              </div>
              <span className="text-lg">Tools: Copilot · Claude Code · Windsurf</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    section: 'Intro',
    title: 'Why this workshop',
    content: (
      <div className="flex flex-col h-full space-y-8">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-indigo-500 pb-4 inline-block self-start">
          You didn't come here to learn what AI is.
        </h2>
        <p className="text-2xl text-gray-600 font-medium">
          You came here to learn how to use it <span className="text-indigo-600 font-bold underline decoration-wavy">well</span>.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center transform transition hover:scale-105">
            <span className="text-5xl font-black text-green-600 mb-2">70%</span>
            <span className="text-xl font-bold text-green-800">Practice</span>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center transform transition hover:scale-105">
            <span className="text-5xl font-black text-blue-600 mb-2">30%</span>
            <span className="text-xl font-bold text-blue-800">Theory</span>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center transform transition hover:scale-105">
            <span className="text-5xl font-black text-red-600 mb-2">0%</span>
            <span className="text-xl font-bold text-red-800 text-center">Empty buzzwords</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    section: 'Intro',
    title: 'What you take home',
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">By the end you'll be able to:</h2>
        <ol className="space-y-4 text-xl text-gray-700 list-decimal list-inside bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <li className="pl-2 pb-2 border-b border-gray-50"><span className="font-semibold">Recognize</span> when you're misusing AI</li>
          <li className="pl-2 pb-2 border-b border-gray-50"><span className="font-semibold">Configure rules files</span> so the AI knows your project</li>
          <li className="pl-2 pb-2 border-b border-gray-50"><span className="font-semibold">Apply the CIVR framework</span> to any prompt</li>
          <li className="pl-2 pb-2 border-b border-gray-50"><span className="font-semibold">Tell apart</span> Copilot, Claude Code, and Windsurf</li>
          <li className="pl-2"><span className="font-semibold">Solve real tasks:</span> debugging, features, tests, refactor</li>
        </ol>
      </div>
    ),
  },
  {
    id: 4,
    section: 'Demo',
    title: 'Live demo: the contrast',
    resourceId: 'exercise-1',
    facilitatorNotes: `### Goal
Create the "aha moment" in the first 10 minutes. Let them see the difference between misusing AI vs using it well — without explaining it yet.

### Live demo (10 min)
Open your editor with Copilot Chat or Claude Code. Paste the code from \`exercise-1\`.

**Round 1 — Bad prompt:**
> "it's not working, fix it"

**Round 2 — Prompt with context:**
> "I'm in Express + TypeScript. This endpoint returns \`orders\` as an empty \`{}\` object in production instead of an array. The unit test passes, but QA reports the bug in staging. I need you to: (1) identify the root cause, (2) explain WHY it happens before applying the fix, (3) propose the minimal fix. Here's the code: [paste]"`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Same bug. Two prompts.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 flex-grow">
          <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 flex flex-col">
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center"><span className="text-2xl mr-2">❌</span> Prompt A</h3>
            <div className="bg-white p-4 rounded-xl shadow-inner flex-grow italic text-gray-600 text-lg">
              "it's not working, fix it"
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200 flex flex-col">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center"><span className="text-2xl mr-2">✅</span> Prompt B</h3>
            <div className="bg-white p-4 rounded-xl shadow-inner flex-grow text-gray-700 text-lg font-mono text-sm leading-relaxed">
              "Stack: TS + Express. The endpoint returns `orders: {}` in production when it should be an array. Tests pass. Identify root cause, explain why it happens, propose minimal fix."
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center font-bold animate-pulse mt-4">
          🎤 (Do the live demo here)
        </div>
      </div>
    ),
  },
  {
    id: 5,
    section: 'Demo',
    title: 'What was different?',
    facilitatorNotes: `### Quick discussion (5 min)
Open question to the group: "What was different between the two prompts?"
Collect answers in the shared doc. You'll use them to build the CIVR framework in the next block.`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">What was different?</h2>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center mb-8">
          <p className="text-xl text-blue-800 font-medium">Click the questions below to reveal key differences!</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <InteractiveQuestion 
            question="What did Prompt B provide that Prompt A missed?" 
            answer="Prompt B provided the full tech stack (TS + Express), the specific symptom (returning {} instead of an array), and context about passing tests." 
          />
          <InteractiveQuestion 
            question="Why ask for reasoning before the fix?" 
            answer="It forces the AI to 'think' step-by-step, reducing hallucinations and ensuring the proposed fix actually addresses the root cause." 
          />
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
          <h3 className="text-xl font-bold text-gray-400 uppercase tracking-wider mb-6">Summary:</h3>
          <ul className="grid grid-cols-2 gap-4 text-lg font-medium text-gray-700">
            <li className="flex items-center bg-gray-50 p-3 rounded-lg"><span className="text-indigo-500 mr-3 text-2xl">🥞</span> Stack context</li>
            <li className="flex items-center bg-gray-50 p-3 rounded-lg"><span className="text-indigo-500 mr-3 text-2xl">🤒</span> Specific symptom</li>
            <li className="flex items-center bg-gray-50 p-3 rounded-lg"><span className="text-indigo-500 mr-3 text-2xl">🧠</span> Asked for reasoning</li>
            <li className="flex items-center bg-gray-50 p-3 rounded-lg"><span className="text-indigo-500 mr-3 text-2xl">🎯</span> Scoped the change</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    section: 'Theory',
    title: 'The 3 tools',
    resourceId: 'handout-2',
    facilitatorNotes: `### Goal
They should understand it's **not the same tool for everything**. Each one has its sweet spot.

### Key message
"Copilot, Claude Code, and Windsurf aren't competitors. They're different tools for different moments of the workflow."`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-800">
                <th className="p-4 border-b-2 border-gray-200"></th>
                <th className="p-4 border-b-2 border-gray-200 font-bold text-xl text-blue-600">Copilot</th>
                <th className="p-4 border-b-2 border-gray-200 font-bold text-xl text-orange-600">Claude Code</th>
                <th className="p-4 border-b-2 border-gray-200 font-bold text-xl text-teal-600">Windsurf</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 font-bold text-gray-600">Lives in</td>
                <td className="p-4 border-b border-gray-100">Inline editor</td>
                <td className="p-4 border-b border-gray-100">Terminal</td>
                <td className="p-4 border-b border-gray-100">Full IDE</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 font-bold text-gray-600">Best for</td>
                <td className="p-4 border-b border-gray-100 font-medium">Autocomplete</td>
                <td className="p-4 border-b border-gray-100 font-medium">Multi-file tasks</td>
                <td className="p-4 border-b border-gray-100 font-medium">Pair programming</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 font-bold text-gray-600">Rules file</td>
                <td className="p-4 border-b border-gray-100">
                  <code className="font-mono text-sm bg-gray-100 rounded px-2 py-1 text-pink-600">.github/copilot-instructions.md</code>
                </td>
                <td className="p-4 border-b border-gray-100">
                  <code className="font-mono text-sm bg-gray-100 rounded px-2 py-1 text-pink-600">CLAUDE.md</code>
                </td>
                <td className="p-4 border-b border-gray-100">
                  <code className="font-mono text-sm bg-gray-100 rounded px-2 py-1 text-pink-600">.windsurfrules</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl text-indigo-800 font-medium text-lg mt-4">
          💡 Not competitors. Different tools for different moments.
        </div>
      </div>
    ),
  },
  {
    id: 7,
    section: 'Theory',
    title: 'Practical decision rule',
    facilitatorNotes: `### Practical rule for juniors
"If you already know what you want to write → **Copilot**.
If you want someone to write it for you → **Claude Code** or **Windsurf**.
If you're going to touch multiple files → **Claude Code** or **Windsurf**, never Copilot."`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-2xl font-mono text-lg leading-relaxed overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
          
          <p className="text-blue-400 font-bold mb-4">How many files am I going to touch?</p>
          <div className="pl-4 border-l-2 border-gray-700 mb-8 space-y-2">
            <p><span className="text-gray-400">1 file, small change</span> <span className="text-yellow-400">→</span> <span className="text-white font-bold bg-blue-900/50 px-2 py-1 rounded">Copilot</span></p>
            <p><span className="text-gray-400">Multiple coordinated files</span> <span className="text-yellow-400">→</span> <span className="text-white font-bold bg-orange-900/50 px-2 py-1 rounded">Claude Code</span> or <span className="text-white font-bold bg-teal-900/50 px-2 py-1 rounded">Windsurf</span></p>
          </div>

          <p className="text-green-400 font-bold mb-4">Do I need it to run commands for me?</p>
          <div className="pl-4 border-l-2 border-gray-700 space-y-2">
            <p><span className="text-gray-400">Yes</span> <span className="text-yellow-400">→</span> <span className="text-white font-bold bg-orange-900/50 px-2 py-1 rounded">Claude Code</span> or <span className="text-white font-bold bg-teal-900/50 px-2 py-1 rounded">Windsurf</span></p>
            <p><span className="text-gray-400">No</span> <span className="text-yellow-400">→</span> <span className="text-white font-bold bg-gray-800 px-2 py-1 rounded">any of them works</span></p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    section: 'Theory',
    title: 'The problem: AI amnesia',
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Every new conversation, the AI starts from zero.</h2>
        
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mt-6">
          <p className="text-xl font-semibold text-red-500 mb-4 flex items-center"><span className="text-3xl mr-2">🤷‍♂️</span> It doesn't know:</p>
          <ul className="grid grid-cols-2 gap-4 text-lg text-gray-700">
            <li className="bg-red-50 p-3 rounded-lg border border-red-100">What stack you use</li>
            <li className="bg-red-50 p-3 rounded-lg border border-red-100">What conventions your team follows</li>
            <li className="bg-red-50 p-3 rounded-lg border border-red-100">Which libraries are forbidden</li>
            <li className="bg-red-50 p-3 rounded-lg border border-red-100">How to structure new files</li>
          </ul>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg text-center mt-auto transform -rotate-1">
          <p className="text-2xl font-bold uppercase tracking-wider">Result:</p>
          <p className="text-xl mt-2">You fix the style every time.</p>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    section: 'Theory',
    title: 'The solution: rules files',
    resourceId: 'rules-intro',
    facilitatorNotes: `### Goal
Teach them that modern AI tools **are not memoryless chats**. You can and should configure them to know the project.

### Key concept
"Imagine you hire a new dev. On day one you give them a README, a style guide, you tell them which libraries you use, which patterns you avoid. You have to do the same with the AI."`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <p className="text-2xl text-gray-700 text-center font-medium">
          A file at the root of your repo that the AI reads automatically.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-blue-600 mb-4">Copilot</span>
            <code className="bg-gray-100 text-sm p-2 rounded text-pink-600 break-all">.github/copilot-instructions.md</code>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-orange-500 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-orange-600 mb-4">Claude Code</span>
            <code className="bg-gray-100 text-sm p-2 rounded text-pink-600">CLAUDE.md</code>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-teal-500 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-teal-600 mb-4">Windsurf</span>
            <code className="bg-gray-100 text-sm p-2 rounded text-pink-600">.windsurfrules</code>
          </div>
        </div>

        <div className="bg-green-100 text-green-800 p-6 rounded-2xl text-center mt-auto">
          <p className="text-3xl font-black uppercase tracking-widest">Once. Applies forever.</p>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    section: 'Theory',
    title: 'Anatomy of a rules file',
    facilitatorNotes: `### The 80/20 rule
80% of the value comes from having ONE well-written rules file.
The remaining 20% comes from modular skills for specific cases. Don't obsess over skills at first. Start with the basic rules file and improve from there.`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">A good rules file answers:</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">1</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">What is</p>
              <p className="text-gray-500">this project?</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">2</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">What stack</p>
              <p className="text-gray-500">does it use?</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">3</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">How is</p>
              <p className="text-gray-500">the code organized?</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">4</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">What conventions</p>
              <p className="text-gray-500">do we follow?</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">5</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">What do we</p>
              <p className="text-gray-500 text-red-500 font-medium">avoid?</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start">
            <span className="text-3xl mr-4 bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">6</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">How do you run</p>
              <p className="text-gray-500">the commands?</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    section: 'Demo',
    title: 'Demo: same prompt, two results',
    content: (
      <div className="flex flex-col h-full space-y-8">
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-bold text-gray-500 uppercase tracking-wider">Without rules file:</h3>
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 text-gray-600 text-xl italic">
            "Any code that looks reasonable"
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-bold text-indigo-600 uppercase tracking-wider">With rules file:</h3>
          <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-300 text-indigo-900 text-xl font-medium shadow-inner">
            "Code that follows your conventions, in the right files, with your validation library, and with tests in your team's style."
          </div>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center font-bold animate-pulse mt-auto">
          🎤 (Live demo)
        </div>
      </div>
    ),
  },
  {
    id: 12,
    section: 'Theory',
    title: 'Skills (quick concept)',
    resourceId: 'reusable-skills',
    facilitatorNotes: `### Skills (quick concept, 2 min)
"Skills are like rules files but **modular and reusable**. Instead of dumping everything into one giant file, you split by topic: one skill for 'how to write migrations', another for 'how to test endpoints'."`,
    content: (
      <div className="flex flex-col h-full space-y-8">
        <div className="flex space-x-6">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border-t-8 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Rules file</h3>
            <p className="text-blue-600 font-semibold mb-4">= the Constitution</p>
            <p className="text-gray-600 italic">General conventions, always loaded</p>
          </div>
          
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border-t-8 border-purple-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Skills</h3>
            <p className="text-purple-600 font-semibold mb-4">= specific laws</p>
            <p className="text-gray-600 italic">Procedures by topic, loaded on demand</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <p className="text-sm font-bold text-gray-500 uppercase mb-2">Example skill:</p>
          <p className="text-xl font-mono text-gray-800">"How to add a DB migration"</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl text-yellow-800 mt-auto">
          <p className="font-bold">⚠️ Don't obsess over this at first.</p>
          <p className="text-lg mt-1">Start with your rules file.</p>
        </div>
      </div>
    ),
  },
  {
    id: 13,
    section: 'Theory',
    title: 'Context Hierarchy: The 3 Layers',
    resourceId: 'context-hierarchy',
    content: (
      <div className="flex flex-col h-full space-y-4 items-center justify-center">
        <h2 className="text-3xl font-black text-gray-800 mb-2">Don't put everything in one file.</h2>
        <HierarchyLayers />
        <div className="bg-gray-100 p-3 rounded-xl mt-4">
          <p className="text-center text-gray-600 font-medium">Works in Claude Code, Copilot, Windsurf, and Cursor.</p>
        </div>
      </div>
    ),
  },
  {
    id: 14,
    section: 'Theory',
    title: 'Specificity Wins',
    content: (
      <div className="flex flex-col h-full space-y-4 items-center justify-center">
        <h2 className="text-3xl font-black text-gray-800 mb-4">Loading Order & Priority</h2>
        <LoadingOrder />
        <p className="text-center text-gray-500 italic mt-2">Higher layers win in a conflict. Specificity reduces "noise".</p>
      </div>
    ),
  },
  {
    id: 15,
    section: 'Theory',
    title: 'Anatomy of the .claude/ folder',
    content: (
      <div className="flex flex-col h-full space-y-4 items-center justify-center">
        <h2 className="text-3xl font-black text-gray-800 mb-4">The Control Center</h2>
        <FolderAnatomy />
      </div>
    ),
  },
  {
    id: 16,
    section: 'Theory',
    title: 'Windsurf Context Hierarchy',
    resourceId: 'windsurf-context-hierarchy',
    content: (
      <div className="flex flex-col h-full space-y-4 items-center justify-center">
        <h2 className="text-3xl font-black text-gray-800 mb-2">Windsurf's 5-Layer Model</h2>
        <WindsurfHierarchy />
        <div className="bg-blue-50 p-3 rounded-xl mt-2 border border-blue-100">
          <p className="text-center text-blue-700 font-medium">More granular than Claude Code, but requires careful trigger management.</p>
        </div>
      </div>
    ),
  },
  {
    id: 17,
    section: 'Theory',
    title: 'Windsurf Trigger Modes',
    content: (
      <div className="flex flex-col h-full space-y-4">
        <h2 className="text-3xl font-black text-gray-800 mb-2">The 4 Trigger Modes</h2>
        <div className="grid grid-cols-2 gap-4 flex-grow">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-red-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">always_on</h3>
            <p className="text-sm text-gray-600">Included in every interaction. Eats budget fast. Use sparingly.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">glob</h3>
            <p className="text-sm text-gray-600">Fires only for matching files. The right default for most rules.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">model_decision</h3>
            <p className="text-sm text-gray-600">Cascade decides based on description. Great for complex procedures.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-orange-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">manual</h3>
            <p className="text-sm text-gray-600">Only on @mention. For power-user invocations or rare tasks.</p>
          </div>
        </div>
        <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl mt-auto">
          <p className="font-bold text-lg">💡 Pro Tip:</p>
          <p className="text-indigo-100">Use <code className="bg-indigo-800 px-2 py-0.5 rounded">trigger: glob</code> with path patterns from the root instead of nesting folders.</p>
        </div>
      </div>
    ),
  },
  {
    id: 18,
    section: 'Theory',
    title: 'The Character Budget Reality',
    content: (
      <div className="flex flex-col h-full space-y-8 items-center justify-center">
        <h2 className="text-4xl font-black text-gray-800">The 12K Character Budget</h2>
        <div className="w-full max-w-4xl space-y-6">
          <div className="bg-red-50 border-2 border-red-200 p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
              <span className="text-3xl mr-3">⚠️</span> Silent Truncation
            </h3>
            <p className="text-xl text-red-900 leading-relaxed">
              If you blow past the budget, Windsurf <span className="font-black underline">silently drops</span> the end of your rules.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase mb-2">The Symptom</p>
              <p className="text-lg font-medium text-gray-700">"Windsurf is ignoring my rules!"</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase mb-2">The Fix</p>
              <p className="text-lg font-medium text-gray-700">Use <code className="bg-gray-100 px-2 py-0.5 rounded">glob</code> triggers to keep context clean.</p>
            </div>
          </div>
        </div>
        <p className="text-gray-500 italic">Global (6K) + Workspace (12K per file) share roughly 12K per interaction.</p>
      </div>
    ),
  },
  {
    id: 19,
    section: 'Theory',
    title: 'CIVR framework',
    resourceId: 'handout-1',
    facilitatorNotes: `### Introduce the CIVR framework (3 min)
Write it on the whiteboard or project it. It's the simplified version of the contrast they already saw.`,
    content: (
      <div className="flex flex-col h-full space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-blue-500 flex items-center transform transition hover:translate-x-2">
            <span className="text-5xl font-black text-blue-500 w-20 text-center">C</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Context</h3>
              <p className="text-gray-600 text-lg">stack, file, what you're trying to do</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-green-500 flex items-center transform transition hover:translate-x-2">
            <span className="text-5xl font-black text-green-500 w-20 text-center">I</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Input</h3>
              <p className="text-gray-600 text-lg">code, error, logs</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-purple-500 flex items-center transform transition hover:translate-x-2">
            <span className="text-5xl font-black text-purple-500 w-20 text-center">V</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Validate</h3>
              <p className="text-gray-600 text-lg">ask for reasoning before the fix</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-orange-500 flex items-center transform transition hover:translate-x-2">
            <span className="text-5xl font-black text-orange-500 w-20 text-center">R</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Refine</h3>
              <p className="text-gray-600 text-lg">iterate at least 2-3 times</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 20,
    section: 'Hands-on',
    title: '🛠️ Exercise 1: Debugging',
    resourceId: 'exercise-1',
    facilitatorNotes: `### Exercise setup (2 min)
Each pair opens \`exercises/01-async-debugging.md\` and reads only the "Your task" section.

### Practice (15 min)
- **5 min** — Each pair tries to fix the bug with a deliberately bad prompt.
- **10 min** — They rewrite the prompt using CIVR and try again.`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-2 flex items-center"><span className="mr-2">🐛</span> The bug:</h3>
          <p className="text-lg text-red-900 font-mono bg-white p-3 rounded inline-block">an endpoint returns `orders: {}` instead of an array.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Task:</h3>
          <ol className="space-y-4 text-lg text-gray-700 list-decimal list-inside">
            <li className="pb-2 border-b border-gray-50">First, try with a deliberately <span className="font-bold text-red-500">bad prompt</span></li>
            <li className="pb-2 border-b border-gray-50">Then, rewrite using <span className="font-bold text-indigo-600">CIVR</span></li>
            <li>Compare results</li>
          </ol>
        </div>

        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-xl"><span className="mr-2">⏱️</span> 25 minutes</span>
            <span className="flex items-center text-xl"><span className="mr-2">👥</span> In pairs</span>
          </div>
          <span className="text-gray-400 font-mono text-sm">exercises/01-async-debugging.md</span>
        </div>
      </div>
    ),
  },
  {
    id: 21,
    section: 'Hands-on',
    title: 'Debrief Exercise 1',
    content: (
      <div className="flex flex-col h-full space-y-8 items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Let's discuss</h2>
        
        <div className="space-y-6 w-full max-w-6xl">
          <InteractiveQuestion 
            question="Which prompt worked better?" 
            answer="The CIVR prompt usually wins because it provides the 'why' and 'how' instead of just guessing." 
          />
          <InteractiveQuestion 
            question="Which part of CIVR did you forget at first?" 
            answer="Most people forget 'Validate' (asking for reasoning) or 'Refine' (expecting a perfect fix on the first try)." 
          />
        </div>

        <div className="mt-12 text-gray-500 italic text-lg">
          *(Stick the best prompts on the shared wall)*
        </div>
      </div>
    ),
  },
  {
    id: 22,
    section: 'Theory',
    title: 'Iterative 3-step flow',
    facilitatorNotes: `### Introduce the flow (3 min)
"The most common mistake I see in juniors is asking 'build me the complete products endpoint with tests'. The AI hands you 200 lines, you don't understand all of them, and when something fails you don't know where to look."`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <p className="text-2xl text-gray-600 font-medium mb-4">For building features:</p>
        
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl font-mono text-lg space-y-6">
          <div className="flex items-start">
            <span className="text-blue-400 font-bold w-24">1. PLAN</span>
            <span className="text-green-300">"Before writing code, give me the steps"</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-400 font-bold w-24">2. BUILD</span>
            <span className="text-gray-300">Implement step by step, validating each</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-400 font-bold w-24">3. TEST</span>
            <span className="text-green-300">"Generate tests with edge cases"</span>
          </div>
        </div>

        <div className="bg-red-100 border-l-8 border-red-500 p-6 rounded-r-2xl mt-auto">
          <p className="text-red-800 font-bold text-xl uppercase tracking-wider mb-2">DO NOT ask "build me the whole endpoint".</p>
          <p className="text-red-700 text-lg">That's professional suicide.</p>
        </div>
      </div>
    ),
  },
  {
    id: 23,
    section: 'Hands-on',
    title: '🛠️ Exercise 2: Feature + tests',
    resourceId: 'exercise-2',
    facilitatorNotes: `### Goal
Practice an **iterative 3-step flow** instead of asking for everything at once.

### Practice (20 min)
- **5 min** — Step 1: ask the AI for the plan.
- **10 min** — Step 2: implement step by step.
- **5 min** — Step 3: ask for tests with edge cases.`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-2">Task:</h3>
          <p className="text-lg text-indigo-900">Build <code className="bg-white px-2 py-1 rounded font-mono text-pink-600">POST /api/products</code> with validation, persistence, and tests.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📜</span> Game rules:</h3>
          <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
            <li className="pb-2 border-b border-gray-50">Follow the 3 steps in order (Plan, Build, Test)</li>
            <li className="pb-2 border-b border-gray-50">Don't tell the AI "do it all"</li>
            <li>Read each step before moving to the next</li>
          </ul>
        </div>

        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-xl"><span className="mr-2">⏱️</span> 30 minutes</span>
            <span className="flex items-center text-xl"><span className="mr-2">👥</span> In pairs</span>
          </div>
          <span className="text-gray-400 font-mono text-sm">exercises/02-feature-endpoint.md</span>
        </div>
      </div>
    ),
  },
  {
    id: 24,
    section: 'Hands-on',
    title: 'Debrief Exercise 2',
    content: (
      <div className="flex flex-col h-full space-y-8 items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Let's discuss</h2>
        
        <div className="space-y-6 w-full max-w-6xl">
          <InteractiveQuestion 
            question="At what step did the plan surprise you?" 
            answer="Often the AI suggests a more modular or standard approach than we might have hacked together manually." 
          />
          <InteractiveQuestion 
            question="Did you have to fix anything?" 
            answer="Iteration is key! Usually, small adjustments are needed to match specific local environment quirks." 
          />
          <InteractiveQuestion 
            question="How many edge cases did the AI find that you wouldn't have thought of?" 
            answer="AI is great at remembering common pitfalls like null checks, empty states, and race conditions." 
          />
        </div>
      </div>
    ),
  },
  {
    id: 25,
    section: 'Theory',
    title: 'The most underrated use case',
    content: (
      <div className="flex flex-col h-full space-y-6">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 text-center mb-4">
          Using AI to understand code you DIDN'T write.
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-6">
          Next time you land on a new repo, don't read line by line. Ask the AI:
        </p>

        <div className="grid grid-cols-2 gap-6 flex-grow">
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-teal-400 flex flex-col justify-center">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-xl font-medium text-gray-800">1. What does this file do in one sentence?</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-400 flex flex-col justify-center">
            <span className="text-4xl mb-4">🚪</span>
            <p className="text-xl font-medium text-gray-800">2. What are the public functions?</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-indigo-400 flex flex-col justify-center">
            <span className="text-4xl mb-4">💥</span>
            <p className="text-xl font-medium text-gray-800">3. If I change X, what breaks?</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-purple-400 flex flex-col justify-center">
            <span className="text-4xl mb-4">👃</span>
            <p className="text-xl font-medium text-gray-800">4. Are there code smells?</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 26,
    section: 'Hands-on',
    title: '🛠️ Exercise 3: Understand unfamiliar code',
    resourceId: 'exercise-3',
    facilitatorNotes: `### Goal
Show them **the most underrated use case**: using AI as an onboarding tutor when you land in a new codebase.`,
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
          <p className="text-xl text-blue-900">We give you a ~120-line file you've never seen.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex-grow flex flex-col justify-center items-center text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Your task:</h3>
          <p className="text-2xl text-gray-700 leading-relaxed max-w-6xl">
            Answer those 4 questions using only the AI, <br/>
            <span className="font-black text-red-600 uppercase bg-red-100 px-4 py-2 rounded-lg inline-block mt-4 transform -rotate-2">without reading line by line</span>.
          </p>
        </div>

        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-xl"><span className="mr-2">⏱️</span> 15 minutes</span>
            <span className="flex items-center text-xl"><span className="mr-2">👥</span> In pairs</span>
          </div>
          <span className="text-gray-400 font-mono text-sm">exercises/03-understand-code.md</span>
        </div>
      </div>
    ),
  },
  {
    id: 27,
    section: 'Theory',
    title: 'Anti-patterns (what NOT to do)',
    resourceId: 'handout-3',
    facilitatorNotes: `### Anti-patterns (5 min)
Project this list. Discuss why each one is dangerous for junior developers.`,
    content: (
      <div className="flex flex-col h-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">"It's not working, fix it"</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Accepting the first answer without reading it</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Asking for huge changes in one go</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Trusting functions invented by the AI</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Not having a rules file</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Pasting credentials or sensitive data</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start md:col-span-2">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-lg text-red-900 font-medium">Treating the AI as absolute truth</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 28,
    section: 'Theory',
    title: 'The master rule',
    facilitatorNotes: `### Final golden rule
Repeat it three times, slowly: "If you don't understand what the AI gave you, don't paste it."
This is critical for juniors. The AI can produce code that looks right, compiles, even passes superficial tests, but if you don't understand what it does, you're responsible for any bug it causes in production.`,
    content: (
      <div className="flex flex-col h-full items-center justify-center space-y-12">
        <div className="bg-yellow-100 border-4 border-yellow-400 p-10 rounded-3xl shadow-2xl transform rotate-1 max-w-none text-center">
          <h1 className="text-5xl font-black text-yellow-900 leading-tight">
            "If you don't understand what the AI gave you, <span className="underline decoration-red-500 decoration-8">don't paste it.</span>"
          </h1>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-3xl font-bold text-gray-800">You are responsible for the code you commit.</p>
          <p className="text-2xl text-gray-500 italic">The AI doesn't sign the PR.</p>
        </div>
      </div>
    ),
  },
  {
    id: 29,
    section: 'Closing',
    title: 'Plan for next week',
    resourceId: 'exercise-4',
    content: (
      <div className="flex flex-col h-full space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-md border-l-8 border-indigo-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📅</span> Monday:</h3>
          <ul className="space-y-3 text-xl text-gray-700">
            <li className="flex items-center"><input type="checkbox" className="w-6 h-6 mr-4 rounded text-indigo-600 focus:ring-indigo-500" readOnly /> Create <code className="mx-2 bg-gray-100 px-2 py-1 rounded text-sm text-pink-600">CLAUDE.md</code> (or equivalent) in your main repo</li>
            <li className="flex items-center"><input type="checkbox" className="w-6 h-6 mr-4 rounded text-indigo-600 focus:ring-indigo-500" readOnly /> Try the prompt templates from the handout</li>
            <li className="flex items-center"><input type="checkbox" className="w-6 h-6 mr-4 rounded text-indigo-600 focus:ring-indigo-500" readOnly /> Do exercise 4 (safe refactor) as homework</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border-l-8 border-teal-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">🗓️</span> Month 1:</h3>
          <ul className="space-y-3 text-xl text-gray-700">
            <li className="flex items-center"><input type="checkbox" className="w-6 h-6 mr-4 rounded text-teal-600 focus:ring-teal-500" readOnly /> Build your first skill / workflow</li>
            <li className="flex items-center"><input type="checkbox" className="w-6 h-6 mr-4 rounded text-teal-600 focus:ring-teal-500" readOnly /> Share your best prompt with the team</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 30,
    section: 'Closing',
    title: 'Resources',
    content: (
      <div className="flex flex-col h-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📁</span> Workshop repo</h3>
            <a href="#" className="text-blue-600 hover:underline text-lg break-all">[link to repo]</a>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📄</span> Handouts</h3>
            <ul className="text-gray-600 text-lg space-y-1">
              <li>• CIVR framework</li>
              <li>• Tools cheatsheet</li>
              <li>• Anti-patterns</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📚</span> Official docs</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 text-lg">
              <li className="bg-gray-50 p-3 rounded-lg"><span className="font-bold">Copilot:</span><br/><a href="#" className="text-blue-600 hover:underline text-sm">docs.github.com/copilot</a></li>
              <li className="bg-gray-50 p-3 rounded-lg"><span className="font-bold">Claude Code:</span><br/><a href="#" className="text-blue-600 hover:underline text-sm">docs.claude.com/claude-code</a></li>
              <li className="bg-gray-50 p-3 rounded-lg"><span className="font-bold">Windsurf:</span><br/><a href="#" className="text-blue-600 hover:underline text-sm">docs.windsurf.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center mt-auto">
          <span className="text-xl mr-2">📌</span>
          <span className="font-bold text-yellow-800 text-lg">Workshop prompt wall:</span>
          <a href="#" className="text-blue-600 hover:underline ml-2 text-lg">[link to shared doc]</a>
        </div>
      </div>
    ),
  },
  {
    id: 31,
    section: 'Closing',
    title: 'Q&A',
    content: (
      <div className="flex flex-col h-full items-center justify-center space-y-8">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">
          Questions?
        </h1>
        <div className="bg-gray-100 p-6 rounded-2xl text-center max-w-4xl">
          <p className="text-xl text-gray-600 italic">
            (Max 5 minutes. What we don't answer here goes to the team channel.)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 32,
    section: 'Closing',
    title: 'Closing',
    content: (
      <div className="flex flex-col h-full items-center justify-center space-y-10 text-center">
        <p className="text-3xl font-medium text-gray-600 uppercase tracking-widest">If you take only ONE thing from today:</p>
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded-3xl shadow-2xl transform transition hover:scale-105">
          <div className="bg-white p-12 rounded-[22px]">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Set up your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">rules file</span><br/>on Monday.
            </h1>
          </div>
        </div>
        
        <p className="text-2xl text-gray-700 font-medium max-w-6xl">
          It's the highest-impact, lowest-effort change you can make.
        </p>
      </div>
    ),
  }
];
