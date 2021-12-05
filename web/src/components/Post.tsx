import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { IPost } from '../App';
import styled from 'styled-components';

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const [isShowFullContent, setIsShowFullContent] = useState<boolean>(false);
  const postSummary = useMemo(() => post.body.slice(0, 250), [post.body]);

  return (
    <StyledContainer>
      <h2>
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setIsShowFullContent(true);
          }}
        >
          {post.title}
        </a>
      </h2>
      <p>By: {post.author.name}</p>
      <p>{post.publishedAt.toLocaleString()}</p>

      {isShowFullContent ? (
        <>
          <ReactMarkdown>{post.body}</ReactMarkdown>
          <button onClick={() => setIsShowFullContent(false)}>Show Less</button>
        </>
      ) : (
        <ReactMarkdown components={{ h1: 'p', h2: 'p' }}>
          {`${postSummary}...`}
        </ReactMarkdown>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  padding: 1.5rem;
  margin-bottom: 3rem;

  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  &:hover {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

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
