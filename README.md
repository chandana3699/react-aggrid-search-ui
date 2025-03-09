# react-aggrid-search-ui
A straightforward and effective search application built with React that uses typeahead, pagination, and Table to display results. Ant Design, and the React Router framework to create a neat and clean user interface.

# Design:
1.React (TypeScript) + Ant Design for UI components
2.Project Bundler (Webpack/Gulp) for optimized builds
3.Public JSON API for fetching search results
4.Testing with Vitest + React Testing Library

# Implementation:
1.Search Input with Debounce: Uses an input field where users type their query.Implements a debounce function to minimize API calls.
2.API Call & Response Handling: Calls a public JSON API to fetch results dynamically.Limits results to 20 items for optimal performance and display Result to table with retrieved Details.
3.Typeahead Functionality: Displays real-time suggestions based on user input.Ensures a smooth and interactive user experience (UX).
4.Unit Testing: Tests API calls, UI rendering, and error handling using Vitest.

# ToDo:
1.Implement pagination for large datasets.
2.Add loading indicators for better UX for table can use Agrid if needed of more customization and filtering.
3.Improve error handling (eg: show messages on API failure).
4.Optimize performance with memoization and state management tools.

# How To Setup in Local :
1.Pre-requisites : Node.js (v16 or later),npm or yarn installed
2.Clone the Repository : git clone https://github.com/chandana3699/react-aggrid-search-ui.git
  cd feature/dev-search-changes
3.Install Dependencies : npm install or yarn install
4.Run the Development Server : npm run dev
  To start the app at http://localhost:3000.
5.Running Tests (Vitest + React Testing Library) : npm test  or yarn test

# Demo Script:
1.Open the browser and visit http://localhost:5713.
2.Start typing in the search bar (eg: "eliseo" or "elis").
3.Observe how results appear dynamically (typeahead feature).
4.If results exist, they will be displayed in a table.
5.If no results are found, a "No data" message appears.
6.Docs Folder have Test Scenario Results.

