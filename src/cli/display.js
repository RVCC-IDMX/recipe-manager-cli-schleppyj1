// src/cli/display.js
// Functions for displaying recipe information in the CLI

import Table from 'cli-table3';
import chalk from 'chalk';

/**
 * Displays a list of recipes in a table
 * 
 * @param {Array} recipes - Array of recipe objects
 * 
 * @see {@link https://www.npmjs.com/package/cli-table3 | cli-table3 npm package}
 * @see {@link https://www.npmjs.com/package/chalk | chalk npm package}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach | MDN: forEach() method}
 */
export function displayRecipeList(recipes) {
  // CHALLENGE 4: Create a table to display recipe list
  
  // First, check if the recipes array is empty
  if (recipes.length === 0) {
    console.log(chalk.yellow('No recipes found'));
    return;
  }

  // Create a table with columns for ID, Name, Cooking Time, and Servings
  // Example of creating a table with cli-table3:
  const table = new Table({
    head: [
      chalk.cyan('ID'), 
      // Add more column headers here
    ],
    colWidths: [15 /* Add more column widths here */]
  });

  // Add each recipe as a row in the table
  // Example of how to add a row:
  // table.push([recipe.id, recipe.name, ...]);
  
  // Your code here
  
  // Display the table
  console.log(table.toString());
}

/**
 * Displays detailed information about a recipe
 * 
 * @param {Object} recipe - Recipe object
 * 
 * @see {@link https://www.npmjs.com/package/chalk | chalk npm package}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach | MDN: forEach() method}
 */
export function displayRecipeDetails(recipe) {
  // CHALLENGE 5: Create a detailed recipe display
  
  // First, check if recipe exists
  if (!recipe) {
    console.log(chalk.red('Recipe not found'));
    return;
  }

  // Display recipe details: name, id, cooking time, servings, date created
  console.log('\n' + chalk.cyan.bold(`Recipe: ${recipe.name}`));
  
  // Add more recipe details here
  
  // Display ingredients
  console.log('\n' + chalk.cyan.bold('Ingredients:'));
  if (recipe.ingredients.length === 0) {
    console.log(chalk.yellow('No ingredients added yet'));
  } else {
    // Loop through ingredients and display each one
    // Your code here
  }
  
  // Display steps
  console.log('\n' + chalk.cyan.bold('Steps:'));
  if (recipe.steps.length === 0) {
    console.log(chalk.yellow('No steps added yet'));
  } else {
    // Loop through steps and display each one with its number
    // Your code here
  }
  
  // Add an empty line at the end for better spacing
  console.log('');
}

/**
 * Displays a success message
 * This function is already implemented for you
 * 
 * @param {string} message - Success message
 */
export function displaySuccess(message) {
  console.log(chalk.green(`✓ ${message}`));
}

/**
 * Displays an error message
 * This function is already implemented for you
 * 
 * @param {string} message - Error message
 */
export function displayError(message) {
  console.log(chalk.red(`✗ ${message}`));
}

/**
 * Displays a warning message
 * This function is already implemented for you
 * 
 * @param {string} message - Warning message
 */
export function displayWarning(message) {
  console.log(chalk.yellow(`⚠ ${message}`));
}

/**
 * Displays an info message
 * This function is already implemented for you
 * 
 * @param {string} message - Info message
 */
export function displayInfo(message) {
  console.log(chalk.blue(`ℹ ${message}`));
}

/**
 * Formats and displays a recipe using the formatRecipe function
 * This function is already implemented for you
 * 
 * @param {Object} recipe - Recipe object
 * @param {Function} formatRecipe - Function to format recipe
 */
export function displayFormattedRecipe(recipe, formatRecipe) {
  if (!recipe) {
    console.log(chalk.red('Recipe not found'));
    return;
  }

  const formattedRecipe = formatRecipe(recipe);
  console.log('\n' + formattedRecipe + '\n');
}
