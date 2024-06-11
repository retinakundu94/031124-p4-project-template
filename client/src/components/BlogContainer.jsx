// components/BlogContainer.jsx
import React from 'react';


const BlogContainer = ({ children }) => {
  return (
    <div className="blog-container">
      {children}
    </div>
  );
};


export default BlogContainer;
