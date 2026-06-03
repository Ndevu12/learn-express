interface StepNavProps {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

export function StepNav({
  current,
  total,
  onPrevious,
  onNext,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}: StepNavProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className="step-nav">
      <button type="button" className="btn btn-secondary" disabled={isFirst} onClick={onPrevious}>
        {previousLabel}
      </button>
      <span className="step-nav-counter">
        {current + 1} / {total}
      </span>
      <button type="button" className="btn btn-secondary" disabled={isLast} onClick={onNext}>
        {nextLabel}
      </button>
    </div>
  );
}
