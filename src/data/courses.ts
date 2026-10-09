import type { Course, Lesson } from "@/types";

export const courses: Course[] = [
  {
    slug: "python",
    title: "Python for Complete Beginners",
    shortTitle: "Python",
    description:
      "Learn Python from zero through interactive lessons and real projects. No installation needed — every lesson runs in your browser with instant feedback and plain-language explanations.",
    language: "Python",
    difficulty: "Beginner",
    lessonCount: 15,
    projectCount: 4,
    estimatedHours: 12,
    goals: ["Programming Fundamentals", "Data Analysis"],
    modules: [
      {
        title: "Module 1: Python Fundamentals",
        lessons: [
          { title: "Your First Python Program", href: "/learn/python/intro" },
          { title: "Variables", href: "/learn/python/variables" },
          { title: "Data Types", href: "/learn/python/data-types" },
        ],
      },
      {
        title: "Module 2: Logic",
        lessons: [
          { title: "If / Else", href: "/learn/python/conditions" },
          { title: "Comparison Operators", href: "/learn/python/comparisons" },
        ],
      },
      {
        title: "Module 3: Loops",
        lessons: [
          { title: "For Loops", href: "/learn/python/loops" },
          { title: "While Loops", href: "/learn/python/while-loops" },
        ],
      },
      {
        title: "Module 4: Functions",
        lessons: [
          { title: "Functions", href: "/learn/python/functions" },
          { title: "Parameters", href: "/learn/python/parameters" },
        ],
      },
      {
        title: "Module 5: Projects",
        lessons: [
          { title: "Calculator", href: "/projects/python-calculator" },
          {
            title: "Weather Dashboard",
            href: "/projects/python-weather-dashboard",
          },
        ],
      },
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript for Complete Beginners",
    shortTitle: "JavaScript",
    description:
      "Learn the language of the web from zero. Write JavaScript in your browser, see results instantly, and build interactive pages with guided beginner projects.",
    language: "JavaScript",
    difficulty: "Beginner",
    lessonCount: 15,
    projectCount: 4,
    estimatedHours: 14,
    goals: ["Web Development", "Programming Fundamentals"],
    modules: [
      {
        title: "Module 1: JavaScript Fundamentals",
        lessons: [
          { title: "Your First JavaScript Program", href: "/learn/javascript/intro" },
          { title: "Variables with let and const", href: "/learn/javascript/variables" },
          { title: "Data Types", href: "/learn/javascript/data-types" },
        ],
      },
      {
        title: "Module 2: Logic",
        lessons: [
          { title: "If / Else", href: "/learn/javascript/conditions" },
          { title: "Loops", href: "/learn/javascript/loops" },
        ],
      },
      {
        title: "Module 3: Functions and DOM",
        lessons: [
          { title: "Functions", href: "/learn/javascript/functions" },
          { title: "The DOM", href: "/learn/javascript/dom" },
        ],
      },
      {
        title: "Module 4: Projects",
        lessons: [
          { title: "Todo Application", href: "/projects/todo-app" },
          { title: "Quiz Game", href: "/projects/quiz-game" },
        ],
      },
    ],
  },
  {
    slug: "html-css",
    title: "HTML & CSS for Complete Beginners",
    shortTitle: "HTML & CSS",
    description:
      "Build your first web pages from zero. Learn structure with HTML and styling with CSS through visual, hands-on lessons that render live in your browser.",
    language: "HTML/CSS",
    difficulty: "Beginner",
    lessonCount: 12,
    projectCount: 3,
    estimatedHours: 10,
    goals: ["Web Development"],
    modules: [
      {
        title: "Module 1: HTML Structure",
        lessons: [
          { title: "Your First Web Page", href: "/learn/html-css/intro" },
          { title: "Text and Links", href: "/learn/html-css/text" },
          { title: "Images and Lists", href: "/learn/html-css/media" },
        ],
      },
      {
        title: "Module 2: CSS Styling",
        lessons: [
          { title: "Selectors and Colors", href: "/learn/html-css/styling" },
          { title: "The Box Model", href: "/learn/html-css/box-model" },
          { title: "Flexbox Layout", href: "/learn/html-css/flexbox" },
        ],
      },
      {
        title: "Module 3: Projects",
        lessons: [
          { title: "Personal Portfolio Page", href: "/projects/portfolio-page" },
          { title: "Todo Application Styling", href: "/projects/todo-app" },
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

const lesson = (l: Lesson): Lesson => l;

export const lessons: Record<string, Lesson> = {
  "python/intro": lesson({
    slug: "intro",
    language: "python",
    courseSlug: "python",
    index: 1,
    totalInPath: 10,
    title: "Your First Python Program",
    seoTitle: "Learn Python Online Free Without Installing Anything | CodeCraft",
    description:
      "Write and run your first Python program directly in your browser. Learn what print() does, with no installation or setup required — free and beginner-friendly.",
    objectives: [
      "Run Python code in your browser with zero setup",
      "Use print() to display text",
      "Understand what a string is",
    ],
    steps: [
      {
        title: "Step 1 — Meet print()",
        body: "print() is a Python command that displays text on the screen. Anything you put inside the parentheses, wrapped in quotes, gets shown in the output panel.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Create a variable called name with your name in it, then print it. For example: name = \"Alex\" on one line and print(name) on the next.",
      },
      {
        title: "Step 3 — Run and submit",
        body: "Press Run Code to see your output. When the output shows a name, press Submit to complete the lesson and save your progress.",
      },
    ],
    starterCode: 'name = ""\nprint(name)',
    solutionHint:
      "Put a name inside the quotes on line 1, for example name = \"Alex\". Line 2 already prints it.",
    expectedOutput: "",
    tests: [
      {
        kind: "definesVariable",
        variable: "name",
        hint: "You're close. Create a variable named `name` before printing it.",
      },
      {
        kind: "callsPrint",
        hint: "Try displaying the value using print().",
      },
      {
        kind: "outputIncludes",
        values: [],
        hint: "Your variable is empty — put a name inside the quotes so something is printed.",
      },
    ],
    hints: [
      "A variable stores a value under a name: name = \"Alex\".",
      "print(name) displays whatever is stored in name.",
      "Make sure the name inside the quotes is not empty.",
    ],
    relatedLessons: [
      { title: "Variables", href: "/learn/python/variables" },
      { title: "JavaScript intro", href: "/learn/javascript/intro" },
    ],
    relatedProjects: [
      { title: "Python Calculator", href: "/projects/python-calculator" },
    ],
    estimatedMinutes: 10,
  }),
  "python/variables": lesson({
    slug: "variables",
    language: "python",
    courseSlug: "python",
    index: 2,
    totalInPath: 10,
    title: "Variables",
    seoTitle: "Python Variables Explained for Beginners | CodeCraft",
    description:
      "Learn what Python variables are with plain-language explanations. Store text and numbers, then print them — interactively, in your browser.",
    objectives: [
      "Create variables with =",
      "Store text and numbers",
      "Reuse a variable in print()",
    ],
    steps: [
      {
        title: "Step 1 — Variables are labeled boxes",
        body: "A variable gives a name to a value. age = 21 stores the number 21 under the name age. You can use that name later instead of typing the value again.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Create a variable called city containing any city name, then print it. Example: city = \"Lagos\" followed by print(city).",
      },
      {
        title: "Step 3 — Run and submit",
        body: "Run your code, check the output shows your city, then submit.",
      },
    ],
    starterCode: 'city = ""\nprint(city)',
    solutionHint: "Put a city name inside the quotes, e.g. city = \"Lagos\".",
    expectedOutput: "",
    tests: [
      {
        kind: "definesVariable",
        variable: "city",
        hint: "You're close. Create a variable named `city` before printing it.",
      },
      { kind: "callsPrint", hint: "Try displaying the value using print()." },
      {
        kind: "outputIncludes",
        values: [],
        hint: "Your variable is empty — put a city name inside the quotes.",
      },
    ],
    hints: [
      "Use = to store a value: city = \"Lagos\".",
      "Text values need quotes; numbers do not: age = 21.",
      "Variable names are lowercase with no spaces.",
    ],
    relatedLessons: [
      { title: "Your First Python Program", href: "/learn/python/intro" },
      { title: "Data Types", href: "/learn/python/data-types" },
    ],
    relatedProjects: [
      { title: "Python Calculator", href: "/projects/python-calculator" },
    ],
    estimatedMinutes: 12,
  }),
  "python/conditions": lesson({
    slug: "conditions",
    language: "python",
    courseSlug: "python",
    index: 3,
    totalInPath: 10,
    title: "If / Else",
    seoTitle: "Python If Else Explained for Beginners | CodeCraft",
    description:
      "Learn how Python programs make decisions with if and else. Write branching code interactively and watch it run step by step.",
    objectives: [
      "Write an if statement",
      "Add an else branch",
      "Compare values with ==",
    ],
    steps: [
      {
        title: "Step 1 — Programs can decide",
        body: "An if statement runs code only when a condition is true. age = 20, then if age >= 18: followed by an indented print(\"Adult\") prints Adult only when the condition holds.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Set score = 75. If score is 50 or more, print \"Pass\". Otherwise print \"Fail\". Use if score >= 50: and else: with indented print lines.",
      },
      {
        title: "Step 3 — Run and submit",
        body: "Run the code. You should see Pass. Then submit.",
      },
    ],
    starterCode: "score = 75\n",
    solutionHint:
      "Add:\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
    expectedOutput: "Pass",
    tests: [
      {
        kind: "definesVariable",
        variable: "score",
        hint: "Start by creating the variable: score = 75.",
      },
      {
        kind: "outputEquals",
        expected: "Pass",
        hint: "Your code ran, but the result isn't what this exercise expects. Check your if condition and indentation.",
      },
    ],
    hints: [
      "Conditions end with a colon: if score >= 50:",
      "Indent the lines inside if/else with 4 spaces.",
      "else: catches everything the if did not.",
    ],
    relatedLessons: [
      { title: "For Loops", href: "/learn/python/loops" },
      { title: "Comparison Operators", href: "/learn/python/comparisons" },
    ],
    relatedProjects: [
      { title: "Quiz Game", href: "/projects/quiz-game" },
    ],
    estimatedMinutes: 15,
  }),
  "python/loops": lesson({
    slug: "loops",
    language: "python",
    courseSlug: "python",
    index: 4,
    totalInPath: 10,
    title: "For Loops",
    seoTitle: "Visualize How Loops Work in Python Line by Line | CodeCraft",
    description:
      "Understand Python for loops by watching them execute line by line. Repeat actions with range(), then visualize the execution in our free code visualizer.",
    objectives: [
      "Repeat code with for and range()",
      "Read loop output line by line",
      "Trace a loop with the visualizer",
    ],
    steps: [
      {
        title: "Step 1 — Loops repeat work",
        body: "for i in range(3): runs the indented line 3 times, with i taking the values 0, 1, 2. print(i) inside the loop therefore prints three lines.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Write a loop that prints the numbers 0, 1, 2 — one per line.",
      },
      {
        title: "Step 3 — See it visually",
        body: "After submitting, open the Code Visualizer to watch each loop step change the variable i.",
      },
    ],
    starterCode: "# Print 0, 1, 2 using a for loop\n",
    solutionHint: "Use:\nfor i in range(3):\n    print(i)",
    expectedOutput: "0\n1\n2",
    tests: [
      {
        kind: "outputEquals",
        expected: "0\n1\n2",
        hint: "Your code ran, but the result isn't what this exercise expects. Loop with for i in range(3): and print(i) inside it.",
      },
    ],
    hints: [
      "range(3) produces 0, 1, 2 — it stops before 3.",
      "Don't forget the colon after range(3).",
      "Indent print(i) with 4 spaces so it sits inside the loop.",
    ],
    relatedLessons: [
      { title: "While Loops", href: "/learn/python/while-loops" },
      { title: "If / Else", href: "/learn/python/conditions" },
    ],
    relatedProjects: [
      { title: "Quiz Game", href: "/projects/quiz-game" },
    ],
    estimatedMinutes: 15,
  }),
  "python/functions": lesson({
    slug: "functions",
    language: "python",
    courseSlug: "python",
    index: 5,
    totalInPath: 10,
    title: "Functions",
    seoTitle: "Python Functions for Beginners, Explained Simply | CodeCraft",
    description:
      "Learn to define and call Python functions with def and return. Practice interactively and get hints when your code doesn't behave as expected.",
    objectives: [
      "Define a function with def",
      "Return a value",
      "Call your function and print the result",
    ],
    steps: [
      {
        title: "Step 1 — Functions package up work",
        body: "def greet(): followed by an indented return \"Hello!\" creates a reusable block. Calling print(greet()) runs it and displays Hello!.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Define a function called greet that returns the text \"Hello!\". Then print the result of calling it.",
      },
      {
        title: "Step 3 — Run and submit",
        body: "The output should be exactly: Hello! Then submit.",
      },
    ],
    starterCode: "# Define greet() and print(greet())\n",
    solutionHint:
      'Use:\ndef greet():\n    return "Hello!"\n\nprint(greet())',
    expectedOutput: "Hello!",
    tests: [
      {
        kind: "definesFunction",
        variable: "greet",
        hint: "Define the function first: def greet(): with an indented return line.",
      },
      {
        kind: "outputEquals",
        expected: "Hello!",
        hint: "Your code ran, but the result isn't what this exercise expects. Return \"Hello!\" and print(greet()).",
      },
    ],
    hints: [
      "def greet(): starts the definition — don't forget the colon.",
      "return sends a value back to whoever called the function.",
      "print(greet()) displays the returned value.",
    ],
    relatedLessons: [
      { title: "Parameters", href: "/learn/python/parameters" },
      { title: "For Loops", href: "/learn/python/loops" },
    ],
    relatedProjects: [
      { title: "Python Calculator", href: "/projects/python-calculator" },
    ],
    estimatedMinutes: 18,
  }),
  "javascript/intro": lesson({
    slug: "intro",
    language: "javascript",
    courseSlug: "javascript",
    index: 1,
    totalInPath: 8,
    title: "Your First JavaScript Program",
    seoTitle: "Learn JavaScript Online Free in Your Browser | CodeCraft",
    description:
      "Write and run your first JavaScript program directly in your browser. Learn console.log, variables, and how output works — no setup required.",
    objectives: [
      "Run JavaScript in your browser",
      "Use console.log to display values",
      "Create a variable with const",
    ],
    steps: [
      {
        title: "Step 1 — Meet console.log",
        body: "console.log(...) displays a value. Combined with const name = \"Alex\"; and console.log(name); it prints Alex.",
      },
      {
        title: "Step 2 — Your turn",
        body: "Create a constant called name with your name, then log it to the console.",
      },
      {
        title: "Step 3 — Run and submit",
        body: "Run the code, confirm the output, then submit.",
      },
    ],
    starterCode: 'const name = "";\nconsole.log(name);',
    solutionHint: "Put a name inside the quotes: const name = \"Alex\";",
    expectedOutput: "",
    tests: [
      {
        kind: "definesVariable",
        variable: "name",
        hint: "You're close. Create a constant named `name` before logging it.",
      },
      { kind: "callsPrint", hint: "Try displaying the value using console.log()." },
      {
        kind: "outputIncludes",
        values: [],
        hint: "Your variable is empty — put a name inside the quotes.",
      },
    ],
    hints: [
      "const creates a constant: const name = \"Alex\";.",
      "End JavaScript lines with a semicolon.",
      "console.log(name) displays the stored value.",
    ],
    relatedLessons: [
      { title: "Python intro", href: "/learn/python/intro" },
    ],
    relatedProjects: [{ title: "Todo App", href: "/projects/todo-app" }],
    estimatedMinutes: 10,
  }),
};

const genericPythonLesson = (
  slug: string,
  index: number,
  title: string,
  description: string,
): Lesson =>
  lesson({
    slug,
    language: "python",
    courseSlug: "python",
    index,
    totalInPath: 10,
    title,
    seoTitle: `${title} — Python for Beginners | CodeCraft`,
    description,
    objectives: ["Understand the concept", "Write working code", "Submit the exercise"],
    steps: [
      {
        title: "Step 1 — Read the concept",
        body: "Read the explanation panel carefully. Each line of the starter code is annotated so you can see what it does.",
      },
      {
        title: "Step 2 — Complete the exercise",
        body: "Edit the starter code to produce the expected output shown below the editor.",
      },
      { title: "Step 3 — Run and submit", body: "Run your code, then submit when the output matches." },
    ],
    starterCode: "# Complete this lesson in the editor\nprint(\"Hello, Python!\")",
    solutionHint: "Run the starter code first, then experiment by changing the text.",
    expectedOutput: "Hello, Python!",
    tests: [
      {
        kind: "outputEquals",
        expected: "Hello, Python!",
        hint: "Your code ran, but the result isn't what this exercise expects. Make sure it prints exactly: Hello, Python!",
      },
    ],
    hints: ["Run the starter code to see what it does first."],
    relatedLessons: [{ title: "Your First Python Program", href: "/learn/python/intro" }],
    relatedProjects: [{ title: "Python Calculator", href: "/projects/python-calculator" }],
    estimatedMinutes: 12,
  });

lessons["python/data-types"] = genericPythonLesson(
  "data-types",
  6,
  "Data Types",
  "Learn Python data types — strings, integers, floats, and booleans — with interactive examples you run in your browser.",
);
lessons["python/comparisons"] = genericPythonLesson(
  "comparisons",
  7,
  "Comparison Operators",
  "Learn Python comparison operators (==, !=, <, >) and how True/False results control if statements.",
);
lessons["python/while-loops"] = genericPythonLesson(
  "while-loops",
  8,
  "While Loops",
  "Learn Python while loops: repeat code while a condition stays true, and avoid infinite loops safely in your browser.",
);
lessons["python/parameters"] = genericPythonLesson(
  "parameters",
  9,
  "Parameters",
  "Learn Python function parameters: pass data into functions and return new results.",
);

export function getLesson(language: string, slug: string): Lesson | undefined {
  return lessons[`${language}/${slug}`];
}

export function lessonNav(language: string, slug: string) {
  const keys = Object.keys(lessons)
    .filter((k) => k.startsWith(`${language}/`))
    .sort(
      (a, b) => (lessons[a]?.index ?? 0) - (lessons[b]?.index ?? 0),
    );
  const i = keys.indexOf(`${language}/${slug}`);
  return {
    prev: i > 0 ? lessons[keys[i - 1]] : undefined,
    next: i >= 0 && i < keys.length - 1 ? lessons[keys[i + 1]] : undefined,
  };
}

export const pythonLessonOrder = [
  "intro",
  "variables",
  "conditions",
  "loops",
  "functions",
  "data-types",
  "comparisons",
  "while-loops",
  "parameters",
];
