import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Post } from './components/Post';
import { Container } from './components/ui/Container';

interface IAuthor {
  id: string;
  name: string;
}

export interface IPost {
  author: IAuthor;
  body: string;
  id: string;
  publishedAt: Date;
  title: string;
}

// DONE: Fetch post data from the provided Express API.
// DONE: Display a list of posts. Include the post title, summary, author, and publish date in the list.
// DONE: The list of posts should be displayed in reverse chronological order.
// DONE: Add buttons for each author. Make clicking on an author button filter the list of posts by author.
// DONE: Make the title of each post in the list clickable. When you click a post title, display the formatted post body and title.
// Implement basic snapshot regression tests tests using Jest for your components. Jest is installed by create-react-app and can be run from the web/ folder with yarn test.

export function App() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authors, setAuthors] = useState<IAuthor[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

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
          const authorsObj = {} as any;
          const convertedStringToDate = [];

          for (const post of data) {
            authorsObj[post.author.id] = post.author;
            convertedStringToDate.push({
              ...post,
              publishedAt: new Date(post.publishedAt),
            });
          }

          const sortedArray = convertedStringToDate.sort(
            (a: IPost, b: IPost) => {
              return b.publishedAt.getTime() - a.publishedAt.getTime();
            }
          );

          setAuthors(Object.values(authorsObj));
          setFilteredPosts(sortedArray);
          setPosts(sortedArray);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function filterPosts(id: string) {
    const filteredData = posts?.filter((post) => {
      return post.author.id === id;
    });

    setIsFiltered(true);
    setFilteredPosts(filteredData ?? null);
  }

  return (
    <StyledContainer>
      {isLoading && 'Loading...'}
      {error && 'Error'}

      <Container title="Posts">
        <p>List of authors</p>
        <StyledAuthorListContainer>
          {isFiltered ? (
            <button
              onClick={() => {
                setIsFiltered(false);
                setFilteredPosts(posts);
              }}
            >
              Clear
            </button>
          ) : (
            authors?.map((author: IAuthor) => (
              <button key={author.id} onClick={() => filterPosts(author.id)}>
                {author.name}
              </button>
            ))
          )}
        </StyledAuthorListContainer>

        {filteredPosts?.map((post: IPost) => (
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
  height: 100vh;
`;

const StyledAuthorListContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
`;
