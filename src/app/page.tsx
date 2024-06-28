"use client";

import styles from "@/styles/home.module.css";
import { getAllPosts, PostBlogData } from "@/utils/api";
import { PostType } from "@/utils/Types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  // const posts: PostType[] = await getAllPosts(); //このコードみたいに、use clientコンポーネントのトップレベルで非同期関数は使えないので、以下のようにuseEffect内で非同期関数を使うようにする。
  useEffect(() => {
    const fetchData = async () => {
      const allPosts: PostType[] = await getAllPosts();
      setPosts(allPosts);
    };
    fetchData();
  },[]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPost = {
      title,
      content,
      author,
      createdAt: new Date().toISOString(),
    };
    console.log("newPost=" + newPost);
    try {
      const createdPost = await PostBlogData(newPost);
      if (createdPost) {
        console.log("Post created successfully!", createdPost);
        setTitle("");
        setContent("");
        setAuthor("");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <>
      <p className="text-center text-4xl mt-5">Next.js Blog</p>
      <div className={styles.container}>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label>Content:</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <div>
              <label>Author:</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <button type="submit">登録する</button>
          </form>
        </div>
        <ul className={styles.postList}>
          {posts.map((post: PostType) => {
            return (
              <Link href={`/posts/${post.id}`}>
                <li className={styles.post} key={post.id}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.author}>By {post.author}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
