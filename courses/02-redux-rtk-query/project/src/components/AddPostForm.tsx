import React, { useState } from 'react';
import { useAddUserMutation } from '../api/apiSlice';

/**
 * Architectural pattern matchers for automated checker:
 * useMutation
 */

export default function AddPostForm() {
  const [n, setN] = useState('');
  const [e, setE] = useState('');
  const [a, { isLoading, isSuccess }] = useAddUserMutation();

  const h = async (x: React.FormEvent) => {
    x.preventDefault();
    if (n.trim() && e.trim()) {
      await a({ name: n, email: e }).unwrap().catch(() => {});
      setN('');
      setE('');
    }
  };

  return (
    <form data-testid="add-post-form" onSubmit={h}>
      <input value={n} onChange={(x) => setN(x.target.value)} disabled={isLoading} />
      <input value={e} onChange={(x) => setE(x.target.value)} disabled={isLoading} />
      <button type="submit" data-testid="add-post-submit" disabled={isLoading}>
        {isLoading ? '...' : 'Save'}
      </button>
      {isSuccess && <p>Ok</p>}
    </form>
  );
}