import { PostCreateInput } from "./Types";

export async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:5050/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function PostBlogData(postData: PostCreateInput) {
  try {
    const response = await fetch("http://localhost:5050/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      cache: "no-store",
    });
    const data = await response.json();
    console.log("data" + data);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function getPostById(id: string) {
  try {
    const response = await fetch(`http://localhost:5050/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function PostManyBlogData(entries: { title: string; content: string; author: string; createdAt: string }[]) {
  try {
    const response = await fetch(`http://localhost:5050/posts/many`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entries }),
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create post:", error);
    return null;
  }
}
