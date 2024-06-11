// components/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BlogContainer from './BlogContainer';

const Blog = () => {
  const posts = [
    { id: 1, title: 'First Post', summary: 'This is the summary of the first post' },
    { id: 2, title: 'Second Post', summary: 'This is the summary of the second post' },
    { id: 3, title: 'Third Post', summary: 'This is the summary of the third post' },
  ];

  return (
    <BlogContainer>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
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
