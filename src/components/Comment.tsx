import React from 'react'

import styles from './Comment.module.css'

import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from './Avatar'

import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export const Comment = ({ content, onDeleteComment }: CommentProps) => {

  const [likeCount, setLikeCount] = useState(0)

  // passamos a responsa dessa funcao pra dentro do onClick no button
  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1
    });
  }

  const handleDeleteComment = () => {
    console.log('deletou');

    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/stefanossandrade.png" alt=""/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Stefano Andrade</strong>
              <time title='05 de dezembro às 20:00' dateTime='2022-12-05 20:00:35'>Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
