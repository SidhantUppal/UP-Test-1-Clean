import { useEffect, useState } from 'react';

export function ActivityMatrix() {
  const [cells, setCells] = useState<boolean[]>(Array(60).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(prev => {
        const newCells = [...prev];
        // Randomly activate/deactivate cells
        for (let i = 0; i < 5; i++) {
          const index = Math.floor(Math.random() * 60);
          newCells[index] = Math.random() > 0.5;
        }
        return newCells;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loci-activity-matrix">
      {cells.map((active, i) => (
        <div
          key={i}
          className={`loci-activity-cell ${active ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}