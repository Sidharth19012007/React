import React from 'react';
import { useGetPostsQuery } from '../api/apiSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy } from '../store/slices/filtersSlice';

interface PostItem {
  id: string | number;
  title: string;
  content?: string;
}

export default function PostsWithFilters() {
  const dispatch = useAppDispatch();
  
  // Safely fallback to either state location to avoid runtime errors
  const { sortBy } = useAppSelector((state) => state.filters || state.filter || { sortBy: 'title' });
  const { data, isLoading } = useGetPostsQuery();

  const safePosts = (data as PostItem[]) || [];

  const sortedPosts = [...safePosts].sort((a: PostItem, b: PostItem) => {
    if (sortBy === 'title') {
      return String(a.title || '').localeCompare(String(b.title || ''));
    }
    const idA = String(a.id || '');
    const idB = String(b.id || '');
    return idA.localeCompare(idB, undefined, { numeric: true });
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="filter-controls">
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'id'))}
        >
          <option value="title">Sort by Title</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>

      <ul data-testid="posts-with-filters">
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> {post.content ? `- ${post.content}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}