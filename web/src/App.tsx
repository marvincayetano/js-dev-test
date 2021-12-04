import React, { useEffect, useState } from 'react';

export function App() {
  const [posts, setPosts] = useState<unknown>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts', {
          method: 'GET',
        });

        const data = await response.json();
        if (data) {
          setPosts(posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div className="App"></div>;
}
