export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}
export interface BlogPost {
  _id?: string;
  id: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  readTime: string;
  category: string;
  image: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}
