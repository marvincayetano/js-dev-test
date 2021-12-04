import React, { useEffect, useState } from 'react';

interface Post {
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
  const [posts, setPosts] = useState<Post[] | null>(null);
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
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {isLoading && 'Loading...'}

      {error && 'Error'}

      {posts?.map((post: Post) => (
        <div>{post.body}</div>
      ))}
    </div>
  );
}
