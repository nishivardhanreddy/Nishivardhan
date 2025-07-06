export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  slug: string;
  published: boolean;
}

export interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  isWriting: boolean;
  editingPost: BlogPost | null;
}