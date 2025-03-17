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
      chalk.red('Name'),
      chalk.green('Cooking Time'),
      chalk.yellow('Servings')
    ],
    colWidths: [15, 25, 15, 12]
  });

  // Add each recipe as a row in the table
  // Example of how to add a row:
  // table.push([recipe.id, recipe.name, ...]);

  for (let i = 0; i < recipes.length; i++) {
    table.push([recipes[i].id, recipes[i].name, recipes[i].cookingTime, recipes[i].servings]);
  }



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

  console.log('\n' + chalk.green.bold(`ID: ${recipe.id}`));

  console.log('\n' + chalk.blue.bold(`Cooking Time: ${recipe.cookingTime}`));

  console.log('\n' + chalk.yellow.bold(`Servings: ${recipe.servings}`));

  console.log('\n' + chalk.cyan.bold(`Date Created: ${recipe.dateCreated}`));

  // Display ingredients
  console.log('\n' + chalk.cyan.bold('Ingredients:'));
  if (recipe.ingredients.length === 0) {
    console.log(chalk.yellow('No ingredients added yet'));
  } else {
    // Loop through ingredients and display each one
    for (let i = 0; i < recipe.ingredients.length; i++) {
      console.log('\n' + chalk.cyan.bold(`Name: ${recipe.ingredients[i].name}`));
      console.log('\n' + chalk.cyan.bold(`Amount: ${recipe.ingredients[i].amount}`));
      console.log('\n' + chalk.cyan.bold(`Unit: ${recipe.ingredients[i].unit}`));
    }
  }

  // Display steps
  console.log('\n' + chalk.cyan.bold('Steps:'));
  if (recipe.steps.length === 0) {
    console.log(chalk.yellow('No steps added yet'));
  } else {
    console.log('Steps length: ' + recipe.steps.length);
    // Loop through steps and display each one with its number
    for (let i = 0; i < recipe.steps.length; i++) {
      console.log('\n' + chalk.cyan.bold(`Steps: ${recipe.steps[i]}`));
    }
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
