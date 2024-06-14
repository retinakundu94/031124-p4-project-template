// components/Post.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const posts = {
    1: { title: 'First Post', content: 'This is the content of the first post' },
    2: { title: 'Second Post', content: 'This is the content of the second post' },
    3: { title: 'Third Post', content: 'This is the content of the third post' },
  };

  const post = posts[id];

  return (
    <div className="blog-card">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
