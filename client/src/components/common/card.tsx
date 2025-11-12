import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  actions,
  hover = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${
        hover ? 'hover:shadow-xl transition-shadow' : ''
      } ${className}`}
    >
      {(title || subtitle || actions) && (
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className={title || subtitle || actions ? 'p-6' : ''}>{children}</div>
    </div>
  );
};