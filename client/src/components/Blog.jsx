import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogContainer from './BlogContainer';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    { id: 1, title: 'First Post', summary: 'This is the summary of the first post' },
    { id: 2, title: 'Second Post', summary: 'This is the summary of the second post' },
    { id: 3, title: 'Third Post', summary: 'This is the summary of the third post' },
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
      <h1>Blog</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </BlogContainer>
  );
};

export default Blog;
