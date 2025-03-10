export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }

export interface SearchResult {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
