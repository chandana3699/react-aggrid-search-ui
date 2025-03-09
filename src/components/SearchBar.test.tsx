// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import SearchBar from "./SearchBar"; // Adjust path if needed
// import fetchMock from "jest-fetch-mock";
// import "@testing-library/jest-dom"; 

// fetchMock.enableMocks();

// describe("SearchBar Component", () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });

//   test("renders search page title", () => {
//     render(<SearchBar />);
//     expect(screen.getByText(/Search Page/i)).toBeTruthy();
//   });

//   test("renders input field and button", () => {
//     render(<SearchBar />);
//     expect(screen.getByPlaceholderText(/Type To Search.../i)).toBeTruthy();
//     expect(screen.getByRole("button", { name: /Search/i })).toBeTruthy();
//   });

//   test("updates input field on typing", () => {
//     render(<SearchBar />);
//     const input = screen.getByPlaceholderText(/Type To Search.../i);
//     fireEvent.change(input, { target: { value: "test" } });
//     expect(input).toHaveValue("test");
//   });

//   test("does not call API if input is less than 3 characters", async () => {
//     render(<SearchBar />);
//     const input = screen.getByPlaceholderText(/Type To Search.../i);
//     fireEvent.change(input, { target: { value: "te" } });

//     await waitFor(() => {
//       expect(fetchMock).not.toHaveBeenCalled();
//     });
//   });

//   test("calls API and displays results on valid input", async () => {
//     fetchMock.mockResponseOnce(
//       JSON.stringify([{ id: 1, postId: 1, name: "Test User", email: "test@example.com", body: "Test Comment" }])
//     );

//     render(<SearchBar />);
//     const input = screen.getByPlaceholderText(/Type To Search.../i);
//     fireEvent.change(input, { target: { value: "test" } });

//     await waitFor(() => {
//       expect(fetchMock).toHaveBeenCalledTimes(1);
//       expect(screen.getByText(/Test User/i)).toBeTruthy();
//     });
//   });

//   test("displays error message if API fails", async () => {
//     fetchMock.mockRejectOnce(new Error("API error"));

//     render(<SearchBar />);
//     const input = screen.getByPlaceholderText(/Type To Search.../i);
//     fireEvent.change(input, { target: { value: "error" } });

//     await waitFor(() => {
//       expect(screen.getByText(/Failed to fetch results/i)).toBeTruthy();
//     });
//   });
// });

// global.window.matchMedia = global.window.matchMedia || (() => {
//     return {
//       matches: false,
//       addListener: () => {},
//       removeListener: () => {},
//     };
//   });
  

// import { vi } from "vitest"; // Use Vitest’s vi.fn() for mocking
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import SearchBar from "./SearchBar"; // Adjust path if needed
// import "@testing-library/jest-dom";

// describe("SearchBar Component", () => {
// //   beforeEach(() => {
// //     global.fetch = vi.fn(); // Mock fetch before each test
// //   });
//   beforeEach(() => {
//     global.fetch = vi.fn() as jest.Mock; // 👈 Cast `fetch` as a mock
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       json: async () => [{ id: 1, name: "Test User", email: "test@example.com", body: "Test Comment" }],
//     });
//   });
  

//   afterEach(() => {
//     vi.restoreAllMocks(); // Reset mocks after each test
//   });

//   test("renders search page title", () => {
//     render(<SearchBar />);
//     expect(screen.getByText(/Search Page/i)).toBeTruthy();
//   });

//   test("calls API and displays results on valid input", async () => {
//     global.fetch.mockResolvedValueOnce({
//       json: async () => [{ id: 1, name: "Test User", email: "test@example.com", body: "Test Comment" }],
//     } as Response);
  
//     render(<SearchBar />);
  
//     const input = screen.getByPlaceholderText(/Type To Search.../i);
//     fireEvent.change(input, { target: { value: "test" } });
  
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1), { timeout: 500 });
  
//     expect(await screen.findByText(/Test User/i)).toBeInTheDocument();
//   });
  
  
  
// });


global.window.matchMedia = global.window.matchMedia || (() => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  });
  
  import { vi } from "vitest";
  import { render, screen, fireEvent, waitFor } from "@testing-library/react";
  import SearchBar from "./SearchBar"; // Adjust path if needed
  import "@testing-library/jest-dom";
  
  describe("SearchBar Component", () => {
    beforeEach(() => {
      vi.restoreAllMocks(); // Reset all mocks before each test
    });
  
    test("renders search page title", () => {
      render(<SearchBar />);
      expect(screen.getByText(/Search Page/i)).toBeInTheDocument();
    });
  
    test("calls API and displays results on valid input", async () => {
      // ✅ Mock fetch and cast as a jest.Mock for TypeScript
      global.fetch = vi.fn() as jest.Mock;
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [
          { id: 1, name: "Test User", email: "test@example.com", body: "Test Comment" },
        ],
      });
  
      render(<SearchBar />);
      const input = screen.getByPlaceholderText(/Type To Search.../i);
      fireEvent.change(input, { target: { value: "test" } });
  
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
  
      // Ensure the result is displayed correctly
      expect(await screen.findByText(/Test User/i)).toBeInTheDocument();
    });
  
    test("handles empty search results gracefully", async () => {
      global.fetch = vi.fn() as jest.Mock;
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [],
      });
  
      render(<SearchBar />);
      const input = screen.getByPlaceholderText(/Type To Search.../i);
      fireEvent.change(input, { target: { value: "randomquery" } });
  
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
  
      expect(screen.queryByText(/Test User/i)).not.toBeInTheDocument();
      expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
  });
  