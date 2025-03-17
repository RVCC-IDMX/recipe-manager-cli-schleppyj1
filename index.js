#!/usr/bin/env node
// src/index.js
// Main entry point for the recipe manager CLI

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  createRecipe,
  addIngredient,
  addStep,
  removeStep
} from './src/recipe-basics.js';
import {
  formatRecipe
} from './src/recipe-display.js';
import {
  getQuickRecipes
} from './src/recipe-collection.js';
import {
  promptForRecipeInfo,
  promptForIngredient,
  promptForStep,
  promptForStepIndex,
  promptForConfirmation
} from './src/cli/prompts.js';
import {
  displayRecipeList,
  displayRecipeDetails,
  displayFormattedRecipe,
  displaySuccess,
  displayError,
  displayWarning,
  displayInfo
} from './src/cli/display.js';
import {
  getRecipes,
  getRecipeById,
  createNewRecipe,
  updateExistingRecipe,
  deleteRecipe,
  getQuickRecipesList
} from './src/cli/command-wrapper.js';
import chalk from 'chalk';
import { execSync } from 'child_process';

// CHALLENGE 6: Complete the yargs commands
// The commands are already set up, you just need to fill in some of the handlers

yargs(hideBin(process.argv))
  // List all recipes
  .command('list', 'List all recipes', () => {
    // This handler is already implemented for you
    getRecipes(function (recipes) {
      displayRecipeList(recipes);
    });
  })

  // View details of a specific recipe
  .command('view <id>', 'View recipe details', (yargs) => {
    yargs.positional('id', {
      describe: 'Recipe ID',
      type: 'number'
    });
  }, (argv) => {
    // This handler is already implemented for you
    getRecipeById(argv.id, function (recipe) {
      if (recipe) {
        displayRecipeDetails(recipe);
      }
    });
  })

  // View a formatted version of a recipe
  .command('format <id>', 'View formatted recipe', (yargs) => {
    yargs.positional('id', {
      describe: 'Recipe ID',
      type: 'number'
    });
  }, (argv) => {
    // This handler is already implemented for you
    getRecipeById(argv.id, function (recipe) {
      if (recipe) {
        displayFormattedRecipe(recipe, formatRecipe);
      }
    });
  })

  // Create a new recipe
  .command('create', 'Create a new recipe', () => {
    // CHALLENGE 7: Implement recipe creation logic

    // 1. Use promptForRecipeInfo to get recipe information
    promptForRecipeInfo().then(function (recipeInfo) {
      // This callback will run after the user enters recipe info

      // 2. Create a new recipe using the imported createRecipe function
      // Hint: createRecipe accepts name, cookingTime, and servings parameters

      let recipe = createRecipe(recipeInfo.name, recipeInfo.cookingTime, recipeInfo.servings);



      // 3. Save the recipe using the createNewRecipe helper function
      // Sample code:
      // createNewRecipe(newRecipe);

      createNewRecipe(recipe);
    });
  })

  // Add an ingredient to a recipe
  .command('add-ingredient <id>', 'Add ingredient to a recipe', (yargs) => {
    yargs.positional('id', {
      describe: 'Recipe ID',
      type: 'number'
    });
  }, (argv) => {
    // CHALLENGE 8: Implement add ingredient logic

    // 1. Get the recipe by ID
    getRecipeById(argv.id, function (recipe) {
      // This callback runs when we have the recipe

      if (!recipe) {
        // If recipe is null, the getRecipeById function already displayed an error
        return;
      }

      // 2. Use promptForIngredient to get ingredient information
      promptForIngredient().then(function (ingredientInfo) {
        // This callback runs after the user enters ingredient info

        // 3. Add the ingredient to the recipe using the addIngredient function
        // Hint: addIngredient accepts recipe, name, amount, and unit parameters


        console.log('Recipe = ' + recipe);
        let updatedRecipe = addIngredient(recipe, ingredientInfo.name, ingredientInfo.amount, ingredientInfo.unit);

        // 4. Update the recipe in storage
        // Notice we create a success message first
        const successMessage = `Added ${ingredientInfo.name} to "${recipe.name}"`;
        updateExistingRecipe(updatedRecipe, successMessage);
      });
    });
  })

  // Add a step to a recipe
  .command('add-step <id>', 'Add step to a recipe', (yargs) => {
    yargs.positional('id', {
      describe: 'Recipe ID',
      type: 'number'
    });
  }, (argv) => {
    // This handler is already implemented for you
    getRecipeById(argv.id, function (recipe) {
      if (!recipe) {
        return;
      }

      promptForStep().then(function (stepInfo) {
        addStep(recipe, stepInfo.step);

        const successMessage = `Added step ${recipe.steps.length} to "${recipe.name}"`;
        updateExistingRecipe(recipe, successMessage);
      });
    });
  })

  // Remove a step from a recipe
  .command('remove-step <id> [stepIndex]', 'Remove a step from a recipe', (yargs) => {
    yargs
      .positional('id', {
        describe: 'Recipe ID',
        type: 'number'
      })
      .positional('stepIndex', {
        describe: 'Step index to remove (1-based)',
        type: 'number'
      });
  }, (argv) => {
    // This handler is already implemented for you
    getRecipeById(argv.id, function (recipe) {
      if (!recipe) {
        return;
      }

      if (recipe.steps.length === 0) {
        displayWarning('This recipe has no steps to remove');
        return;
      }

      // Use a regular if statement instead of ternary
      let stepIndex = null;
      if (argv.stepIndex) {
        stepIndex = argv.stepIndex - 1;
      }

      if (stepIndex === null) {
        // Display current steps
        console.log(chalk.cyan('Current steps:'));
        recipe.steps.forEach(function (step, index) {
          console.log(`${index + 1}. ${step}`);
        });

        // Prompt for step index
        promptForStepIndex(recipe.steps.length - 1).then(function (index) {
          removeStep(recipe, index);

          const successMessage = `Removed step ${index + 1} from "${recipe.name}"`;
          updateExistingRecipe(recipe, successMessage);
        });
      } else {
        // Validate the provided index
        if (stepIndex < 0 || stepIndex >= recipe.steps.length) {
          displayWarning(`Invalid step index. Please use a number between 1 and ${recipe.steps.length}`);
          return;
        }

        removeStep(recipe, stepIndex);

        const successMessage = `Removed step ${stepIndex + 1} from "${recipe.name}"`;
        updateExistingRecipe(recipe, successMessage);
      }
    });
  })

  // Delete a recipe
  .command('delete <id>', 'Delete a recipe', (yargs) => {
    yargs.positional('id', {
      describe: 'Recipe ID',
      type: 'number'
    });
  }, (argv) => {
    // This handler is already implemented for you
    getRecipeById(argv.id, function (recipe) {
      if (!recipe) {
        return;
      }

      promptForConfirmation(`Are you sure you want to delete "${recipe.name}"?`).then(function (confirmed) {
        if (!confirmed) {
          displayInfo('Delete cancelled');
          return;
        }

        deleteRecipe(argv.id, recipe.name);
      });
    });
  })

  // Find quick recipes
  .command('quick [time]', 'Find recipes that can be made quickly', (yargs) => {
    yargs.positional('time', {
      describe: 'Maximum cooking time in minutes',
      type: 'number',
      default: 30
    });
  }, (argv) => {
    // CHALLENGE 9: Implement quick recipes search

    // Use the getQuickRecipesList helper function, which takes:
    // 1. maxTime - Maximum cooking time in minutes
    // 2. callback function that receives the filtered recipes and the time limit

    // Example:
    // getQuickRecipesList(argv.time, function(quickRecipes, maxTime) {
    //   // Your code here
    // });

    getQuickRecipesList(argv.time, function (quickRecipes) {
      return getQuickRecipes(argv.time);
    })
  })

  // Reset recipe data to defaults
  .command('reset-data', 'Reset recipe data to defaults', () => {
    // This handler is already implemented for you
    promptForConfirmation('Are you sure you want to reset all recipe data to defaults? This cannot be undone.').then(function (confirmed) {
      if (!confirmed) {
        displayInfo('Reset cancelled');
        return;
      }

      try {
        execSync('npm run reset-data', { stdio: 'inherit' });
        displaySuccess('Recipe data has been reset to defaults');
      } catch (error) {
        displayError(`Failed to reset data: ${error.message}`);
      }
    });
  })

  // Help and configuration
  .help()
  .alias('help', 'h')
  .demandCommand(1, 'You need to specify a command')
  .strict()
  .wrap(null)
  .epilog('For more information, check the README.md file')
  .argv;
