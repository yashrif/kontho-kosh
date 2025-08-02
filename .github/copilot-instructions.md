# Coding Guidelines

## Introduction

This document outlines the coding guidelines and best practices for our project. It is essential to follow these guidelines to ensure consistency, readability, and maintainability of the codebase.

## Indentation

We use tabs, not spaces.

## Naming Conventions

- Use PascalCase for `type` names
- Use PascalCase for `enum` values
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use whole words in names when possible
- Use PascalCase for `.tsx` files
- Use snake-case for `.ts` files and folders

## Accessibility

- Use cursor pointer for clickable elements

## Instructions

- Analyze the following files from the [dependencies](../.dependencies) folder to understand the project structure
  1. (routes)[../.dependencies/routes.md] -> includes the rotues and component paths
- Use colors from the [globals.css](../src/app/globals.css) instead of hardcoded colors
- Use [ui components](../src/components/ui) for all UI elements instead of HTML elements (button, form, e.t.c)
- Use the reusable components from the [components](../src/components) folder as much as possible
- Store all the SVGs in the [Icons.tsx](../src/components/Icons.tsx) component and use them from there
- Store all the types in the [types](../src/types) folder
- Don't add unnecessary comments to the code
- Store all the utility functions in the [utils](../src/utils) folder
- Store all the constants in the [constants](../src/constants) folder
- Use the [PageLoader](../src/components/common/PageLoader.tsx) component for loading states
- Use the `useCallback` hook for all the functions that are passed as props to child components or used in `useEffect` dependencies.
- Use rounded corners for all the components. Rounded full for buttons.

## Types

- Never use `any` type
- Always use `type` instead of `interface`
- Do not export `types` or `functions` unless you need to share it across multiple components
- Do not introduce new `types` or `values` to the global namespace

## Comments

- When there are comments for `functions`, `interfaces`, `enums`, and `classes` use JSDoc style comments

## Strings

- Use "double quotes" for strings shown to the user that need to be externalized (localized)
- Use 'single quotes' otherwise
- All strings visible to the user need to be externalized

## Style

- Always use arrow functions for all the functions
- Use arrow functions `=>` over anonymous function expressions
- Only surround arrow function parameters when necessary. For example, `(x) => x + x` is wrong but the following are correct:

```javascript
x => x + x
(x, y) => x + y
<T>(x: T, y: T) => x === y
```

- Always surround loop and conditional bodies with curly braces
- Open curly braces always go on the same line as whatever necessitates them
- Parenthesized constructs should have no surrounding whitespace. A single space follows commas, colons, and semicolons in those constructs. For example:

```javascript
for (let i = 0, n = str.length; i < 10; i++) {
  if (x < 10) {
    foo();
  }
}

function f(x: number, y: string): void {}
```

### Feature-Color Mapping

- Use the colorscheme strictly from the [globals.css](../src/app/globals.css) file.

### UI Design
- Use rounded corners for all the components. Rounded full for buttons.

## Additional Guidelines

- Follow the [cleanup](./prompts/cleanup.prompt.md) guidelines for code cleanup.
- Follow the [visual-overhaul](./prompts/visual-overhaul.prompt.md) guidelines for UI design.
- Follow the [refactor](./prompts/refactor.prompt.md) guidelines for code refactoring.
