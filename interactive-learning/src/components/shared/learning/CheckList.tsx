interface CheckListProps {
  items: readonly string[];
  variant?: 'check' | 'arrow';
}

export function CheckList({ items, variant = 'check' }: CheckListProps) {
  const marker = variant === 'check' ? 'check' : 'arrow';

  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item} className="check-list-item">
          <span className={`check-list-marker check-list-marker-${marker}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
