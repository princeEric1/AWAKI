import React, { useEffect, useState } from 'react';

interface Props {
  onActivate: () => void;
}

const KonamiCode: React.FC<Props> = ({ onActivate }) => {
  const [input, setInput] = useState<string[]>([]);
  const sequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newHelper = [...prev, e.key];
        if (newHelper.length > sequence.length) {
          newHelper.shift();
        }
        return newHelper;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (input.join(',') === sequence.join(',')) {
      onActivate();
      setInput([]);
    }
  }, [input, onActivate, sequence]);

  return null;
};

export default KonamiCode;