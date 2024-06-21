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
        marginBottom: '20px' 
      }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            border: 'none', 
            height: '100%', 
            width: '100%', 
            outline: 'none', 
            background: 'none', 
            fontFamily: 'inherit', 
            fontSize: 'inherit', 
            color: 'inherit',
            paddingLeft: '12px' 
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
