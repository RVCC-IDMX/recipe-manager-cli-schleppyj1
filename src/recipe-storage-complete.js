// File operations for recipe storage
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

/**
 * =========================================================================
 * MINI-TUTORIAL: Understanding Asynchronous JavaScript and File Operations
 * =========================================================================
 *
 * Reading and writing files in Node.js is "asynchronous" - operations that take time
 * to complete and happen in the background. This is different from the synchronous
 * JavaScript you might be familiar with that runs line by line.
 *
 * KEY CONCEPTS:
 *
 * 1. Promises - Objects that represent the eventual completion of an async operation
 *    Think of a promise as an IOU note - "I promise to give you a result later"
 *
 * 2. async/await - Modern JavaScript syntax to work with promises more easily
 *    - 'async' keyword: Declares that a function contains asynchronous operations
 *    - 'await' keyword: Pauses execution until a promise resolves
 *
 * 3. try/catch - Pattern for handling errors in async operations
 *    - 'try' block: Contains code that might cause an error
 *    - 'catch' block: Handles any errors thrown in the try block
 *
 * EXAMPLE:
 *
 * Without async/await (using promise .then syntax)
 * function readConfig() {
 *   fs.readFile('config.json', 'utf8')
 *     .then(data => {
 *       const config = JSON.parse(data);
 *       console.log(config);
 *     })
 *     .catch(error => {
 *       console.error('Error reading config:', error);
 *     });
 * }
 *
 * With async/await (cleaner, more readable)
 * async function readConfig() {
 *   try {
 *     const data = await fs.readFile('config.json', 'utf8');
 *     const config = JSON.parse(data);
 *     console.log(config);
 *   } catch (error) {
 *     console.error('Error reading config:', error);
 *   }
 * }
 *
 * Notice how async/await makes the code look more like synchronous code,
 * even though it's handling asynchronous operations behind the scenes.
 * =========================================================================
 */

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/recipes.json');

/**
 * Ensures the data directory exists
 */
function ensureDataDirectory() {
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    console.log(chalk.blue('Creating data directory...'));
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Loads recipes from JSON file
 *
 * @returns {Promise<Array>} Promise that resolves to list of recipes
 */
async function loadRecipes() {
  /**
   * MINI-TUTORIAL: Reading Files in Node.js
   *
   * This function demonstrates how to:
   * 1. Use try/catch to handle potential errors
   * 2. Check if a file exists before trying to read it
   * 3. Read file content asynchronously with await
   * 4. Parse JSON data from a string to a JavaScript object
   *
   * The 'await' keyword pauses execution until fs.readFile completes.
   * Without 'await', fs.readFile would return a Promise, not the actual data.
   */
  try {
    // First, make sure the data directory exists
    ensureDataDirectory();

    // Check if the file exists before trying to read it
    if (!fs.existsSync(dataPath)) {
      console.log(chalk.yellow('No recipe data file found. Creating empty collection.'));
      return [];
    }

    // Read the file and await its contents
    console.log(chalk.blue(`Loading recipes from ${dataPath}`));
    const data = await fs.readFile(dataPath, 'utf8');

    // Parse the JSON string into a JavaScript object
    return JSON.parse(data);
  } catch (error) {
    console.error(chalk.red('Error loading recipes:'), error.message);
    return [];
  }
}

/**
 * Saves recipes to JSON file
 *
 * @param {Array} recipes - Recipes to save
 * @returns {Promise<boolean>} Promise that resolves to success status
 */
async function saveRecipes(recipes) {
  /**
   * MINI-TUTORIAL: Writing Files in Node.js
   *
   * This function demonstrates how to:
   * 1. Convert JavaScript objects to JSON strings
   * 2. Write data to a file asynchronously
   * 3. Handle potential errors during file writing
   *
   * JSON.stringify converts a JavaScript object to a JSON string.
   * The additional parameters (null, 2) create formatted JSON with indentation.
   */
  try {
    // Ensure the data directory exists
    ensureDataDirectory();

    console.log(chalk.blue(`Saving ${recipes.length} recipes to ${dataPath}`));

    // Convert the recipes array to a formatted JSON string
    const jsonData = JSON.stringify(recipes, null, 2);

    // Write the data to the file
    await fs.writeFile(dataPath, jsonData);

    return true;
  } catch (error) {
    console.error(chalk.red('Error saving recipes:'), error.message);
    return false;
  }
}

/**
 * Adds a single recipe to the collection
 *
 * @param {object} recipe - Recipe to add
 * @returns {Promise<boolean>} Promise that resolves to success status
 */
async function addRecipe(recipe) {
  /**
   * MINI-TUTORIAL: Combining Multiple Async Operations
   *
   * This function demonstrates how to:
   * 1. Chain multiple async operations together
   * 2. Modify loaded data and save it back
   *
   * We first await loadRecipes(), then modify the result,
   * then await saveRecipes() with the modified data.
   */
  try {
    // Load existing recipes
    const recipes = await loadRecipes();

    // Add the new recipe
    console.log(chalk.blue(`Adding recipe: ${recipe.name}`));
    recipes.push(recipe);

    // Save the updated collection
    return await saveRecipes(recipes);
  } catch (error) {
    console.error(chalk.red('Error adding recipe:'), error.message);
    return false;
  }
}

/**
 * Updates a recipe in the collection
 *
 * @param {object} updatedRecipe - Recipe with updates
 * @returns {Promise<boolean>} Promise that resolves to success status
 */
async function updateRecipe(updatedRecipe) {
  try {
    // Load existing recipes
    const recipes = await loadRecipes();

    // Find the index of the recipe to update
    const index = recipes.findIndex(r => r.id === updatedRecipe.id);

    if (index === -1) {
      console.log(chalk.yellow(`Recipe with ID ${updatedRecipe.id} not found for update`));
      return false;
    }

    // Update the recipe at the found index
    console.log(chalk.blue(`Updating recipe: ${updatedRecipe.name}`));
    recipes[index] = updatedRecipe;

    // Save the updated collection
    return await saveRecipes(recipes);
  } catch (error) {
    console.error(chalk.red('Error updating recipe:'), error.message);
    return false;
  }
}

/**
 * Deletes a recipe from the collection
 *
 * @param {number|string} id - ID of recipe to delete
 * @returns {Promise<boolean>} Promise that resolves to success status
 */
async function deleteRecipeById(id) {
  try {
    // Load existing recipes
    let recipes = await loadRecipes();

    // Convert string ID to number if needed
    const numId = Number(id);

    // Count before filtering
    const beforeCount = recipes.length;

    // Filter out the recipe with the matching ID
    recipes = recipes.filter(r => r.id !== numId);

    // Check if any recipe was removed
    if (recipes.length === beforeCount) {
      console.log(chalk.yellow(`Recipe with ID ${id} not found for deletion`));
      return false;
    }

    console.log(chalk.blue(`Deleting recipe with ID: ${id}`));

    // Save the filtered collection
    return await saveRecipes(recipes);
  } catch (error) {
    console.error(chalk.red('Error deleting recipe:'), error.message);
    return false;
  }
}

/**
 * OPTIONAL CHALLENGE FOR ADVANCED STUDENTS:
 *
 * Try implementing your own async function to search recipes by name.
 * Use the patterns you've seen in the functions above!
 *
 * async function searchRecipesByName(searchTerm) {
 *   // 1. Load recipes
 *   // 2. Filter recipes that include the search term in their name
 *   // 3. Return the filtered results
 * }
 */

export {
  loadRecipes,
  saveRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipeById
};
