export const LABELS = {
  PAGE_TITLE: "Employee Info",
  SEARCH: {
    PLACEHOLDER: "Type to Search Employee Info...",
    BUTTON: "Search",
    DOWNLOAD: "Download Employee Report",
  },
  ERROR: {
    FETCH_FAILED: "Error fetching data",
  },
  TOUR_STEPS: [
    {
      title: "Search Bar",
      description: "Type a name or email to search for an employee.",
      target: () => document.querySelector(".search-tab"),
    },
    {
      title: "Results Table",
      description: "View the search results here.",
      target: () => document.querySelector(".ant-table"),
    },
    {
      title: "Download Report",
      description: "Click on Download to get report with employee Details.",
      target: () => document.querySelector(".download-button"),
    },
  ],
  DRAWER: {
    TITLE: "Implementation Details",
    SECTIONS: {
      TEST_SCENARIOS: "Test Scenarios",
      TECH_COMPONENTS: "Implemented Technical Components",
    },
    TEST_SCENARIOS: [
      { text: "Verify search functionality with valid input", icon: "✔️" },
      { text: "Ensure error message appears for empty input", icon: "⚠️" },
      { text: "Check loading state while fetching data", icon: "⏳" },
      { text: "Validate email links are clickable", icon: "📧" },
      { text: "Ensure pagination works correctly", icon: "🔢" },
      { text: "Check download functionality for reports", icon: "📄" },
    ],
    TECH_COMPONENTS: [
      "Ant Design: Input, Button, Table, Tooltip, Drawer, Tour, Avatar, Card, Alert, Pagination",
      "React Hooks: useState, useEffect, useCallback, useMemo",
      "API Calls with Fetch",
      "Debouncing with lodash.debounce",
      "Excel Export with xlsx Library",
    ],
  },
  FOOTER: "© 2025 Employee Search System | Designed for Productivity",
};
