#!/usr/bin/env node
// utils/reset-data.js
// Utility to reset recipe data to defaults

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/recipes.json');
const dataDir = path.join(__dirname, '../data');

// Sample recipes to populate the file (with imperial units)
const defaultRecipes = [
  {
    id: 1678972583949,
    name: "Spaghetti Bolognese",
    cookingTime: 45,
    servings: 4,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Onion", amount: 1, unit: "medium" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Tomato Sauce", amount: 2, unit: "cups" },
      { name: "Spaghetti", amount: 1, unit: "lb" }
    ],
    steps: [
      "Chop the onion and garlic finely",
      "Brown the ground beef in a large pan",
      "Add the onion and garlic, cook until softened",
      "Pour in the tomato sauce and simmer for 30 minutes",
      "Meanwhile, cook the spaghetti according to package instructions",
      "Serve the sauce over the spaghetti"
    ],
    dateCreated: "3/16/2023"
  },
  {
    id: 1678972583950,
    name: "Caesar Salad",
    cookingTime: 15,
    servings: 2,
    ingredients: [
      { name: "Romaine Lettuce", amount: 1, unit: "head" },
      { name: "Croutons", amount: 1, unit: "cup" },
      { name: "Parmesan Cheese", amount: 1.75, unit: "oz" },
      { name: "Caesar Dressing", amount: 3, unit: "tbsp" }
    ],
    steps: [
      "Wash and chop the lettuce",
      "Toss with dressing",
      "Add croutons and grated parmesan",
      "Serve immediately"
    ],
    dateCreated: "3/16/2023"
  },
  {
    id: 1678972583951,
    name: "Pancakes",
    cookingTime: 20,
    servings: 6,
    ingredients: [
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Milk", amount: 1.5, unit: "cups" },
      { name: "Eggs", amount: 2, unit: "large" },
      { name: "Baking Powder", amount: 1, unit: "tbsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix dry ingredients in a bowl",
      "Add wet ingredients and stir until smooth",
      "Heat griddle and pour batter to form pancakes",
      "Flip when bubbles form on surface",
      "Cook until golden brown",
      "Serve with maple syrup"
    ],
    dateCreated: "3/16/2023"
  }
];

// Function to reset data
async function resetData() {
  try {
    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      console.log(chalk.blue('Creating data directory...'));
      fs.mkdirSync(dataDir, { recursive: true });
    }

    console.log(chalk.yellow('Resetting recipe data to defaults...'));
    
    // Write the default recipes to the file
    await fs.writeFile(dataPath, JSON.stringify(defaultRecipes, null, 2));
    
    console.log(chalk.green('✓ Recipe data has been reset successfully'));
    console.log(chalk.blue(`Data file: ${dataPath}`));
    console.log(chalk.blue(`Recipes added: ${defaultRecipes.length}`));
  } catch (error) {
    console.error(chalk.red('Error resetting recipe data:'), error.message);
  }
}

// Run the reset function
resetData();
