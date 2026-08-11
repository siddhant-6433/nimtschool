/**
 * Rolling admissions deadline.
 *
 * Phase 1's last date to apply is 18 August 2026. Every 7 days the deadline
 * rolls forward by a week and the phase number increments, so the banner always
 * shows an upcoming deadline (a light-touch urgency cue) and "auto-updates"
 * without any redeploy — it's derived purely from the current date.
 */

export const ADMISSION_SESSION = "2027-28";

// Phase 1 deadline = end of 18 Aug 2026 (month is 0-indexed → 7 = August).
// Using end-of-day so the 18th itself still shows as Phase 1.
const PHASE_ONE_DEADLINE = Date.UTC(2026, 7, 18, 23, 59, 59, 999);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export interface AdmissionPhase {
  phase: number;
  /** The current last-date-to-apply. */
  deadline: Date;
  /** e.g. "18th August". */
  deadlineLabel: string;
  /** e.g. "18th August 2026". */
  deadlineLabelWithYear: string;
}

function ordinal(day: number): string {
  const rem100 = day % 100;
  if (rem100 >= 11 && rem100 <= 13) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getAdmissionPhase(now: number = Date.now()): AdmissionPhase {
  // How many whole weekly windows have elapsed since Phase 1's deadline.
  let periods = Math.ceil((now - PHASE_ONE_DEADLINE) / WEEK_MS);
  if (periods < 0) periods = 0;

  const phase = 1 + periods;
  const deadline = new Date(PHASE_ONE_DEADLINE + periods * WEEK_MS);

  // Format in UTC to stay consistent between server render and client hydration.
  const day = deadline.getUTCDate();
  const month = MONTHS[deadline.getUTCMonth()];
  const year = deadline.getUTCFullYear();
  const deadlineLabel = `${ordinal(day)} ${month}`;

  return {
    phase,
    deadline,
    deadlineLabel,
    deadlineLabelWithYear: `${deadlineLabel} ${year}`,
  };
}
