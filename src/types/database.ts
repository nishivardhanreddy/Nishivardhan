export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image: string;
          author: string;
          published_at: string;
          read_time: number;
          tags: string[];
          slug: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image: string;
          author: string;
          published_at: string;
          read_time: number;
          tags: string[];
          slug: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string;
          author?: string;
          published_at?: string;
          read_time?: number;
          tags?: string[];
          slug?: string;
          published?: boolean;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
        };
      };
    };
  };
}