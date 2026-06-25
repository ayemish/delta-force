type SparklineProps = {
  values: number[];
  color: string;
  width?: number;
  height?: number;
};

export default function Sparkline({ values, color, width = 120, height = 32 }: SparklineProps) {
  const max = Math.max(...values);
  const min = 0;
  const range = max - min || 1;
  const lastIndex = values.length - 1;
  const points = values
    .map((v, i) => {
      const x = (i / lastIndex) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const lastX = width;
  const lastY = height - ((values[values.length - 1] - min) / range) * (height - 4) - 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX.toFixed(1)} cy={lastY.toFixed(1)} r={2.6} fill={color} />
    </svg>
  );
}
