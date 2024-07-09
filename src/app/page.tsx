"use client";

import styles from "@/styles/home.module.css";
import { PostManyBlogData, getAllPosts, PostBlogData } from "@/utils/api";
import { PostType } from "@/utils/Types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const csvText = reader.result as string;
      console.log("csvText=" + csvText);
      const parsedData = parseCsv(csvText);
      try {
        await PostManyBlogData(parsedData);
        window.location.reload();
      } catch (error: any) {
        console.error("Failed to upload CSV data:", error);
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  const parseCsv = (csv: string) => {
    const lines = csv.split("\n").map((line) => line.trim());
    const data = lines.slice(1);
    return data.map((line) => {
      const values = line.split(",");
      return {
        title: values[0],
        content: values[1],
        author: values[2],
        createdAt: new Date().toISOString(),
      };
    });
  };

  return (
    <>
      <p className="text-center text-4xl mt-5 font-bold">個人Blog</p>
      <div className={styles.container}>
        <div>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg mb-5">
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
        <div className="mb-12 flex flex-col items-center">
          <label className="flex h-10 w-60 cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 text-center font-semibold">
            <BsUpload />
            CSVアップロード
            <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        <ul className={styles.postList}>
          {posts.map((post: PostType) => {
            return (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <li className={styles.post}>
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
