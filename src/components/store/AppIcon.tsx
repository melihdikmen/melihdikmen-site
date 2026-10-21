/** "MD" monogramlı uygulama ikonu: mavi-mor gradyan squircle. */
export function AppIcon({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`app-icon ${className}`}
      style={{ background: "linear-gradient(145deg, #5ac8fa 0%, #0a84ff 45%, #5e5ce6 100%)" }}
    >
      MD
    </span>
  );
}
