#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const SECTIONS = {
  1: { name: 'About Me', file: 'about.txt' },
  2: { name: 'Projects', file: 'projects.txt' },
  3: { name: 'Work Experience', file: 'experience.txt' },
  4: { name: 'Skills', file: 'skills.txt' },
  5: { name: 'Contact', file: 'contact.txt' },
  6: { name: 'Connect', file: 'connect.txt' },
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function clearScreen() {
  process.stdout.write('\x1B[2J\x1B[0f');
}

function printHeader() {
  console.log('\n========================================');
  console.log('   Welcome to My Interactive Portfolio');
  console.log('========================================\n');
}

function printMenu() {
  console.log('Select an option:\n');
  Object.entries(SECTIONS).forEach(([key, section]) => {
    console.log(`  ${key}. ${section.name}`);
  });
  console.log('\n  0. Exit\n');
  process.stdout.write('Enter your choice: ');
}

function sanitizeInput(input) {
  const sanitized = input.trim();
  if (!/^[0-9a-zA-Z\s\-_@.]+$/.test(sanitized)) {
    return null;
  }
  return sanitized;
}

function showSection(key) {
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
  console.log('----------------------------------------\n');
}

function start() {
  clearScreen();
  printHeader();
  printMenu();
}

rl.on('line', (line) => {
  const input = sanitizeInput(line);

  if (input === null) {
    console.log('\nInvalid input. Press Enter to continue...');
    rl.once('line', () => start());
    return;
  }

  const choice = input;

  if (choice === '0') {
    console.log('\nThank you for visiting! Goodbye.\n');
    process.exit(0);
  }

  if (SECTIONS[choice]) {
    showSection(choice);
    console.log('\nPress Enter to return to menu...');
  } else {
    console.log('\nInvalid option. Press Enter to try again...');
  }

  rl.once('line', () => start());
});

process.on('SIGINT', () => {
  console.log('\n\nSession terminated. Goodbye!\n');
  process.exit(0);
});

start();
