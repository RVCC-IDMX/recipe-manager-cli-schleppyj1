// src/cli/prompts.js
// Interactive CLI prompts for recipe management

import input from '@inquirer/input';
import number from '@inquirer/number';
import confirm from '@inquirer/confirm';

/**
 * Prompts user for recipe information
 * This function contains async/await but you don't need to understand how that works yet
 * 
 * @returns {Promise<Object>} Object with recipe name, cooking time, and servings
 * 
 * @see {@link https://www.npmjs.com/package/@inquirer/input | @inquirer/input npm package}
 * @see {@link https://www.npmjs.com/package/@inquirer/number | @inquirer/number npm package}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object | MDN: Objects}
 */
export async function promptForRecipeInfo() {
  // CHALLENGE 1: Create prompts for recipe information
  // You need to:
  // 1. Use the input function to get the recipe name
  // 2. Use the number function to get the cooking time
  // 3. Use the number function to get the number of servings (with default 4)
  
  // Example of using input to get a text value:
  const name = await input({
    message: 'Enter recipe name:',
    validate: function(value) {
      if (value.trim() === '') {
        return 'Recipe name is required';
      }
      return true;
    }
  });
  
  // Add code to get cookingTime using number function
  // Your code here
  
  // Add code to get servings using number function with a default value of 4
  // Your code here
  
  // Return an object with all three values
  return { 
    name: name,
    // Add other properties here
  };
}

/**
 * Prompts user for ingredient information
 * This function contains async/await but you don't need to understand how that works yet
 * 
 * @returns {Promise<Object>} Object with ingredient name, amount, and unit
 * 
 * @see {@link https://www.npmjs.com/package/@inquirer/input | @inquirer/input npm package}
 * @see {@link https://www.npmjs.com/package/@inquirer/number | @inquirer/number npm package}
 */
export async function promptForIngredient() {
  // CHALLENGE 2: Create prompts for ingredient information
  // Complete this function to:
  // 1. Prompt for ingredient name (text, required)
  // 2. Prompt for amount (number, positive)
  // 3. Prompt for unit (text, required)
  
  // Your code here
  
  // Return an object with all three values
  return { 
    // Fill in object properties here
  };
}

/**
 * Prompts user for cooking step
 * This function contains async/await but you don't need to understand how that works yet
 * 
 * @returns {Promise<string>} Cooking instruction
 * 
 * @see {@link https://www.npmjs.com/package/@inquirer/input | @inquirer/input npm package}
 */
export async function promptForStep() {
  // CHALLENGE 3: Create prompt for cooking step
  // Complete this function to prompt for step instruction (text, required)
  
  // Your code here
  
  // Return the instruction
}

/**
 * Prompts user for step index to remove
 * This function is already implemented for you
 * 
 * @param {number} maxIndex - Maximum valid index
 * @returns {Promise<number>} Step index to remove
 */
export async function promptForStepIndex(maxIndex) {
  return await number({
    message: `Enter step number to remove (1-${maxIndex + 1}):`,
    validate: function(value) {
      const index = value - 1; // Convert to zero-based index
      if (index >= 0 && index <= maxIndex) {
        return true;
      } else {
        return `Please enter a number between 1 and ${maxIndex + 1}`;
      }
    }
  }) - 1; // Return zero-based index
}

/**
 * Prompts user for confirmation
 * This function is already implemented for you
 * 
 * @param {string} message - Confirmation message
 * @returns {Promise<boolean>} User's response
 */
export async function promptForConfirmation(message) {
  return await confirm({ message });
}
