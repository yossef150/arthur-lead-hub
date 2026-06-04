// Mock data for the Artur Lead Hub prototype
export type LeadStatus = "New" | "Under Review" | "Valid" | "Invalid" | "Needs Follow-up" | "Bad Data";
export type LeadType = "Buyer" | "Seller" | "Investor" | "Renter";
export type ValidationStatus = "Qualified" | "Unqualified" | "Needs Review";
export type AppointmentStatus = "Confirmed" | "Pending Confirmation" | "Rescheduled" | "Canceled" | "No-show" | "Completed";

export interface Agent {
  id: string;
  name: string;
  initials: string;
  leadsSubmitted: number;
  validLeads: number;
  calls: number;
  conversionRate: number;
  workedHours: number;
  hourlyRate: number;
  bonus: number;
  deductions: number;
  performanceScore: number;
  talkTime: string;
}

export interface Lead {
  id: string;
  customer: string;
  phone: string;
  address: string;
  type: LeadType;
  agentId: string;
  agentName: string;
  status: LeadStatus;
  validation: ValidationStatus;
  confidence: number;
  appointmentDate?: string;
  updated: string;
  propertyInterest: string;
  budget: string;
  area: string;
  timeline: string;
  financing: string;
  motivation: "Low" | "Medium" | "High";
  appointmentType: string;
  agentNotes: string;
  aiNotes: string;
  callSummary: string;
  coaching: string;
  issues: string[];
  recommendation: string;
}

export interface Appointment {
  id: string;
  customer: string;
  phone: string;
  address: string;
  type: LeadType;
  propertyInterest: string;
  budget: string;
  location: string;
  timeline: string;
  financing: string;
  appointmentType: string;
  date: string;
  agentName: string;
  status: AppointmentStatus;
  notes: string;
}

export interface CoachingNote {
  id: string;
  agentName: string;
  coachName: string;
  related: string;
  date: string;
  category: "Pitch" | "Discovery" | "Objection" | "Closing";
  strengths: string;
  improve: string;
  script: string;
  shared: boolean;
}

export const agents: Agent[] = [
  { id: "a1", name: "Ryan Mitchell", initials: "RM", leadsSubmitted: 14, validLeads: 9, calls: 312, conversionRate: 64, workedHours: 38, hourlyRate: 18, bonus: 220, deductions: 0, performanceScore: 88, talkTime: "6h 42m" },
  { id: "a2", name: "Sofia Alvarez", initials: "SA", leadsSubmitted: 17, validLeads: 12, calls: 358, conversionRate: 71, workedHours: 40, hourlyRate: 20, bonus: 340, deductions: 0, performanceScore: 92, talkTime: "7h 18m" },
  { id: "a3", name: "Marcus Bell", initials: "MB", leadsSubmitted: 9, validLeads: 4, calls: 241, conversionRate: 44, workedHours: 32, hourlyRate: 17, bonus: 80, deductions: 25, performanceScore: 61, talkTime: "4h 51m" },
  { id: "a4", name: "Priya Shah", initials: "PS", leadsSubmitted: 12, validLeads: 8, calls: 289, conversionRate: 67, workedHours: 36, hourlyRate: 18, bonus: 180, deductions: 0, performanceScore: 81, talkTime: "5h 55m" },
  { id: "a5", name: "Devon Carter", initials: "DC", leadsSubmitted: 11, validLeads: 6, calls: 264, conversionRate: 55, workedHours: 34, hourlyRate: 17, bonus: 120, deductions: 10, performanceScore: 72, talkTime: "5h 20m" },
];

export const leads: Lead[] = [
  {
    id: "L-1042", customer: "Eleanor Hayes", phone: "(415) 555-0188", address: "248 Pine Crest Ave, Austin, TX",
    type: "Buyer", agentId: "a2", agentName: "Sofia Alvarez", status: "Valid", validation: "Qualified", confidence: 94,
    appointmentDate: "Jun 6, 2026 · 2:00 PM", updated: "2 hours ago",
    propertyInterest: "3BR single-family home with home office",
    budget: "$520K – $580K", area: "South Austin / Travis Heights", timeline: "Closing in 45–60 days",
    financing: "Pre-approved by Chase, 20% down", motivation: "High", appointmentType: "In-person showing",
    agentNotes: "Eleanor relocating from Denver for a remote job. Has a 4 yr old, wants good schools. Very motivated.",
    aiNotes: "Strong qualification signals: confirmed budget, timeline, pre-approval, and motivation. Ready for showing.",
    callSummary: "12 min call. Discovery complete. Set in-person showing.",
    coaching: "Great discovery flow — budget and timeline confirmed in the first 4 minutes.",
    issues: [],
    recommendation: "Proceed to appointment. Send 3 matching listings 24h before showing.",
  },
  {
    id: "L-1041", customer: "Jordan Park", phone: "(512) 555-0142", address: "1102 Cedar Hollow, Round Rock, TX",
    type: "Seller", agentId: "a1", agentName: "Ryan Mitchell", status: "Under Review", validation: "Needs Review", confidence: 68,
    updated: "4 hours ago", propertyInterest: "Listing 4BR home, looking for valuation",
    budget: "Asking $640K (flexible)", area: "Round Rock", timeline: "Wants to list within 30 days",
    financing: "N/A (seller)", motivation: "Medium", appointmentType: "Home valuation visit",
    agentNotes: "Jordan is comparing 2 other agents. Mentioned commission is a sticking point.",
    aiNotes: "Timeline and motivation confirmed, but agent did not address commission objection or capture comparable property data.",
    callSummary: "8 min call. Surface-level discovery. No close.",
    coaching: "Address commission objection head-on with value framing. Capture comp data on first call.",
    issues: ["Commission objection not addressed", "Missing comp data"],
    recommendation: "Agent follow-up call to handle objection and lock in valuation visit.",
  },
  {
    id: "L-1040", customer: "Maya Robinson", phone: "(737) 555-0119", address: "55 Lakeway Dr, Lakeway, TX",
    type: "Investor", agentId: "a2", agentName: "Sofia Alvarez", status: "Valid", validation: "Qualified", confidence: 91,
    appointmentDate: "Jun 5, 2026 · 10:30 AM", updated: "Yesterday",
    propertyInterest: "Multi-family duplex or small triplex", budget: "$700K – $900K cash",
    area: "Lakeway / Bee Cave", timeline: "Ready to close in 30 days",
    financing: "All cash, proof of funds on file", motivation: "High", appointmentType: "Portfolio walk-through",
    agentNotes: "Owns 4 SFR rentals. Looking to expand into multi-family for the first time.",
    aiNotes: "Investor profile fully qualified. Cash buyer with proof of funds — fast close potential.",
    callSummary: "15 min call. Full needs analysis. Booked portfolio walk-through.",
    coaching: "Excellent qualifying questions on cash position and timeline.",
    issues: [],
    recommendation: "Prepare 5 off-market multi-family options for the walk-through.",
  },
  {
    id: "L-1039", customer: "Trevor Kim", phone: "(512) 555-0177", address: "Unknown",
    type: "Renter", agentId: "a3", agentName: "Marcus Bell", status: "Invalid", validation: "Unqualified", confidence: 38,
    updated: "Yesterday", propertyInterest: "Apartment, vague", budget: "Not stated",
    area: "Not stated", timeline: "Not stated", financing: "N/A",
    motivation: "Low", appointmentType: "—",
    agentNotes: "Caller seemed unsure, was at work.",
    aiNotes: "Lead lacks budget, area, and timeline. Motivation indicators are weak. Likely not ready.",
    callSummary: "3 min call. Did not complete discovery.",
    coaching: "Re-engage with discovery questions. Don't book until at least 3 of 4 qualifiers are confirmed.",
    issues: ["No budget", "No area", "No timeline", "Low motivation"],
    recommendation: "Move to nurture campaign. Do not mark as appointment.",
  },
  {
    id: "L-1038", customer: "Aaliyah Brooks", phone: "(469) 555-0133", address: "2310 Magnolia Way, Dallas, TX",
    type: "Buyer", agentId: "a4", agentName: "Priya Shah", status: "Needs Follow-up", validation: "Needs Review", confidence: 72,
    updated: "2 days ago", propertyInterest: "2BR condo, walkable area",
    budget: "$320K – $380K", area: "Bishop Arts / Oak Cliff", timeline: "Looking in next 90 days",
    financing: "Pre-qualified, not pre-approved", motivation: "Medium", appointmentType: "Virtual tour",
    agentNotes: "Aaliyah is a first-time buyer. Needs lender intro.",
    aiNotes: "Most qualifiers present. Financing needs to move from pre-qualified to pre-approved before showing.",
    callSummary: "10 min call. Strong discovery, needs lender intro.",
    coaching: "Always offer warm lender intro when buyer is only pre-qualified.",
    issues: ["Financing not finalized"],
    recommendation: "Schedule lender intro call this week, then book virtual tour.",
  },
  {
    id: "L-1037", customer: "Disconnected Number", phone: "(000) 000-0000", address: "—",
    type: "Buyer", agentId: "a5", agentName: "Devon Carter", status: "Bad Data", validation: "Unqualified", confidence: 5,
    updated: "2 days ago", propertyInterest: "—", budget: "—", area: "—", timeline: "—",
    financing: "—", motivation: "Low", appointmentType: "—",
    agentNotes: "Number disconnected on first dial.",
    aiNotes: "Flagged as bad data by dialer. Recommend removing from active list.",
    callSummary: "Disconnected.",
    coaching: "Data hygiene — flag bad numbers immediately to prevent wasted dials.",
    issues: ["Disconnected number"],
    recommendation: "Mark as bad data and remove from queue.",
  },
];

export const appointments: Appointment[] = [
  { id: "AP-301", customer: "Eleanor Hayes", phone: "(415) 555-0188", address: "248 Pine Crest Ave, Austin, TX", type: "Buyer", propertyInterest: "3BR home, home office", budget: "$520K – $580K", location: "South Austin", timeline: "45–60 days", financing: "Pre-approved (Chase)", appointmentType: "In-person showing", date: "Jun 6, 2026 · 2:00 PM", agentName: "Sofia Alvarez", status: "Confirmed", notes: "Send 3 matching listings 24h prior." },
  { id: "AP-300", customer: "Maya Robinson", phone: "(737) 555-0119", address: "55 Lakeway Dr, Lakeway, TX", type: "Investor", propertyInterest: "Multi-family duplex/triplex", budget: "$700K – $900K cash", location: "Lakeway / Bee Cave", timeline: "30 days", financing: "All cash", appointmentType: "Portfolio walk-through", date: "Jun 5, 2026 · 10:30 AM", agentName: "Sofia Alvarez", status: "Confirmed", notes: "Bring 5 off-market options." },
  { id: "AP-299", customer: "Marcus Levine", phone: "(512) 555-0166", address: "401 Westview Loop, Austin, TX", type: "Buyer", propertyInterest: "4BR with pool", budget: "$850K – $1M", location: "West Lake Hills", timeline: "60 days", financing: "Pre-approved", appointmentType: "In-person showing", date: "Jun 7, 2026 · 11:00 AM", agentName: "Ryan Mitchell", status: "Pending Confirmation", notes: "Confirm via SMS day before." },
  { id: "AP-298", customer: "Hannah Wells", phone: "(214) 555-0151", address: "82 Maple Court, Plano, TX", type: "Seller", propertyInterest: "3BR list & relocate", budget: "Asking $475K", location: "Plano", timeline: "30 days", financing: "N/A", appointmentType: "Home valuation visit", date: "Jun 4, 2026 · 4:00 PM", agentName: "Priya Shah", status: "Rescheduled", notes: "Moved from Jun 2." },
  { id: "AP-297", customer: "Carlos Mendez", phone: "(512) 555-0102", address: "1701 Oak Bend, Austin, TX", type: "Renter", propertyInterest: "2BR rental", budget: "$2,400/mo", location: "Mueller", timeline: "Move in 30 days", financing: "N/A", appointmentType: "Virtual tour", date: "Jun 3, 2026 · 6:30 PM", agentName: "Devon Carter", status: "Completed", notes: "Signed lease." },
  { id: "AP-296", customer: "Olivia Tran", phone: "(469) 555-0144", address: "905 Briar Hill, Frisco, TX", type: "Buyer", propertyInterest: "Starter home", budget: "$340K – $400K", location: "Frisco", timeline: "90 days", financing: "Pre-qualified", appointmentType: "In-person showing", date: "Jun 2, 2026 · 1:00 PM", agentName: "Marcus Bell", status: "No-show", notes: "Did not arrive. Follow up." },
];

export const coachingNotes: CoachingNote[] = [
  { id: "C-21", agentName: "Ryan Mitchell", coachName: "Arthur (Admin)", related: "Lead L-1041 · Jordan Park", date: "Today", category: "Objection", strengths: "Built rapport quickly and kept the conversation light.", improve: "The commission objection was deflected instead of reframed. We lost momentum to close the valuation visit.", script: "When the seller mentions commission, try: 'I hear you — most sellers feel the same until they see what a full-service listing nets after closing. Can I walk you through how we typically net 3–5% more on price?'", shared: true },
  { id: "C-20", agentName: "Marcus Bell", coachName: "Arthur (Admin)", related: "Lead L-1039 · Trevor Kim", date: "Yesterday", category: "Discovery", strengths: "Friendly opening.", improve: "No qualifiers were captured. Don't book or progress a lead without budget, area, and timeline.", script: "Try this discovery rhythm: 'To make sure I find you the right place — what's your monthly comfort range, which areas are you eyeing, and when would you ideally move in?'", shared: true },
  { id: "C-19", agentName: "Sofia Alvarez", coachName: "Arthur (Admin)", related: "Lead L-1042 · Eleanor Hayes", date: "2 days ago", category: "Closing", strengths: "Perfect qualification flow — budget, timeline, pre-approval, motivation all confirmed in first 4 minutes.", improve: "Nothing to fix. Use this call as a training example for the team.", script: "—", shared: false },
  { id: "C-18", agentName: "Priya Shah", coachName: "Arthur (Admin)", related: "Lead L-1038 · Aaliyah Brooks", date: "3 days ago", category: "Pitch", strengths: "Empathy for first-time buyer was on point.", improve: "Always offer the warm lender intro when buyer is only pre-qualified — don't leave it to chance.", script: "'Since you're early in the process, let me introduce you to our preferred lender — they'll get you fully pre-approved in 48 hours so we can move fast when the right home shows up.'", shared: true },
];

export const dataQuality = {
  totalDialed: 12480,
  badNumbers: 612,
  wrongNumbers: 388,
  disconnected: 1124,
  dnc: 247,
  duplicates: 188,
  contactAccuracy: 78,
  leadQuality: 82,
  breakdown: { good: 68, bad: 18, cleaning: 9, unknown: 5 },
};

export const callPerformance = {
  totalCalls: 1464,
  answered: 612,
  talkTime: "29h 06m",
  appointmentsBooked: 39,
  validAppointmentRate: 74,
  callsPerAppointment: 37.5,
  conversionRate: 62,
};
