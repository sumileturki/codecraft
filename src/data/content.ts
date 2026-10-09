import type { CommunityThread, Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "python-calculator",
    title: "Python Calculator",
    description:
      "Build a working calculator that adds, subtracts, multiplies, and divides. Your first real Python program, built in guided steps.",
    difficulty: "Guided",
    estimatedHours: 2,
    skills: ["Variables", "Functions", "If / Else", "Input & Output"],
    lessons: [
      { title: "Variables", href: "/learn/python/variables" },
      { title: "If / Else", href: "/learn/python/conditions" },
      { title: "Functions", href: "/learn/python/functions" },
    ],
    overview: [
      "A calculator is the perfect first project: it takes input, makes decisions, and produces output — the three things almost every program does.",
      "You will build it step by step: first arithmetic functions, then a menu, then input handling, and finally a polished, error-proof program.",
    ],
    starterCode:
      'def add(a, b):\n    return a + b\n\nprint(add(2, 3))',
    milestones: [
      {
        title: "Create project structure",
        description: "Set up add, subtract, multiply, and divide functions.",
        hint: "Each function takes two parameters and returns the result.",
      },
      {
        title: "Build the menu",
        description: "Print a menu so the user can pick an operation.",
        hint: "Use print() lines numbered 1–4 for the four operations.",
      },
      {
        title: "Read user input",
        description: "Ask for two numbers and an operation choice.",
        hint: "Use input() and convert to numbers with float().",
      },
      {
        title: "Connect logic with if / else",
        description: "Call the right function based on the user's choice.",
        hint: "Compare the choice with == and call the matching function.",
      },
      {
        title: "Add error handling",
        description: "Handle division by zero and invalid choices gracefully.",
        hint: "Check if the second number is 0 before dividing.",
      },
      {
        title: "Final polish",
        description: "Format output nicely and test every operation.",
        hint: "Use f-strings like print(f\"Result: {result}\").",
      },
    ],
    finalChallenge:
      "Extend your calculator with a power operation and a history feature that remembers the last 5 results.",
  },
  {
    slug: "python-weather-dashboard",
    title: "Weather Dashboard",
    description:
      "Build a dashboard that reads weather data, parses it, and displays a clean summary — including error handling for missing cities.",
    difficulty: "Semi-Guided",
    estimatedHours: 4,
    skills: ["Dictionaries", "Functions", "Error Handling", "JSON"],
    lessons: [
      { title: "Variables", href: "/learn/python/variables" },
      { title: "If / Else", href: "/learn/python/conditions" },
      { title: "For Loops", href: "/learn/python/loops" },
    ],
    overview: [
      "This project teaches you to work with structured data — the same skill used in data analysis and web APIs.",
      "You will parse a weather data dictionary, extract the fields you need, display a formatted summary, and handle missing data without crashing.",
    ],
    starterCode:
      'weather = {"city": "Lagos", "temp_c": 31, "condition": "Sunny"}\nprint(weather["city"])',
    milestones: [
      {
        title: "Create project structure",
        description: "Define the weather data dictionary and helper functions.",
        hint: "Store city, temperature, humidity, and condition keys.",
      },
      {
        title: "Fetch API data",
        description: "Simulate fetching data with a function that returns the dictionary.",
        hint: "Write get_weather(city) that returns weather data or None.",
      },
      {
        title: "Parse JSON",
        description: "Extract temperature, condition, and humidity into variables.",
        hint: "Use dictionary access like data[\"temp_c\"].",
      },
      {
        title: "Display weather",
        description: "Print a formatted multi-line weather summary.",
        hint: "Use f-strings for clean formatting.",
      },
      {
        title: "Add error handling",
        description: "Show a friendly message when a city is not found.",
        hint: "Check if the result is None before displaying.",
      },
      {
        title: "Final polish",
        description: "Support multiple cities and a clean summary layout.",
        hint: "Loop over a list of cities and display each one.",
      },
    ],
    finalChallenge:
      "Add a 3-day forecast list and highlight the hottest day automatically.",
  },
  {
    slug: "todo-app",
    title: "Todo Application",
    description:
      "Build an interactive todo app: add tasks, mark them done, and delete them. A classic first web project with JavaScript.",
    difficulty: "Semi-Guided",
    estimatedHours: 4,
    skills: ["JavaScript", "DOM", "Arrays", "Event Handling"],
    lessons: [{ title: "JavaScript intro", href: "/learn/javascript/intro" }],
    overview: [
      "Todo apps are a rite of passage because they cover the full cycle: state, rendering, and user interaction.",
      "You will build the task list logic first, then connect it to buttons and inputs on the page.",
    ],
    starterCode:
      'const tasks = ["Learn HTML", "Learn CSS"];\nconsole.log(tasks.length);',
    milestones: [
      {
        title: "Create task storage",
        description: "Store tasks in an array of objects with done flags.",
        hint: "Each task: { text: \"...\", done: false }.",
      },
      {
        title: "Render the list",
        description: "Display every task as a list item on the page.",
        hint: "Loop over tasks and build HTML strings.",
      },
      {
        title: "Add new tasks",
        description: "Read the input field and append a new task.",
        hint: "Push to the array, then re-render.",
      },
      {
        title: "Toggle completion",
        description: "Click a task to mark it done or undone.",
        hint: "Flip the done flag and re-render.",
      },
      {
        title: "Delete tasks",
        description: "Add a delete button per task.",
        hint: "Remove by index with splice().",
      },
      {
        title: "Final polish",
        description: "Add a counter, empty-state message, and clean styling.",
        hint: "Show 'X tasks left' above the list.",
      },
    ],
    finalChallenge:
      "Persist tasks in localStorage so they survive a page reload.",
  },
  {
    slug: "quiz-game",
    title: "Quiz Game",
    description:
      "Build a multiple-choice quiz with scoring, loops, and conditionals. A fun way to practice program flow in Python.",
    difficulty: "Guided",
    estimatedHours: 2,
    skills: ["Loops", "Conditionals", "Lists", "Input & Output"],
    lessons: [
      { title: "If / Else", href: "/learn/python/conditions" },
      { title: "For Loops", href: "/learn/python/loops" },
    ],
    overview: [
      "Quizzes combine loops (one question at a time), conditionals (right or wrong?), and score tracking.",
      "You will store questions, ask them in a loop, check answers, and report the final score.",
    ],
    starterCode:
      'questions = ["2 + 2 = ?"]\nanswers = ["4"]\nprint(questions[0])',
    milestones: [
      {
        title: "Store questions",
        description: "Create parallel lists of questions and answers.",
        hint: "Keep questions[i] matched with answers[i].",
      },
      {
        title: "Ask in a loop",
        description: "Loop over questions and collect answers with input().",
        hint: "Use for i in range(len(questions)):.",
      },
      {
        title: "Check answers",
        description: "Compare each answer and keep score.",
        hint: "Add 1 to score when the answer matches.",
      },
      {
        title: "Show the final score",
        description: "Print e.g. 'You scored 3/5'.",
        hint: "Use an f-string with score and total.",
      },
    ],
    finalChallenge:
      "Add difficulty levels and shuffle the question order each run.",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "Track spending by category, total it up, and find your biggest expense. A practical data project in Python.",
    difficulty: "Unguided",
    estimatedHours: 5,
    skills: ["Dictionaries", "Loops", "Functions", "Data Aggregation"],
    lessons: [
      { title: "For Loops", href: "/learn/python/loops" },
      { title: "Functions", href: "/learn/python/functions" },
    ],
    overview: [
      "This unguided project gives you a goal and hints — you design the solution.",
      "You will model expenses, aggregate by category, and produce a spending summary.",
    ],
    starterCode: "expenses = []\nprint(\"Expense tracker ready\")",
    milestones: [
      {
        title: "Model an expense",
        description: "Decide how to store amount, category, and note.",
        hint: "A dictionary per expense works well.",
      },
      {
        title: "Add expenses",
        description: "Write add_expense() to append new records.",
        hint: "Append dictionaries to the expenses list.",
      },
      {
        title: "Total by category",
        description: "Sum spending per category.",
        hint: "Loop and accumulate into a totals dictionary.",
      },
      {
        title: "Find biggest expense",
        description: "Identify the single largest purchase.",
        hint: "Track the max while looping.",
      },
      {
        title: "Print a summary",
        description: "Show totals, biggest expense, and overall spend.",
        hint: "Format numbers to 2 decimal places.",
      },
    ],
    finalChallenge:
      "Add monthly filtering and a simple text-based bar chart per category.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const communityThreads: CommunityThread[] = [
  {
    slug: "for-loop-extra-iteration",
    title: "Why does my for loop run one extra time?",
    category: "Python",
    author: "beginner_ada",
    replies: 14,
    views: 1204,
    lastActivity: "2 hours ago",
    excerpt:
      "I used range(1, 5) and expected 5 iterations, but I only get 4 numbers. What am I misunderstanding about how range works?",
    solved: true,
  },
  {
    slug: "structure-first-python-project",
    title: "How should I structure my first Python project?",
    category: "Beginner Questions",
    author: "career_switcher",
    replies: 22,
    views: 2310,
    lastActivity: "5 hours ago",
    excerpt:
      "I finished the variables and functions lessons. Now I want to build the calculator project but I don't know where to put my code or how to organize it.",
    solved: true,
  },
  {
    slug: "variable-returning-none",
    title: "My variable is returning None",
    category: "Debugging",
    author: "uni_student",
    replies: 9,
    views: 876,
    lastActivity: "1 day ago",
    excerpt:
      "My function prints the right value but when I store the result in a variable it becomes None. Here is my code — what did I miss?",
    solved: false,
  },
  {
    slug: "print-vs-return",
    title: "print() vs return — when do I use which?",
    category: "Python",
    author: "founder_joe",
    replies: 31,
    views: 3420,
    lastActivity: "1 day ago",
    excerpt:
      "I keep mixing up print and return inside functions. Can someone explain the difference with a simple example?",
    solved: true,
  },
  {
    slug: "todo-app-localstorage",
    title: "How do I save my todo app tasks after reload?",
    category: "JavaScript",
    author: "self_taught_kim",
    replies: 7,
    views: 654,
    lastActivity: "2 days ago",
    excerpt:
      "My todo app works but tasks disappear on refresh. I heard localStorage can help — how do I use it?",
    solved: false,
  },
  {
    slug: "indentation-error-help",
    title: "IndentationError: expected an indented block — help?",
    category: "Debugging",
    author: "new_coder",
    replies: 11,
    views: 1530,
    lastActivity: "3 days ago",
    excerpt:
      "I get this error after my if statement. My code looks fine to me — what does Python actually want here?",
    solved: true,
  },
  {
    slug: "weather-dashboard-api",
    title: "Tips for the weather dashboard project?",
    category: "Projects",
    author: "data_dreamer",
    replies: 5,
    views: 432,
    lastActivity: "4 days ago",
    excerpt:
      "Starting the weather dashboard and wondering how to organize the parsing code. Any tips before I begin?",
    solved: false,
  },
];

export const communityCategories = [
  "Python",
  "JavaScript",
  "Beginner Questions",
  "Debugging",
  "Projects",
];
