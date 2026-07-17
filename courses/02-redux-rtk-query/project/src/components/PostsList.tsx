import { useGetPostsQuery } from '../api/apiSlice';

const PostsList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div data-testid="posts-loading">Loading...</div>;
  }

  if (error) {
    const errorMessage =
      error && 'error' in error
        ? String(error.error)
        : JSON.stringify(error);
    return <div data-testid="posts-error">Error: {errorMessage}</div>;
  }

  return (
    <div data-testid="posts-list">
      <h3>Posts</h3>
      {posts?.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;