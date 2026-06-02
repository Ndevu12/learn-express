import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`${hover ? 'card-hover' : 'card'} ${className}`}>
      {children}
    </div>
  );
};

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: string;
}

export const Section: React.FC<SectionProps> = ({ title, description, children, icon }) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {icon && <span className="text-3xl">{icon}</span>}
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        {description && <p className="text-slate-600">{description}</p>}
      </div>
      {children}
    </div>
  );
};
