import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="learning-section">
      <header className="learning-section-header">
        <h2 className="learning-section-title">{title}</h2>
        {description && <p className="learning-section-desc">{description}</p>}
      </header>
      <div className="learning-section-body">{children}</div>
    </section>
  );
}
