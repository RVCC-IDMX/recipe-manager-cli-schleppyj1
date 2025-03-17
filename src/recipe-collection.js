// recipe-collection.js
// Functions for managing collections of recipes

// Import functions from recipe-basics.js
import { createRecipe, addIngredient, addStep } from './recipe-basics.js';

/* c8 ignore start */
// Set to true to see console examples when running this file directly
const SHOW_EXAMPLES = true;
/* c8 ignore stop */

// An outer variable - accessible to all functions in this file
// This array will store all our recipes
let recipeCollection = [];

/**
 * Adds a recipe to our collection
 *
 * @param {object} recipe - Recipe to add to collection
 * @returns {boolean} - True if added successfully
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push |MDN: Array.push() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declaring_variables |MDN: Variable scope}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return |MDN: Return statement}
 */
function addRecipe(recipe) {
  // CHALLENGE 5: Add a recipe to the collection
  // Add the recipe to the recipeCollection array
  // Return true to indicate success
  if (recipe != null && typeof recipe != 'undefined') {
    if (!recipeCollection.includes(recipe, 0)) {
      recipeCollection.push(recipe);
      return true;
    }
  }

  else {
    return false;
  }



}

/**
 * Finds a recipe by name (demonstrates arrow function)
 * Arrow functions provide a shorter syntax for writing functions
 *
 * @param {string} name - Recipe name to find
 * @returns {object|null} - Found recipe or null
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions |MDN: Arrow functions}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find |MDN: Array.find() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality |MDN: Equality operators}
 */
const findRecipe = (name) => {
  // CHALLENGE 6: Find a recipe by name
  // Use the array's find() method to locate a recipe with a matching name
  // Return the found recipe or undefined if not found
  // This should be written as an arrow function

  return recipeCollection.find(recipe => recipe.name === name);
};

/**
 * Gets recipes that can be prepared in under a specified time
 *
 * @param {number} maxTime - Maximum cooking time in minutes
 * @returns {array} - Recipes that fit the time constraint
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters |MDN: Default parameters}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter |MDN: Array.filter() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions |MDN: Arrow functions used as callbacks}
 */
function getQuickRecipes(maxTime = 30) {
  // CHALLENGE 7: Find quick recipes
  // Use the array's filter() method to find recipes with cookingTime <= maxTime
  // Return the filtered array
  // The function has a default parameter of 30 minutes

  const filteredRecipes = recipeCollection.filter(recipe => recipe.cookingTime <= maxTime);
  return filteredRecipes;
}

/**
 * Clears all recipes from the collection
 * Added as a utility function, especially useful for testing
 *
 * @returns {void}
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variables |MDN: Reassigning variables}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |MDN: Arrays}
 */
function clearRecipes() {
  // CHALLENGE 8: Clear the recipe collection
  // Reset the recipeCollection to an empty array

  while (recipeCollection.length > 0) {
    recipeCollection.pop();
  }
}

/* c8 ignore start */
// Example code - only runs when SHOW_EXAMPLES is true
if (SHOW_EXAMPLES) {
  console.log("=== Recipe Collection Examples ===");

  // Create some recipes
  const spaghetti = createRecipe('Spaghetti Bolognese', 45);
  const salad = createRecipe('Caesar Salad', 15, 2);
  const pancakes = createRecipe('Pancakes', 20, 6);

  // Add recipes to collection
  addRecipe(spaghetti);
  addRecipe(salad);
  addRecipe(pancakes);
  console.log("Recipes in collection:", recipeCollection.length);

  // Add ingredients & steps to make the examples more realistic
  addIngredient(spaghetti, 'Pasta', 500, 'g');
  addStep(spaghetti, 'Boil water in a large pot');

  // Find a recipe
  const foundRecipe = findRecipe('Pancakes');
  console.log('Found recipe:', foundRecipe ? foundRecipe.name : 'Not found');

  // Get quick recipes (under 30 minutes)
  const quickRecipes = getQuickRecipes();
  console.log('Quick recipes:', quickRecipes.map(r => r.name));

  // Get even quicker recipes (under 20 minutes)
  const veryQuickRecipes = getQuickRecipes(20);
  console.log('Very quick recipes:', veryQuickRecipes.map(r => r.name));
}
/* c8 ignore stop */

// Export functions to be used in other files
export {
  addRecipe,
  findRecipe,
  getQuickRecipes,
  clearRecipes,
  recipeCollection
};
