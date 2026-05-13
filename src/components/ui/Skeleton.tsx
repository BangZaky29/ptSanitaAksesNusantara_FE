import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "bg-slate-200 animate-pulse";
  
  const variantClasses = {
    rect: "rounded-sm",
    circle: "rounded-full",
    text: "rounded-sm h-4 w-full"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  </div>
);
