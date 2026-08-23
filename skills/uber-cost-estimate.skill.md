---
name: uber-cost-estimate
description: Estimates Uber cost and travel time between a given start address and destination address using web search for distance, drive time, and fare data.
say: estimate uber cost · how much would an uber cost from · uber estimate to · what's the uber fare from
---

1. Take two inputs from the user: the starting address and the destination address. If either is missing, ask for it before proceeding.

2. Use search_web with a query like "driving distance and time from [start] to [destination]" to find the driving distance (in km or miles) and estimated drive time between the two addresses.

3. Use search_web again with a query like "Uber fare estimate from [start] to [destination] [city]" or "Uber cost per km/mile [city]" to find:
   a) A direct published fare estimate for that route/city if available, OR
   b) Typical local per-km/per-mile rate and base fare for that city/region if no direct estimate exists.

4. If only rates were found (not a direct fare), compute a rough estimate:
   - fare_low = base_fare + (distance * low_per_km_rate)
   - fare_high = base_fare + (distance * high_per_km_rate)
   - Round to nearest whole currency unit.
   - Add a small buffer (~10-15%) for surge/traffic variability when presenting the range.

5. Compile the result into a compact text block containing:
   - Route: [start] → [destination]
   - Distance: [value] km/mi
   - Estimated drive time: [value]
   - Estimated Uber fare range: [low] - [high] [currency]
   - Note: "Estimate only, based on web search data; actual fare may vary with traffic, surge pricing, and vehicle type."

6. Call show_visual with kind "text", title "Uber Estimate", and the compact block from step 5 as the content.

7. This skill is strictly read-only and informational — it never books, requests, or schedules a ride. Do not call any booking or write APIs. If the user asks to actually book the ride, state that booking requires action at the HUD/app and is outside this skill's scope.
