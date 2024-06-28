import styles from "@/styles/home.module.css";
import { getPostById } from "@/utils/api";
import { PostType } from "@/utils/Types";

interface PostPageProps {
  params: { id: string };
}

export default async function Post({ params }: PostPageProps) {
  const post: PostType = await getPostById(params.id);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.author}>{post.author}</p>
    </div>
  );
}
