import { ArrowDownRight, Check, CircleDot, type LucideIcon } from "lucide-react";

type Metric = { label: string; value: string; icon: LucideIcon };

export function ServiceVisual({
  icon: Icon,
  label,
  metrics,
  variant,
}: {
  icon: LucideIcon;
  label: string;
  metrics: Metric[];
  variant: string;
}) {
  return (
    <div
      aria-label={label}
      className={`service-visual service-visual-${variant}`}
      role="img"
    >
      <div aria-hidden="true" className="service-visual-grid" />
      <div className="service-visual-orbit service-visual-orbit-one" />
      <div className="service-visual-orbit service-visual-orbit-two" />
      <div className="service-visual-window">
        <div className="service-visual-window-top">
          <span className="service-window-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="service-window-label">TECHYPRAXIS / {variant}</span>
          <CircleDot size={15} aria-hidden="true" />
        </div>
        <div className="service-visual-window-content">
          <div className="service-visual-icon">
            <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div className="service-visual-heading">
            <span />
            <span />
          </div>
          <div className="service-visual-highlight">
            <Check size={14} aria-hidden="true" />
            <span>{label}</span>
          </div>
          <div className="service-visual-metrics">
            {metrics.map((metric) => (
              <div className="service-visual-metric" key={metric.label}>
                <metric.icon size={15} aria-hidden="true" />
                <span>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span aria-hidden="true" className="service-visual-float service-float-top">
        <Check size={15} />
      </span>
      <span aria-hidden="true" className="service-visual-float service-float-bottom">
        <ArrowDownRight size={16} />
      </span>
    </div>
  );
}
