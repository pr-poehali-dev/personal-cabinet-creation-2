import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
  flat?: boolean;
  variant?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gold' | 'teal';
}

// Семантическое распределение цветов 3D-иконок по смыслу
const variantByName: Record<string, IconProps['variant']> = {
  // Деньги / финансы / рост — зелёный
  Wallet: 'green', CircleDollarSign: 'green', TrendingUp: 'green', CreditCard: 'green',
  Percent: 'green', ArrowDownLeft: 'green', Handshake: 'green', BarChart3: 'green',
  Target: 'green', Coins: 'green', Banknote: 'green', CheckCircle: 'green', Check: 'green',

  // Стройка / срочное / время — оранжевый
  AlertTriangle: 'orange', Clock: 'orange', Timer: 'orange', HardHat: 'orange',
  Bell: 'orange', Flame: 'orange', Hammer: 'orange', Shovel: 'orange',
  Wrench: 'orange', PencilRuler: 'orange', PackagePlus: 'orange', Truck: 'orange',
  Warehouse: 'orange', Package: 'orange',

  // Аналитика / документы — фиолетовый
  BarChart: 'purple', LineChart: 'purple', PieChart: 'purple', Brain: 'purple',
  FolderOpen: 'purple', FileText: 'purple', BookOpen: 'purple', FileSpreadsheet: 'purple',
  FileCode: 'purple', FileSignature: 'purple', FileCheck: 'purple', FileImage: 'purple',
  ClipboardList: 'purple', ClipboardCheck: 'purple', CheckSquare: 'purple',

  // Опасность / удалить / расходы — красный
  Trash2: 'red', AlertCircle: 'red', ArrowUpRight: 'red', TrendingDown: 'red',
  EyeOff: 'red',

  // Защита / ключи / награды — золотой
  ShieldCheck: 'gold', Shield: 'gold', KeyRound: 'gold', Key: 'gold',
  Award: 'gold', Star: 'gold', Crown: 'gold',

  // Связь / сообщения / медиа — бирюзовый
  MessageCircle: 'teal', MessageSquare: 'teal', Phone: 'teal', Mail: 'teal',
  Send: 'teal', Camera: 'teal', Video: 'teal', UserPlus: 'teal', Contact: 'teal',
  User: 'teal', Users: 'teal',

  // Юриспруденция, баланс — золотой/фиолетовый
  Scale: 'gold',
};

const Icon: React.FC<IconProps> = ({
  name,
  fallback = 'CircleAlert',
  flat = false,
  variant,
  size = 24,
  className = '',
  style,
  ...props
}) => {
  const IconComponent = (LucideIcons as Record<string, React.FC<LucideProps>>)[name];
  const Resolved = IconComponent
    || (LucideIcons as Record<string, React.FC<LucideProps>>)[fallback];

  if (!Resolved) {
    return <span className="text-xs text-gray-400">[icon]</span>;
  }

  if (flat) {
    return <Resolved size={size} className={className} style={style} {...props} />;
  }

  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 24;
  const wrapperSize = Math.round(numericSize * 1.6);
  const innerSize = Math.round(numericSize * 0.85);
  const finalVariant = variant || variantByName[name] || 'blue';

  return (
    <span
      className={`icon-3d icon-3d--${finalVariant} ${className}`}
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