export async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:5050/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
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
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}
