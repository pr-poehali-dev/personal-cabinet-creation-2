import Icon from "@/components/ui/icon";

interface Props {
  title: string;
  total: number;
  paid: number;
  currency?: string;
}

const fmt = (n: number) => n.toLocaleString("ru-RU");

export default function PaymentLeftWidget({
  title,
  total,
  paid,
  currency = "₽",
}: Props) {
  const left = Math.max(0, total - paid);
  const percent = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <div className="w-6 h-6 rounded flex items-center justify-center bg-emerald-50">
          <Icon name="Wallet" size={14} flat className="text-emerald-600" />
        </div>
        <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
          {title}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-sam-text-soft text-[11px]">Осталось внести</div>
        <div className="font-inter text-sam-text text-2xl font-extrabold leading-none mt-1">
          {fmt(left)} {currency}
        </div>
        <div className="text-sam-text-soft text-[11px] mt-2">
          из {fmt(total)} {currency}
        </div>

        <div className="mt-3 h-2.5 bg-sam-pill rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[10px]">
          <span className="text-emerald-600 font-bold">
            Оплачено {percent}%
          </span>
          <span className="text-sam-text-soft">
            {fmt(paid)} {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
