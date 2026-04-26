import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
  flat?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'CircleAlert', flat = false, size = 24, className = '', style, ...props }) => {
  const IconComponent = (LucideIcons as Record<string, React.FC<LucideProps>>)[name];
  const Resolved = IconComponent
    || (LucideIcons as Record<string, React.FC<LucideProps>>)[fallback];

  if (!Resolved) {
    return <span className="text-xs text-gray-400">[icon]</span>;
  }

  // Плоский режим — оригинальная иконка без обёртки (для меню)
  if (flat) {
    return <Resolved size={size} className={className} style={style} {...props} />;
  }

  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 24;
  const wrapperSize = Math.round(numericSize * 1.6);
  const innerSize = Math.round(numericSize * 0.85);

  return (
    <span
      className={`icon-3d ${className}`}
      style={{
        width: wrapperSize,
        height: wrapperSize,
        ...style,
      }}
    >
      <span className="icon-3d__shadow" />
      <span className="icon-3d__plate">
        <span className="icon-3d__rim" />
        <span className="icon-3d__highlight" />
        <Resolved
          size={innerSize}
          className="icon-3d__svg"
          strokeWidth={2.4}
          {...props}
        />
        <span className="icon-3d__gloss" />
      </span>
    </span>
  );
};

export default Icon;
