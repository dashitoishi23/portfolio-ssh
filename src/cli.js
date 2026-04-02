#!/usr/bin/env node

const path = require('path');
const keypress = require('keypress');
const chalk = require('chalk');

const SECTIONS = {
  1: { name: 'About Me', file: 'about.js' },
  2: { name: 'Projects', file: 'projects.js' },
  3: { name: 'Work Experience', file: 'experience.js' },
  5: { name: 'Contact', file: 'contact.js' },
};

const c = new chalk.Chalk({ level: 3 });

keypress(process.stdin);
let menuIterator = 0;

let isMenuVisible = true;

process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name === 'c') {
    console.log(c.red('Session terminated. Goodbye!'));
    process.exit(0);
  }
  if (key && key.name === 'up') {
    menuIterator = (menuIterator - 1 + Object.keys(SECTIONS).length) % Object.keys(SECTIONS).length;
    clearScreen();
    printHeader();
    printMenu();

  } else if (key && key.name === 'down') {
    menuIterator = (menuIterator + 1) % Object.keys(SECTIONS).length;
    clearScreen();
    printHeader();
    printMenu();
  }
  if (key && key.name === 'return') {
    const selectedKey = Object.keys(SECTIONS)[menuIterator];
    isMenuVisible = false;
    showSection(selectedKey);
  }
  if (key && key.name === 'escape') {
      isMenuVisible = true;
      clearScreen();
      printHeader();
      printMenu();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();



function clearScreen() {
  console.clear();
}

function printHeader() {
  console.log('\n==============================================================================');
console.log(' I serve my portfolio over SSH instead of HTTP like a real man, welcome aboard!');
  console.log('==============================================================================\n');
}

function printMenu() {
  console.log('Select an option:\n');
  Object.entries(SECTIONS).forEach(([key, section], index) => {
    if (index === menuIterator) {
      console.log(c.red(`  ${key}. ${section.name}`));
    } else {
      console.log(`  ${key}. ${section.name}`);
    }
  });

  console.log('\nUse arrow keys to navigate, Enter to select, ESC to return to menu, and Ctrl + C to say goodbye to me.\n');
}

function showSection(key) {
  const section = SECTIONS[key];
  if (!section) {
    console.log('\nInvalid option. Press ESC to return to menu...');
    return;
  }

  try {
    clearScreen();
    const contentModule = require(path.join(__dirname, 'content', section.file));
    console.log('\n----------------------------------------');
    console.log(`  ${section.name}`);
    console.log('----------------------------------------\n');
    console.log(contentModule.getContent());
  } catch (e) {
    console.log('Content coming soon.\n');
  }
  console.log('Press ESC to return to menu...\n');
}

function start() {
  clearScreen();
  printHeader();
  printMenu();
}

// rl.on('line', (line) => {
//   const input = sanitizeInput(line);

//   if (input === null) {
//     console.log('\nInvalid input. Press Enter to continue...');
//     rl.once('line', () => start());
//     return;
//   }

//   const choice = input;

//   if (choice === '0') {
//     console.log('\nThank you for visiting! Goodbye.\n');
//     process.exit(0);
//   }

//   if (SECTIONS[choice]) {
//     showSection(choice);
//     console.log('\nPress Enter to return to menu...');
//   } else {
//     console.log('\nInvalid option. Press Enter to try again...');
//   }

//   rl.once('line', () => start());
// });

process.on('SIGINT', () => {
  console.log('\n\nSession terminated. Goodbye!\n');
  process.exit(0);
});

start();