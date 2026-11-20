# WaterTracker Roadmap

- [ ] **Milestone 1 — Working bottle tracker**
  - Create a browser page showing today’s total, a **+1 bottle (24 oz)** button, and a list of drinks.
  - Support adding bottles and removing individual entries; keep data in memory.
  - **Browser test:** Start at 0 oz, add two bottles to reach 48 oz, then remove one to return to 24 oz.

- [ ] **Milestone 2 — Custom amounts and bottle sizes**
  - Add an editable bottle size defaulting to 24 oz, plus a custom-ounce textbox and **Add** button.
  - Accept positive, finite numbers, including fractions; show clear feedback for invalid input.
  - Preserve existing entries’ amounts when the bottle size changes.
  - **Browser test:** Add a 24 oz bottle, change the size to 16 oz, add another bottle and 2.5 custom ounces, and confirm a total of 42.5 oz. Verify invalid inputs add nothing.

- [ ] **Milestone 3 — Persistence and daily reset**
  - Save entries and the bottle preference in localStorage.
  - Use the local calendar date to reset entries on a new day while preserving the bottle preference.
  - Check for rollover on load, before adding a drink, while open, and when focus returns.
  - **Browser test:** Refresh and confirm data survives. Advance the local date using a browser clock override or system clock, then verify the total resets and the bottle preference remains.

- [ ] **Milestone 4 — Responsive, accessible finished app**
  - Apply the light blue design, prominent total, clear empty state, and layouts for phones and desktops.
  - Provide accessible labels, keyboard controls, and visible focus states.
  - **Browser test:** Complete the tracking flow at mobile and desktop widths and using only the keyboard. Recheck validation, removal, refresh persistence, and daily rollover.

No daily goal, progress indicator, or history view is included. Implementation uses HTML, CSS, and JavaScript.
