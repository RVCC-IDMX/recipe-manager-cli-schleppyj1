# Recipe Manager CLI

A command-line interface for managing your recipe collection, built with Node.js.

## Project Overview

This project builds on your previous work with recipe management functions and creates a complete command-line application that allows you to:

- Create new recipes
- List all recipes in your collection
- View detailed recipe information
- Add ingredients and steps to existing recipes
- Remove steps from recipes
- Format recipes for printing
- Find quick recipes that can be made in a short time

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Initial Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. **Important**: Copy your completed files from the previous homework assignment:
   - Copy `recipe-basics.js` into the `src` directory
   - Copy `recipe-collection.js` into the `src` directory
   - Copy `recipe-display.js` into the `src` directory

## Documentation

Using `Live Server` to open `index.html`, review the documentation in the following files to understand the packages and patterns used in this project:
- `documentation/package.html`
- `documentation/async.html`

## NPM Link

npm link creates a symbolic link for your local package in the global npm modules directory so you can test it in other projects without publishing it.

To make your CLI globally available (optional):

```bash
npm link
```

After linking, you can run commands directly using `recipe-manager` instead of `npm start`.

## Testing the CLI Code

You can test your implementation by running the following commands:

```bash
# Reset data to defaults (can be run anytime to start fresh)
npm run reset-data

# List all recipes
recipe-manager list

# Create a new recipe
recipe-manager create

# Add an ingredient to a recipe
recipe-manager add-ingredient 1678972583949

# Add a step to a recipe
recipe-manager add-step 1678972583949

# View detailed recipe information
recipe-manager view 1678972583949

# Find recipes that can be made quickly
recipe-manager quick 20
```

If you haven't run `npm link`, or if the __command failed__, you can use these commands instead:

```bash
npm start list
npm start create
# And so on...
```

## Project Structure

```
recipe-manager-cli/
├── documentation/
│   ├── async.html                 # Mini tutorial on async await
│   └── package.html               # Documentation about packages used
├── data/
│   └── recipes.json               # JSON storage for recipes
├── src/
│   ├── index.js                   # Main CLI entry point using Yargs
│   ├── recipe-basics.js           # Core recipe functions (from HW)
│   ├── recipe-collection.js       # Collection management functions (from HW)
│   ├── recipe-display.js          # Recipe formatting functions (from HW)
│   ├── recipe-storage-complete.js # JSON file operations (provided)
│   └── cli/
│       ├── prompts.js             # Interactive CLI prompts
│       ├── display.js             # CLI display functions
│       └── command-wrapper.js     # Helper functions to simplify async code
├── utils/
│   └── reset-data.js              # Utility to recreate recipes.json
├── package.json
└── README.md
```

## Challenges

Your task is to complete the challenges marked in the following files:

1. **CHALLENGE 1**: Create prompts for recipe information in `src/cli/prompts.js`
   - Implement the `promptForRecipeInfo` function to get recipe name, cooking time, and servings from the user

2. **CHALLENGE 2**: Create prompts for ingredient information in `src/cli/prompts.js`
   - Implement the `promptForIngredient` function to get ingredient name, amount, and unit from the user

3. **CHALLENGE 3**: Create prompt for cooking step in `src/cli/prompts.js`
   - Implement the `promptForStep` function to get cooking instructions from the user

4. **CHALLENGE 4**: Create a table to display recipe list in `src/cli/display.js`
   - Implement the `displayRecipeList` function to show recipes in a formatted table

5. **CHALLENGE 5**: Create a detailed recipe display in `src/cli/display.js`
   - Implement the `displayRecipeDetails` function to show all recipe information

6. **CHALLENGE 6**: Complete the yargs commands in `src/index.js`
   - The command structure is already set up, just fill in the handlers as instructed

7. **CHALLENGE 7**: Implement recipe creation logic in `src/index.js`
   - Complete the 'create' command handler to create and save new recipes

8. **CHALLENGE 8**: Implement add ingredient logic in `src/index.js`
   - Complete the 'add-ingredient' command handler to add ingredients to recipes

9. **CHALLENGE 9**: Implement quick recipes search in `src/index.js`
   - Complete the 'quick' command handler to find recipes under a certain time

Look for comments marked with **CHALLENGE** in these files. Each challenge includes specific instructions about what you need to implement.

## Notes About This Project

- We've provided helper functions in `src/cli/command-wrapper.js` that handle all the async/await code for you
- You don't need to understand how async/await works to complete this project
- We're using callbacks (functions that get called when an operation completes) to handle asynchronous operations
- Many of the functions are already implemented for you, so you can focus on the main functionality

## Requirements

Your completed project should:
- Successfully implement all the marked challenges
- Have proper validation for user inputs (no empty recipe names, positive cooking times, etc.)
- Display information in a user-friendly format with appropriate colors
- Work without throwing any errors when performing CRUD operations on recipes
- Successfully filter recipes based on cooking time

## Submission

Push your completed code to your GitHub repository and submit the repository URL on Canvas. Make sure your repository includes all the necessary files, including your copied recipe function files.
