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
  