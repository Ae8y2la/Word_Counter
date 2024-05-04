import inquirer from 'inquirer';
import chalk from 'chalk';
import * as emoji from 'node-emoji';

// Function to count words in a given text
function countWords(text: string): Record<string, number> {
  const words = text
    .toLowerCase() // Convert to lowercase for case-insensitive counting
    .match(/\b\w+\b/g); // Extract words using a word boundary regex

  const wordCount: Record<string, number> = {};

  if (words) {
    for (const word of words) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }

  return wordCount;
}

// Function to prompt user for text input and then display word counts with emojis
async function promptAndCountWords() {
  console.log(chalk.bold.green('📝 Word Counter CLI'));

  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: chalk.blue('Please enter some text to count words:'),
    },
  ]);

  const wordCounts = countWords(response.text);

  console.log(chalk.bold.yellow('\n📊 Word Counts:'));

  // Display each word with its count and an associated emoji if available
  for (const [word, count] of Object.entries(wordCounts)) {
    const associatedEmoji = emoji.get(`:${word}:`);
    const displayEmoji = associatedEmoji ? associatedEmoji : '📖'; // Fallback to a book emoji if no emoji is found
    console.log(`${chalk.green(displayEmoji)} ${chalk.cyan(word)}: ${chalk.yellow(count)}`);
  }

  console.log(chalk.bold.magenta('\n✅ Done!'));
}

// Run the CLI to prompt user input and count words
promptAndCountWords();
