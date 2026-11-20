# WaterTracker Plan

## Goal

Build a simple, responsive web app using HTML, CSS, and JavaScript to track how much water the user drinks today, measured in ounces. This document is the planning deliverable; implementation has not started.

## Agreed design

- Clean but colorful appearance with a light blue palette.
- A prominent display of today's total in ounces.
- A **+1 bottle** button that adds the configured bottle amount.
- An editable bottle size, defaulting to **24 oz**.
- A textbox and **Add** button for entering a custom amount in ounces.
- A list of today's drinks with a remove button for each entry, allowing mistakes to be corrected.
- A responsive layout suitable for phones and desktops.
- No daily goal or progress indicator.
- Only today's entries are shown; no history view.

## Behavior and storage

- Each drink records its amount when added. Changing the bottle size affects future entries only; existing entries retain their original amounts.
- Today's total is calculated from today's drink entries. Removing an entry updates the total.
- Custom amounts and bottle sizes must be positive, finite numbers. Allow fractional ounces and show clear feedback for invalid input.
- Store today's entries and the bottle preference in this browser using localStorage so they survive a refresh.
- Use the user's local calendar date to identify today. Start a fresh daily total when the date changes, including when the page stays open overnight or is revisited.
- Preserve the bottle preference across day changes.

## Roadmap

### 1. Layout and styling

- Create a single page with a title, today's total, bottle button, bottle-size setting, custom entry controls, and today's drink list.
- Apply the light blue visual style with readable text, clear buttons, and spacing that works on mobile and desktop.
- Provide accessible labels, keyboard operation, and visible focus states.

### 2. Tracking behavior

- Add a drink using the current bottle size or a valid custom amount.
- Store each entry's actual ounce amount and update the displayed total and drink list.
- Allow removal of individual drinks and display an empty state when there are no entries.
- Allow editing the bottle size without changing previous entries.

### 3. Persistence and date handling

- Load and save today's entries and the bottle preference with localStorage.
- Default the bottle size to 24 oz on first use.
- Detect a new local day on page load, before recording a drink, and while the page remains open or regains focus.
- Clear the previous day's entries when starting a new day while retaining the bottle preference.

### 4. Verification

- Check bottle additions, custom additions, fractional amounts, and removal of entries.
- Check that changing bottle size leaves previous drink amounts unchanged.
- Check empty, zero, negative, and invalid inputs.
- Check persistence after refreshing and correct rollover to a new local day.
- Check the mobile and desktop layouts and keyboard usability.

## Completion criteria

The user can open the app, log a bottle or custom amount, correct an entry, and see an accurate total for today. Refreshing preserves today's drinks and the bottle setting; a new local day starts at zero.
