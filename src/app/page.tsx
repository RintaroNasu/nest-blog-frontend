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
  }, []);

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
      await PostBlogData(newPost);
      console.log("Post created successfully!");
      window.location.reload();
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <>
      <p className="text-center text-4xl mt-5">Next.js Blog</p>
      <div className={styles.container}>
        <div>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title:
              </label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content:
              </label>
              <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author:
              </label>
              <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              登録する
            </button>
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
