import React from "react";
import { motion } from "framer-motion";
import Card3D from "./Card3D";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  color: "green" | "purple" | "blue";
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Future of AI & Tech",
    description: "Exploring upcoming breakthroughs in artificial intelligence and their impact on our daily lives.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    color: "green"
  },
  {
    id: 2,
    title: "Upcoming Innovations in Digital Tools",
    description: "Discover the next generation of digital tools revolutionizing creativity and productivity.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
    color: "purple"
  },
  {
    id: 3,
    title: "Canva Pro vs Other Design Platforms",
    description: "An in-depth comparison of leading design platforms and why Canva Pro stands out.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    color: "blue"
  },
  {
    id: 4,
    title: "Best AI Tools for Content Creation",
    description: "Top AI-powered tools that are transforming how we create and optimize digital content.",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
    color: "green"
  }
];

const BlogSection: React.FC = () => {
  return (
    <motion.section 
      className="py-8 px-4 md:px-12 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="container mx-auto mb-12">
        <motion.h2 
          className="font-space font-bold text-3xl md:text-4xl mb-8 text-center neon-text-purple"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Latest Tech Insights
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <Card3D 
              key={post.id} 
              className={`rounded-xl overflow-hidden bg-space-blue p-4 md:p-6 neon-border-${post.color}`}
            >
              <div className="aspect-video bg-deep-space rounded-lg mb-4 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <h3 className={`font-space font-bold text-xl mb-2 neon-text-${post.color}`}>{post.title}</h3>
              <p className="text-text-light opacity-80 text-sm mb-4">{post.description}</p>
              <motion.a 
                href="#" 
                className={`inline-block neon-button-${post.color} rounded-lg py-2 px-4 text-sm font-space`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.a>
            </Card3D>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BlogSection;
