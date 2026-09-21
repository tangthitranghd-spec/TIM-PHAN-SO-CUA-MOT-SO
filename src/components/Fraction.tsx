import React from 'react';

interface FractionProps {
  numerator: number | string;
  denominator: number | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Fraction: React.FC<FractionProps> = ({
  numerator,
  denominator,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'text-sm inline-flex flex-col items-center justify-center align-middle mx-1 font-bold',
      bar: 'w-full border-b-[1.5px] border-current my-[1px]',
      text: 'leading-none px-0.5'
    },
    md: {
      container: 'text-base inline-flex flex-col items-center justify-center align-middle mx-1.5 font-bold',
      bar: 'w-full border-b-2 border-current my-0.5',
      text: 'leading-none px-1'
    },
    lg: {
      container: 'text-xl inline-flex flex-col items-center justify-center align-middle mx-2 font-black',
      bar: 'w-full border-b-[2.5px] border-current my-0.5',
      text: 'leading-none px-1'
    },
    xl: {
      container: 'text-2xl sm:text-3xl inline-flex flex-col items-center justify-center align-middle mx-2 font-black',
      bar: 'w-full border-b-[3px] border-current my-1',
      text: 'leading-none px-1.5'
    }
  }[size];

  return (
    <span className={`${sizeClasses.container} ${className}`} aria-label={`${numerator} phần ${denominator}`}>
      <span className={sizeClasses.text}>{numerator}</span>
      <span className={sizeClasses.bar}></span>
      <span className={sizeClasses.text}>{denominator}</span>
    </span>
  );
};

// Component to parse and render text with fractions like "2/3" or "3/5" beautifully
export const FormattedMathText: React.FC<{ text: string; fractionSize?: 'sm' | 'md' | 'lg' }> = ({
  text,
  fractionSize = 'md'
}) => {
  // Regex to detect simple fractions like 1/2, 2/3, 5/8, 60 000, etc.
  const parts = text.split(/(\d+\/\d+)/g);

  return (
    <span>
      {parts.map((part, index) => {
        const fractionMatch = part.match(/^(\d+)\/(\d+)$/);
        if (fractionMatch) {
          return (
            <Fraction
              key={index}
              numerator={fractionMatch[1]}
              denominator={fractionMatch[2]}
              size={fractionSize}
              className="text-amber-700"
            />
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
