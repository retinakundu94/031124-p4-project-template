import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogContainer from './BlogContainer';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    { id: 1, title: 'The Birth of Amara Jewels: My Entrepreneurship Journey', summary: 'Discover the inspiring journey behind the creation of Amara Jewels, from a passion for jewelry to building a successful business.' },
    { id: 2, title: 'Building a Strong Brand Identity for Your Jewelry Business', summary: 'Learn how to create a memorable brand identity, including developing a compelling brand story and maintaining consistency.' },
    { id: 3, title: 'Effective Marketing Strategies for Your Jewelry Business', summary: 'Explore various marketing strategies to promote your jewelry business, from leveraging social media to hosting events.' },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BlogContainer>
      <div className="blog-header">
      <h1>Blog</h1>
      <div style={{
        marginLeft: '10px',
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        color: 'rgb(15, 80, 116)',
        border: '0.7px solid',
        borderRadius: '16px',
        paddingLeft: '12px',
        height: '30px',
        width: '300px',
        backgroundColor: 'rgba(255, 240, 245, 0.8)',
        marginBottom: '20px' // Additional style for spacing
      }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            border: 'none', // Override border style from parent div
            height: '100%', // Ensure input fills the container height
            width: '100%', // Ensure input fills the container width
            outline: 'none', // Remove outline on focus
            background: 'none', // Remove default background
            fontFamily: 'inherit', // Inherit font family from parent
            fontSize: 'inherit', // Inherit font size from parent
            color: 'inherit', // Inherit color from parent
            paddingLeft: '12px' // Maintain left padding
          }}
        />
      </div>
      </div>
      
      <div className="blog-cards">
        {filteredPosts.map(post => (
          <div key={post.id} className="blog-card">
            <Link to={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.summary}</p>
          </div>
        ))}
      </div>
    </BlogContainer>
  );
};

export default Blog;
