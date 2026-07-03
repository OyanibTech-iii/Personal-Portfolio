import { Flat } from '@alptugidin/react-circular-progress-bar';

interface ProgressBarCircleProps {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  label: string;
  min: number;
  max: number;
  value: number;
}

const sizeMap = {
  xxs: 60,
  xs: 80,
  sm: 100,
  md: 120,
  lg: 150,
};

export const ProgressBarCircle = ({ size, label, min, max, value }: ProgressBarCircleProps) => {
  const dimension = sizeMap[size];
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ width: dimension, height: dimension }}>
        <Flat
          progress={value}
          range={{ from: min, to: max }}
          sign={{ value: '%', position: 'end' }}
          showValue={true}
          sx={{
            strokeColor: '#737373',
            bgStrokeColor: 'rgba(0,0,0,0.05)',
            barWidth: 8,
            shape: 'full',
            strokeLinecap: 'round',
            valueSize: dimension / 4.5,
            valueWeight: '700',
            textColor: 'currentColor',
            loadingTime: 1000,
            valueAnimation: true,
            intersectionEnabled: true
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-center leading-tight max-w-[80px]">
          {label}
        </span>
        <span className="text-xs font-bold text-shamrock-600 dark:text-shamrock-400">
          {value}%
        </span>
      </div>
    </div>
  );
};
