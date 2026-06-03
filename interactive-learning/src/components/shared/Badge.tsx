import React from 'react';

interface BadgeProps {
  label: string;
  color?: 'blue' | 'slate' | 'green' | 'red';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'blue', size = 'md' }) => {
  const colorMap = {
    blue: 'badge-blue',
    slate: 'badge-slate',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800'
  };

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return <span className={`badge ${colorMap[color]} ${sizeClass}`}>{label}</span>;
};
