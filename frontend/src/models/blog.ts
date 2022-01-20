export type Blog = {
  title: string;
  id: string;
  author: string;
  likes: number;
};

export type BlogUpdate = PartialBut<Blog, "id">;

type PartialBut<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
