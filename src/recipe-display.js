// recipe-display.js
// Functions for displaying and formatting recipes

// Import functions from other files
import { createRecipe, addIngredient, addStep } from './recipe-basics.js';

/* c8 ignore start */
// Set to true to see console examples when running this file directly
const SHOW_EXAMPLES = false;
/* c8 ignore stop */

/**
 * Calculates the cooking time per serving
 * Example of a concise arrow function with implicit return
 *
 * @param {object} recipe - The recipe to analyze
 * @returns {number} - Minutes per serving
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body |MDN: Arrow functions with implicit return}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators |MDN: Arithmetic operators}
 */
const timePerServing = recipe => {
  // CHALLENGE 9: Calculate time per serving
  // Create a concise arrow function (with implicit return)
  // that divides the recipe's cookingTime by its servings

  let calcTime = (recipe) => recipe.cookingTime / recipe.servings;

  return calcTime(recipe);
};

/**
 * Gets the numbered list of steps (demonstrates arrow function with block body)
 *
 * @param {object} recipe - The recipe to get steps from
 * @returns {string} - Formatted list of steps
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body |MDN: Arrow functions with block body}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement |MDN: For loops}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals |MDN: Template literals}
 */
const getStepsList = (recipe) => {
  // CHALLENGE 10: Format the steps as a numbered list
  // Check if the recipe has any steps - if empty, return "No steps added yet"
  // Otherwise, create a string with each step numbered (1. Step one, 2. Step two, etc.)
  // Add a newline character (\n) after each step
  // Return the formatted string

  if (recipe.steps != null && typeof recipe.steps != 'undefined' && recipe.steps.length > 0) {
    let formattedSteps = "";

    for (let i = 0; i <= recipe.steps.length - 1; i++) {
      formattedSteps += i + 1 + ". " + recipe.steps[i] + "\n";
    }

    return formattedSteps;
  }

  else {
    return "No steps added yet";
  }
};

/**
 * Gets the formatted list of ingredients
 *
 * @param {object} recipe - The recipe to get ingredients from
 * @returns {string} - Formatted list of ingredients
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of |MDN: For...of loops}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals |MDN: Template literals}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length |MDN: Array.length property}
 */
const getIngredientsList = (recipe) => {
  // CHALLENGE 11: Format the ingredients as a list
  // Check if the recipe has any ingredients - if empty, return "No ingredients added yet"
  // Otherwise, create a string with each ingredient formatted as:
  // "- 2 cups of Flour" (where 2 is amount, cups is unit, and Flour is name)
  // Add a newline character (\n) after each ingredient
  // Return the formatted string

  if (recipe.ingredients != null && typeof recipe.ingredients != 'undefined' && recipe.ingredients.length > 0) {
    let formattedIngredients = "";

    for (let i = 0; i <= recipe.ingredients.length - 1; i++) {
      formattedIngredients += "- " + recipe.ingredients[i].amount + " " + recipe.ingredients[i].unit
        + " of " + recipe.ingredients[i].name + "\n";
    }

    return formattedIngredients;
  }

  else {
    return "No ingredients added yet";
  }
};

/**
 * Displays recipe information as a string
 *
 * @param {object} recipe - Recipe to display
 * @returns {string} - Formatted recipe information
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals |MDN: Template literals for multi-line strings}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed |MDN: Number.toFixed() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim |MDN: String.trim() method}
 */
function formatRecipe(recipe) {
  // CHALLENGE 12: Format the complete recipe as a string
  // Use the helper functions (timePerServing, getIngredientsList, getStepsList)
  // Include the recipe name, servings, cooking time, time per serving
  // Include sections for ingredients and steps
  // Use template literals (backticks) for multi-line formatting
  // Return the complete formatted string

  let formattedRecipe = `${recipe.name} for ${recipe.servings} people Cooking time: ${recipe.cookingTime} minutes

    Time per serving: ${timePerServing(recipe).toFixed(1)} minutes

    Ingredients: ${getIngredientsList(recipe)}

    Steps: ${getStepsList(recipe)}`;

  return formattedRecipe;
}

/* c8 ignore start */
// Example code - only runs when SHOW_EXAMPLES is true
if (SHOW_EXAMPLES) {
  console.log("=== Recipe Display Examples ===");

  // Create a recipe with ingredients and steps
  const omelet = createRecipe('Simple Omelet', 10, 1);
  addIngredient(omelet, 'Eggs', 2, 'large');
  addIngredient(omelet, 'Milk', 2, 'tbsp');
  addIngredient(omelet, 'Salt', 1, 'pinch');
  addIngredient(omelet, 'Butter', 1, 'tbsp');

  addStep(omelet, 'Beat eggs, milk, and salt together');
  addStep(omelet, 'Melt butter in pan over medium heat');
  addStep(omelet, 'Pour egg mixture into pan');
  addStep(omelet, 'Cook until bottom is set, then fold in half');
  addStep(omelet, 'Slide onto plate and serve');

  // Calculate time per serving
  console.log(`Time per serving: ${timePerServing(omelet)} minutes`);

  // Get formatted steps list
  console.log("Steps list:");
  console.log(getStepsList(omelet));

  // Get complete formatted recipe
  console.log("\nFormatted recipe:");
  console.log(formatRecipe(omelet));
}
/* c8 ignore stop */

// Export functions to be used in other files
export {
  timePerServing,
  getStepsList,
  getIngredientsList,
  formatRecipe
};
