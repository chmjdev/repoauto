---
name: spending-report
description: Scans recent email invoices and payment confirmations, extracts every amount mentioned, converts any foreign currency to South African rand, and totals a running spend figure with a monthly view, EXCLUDING payees the user has marked as not owed (currently: Sido).
say: spending report · running balance · monthly budget report · how much have I spent · update the budget
---

1. Call check_email with a query covering the period requested (default newer_than:30d) to pull invoices, payment confirmations, and order receipts — look for senders like Payfast, GoDaddy, cloud.co.za, hosting providers, subscriptions, and any message with "invoice", "payment", "order", "paid", "receipt" in the subject.
2. For each matching message, read_email if the amount is not visible in the subject/snippet, and extract the amount and currency mentioned (e.g. "R 329.33", "$49.00", "USD 12.00").
3. For every amount not already in ZAR, call convert_currency to convert it to ZAR (rand) at the live rate.
4. EXCLUSIONS — the user has named payees he does NOT owe and does not recognise. Do not count them, ever: "Sido" is on the exclusion list. Skip any invoice or payment from an excluded payee and note it as excluded rather than counted.
5. Sum all remaining amounts (converted) into one running total in rand.
6. Present a report: total spent in rand for the period, a breakdown line per invoice/payment (source, original amount and currency, converted rand amount, date), and call out the single largest expense. List excluded payees separately, clearly marked as NOT counted.
7. Put the full breakdown on the reel with show_visual kind text, title "Spending Report", and speak only the one-line total and the largest item — never read the whole breakdown aloud.
8. Never guess an amount that isn't explicitly stated in the email; skip anything ambiguous
