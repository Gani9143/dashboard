'use client';
import { useState } from 'react';

export default function FilterPanel() {
  const [category, setCategory] = useState<string>('all');
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="alpha">alpha</option>
        <option value="beta">beta</option>
        <option value="gamma">gamma</option>
        <option value="delta">delta</option>
      </select>
    </div>
  );
}

