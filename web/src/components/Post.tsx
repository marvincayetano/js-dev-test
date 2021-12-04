import React from 'react';
import ReactMarkdown from 'react-markdown';

import { IPost } from '../App';
import styled from 'styled-components';

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  return (
    <StyledContainer>
      <h2>
        <a href="#">{post.title}</a>
      </h2>
      <p>By: {post.author.name}</p>
      <p>{post.publishedAt.toLocaleString()}</p>

      <ReactMarkdown>{post.body}</ReactMarkdown>
      <p>summary here</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0;
  }

  p {
    font-size: 1rem;
    line-height: 1.5rem;
    margin: 0.5rem;
  }

  a {
    color: inherit;
  }
`;
