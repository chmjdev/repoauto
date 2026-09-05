---
name: track-budget
description: Track monthly budgets, income and expenses against a confirmed $10,000 opening balance, and report the remaining balance.
say: track my budget · how much money do I have left · log an expense · log my income · what is my remaining balance · add a budget line
---

# Track Budget

## Goal
Maintain a rolling view of the user's finances: a $10,000 (USD) opening balance, monthly budget lines, income entries, expense entries, and a computed remaining balance. Report the balance whenever asked.

## Constants
- OPENING_BALANCE = 10000 (USD) — confirmed starting figure; do not change without explicit user confirmation.

## Steps

1. **Initialise the ledger**
   - If no ledger exists, create `budget-ledger.md` in the library repo root with:
     - Opening balance: $10,000
     - For the current month: revenue budget = $0, expense budget = $0, recorded income = $0, recorded expenses = $0, remaining = $10,000.

2. **Record income ("log my income")**
   - Ask for: amount (required), source/description (optional), month (defaults to current month).
   - Add the amount to recorded income for that month. Never alter OPENING_BALANCE or budgets.
   - Reply: "Income of $X recorded for [month]. Total income this month: $Y."

3. **Record an expense ("log an expense")**
   - Ask for: amount (required, confirm if > $500), category (optional, e.g. groceries, rent), month (defaults to current month).
   - Add the amount to recorded expenses for that month.
   - Reply: "Expense of $X recorded for [month]. Total expenses this month: $Y."

4. **Set a monthly budget ("add a budget line")**
   - Ask for: month (defaults to current), budgeted income amount (default 0), budgeted expense amount (default 0).
   - Overwrite that month's budget lines.
   - Reply: "Budget for [month]: income $A, expenses $B."

5. **Report remaining balance ("how much money do I have left")**
   - Compute for the requested month (default current):
     - Remaining = OPENING_BALANCE + recorded income − recorded expenses.
     - Also report: remaining vs expense budget (over/under by $C).
   - Reply in one short block, e.g. "Remaining balance for [month]: $R (opening $10,000 + income $I − expenses $E). You are $C under/over your expense budget."

6. **Persist every mutation**
   - After steps 2–4, update `budget-ledger.md` accordingly (or the skill may track in the repo file `budget-ledger.md`).
   - Keep every transaction in a dated list so history can be replayed.

7. **Edge cases**
   - Missing amounts: never assume; ask.
   - Unknown month: reject and re-ask.
   - Balance going negative: report it plainly, do not block.

## Output rule
Always answer with the monetary figure in USD, rounded to two decimals.
