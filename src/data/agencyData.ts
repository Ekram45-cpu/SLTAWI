import { ServiceItem, PortfolioProject, TeamMember, TestimonialItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'Drive real business outcomes with customized PPC, social media campaigns, and lead generation funnels.',
    fullDesc: 'We build high-performance social media marketing and pay-per-click strategies customized for East African and global audiences. Our approach is purely performance-oriented, focusing on lowering acquisition costs while scaling engagement.',
    iconName: 'Megaphone',
    features: [
      'Meta, LinkedIn & Google Ads Management',
      'Targeted Lead Generation Campaigns',
      'Social Media Calendar & Engagement',
      'ROI & Performance Attribution Reports'
    ]
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    shortDesc: 'Beautiful, high-performance, responsive websites built with modern frameworks and optimization.',
    fullDesc: 'Your website is your ultimate digital headquarters. We develop premium, fully-responsive, and fast-loading web applications tailored to turn visitors into loyal clients. Built on React, Node.js, and modern lightweight engines.',
    iconName: 'Code',
    features: [
      'Full-Stack Custom Web Apps',
      'Responsive Mobile-First Interfaces',
      'E-commerce & Portal Development',
      'High Speed & Interactive Animation'
    ]
  },
  {
    id: 'branding-design',
    title: 'Branding & Design',
    shortDesc: 'Create an unforgettable brand identity with sleek corporate stationery, logos, and style guidelines.',
    fullDesc: 'We craft iconic brand identities that combine global aesthetic standards with local cultural resonance. From typography and custom brand kits to packaging design and complete corporate rebrands.',
    iconName: 'Palette',
    features: [
      'Logo & Brand Mark Systems',
      'Corporate Guidelines & Typography',
      'Packaging & Product Design',
      'Sleek Marketing Presentations'
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    shortDesc: 'Compelling brand storytelling through premium photography, copy, and video production.',
    fullDesc: 'Engagement is driven by visual and verbal storytelling. Our production team creates world-class video, high-definition photography, and interactive social assets that speak directly to your target demographics in Amharic, English, and more.',
    iconName: 'Video',
    features: [
      'Social Media Content Production',
      'Bilingual Copywriting & Ad Copy',
      'Professional Photography & Editing',
      'Motion Graphics & Video Promos'
    ]
  },
  {
    id: 'seo-services',
    title: 'SEO Services',
    shortDesc: 'Dominate search rankings and unlock compounding organic traffic with on-page and off-page SEO.',
    fullDesc: 'Unlock long-term compounding growth. We audit, restructure, and optimize your digital properties to dominate search engines, securing top spots for high-intent queries that capture ready-to-buy customers.',
    iconName: 'Search',
    features: [
      'Technical SEO & Core Web Vitals Audits',
      'High-Intent Keyword Map & Research',
      'On-Page Optimization & Structure',
      'Local SEO & Google Business Optimization'
    ]
  }
];

export const portfolioData: PortfolioProject[] = [
  {
    id: 'zoma-wellness',
    title: 'Zoma Wellness Brand Identity',
    category: 'Branding & Design',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    client: 'Zoma Wellness Spa & Retreat',
    date: 'Dec 2024',
    challenge: 'Zoma Wellness, an upscale eco-luxury retreat in Addis Ababa, needed a complete brand identity that felt organic yet ultra-luxurious, appealing to high-profile international guests and locals alike.',
    solution: 'We crafted a minimalist logo inspired by traditional Ethiopian organic design and paired it with a sophisticated earth-toned color palette, premium tactile packaging concepts, and an elegant digital style guide.',
    impact: 'Increased booking requests by 45% post-relaunch and established Zoma as a premier luxury sanctuary in Ethiopia.',
    screenshots: [
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'habesha-brew',
    title: 'Habesha Brew eCommerce',
    category: 'Website Development',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80',
    client: 'Habesha Brew Co.',
    date: 'Oct 2024',
    challenge: 'Habesha Brew needed a highly performant, reliable online storefront capable of processing thousands of bulk wholesale orders, handling delivery coordinates, and running fast on low-bandwidth mobile networks.',
    solution: 'We engineered a super-fast progressive React web application integrated with offline cart sync, clean SMS ordering fallback options, and a highly streamlined dashboard for their delivery fleet.',
    impact: 'Reduced order checkout times by 60% and secured over 8,000 active wholesale distribution channels in the first quarter alone.',
    screenshots: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'addis-ride',
    title: 'Addis Ride Social Campaign',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    client: 'Addis Ride Transport',
    date: 'Feb 2025',
    challenge: 'To break into a highly competitive ride-hailing market, Addis Ride needed a massive, relatable marketing push that would boost app downloads and generate viral brand awareness.',
    solution: 'We ran a multi-channel digital campaign centered around real stories of Addis drivers, backed by targeted localized Meta ads, micro-influencer storytelling, and interactive promo code triggers.',
    impact: 'Generated 150,000+ app installs, decreased cost-per-acquisition (CPA) by 35%, and achieved viral organic reach across Telegram and TikTok.',
    screenshots: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'entoto-outpost',
    title: 'Entoto Outpost SEO Campaign',
    category: 'SEO Services',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    client: 'Entoto Luxury Outpost',
    date: 'April 2024',
    challenge: 'Entoto Outpost was invisible to global tourists searching for high-end eco-lodges near Addis Ababa. They relied heavily on expensive OTA platforms with high commission margins.',
    solution: 'We performed a thorough technical SEO restructuring of their website, mapped high-intent keywords like "luxury lodge Addis Ababa," and launched a localized content strategy highlighting hiking, wellness, and views.',
    impact: 'Ranked #1 on Google for key target queries, generating a 300% boost in direct, non-commission bookings within 8 months.',
    screenshots: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kuriftu-content',
    title: 'Kuriftu Video & Story Series',
    category: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=800&q=80',
    client: 'Kuriftu Resorts & Hotels',
    date: 'Jan 2025',
    challenge: 'Kuriftu Resorts wanted to launch their new adventure park, needing a highly cinematic, fast-paced media asset pack that captures the adrenaline, leisure, and breathtaking locations of the park.',
    solution: 'Our production crew deployed to the park for a week, capturing FPV drone shots, cinematic guest reels, and dynamic bilingual promo edits styled for vertical formats.',
    impact: 'The launch video accumulated over 1.2 million views on social channels within two weeks, sparking a major wave of weekend visitors.',
    screenshots: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const teamData: TeamMember[] = [
  {
    id: 'nathan-siltawi',
    name: 'Dr. Nathan',
    role: 'Founder & CEO',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Nathan is a technology visionary and entrepreneur who returned to Addis Ababa with a mission to elevate African businesses through digital innovation and world-class marketing frameworks.'
  },
  {
    id: 'martha-kassa',
    name: 'Martha Kassa',
    role: 'Marketing Director',
    department: 'Marketing',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    bio: 'Martha is a data-driven marketer with over 8 years of experience. She oversees our performance marketing, ad allocation, and digital acquisition channels for enterprise clients.'
  },
  {
    id: 'dawit-abraham',
    name: 'Dawit Abraham',
    role: 'Technical Lead',
    department: 'Development',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    bio: 'Dawit is a highly accomplished full-stack software engineer obsessed with performance, speed, and clean React-based microservices.'
  },
  {
    id: 'selamawit-tadesse',
    name: 'Selamawit Tadesse',
    role: 'Creative Director',
    department: 'Design',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bio: 'Selamawit leads our visual studio, ensuring that every logo, web interface, and branding package matches global typographic excellence.'
  },
  {
    id: 'abel-tekle',
    name: 'Abel Tekle',
    role: 'Lead Content Strategist',
    department: 'Content',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80',
    bio: 'Abel is a master of language, crafting highly persuasive Amharic and English narratives that turn prospects into loyal brand advocates.'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'semere-zoma',
    quote: "Siltawi Digital changed how we look at digital. Our engagement grew by 350% in under six months, and booking volume skyrocketed.",
    author: "Semere Yohannes",
    role: "CEO & Founder",
    company: "Zoma Wellness",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 'almaz-brew',
    quote: "Their web development team is outstanding. The Habesha Brew platform runs beautifully even on slower mobile networks.",
    author: "Almaz Tesfaye",
    role: "Marketing Director",
    company: "Habesha Brew Co.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 'yonas-ride',
    quote: "A world-class agency right here in Addis Ababa. Transparent, metrics-driven, and relentlessly creative.",
    author: "Yonas Mekonnen",
    role: "Founder",
    company: "Addis Ride",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];
