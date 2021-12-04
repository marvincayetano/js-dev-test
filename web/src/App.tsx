import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Post } from './components/Post';
import { Container } from './components/ui/Container';

export interface IPost {
  author: {
    id: string;
    name: string;
  };
  body: string;
  id: string;
  publishedAt: Date;
  title: string;
}

export function App() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: IPost[]) => {
        if (data && data.length) {
          const stringToDate = data.map((post: IPost) => {
            return { ...post, publishedAt: new Date(post.publishedAt) };
          });

          const sortedArray = stringToDate.sort((a: IPost, b: IPost) => {
            return a.publishedAt.getDate() - b.publishedAt.getDate();
          });

          setPosts(sortedArray);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <StyledContainer>
      {isLoading && 'Loading...'}
      {error && 'Error'}

      <Container>
        {posts?.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightgray;
`;
