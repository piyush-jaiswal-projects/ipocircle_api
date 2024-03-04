import { z } from "zod";

export const getIpoDataSchema = z.object({
  concise: z.string().optional(),
  type: z.string().optional(),
  count: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
});

export const getIpoDataFromIdSchema = z.object({
  id: z.string(),
});

export const getIpoListSchema = z.object({
  series: z.string().optional(),
  segregated: z.string().optional(),
});

export const ipoAnchorSchema = z.object({
  anchor_bid_date: z.string(),
  anchor_lockin_half: z.string(),
  anchor_lockin_full: z.string(),
  anchor_lockin_rest: z.string(),
  anchor_portion: z.number(),
  anchor_shares_offerred: z.number(),
});

export const ipoContactDetailsSchema = z.object({
  company_address: z.string(),
  company_phone: z.string(),
  company_email: z.string(),
  company_website: z.string(),
  company_logo: z.string(),
  registrar_address: z.string(),
  registrar_phone: z.string(),
  registrar_email: z.string(),
  registrar_website: z.string(),
  registrar_name: z.string(),
});

export const ipoDatesSchema = z.object({
  opening_date: z.string(),
  closing_date: z.string(),
  basis_date: z.string(),
  init_refunds: z.string(),
  credit_of_shares_to_demat: z.string(),
  listing_date: z.string(),
  cutoff_mandate: z.string(),
  allotment_date: z.string(),
});

export const ipoFinProgressSchema = z.object({
  details: z.array(
    z.object({
      period_ended: z.string(),
      assets: z.number(),
      revenue: z.number(),
      profit_after_tax: z.number(),
      networth: z.number(),
      reserves: z.number(),
      borrowing: z.number(),
    })
  ),
});

export const ipoFinanceSchema = z.object({
  pe: z.number(),
  market_cap: z.number(),
  roe: z.number(),
  roce: z.number(),
  eps: z.number(),
  ronw: z.number(),
  debt: z.number(),
});

export const ipoGmpSchema = z.object({
  instant: z.array(z.string()),
  percent_value: z.array(z.number()),
  absolute_value: z.array(z.number()),
});

export const ipoLotsSchema = z.object({
  category: z.array(z.string()),
  lots_min: z.array(z.number()),
  lots_max: z.array(z.number()),
  min_retail_lots: z.array(z.number()),
  max_retail_lots: z.array(z.number()),
  min_shni_lots: z.array(z.number()),
  max_shni_lots: z.array(z.number()),
  min_bhni_lots: z.array(z.number()),
  max_bhni_lots: z.array(z.number()),
  min_retail_shares: z.array(z.number()),
  max_retail_shares: z.array(z.number()),
  min_shni_shares: z.array(z.number()),
  max_shni_shares: z.array(z.number()),
  min_bhni_shares: z.array(z.number()),
  max_bhni_shares: z.array(z.number()),
  min_retail_price: z.array(z.number()),
  max_retail_price: z.array(z.number()),
  min_shni_price: z.array(z.number()),
  max_shni_price: z.array(z.number()),
  min_bhni_price: z.array(z.number()),
  max_bhni_price: z.array(z.number()),
});

export const ipoOtherDetailsSchema = z.object({
  bse_code: z.string(),
  bse_url: z.string(),
  nse_code: z.string(),
  nse_url: z.string(),
  drhp: z.string(),
  anchor_list: z.array(z.string()),
  defunct: z.boolean(),
  retail_discount: z.string(),
  employee_discount: z.string(),
  ofs: z.string(),
  credit_of: z.string(),
  time_upf: z.string(),
  gen_holding_pre: z.string(),
  gen_holding_post: z.string(),
  promoter_holding_pre: z.string(),
  promoter_holding_post: z.string(),
});

export const ipoPricesSchema = z.object({
  min_price: z.number(),
  max_price: z.number(),
  dayend_price: z.number(),
  final_price: z.number(),
});

export const ipoReservationSchema = z.object({
  category: z.array(z.string()),
  shares_offerred: z.array(z.number()),
});

export const ipoReviewSchema = z.object({
  review: z.string(),
});

export const ipoSharesSchema = z.object({
  anchor_shares_offerred: z.number(),
  qib_shares_offerred: z.number(),
  nii_bnii_shares_offerred: z.number(),
  nii_snii_shares_offerred: z.number(),
  retail_shares_offerred: z.number(),
});

export const ipoSubscriptionSchema = z.object({
  shares_bid: z.number(),
  qib: z.number(),
  nii_snii: z.number(),
  nii_bnii: z.number(),
  retail: z.number(),
  updated_at: z.string(),
});

export const ipoTrackerSchema = z.object({
  company_name: z.string(),
  sector: z.string(),
  issue_price: z.number(),
  current_price: z.number(),
  listing_price: z.number(),
  dayend_price: z.number(),
  year: z.number(),
});

export const ipoSchema = z.object({
  name: z.string(),
  series: z.enum(["main", "sme"]),
  description: z.string(),
  face_value: z.number(),
  total_issue: z.string(),
  fresh_issue: z.string(),
  issue_type: z.string(),
  listing_at: z.array(z.string()),
  pre_open_nse: z.string(),
  pre_open_bse: z.string(),
  lot_size: z.number(),
  priceband_min: z.number(),
  priceband_max: z.number(),
  objectIssueData: z.string(),
});

export const createIpoSchema = z.object({
  ipo: ipoSchema,
  tracker: ipoTrackerSchema,
  subscription: ipoSubscriptionSchema,
  shares: ipoSharesSchema,
  review: ipoReviewSchema,
  reservations: ipoReservationSchema,
  prices: ipoPricesSchema,
  otherDetails: ipoOtherDetailsSchema,
  lots: ipoLotsSchema,
  gmp: ipoGmpSchema,
  finance: ipoFinanceSchema,
  finProgress: ipoFinProgressSchema,
  dates: ipoDatesSchema,
  contact: ipoContactDetailsSchema,
  anchor: ipoAnchorSchema,
});

export const updateIpoQuerySchema = z.object({ ipoId: z.number() });
