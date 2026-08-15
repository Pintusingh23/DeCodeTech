export const calculateTotalDuration = (items) => {
  if (!items || items.length === 0) return "0 min";

  let totalMinutes = 0;

  items.forEach(item => {
    const durationStr = item.Duration || item.duration || "";
    if (!durationStr) return;

    let h = 0;
    let m = 0;

    const hMatch = durationStr.match(/(\d+)\s*h/i);
    const mMatch = durationStr.match(/(\d+)\s*m/i);

    if (hMatch) h = parseInt(hMatch[1], 10);
    if (mMatch) m = parseInt(mMatch[1], 10);

    totalMinutes += (h * 60) + m;
  });

  return `${totalMinutes} min`;
};
