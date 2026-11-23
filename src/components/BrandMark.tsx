interface BrandMarkProps {
  src: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Small logo on a light chip, so dark logos stay visible in dark mode.
 * Decorative only: the brand name is always present in nearby text.
 */
export const BrandMark = ({ src, size = 'md', className = '' }: BrandMarkProps) => (
  <span className={`brand-mark brand-mark--${size} ${className}`.trim()} aria-hidden="true">
    <img src={src} alt="" loading="lazy" />
  </span>
);
