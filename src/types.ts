export type Role = 'Admin' | 'Manager' | 'Staff';

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  email: string;
  createdAt: string;
}

export type MenuCategory = 'Food' | 'Drinks' | 'Desserts' | 'Starters';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  images: string[]; // array of image urls or base64 data-urls
  isPopular: boolean;
  views: number;
  createdAt: string;
}

export interface StatsOverview {
  totalItems: number;
  totalViews: number;
  totalEmployees: number;
  popularItems: MenuItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string; // lucide icon name
  features: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  date: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Marketing' | 'Development' | 'Design' | 'Content';
  image: string;
  bio: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}
