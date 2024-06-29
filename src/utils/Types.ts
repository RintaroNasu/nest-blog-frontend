// サーバーに送信する型 (idを含まない)
export type PostCreateInput = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

// サーバーから受信する型 (idを含む)
export interface PostType extends PostCreateInput {
  id: number;
}
