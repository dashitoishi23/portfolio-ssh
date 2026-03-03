#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const keypress = require('keypress');
const chalk = require('chalk');

const SECTIONS = {
  1: { name: 'About Me', file: 'about.txt' },
  2: { name: 'Projects', file: 'projects.txt' },
  3: { name: 'Work Experience', file: 'experience.txt' },
  4: { name: 'Skills', file: 'skills.txt' },
  5: { name: 'Contact', file: 'contact.txt' },
  6: { name: 'Connect', file: 'connect.txt' },
};

const c = new chalk.Chalk({ level: 3 });

keypress(process.stdin);
let menuIterator = 0;

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
    showSection(selectedKey);
  }
  if (key && key.name === 'escape') {
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

  console.log('\nUse arrow keys to navigate, Enter to select, and ESC to return to menu.\n');
}

function showSection(key) {
  clearScreen();
  const section = SECTIONS[key];
  if (!section) {
    console.log('\nInvalid option. Press Enter to continue...');
    return;
  }

  const contentPath = path.join(__dirname, 'content', section.file);
  console.log('\n----------------------------------------');
  console.log(`  ${section.name}`);
  console.log('----------------------------------------\n');

  if (fs.existsSync(contentPath)) {
    console.log(fs.readFileSync(contentPath, 'utf8'));
  } else {
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
