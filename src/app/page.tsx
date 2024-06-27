import styles from "@/styles/home.module.css";
import { getAllPosts } from "@/utils/api";
import { PostType } from "@/utils/Types";
import Link from "next/link";

export default async function Home() {
  const posts: PostType[] = await getAllPosts();
  return (
    <>
      <div className={styles.container}>
        <h1>Next.js Blog</h1>
        <ul className={styles.postList}>
          {posts.map((post: PostType) => {
            return (
              <Link href={`/posts/${post.id}`}>
                <li className={styles.post} key={post.id}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.author}>By {post.author}</p>
                  <p className={styles.content}>{post.content}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
