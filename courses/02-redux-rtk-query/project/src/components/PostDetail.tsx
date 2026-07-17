import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../api/apiSlice";

type Props = {
  postId?: number;
};

export default function PostDetail({ postId }: Props) {
  const { postId: routePostId } = useParams();

  const id =
    postId ??
    (routePostId ? Number(routePostId) : undefined);

  const { data, isLoading, isError } = useGetPostByIdQuery(id as number, {
    skip: !id,
  });

  if (isLoading) {
    return <div data-testid="post-detail-loading">Loading...</div>;
  }

  if (isError) {
    return <div data-testid="post-detail-error">Failed to load post.</div>;
  }

  if (!data) {
    return <div>No post found.</div>;
  }

  return (
    <div data-testid="post-detail">
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}