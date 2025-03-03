// src/cli/command-wrapper.js
// Helper functions to abstract away async/await complexity for students

import {
  loadRecipes,
  saveRecipes,
  addRecipe as addRecipeToStorage,
  updateRecipe,
  deleteRecipeById
} from '../recipe-storage-complete.js';

import {
  displaySuccess,
  displayError,
  displayWarning
} from './display.js';

/**
 * Wraps a function that uses async/await in a try/catch block
 * This is a helper utility to abstract away async/await for students
 * 
 * @param {Function} fn - Function to execute
 * @returns {Function} Wrapped function
 */
function wrapAsyncFunction(fn) {
  return function(...args) {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        result.catch(error => {
          displayError(`Error: ${error.message}`);
        });
      }
      return result;
    } catch (error) {
      displayError(`Error: ${error.message}`);
      return null;
    }
  };
}

/**
 * Gets all recipes from storage
 * 
 * @param {Function} callback - Function to call with recipes
 */
export function getRecipes(callback) {
  loadRecipes()
    .then(recipes => {
      callback(recipes);
    })
    .catch(error => {
      displayError(`Failed to load recipes: ${error.message}`);
      callback([]);
    });
}

/**
 * Gets a recipe by ID
 * 
 * @param {number} id - Recipe ID
 * @param {Function} callback - Function to call with recipe
 */
export function getRecipeById(id, callback) {
  loadRecipes()
    .then(recipes => {
      const recipe = recipes.find(r => r.id === id);
      if (recipe) {
        callback(recipe);
      } else {
        displayWarning(`Recipe with ID ${id} not found`);
        callback(null);
      }
    })
    .catch(error => {
      displayError(`Failed to find recipe: ${error.message}`);
      callback(null);
    });
}

/**
 * Creates a new recipe and adds it to storage
 * 
 * @param {Object} recipe - Recipe object to add
 * @param {Function} callback - Function to call after adding
 */
export function createNewRecipe(recipe, callback) {
  addRecipeToStorage(recipe)
    .then(success => {
      if (success) {
        displaySuccess(`Recipe "${recipe.name}" created with ID: ${recipe.id}`);
        if (callback) callback(true);
      } else {
        displayError('Failed to create recipe');
        if (callback) callback(false);
      }
    })
    .catch(error => {
      displayError(`Failed to create recipe: ${error.message}`);
      if (callback) callback(false);
    });
}

/**
 * Updates an existing recipe
 * 
 * @param {Object} recipe - Recipe object to update
 * @param {string} successMessage - Success message to display
 * @param {Function} callback - Function to call after updating
 */
export function updateExistingRecipe(recipe, successMessage, callback) {
  updateRecipe(recipe)
    .then(success => {
      if (success) {
        displaySuccess(successMessage);
        if (callback) callback(true);
      } else {
        displayError('Failed to update recipe');
        if (callback) callback(false);
      }
    })
    .catch(error => {
      displayError(`Failed to update recipe: ${error.message}`);
      if (callback) callback(false);
    });
}

/**
 * Deletes a recipe by ID
 * 
 * @param {number} id - Recipe ID
 * @param {string} recipeName - Recipe name for success message
 * @param {Function} callback - Function to call after deleting
 */
export function deleteRecipe(id, recipeName, callback) {
  deleteRecipeById(id)
    .then(success => {
      if (success) {
        displaySuccess(`Deleted recipe "${recipeName}"`);
        if (callback) callback(true);
      } else {
        displayError('Failed to delete recipe');
        if (callback) callback(false);
      }
    })
    .catch(error => {
      displayError(`Failed to delete recipe: ${error.message}`);
      if (callback) callback(false);
    });
}

/**
 * Gets recipes that can be made quickly
 * 
 * @param {number} maxTime - Maximum cooking time
 * @param {Function} callback - Function to call with quick recipes
 */
export function getQuickRecipesList(maxTime, callback) {
  loadRecipes()
    .then(recipes => {
      const quickRecipes = recipes.filter(recipe => recipe.cookingTime <= maxTime);
      callback(quickRecipes, maxTime);
    })
    .catch(error => {
      displayError(`Failed to find quick recipes: ${error.message}`);
      callback([], maxTime);
    });
}
