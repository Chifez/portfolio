export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image: string;
}
export interface BlogPost {
  _id?: string;
  id: string;
  title: string;
  excerpt: string;
  content: string;
  contentImages: {
    url: string;
    publicId: string;
  }[];
  createdAt: string;
  readTime: string;
  category: string;
  image: {
    url: string;
  };
  author?: {
    name: string;
    avatar?: string;
    role: string;
  };
  slug: string;
  tags?: string[];
}
