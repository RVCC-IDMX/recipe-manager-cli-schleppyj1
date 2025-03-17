// recipe-basics.js
// Core recipe creation and modification functions

/* c8 ignore start */
// Set to true to see console examples when running this file directly
const SHOW_EXAMPLES = false;
/* c8 ignore stop */

/**
 * Creates a new recipe object (demonstrates function declaration)
 *
 * @param {string} name - Name of the recipe
 * @param {number} cookingTime - Time to cook in minutes
 * @param {number} servings - Number of people served (with default value)
 * @returns {object} - A new recipe object
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function  |MDN: Function declarations}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters |MDN: Default parameters}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now |MDN: Date.now() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer |MDN: Object literal syntax}
 */
function createRecipe(name, cookingTime, servings = 4) {
  // CHALLENGE 1: Create a new recipe object
  // The recipe object needs these properties:
  // - id: use Date.now() to create a unique identifier
  // - name: from the name parameter
  // - cookingTime: from the cookingTime parameter
  // - servings: from the servings parameter (which has a default value)
  // - ingredients: an empty array to store ingredients later
  // - steps: an empty array to store cooking steps
  // - dateCreated: today's date (use new Date().toLocaleDateString())

  function recipe(name, cookingTime, servings) {
    this.id = Date.now();
    this.name = name;
    this.cookingTime = cookingTime;
    this.servings = servings;
    this.ingredients = [];
    this.steps = [];
    this.dateCreated = new Date().toLocaleDateString();
  }

  let newRecipe = new recipe(name, cookingTime, servings);

  return newRecipe;
}

/**
 * Adds an ingredient to a recipe (demonstrates function expression)
 * A function expression assigns a function to a variable
 *
 * @param {object} recipe - The recipe to modify
 * @param {string} name - Ingredient name
 * @param {number} amount - Quantity of ingredient
 * @param {string} unit - Unit of measurement
 * @returns {object} - The updated recipe
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function |MDN: Function expressions}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push |MDN: Array.push() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions |MDN: Object property shorthand}
 */
const addIngredient = function (recipe, name, amount, unit) {
  // CHALLENGE 2: Add an ingredient to a recipe
  // Create an ingredient object with name, amount, and unit properties
  // Add it to the recipe's ingredients array
  // Return the modified recipe

  function ingredient(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  let newIngredient = new ingredient(name, amount, unit);

  // if (recipe.ingredients != null && typeof recipe.ingredients != 'undefined') {
  recipe.ingredients.push(newIngredient);
  // }


  return recipe;
};

/**
 * Adds a step to the recipe (demonstrates function declaration)
 *
 * @param {object} recipe - The recipe to modify
 * @param {string} instruction - The cooking instruction to add
 * @returns {object} - The updated recipe
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function |MDN: Function declarations}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push |MDN: Array.push() method}
 */
function addStep(recipe, instruction) {
  // CHALLENGE 3: Add a step to a recipe
  // Add the instruction to the recipe's steps array
  // Return the modified recipe

  console.log('In addStep');
  if (recipe.steps != null && typeof recipe.steps != 'undefined') {
    console.log('Pushing ' + instruction);
    recipe.steps.push(instruction);
  }
  console.log('addStep complete');

  return recipe;
}

/**
 * Removes a step from a recipe (demonstrates function parameter usage)
 *
 * @param {object} recipe - The recipe to modify
 * @param {number} stepIndex - The index of the step to remove
 * @returns {object} - The updated recipe
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice |MDN: Array.splice() method}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#Conditional_statements |MDN: Conditional statements}
 */
function removeStep(recipe, stepIndex) {
  // CHALLENGE 4: Remove a step from a recipe
  // Check if the stepIndex is valid (not negative and within the steps array length)
  // If valid, remove the step at that index using splice()
  // Return the modified recipe

  if (stepIndex >= 0 && stepIndex < recipe.steps.length) {
    recipe.steps.splice(stepIndex, 1);
  }

  return recipe;
}

/* c8 ignore start */
// Example code - only runs when SHOW_EXAMPLES is true
if (SHOW_EXAMPLES) {
  console.log("=== Recipe Basics Examples ===");

  // Create a recipe
  const pancakes = createRecipe('Pancakes', 20, 6);
  console.log("Created recipe:", pancakes);

  // Add ingredients
  addIngredient(pancakes, 'Flour', 2, 'cups');
  addIngredient(pancakes, 'Milk', 1.5, 'cups');
  addIngredient(pancakes, 'Eggs', 2, 'large');
  console.log("Recipe with ingredients:", pancakes.ingredients);

  // Add steps
  addStep(pancakes, 'Mix dry ingredients in a bowl');
  addStep(pancakes, 'Add wet ingredients and stir until smooth');
  addStep(pancakes, 'Heat griddle and pour batter to form pancakes');
  addStep(pancakes, 'Flip when bubbles form on surface');
  addStep(pancakes, 'Cook until golden brown');
  console.log("Recipe with steps:", pancakes.steps);

  // Remove a step
  removeStep(pancakes, 2);
  console.log("Recipe after removing step 3:", pancakes.steps);
}
/* c8 ignore stop */

// Export functions to be used in other files
export {
  createRecipe,
  addIngredient,
  addStep,
  removeStep
};
