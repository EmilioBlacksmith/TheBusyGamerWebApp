export default function formatHours(hours: number): number | string {
  const integerPart = Math.floor(hours);
  const decimalPart = +(hours - integerPart).toFixed(2);

  if (decimalPart === 0.25) {
    return `${integerPart}\u00BC`; // 1/4 fraction
  } else if (decimalPart === 0.5) {
    return `${integerPart}\u00BD`; // 1/2 fraction
  } else if (decimalPart === 0.75) {
    return `${integerPart}\u00BE`; // 3/4 fraction
  }
  return Number.isInteger(hours) ? integerPart : hours;
}
