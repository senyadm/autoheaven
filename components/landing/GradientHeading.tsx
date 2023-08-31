import React from 'react';
import styles from './GradientHeading.module.css';

interface GradientHeadingProps {
  title: string; // Rename the prop to be more descriptive
}

const GradientHeading = ({ title }: GradientHeadingProps) => {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${styles['gradient-text']}`}>
      {title} 
    </h2>
  );
};

export default GradientHeading;