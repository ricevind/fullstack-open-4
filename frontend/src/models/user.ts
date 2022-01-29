import { Blog } from "./blog";

export type User = {
  name: string;
  username: string;
  id: string;
  token: string;
  blogsCount: number;
  blogs: Blog[];
};

export type Credentials = {
  username: string;
  password: string;
};
