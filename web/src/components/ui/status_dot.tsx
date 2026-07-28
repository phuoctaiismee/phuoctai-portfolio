type StatusDotProps = {
  active?: boolean
}

export default function StatusDot({ active = true }: StatusDotProps) {
  if (!active) {
    return (
      <span className="relative flex h-3.5 w-3.5">
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-neutral-500"></span>
      </span>
    )
  }
  return (
    <span className="relative flex h-3.5 w-3.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
    </span>
  )
}

