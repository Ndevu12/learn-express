interface FieldBlockProps {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}

export function FieldBlock({ label, children, mono = true }: FieldBlockProps) {
  return (
    <div className="field-block">
      <p className="field-label">{label}</p>
      <div className={mono ? 'field-value field-value-mono' : 'field-value'}>{children}</div>
    </div>
  );
}
