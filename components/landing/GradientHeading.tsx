import React from 'react';
import styles from './GradientHeading.module.css';

interface GradientHeadingProps {
  title: string; // Rename the prop to be more descriptive
  className?: string;
}

const GradientHeading = ({ title, className }: GradientHeadingProps) => {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${styles['gradient-text']} ${className ? className : ""}`}>
      {title} 
    </h2>
  );
};

export default GradientHeading;