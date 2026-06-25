import type { ReactNode } from "react";

type PageHeaderProps = {
  greeting?: ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  actions?: ReactNode;
};

export default function PageHeader({
  greeting,
  title,
  subtitle,
  titleClassName,
  actions,
}: PageHeaderProps) {
  const defaultTitleClass =
    "text-[28px] lg:text-[38px] font-extrabold leading-[1.02] tracking-[-1px] text-[var(--t1)]";

  return (
    <div className="mb-8 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {greeting && (
          <div className="mb-1 text-[32px] font-extrabold leading-[1.05] tracking-[-0.8px] text-[var(--t1)]">
            {greeting}
          </div>
        )}
        {title && (
          <div className={titleClassName || defaultTitleClass}>{title}</div>
        )}
        {subtitle && (
          <div className="mt-[10px] text-[19px] font-normal leading-[1.4] text-[var(--t2)]">
            {subtitle}
          </div>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
