import { Header } from "./components/Header";
import { Post, PostProps } from "./components/Post";
import React from 'react'

import './global.css'

import styles from './App.module.css'
import { Sidebar } from "./components/Sidebar";

interface Post extends PostProps{
  id: number;
}

function App() {
  const posts: Post[] = [
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/stefanossandrade.png",
        name: "Stefano Andrade",
        role: "Dev",
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋', },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare', },
        { type: 'link', content: 'jane.design/doctorcare', },
      ],
      publishedAt: new Date('2022-05-03 20:00:00'),
    },
  
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/weslleypfelix.png",
        name: "Weslley Felix",
        role: "Software Engineer"
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋', },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare', },
        { type: 'link', content: 'jane.design/doctorcare', },
      ],
      publishedAt: new Date('2022-10-03 20:00:00'),
    },
  ];

  return (
    <div >
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
