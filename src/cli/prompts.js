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
    validate: function (value) {
      if (value.trim() === '') {
        return 'Recipe name is required';
      }
      return true;
    }
  });

  // Add code to get cookingTime using number function
  const cookingTime = await number({
    message: 'Enter recipe cooking time:',
    validate: function (cookingTime) {
      if (isNaN(cookingTime) || cookingTime <= 0) {
        return 'Cooking time is required';
      }

      return true;
    }
  })

  // Add code to get servings using number function with a default value of 4
  const servings = await number({
    message: 'Enter number of servings:',
    validate: function (servings) {
      if (isNaN(servings) || servings <= 0) {
        return 'Number of servings is required';
      }

      return true;
    }
  })

  // Return an object with all three values
  return {
    name: name,
    cookingTime: cookingTime,
    servings: servings
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

  const name = await input({
    message: 'Enter ingredient name:',
    validate: function (name) {
      if (name.trim() === '') {
        return 'Ingredient name is required';
      }

      return true;
    }
  })

  const amount = await number({
    message: 'Enter amount:',
    validate: function (amount) {
      if (isNaN(amount) || amount <= 0) {
        return 'Amount is required';
      }

      return true;
    }
  })

  const unit = await input({
    message: 'Enter unit:',
    validate: function (unit) {
      if (unit.trim === '') {
        return 'Unit is required';
      }

      return true;
    }
  })

  // Return an object with all three values
  return {
    name: name,
    amount: amount,
    unit: unit
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

  const step = await input({
    message: 'Next Step Instructions: ',
    validate: function (step) {
      if (step.trim() === '') {
        return 'Instructions are required';
      }

      return true;
    }
  })

  return {
    step: step
  };
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
    validate: function (value) {
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
