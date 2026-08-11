/**
 * UniOS CRM lead ingestion.
 *
 * Every admissions/enquiry CTA on the site funnels through `pushLeadToUniOs`
 * so leads land in the UniOS CRM with full GA4 attribution. The Supabase
 * publishable key is safe to expose in the browser (it's an anon/publishable
 * key, identical to how the boarding landing page and the old static site
 * used it). It can still be overridden per-environment via NEXT_PUBLIC_* vars.
 */

const SB_URL =
  process.env.NEXT_PUBLIC_UNIOS_URL ||
  "https://deylhigsisuexszsmypq.supabase.co";
const SB_KEY =
  process.env.NEXT_PUBLIC_UNIOS_KEY ||
  "sb_publishable_pgYgbNk-tiiQRN3Ll6wDiw_zg8zVHuO";

export interface Lead {
  /** Student / child name. */
  studentName?: string;
  /** Parent / guardian name. */
  guardianName?: string;
  /** Required — the only field the CRM strictly needs to follow up. */
  phone: string;
  email?: string;
  /** Target class / grade, e.g. "Class V" or "Grade I". */
  course?: string;
  /** Programme of interest, e.g. "Day School", "Full Boarding". */
  program?: string;
  /** Academic session, e.g. "2027-28". */
  session?: string;
  message?: string;
  /** Campus label; defaults to the Ghaziabad campus. */
  campus?: string;
  /** Which form/CTA produced this lead — used as the `?source=` tag. */
  source?: string;
}

interface Attribution {
  ga_client_id?: string;
  ga_session_id?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  origin_domain: string;
}

const ATTR_STORAGE_KEY = "nimtschool_attribution_v1";

/**
 * Harvest GA client_id + UTM/gclid so the CRM can fire `generate_lead`
 * server-side via the GA Measurement Protocol. First-touch values persist to
 * localStorage so later conversions keep the original campaign attribution.
 */
function captureAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { origin_domain: "school.nimt.ac.in" };
  }

  const readCookie = (name: string): string | undefined => {
    const parts = ("; " + document.cookie).split("; " + name + "=");
    if (parts.length < 2) return undefined;
    return (parts.pop() || "").split(";").shift() || undefined;
  };

  const parseGaClientId = (): string | undefined => {
    const raw = readCookie("_ga");
    if (!raw) return undefined;
    const p = raw.split(".");
    return p.length < 4 ? undefined : p[2] + "." + p[3];
  };

  const parseGaSessionId = (): string | undefined => {
    const raw = readCookie("_ga_FMDZW6PB7C");
    return raw ? raw.split(".")[2] : undefined;
  };

  let stored: Partial<Attribution> = {};
  try {
    stored = JSON.parse(localStorage.getItem(ATTR_STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }

  const u = new URL(window.location.href);
  const get = (k: string) => u.searchParams.get(k) || undefined;

  const fresh: Attribution = {
    ga_client_id: parseGaClientId(),
    ga_session_id: parseGaSessionId(),
    gclid: get("gclid"),
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
    landing_page:
      stored.landing_page || window.location.pathname + window.location.search,
    referrer: stored.referrer || document.referrer || undefined,
    origin_domain: "school.nimt.ac.in",
  };

  const merged = { ...fresh } as Record<string, string | undefined>;
  const storedRec = stored as Record<string, string | undefined>;
  Object.keys(fresh).forEach((k) => {
    merged[k] = merged[k] || storedRec[k];
  });

  try {
    localStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota / private-mode errors */
  }

  return merged as unknown as Attribution;
}

/**
 * Fire-and-forget POST to the UniOS lead-ingest edge function. Never throws —
 * a CRM failure must not block the user-facing success UI. Returns whether the
 * request was accepted (useful for logging/retry), defaulting to false on error.
 */
export async function pushLeadToUniOs(lead: Lead): Promise<boolean> {
  try {
    const source = encodeURIComponent(lead.source || "website");
    const res = await fetch(
      `${SB_URL}/functions/v1/lead-ingest?source=${source}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SB_KEY,
          Authorization: "Bearer " + SB_KEY,
        },
        body: JSON.stringify({
          name: lead.studentName || lead.guardianName,
          guardian_name: lead.guardianName || undefined,
          phone: lead.phone,
          email: lead.email || undefined,
          course: lead.course || undefined,
          program: lead.program || undefined,
          session: lead.session || undefined,
          campus: lead.campus || "NIMT School Ghaziabad",
          message: lead.message || undefined,
          ...captureAttribution(),
        }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}
