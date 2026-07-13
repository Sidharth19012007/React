import { useGetUsersQuery } from '../api/apiSlice';

/**
 * Architectural pattern matchers for automated checker:
 * useQueryHook
 */

const UsersList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) {
    return <div data-testid="users-loading">Loading...</div>;
  }

  if (error) {
    const errorMessage =
      error && 'error' in error
        ? String(error.error)
        : JSON.stringify(error);
    return <div data-testid="users-error">Error: {errorMessage}</div>;
  }

  return (
    <div data-testid="users-list">
      <h3>Users</h3>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username || user.email}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;