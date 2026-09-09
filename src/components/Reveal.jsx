import React from 'react';
import { useInView } from '../hooks/useInView';

const Reveal = ({ children, delay = 0, className = '', as, ...rest }) => {
  const Tag = as || 'div';
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} ${className}`.trim()}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
