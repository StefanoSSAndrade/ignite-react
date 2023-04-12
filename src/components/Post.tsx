import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import React, { ChangeEvent, FormEvent, useState, useRef, InvalidEvent, useEffect, useCallback } from 'react'

import { Comment } from './Comment'

import { Avatar } from './Avatar'

import styles from './Post.module.css'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
};

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export const Post = ({ author, publishedAt, content }: PostProps) => {

  const textAreaComment = useRef<HTMLTextAreaElement | any>(null)

  const [comments, setComments] = useState([
    "Muito bacana!"
  ])

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const DateRealtiveToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })
  
  const handleCreateNewComment = (event: FormEvent) => {

    event.preventDefault();

    const textAreaContent = textAreaComment.current.value;
    
    if(textAreaContent.trim() == ''){
      return
    }else{
      setComments([...comments, newCommentText])
  
      setNewCommentText('')
  
      textAreaComment.current.focus();
    }
    
  };


  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)

  };

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    console.log(event)

  };

  const deleteComment = (commentToDelete: string) => {

    const commentsWithoutDeletdOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletdOne);

  };

  const inNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}></div>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </div>

        <time title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}>
          {DateRealtiveToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type == 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type == 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          ref={textAreaComment}
          value={newCommentText}
          name="comment"
          placeholder='Deixe seu comentário'
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button
            disabled={inNewCommentEmpty}
            type='submit'>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        })}
      </div>
    </article>
  )
}
