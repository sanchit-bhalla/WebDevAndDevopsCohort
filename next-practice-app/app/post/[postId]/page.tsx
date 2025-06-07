import axios from "axios";

interface PropsType {
  params: Promise<{ postId: string }>;
}

export default async function BlogPost({ params }: PropsType) {
  const { postId } = await params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return (
    <div className="border border-slate-50 rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">{response.data.title}</h2>
      <p>{response.data.body}</p>
    </div>
  );
}
