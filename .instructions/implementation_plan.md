# Implementation Plan - Demographics Validation

Enforce data integrity for the demographics section by ensuring all values are numeric (0-100) and that the final sum is exactly 100%.

## Proposed Changes

### [food-distribution.html](file:///Users/sj/Documents/try-first-fruits-farm-website/food-distribution.html)
#### [MODIFY] Update Input Attributes
- Change `type="text"` to `type="number"` for all demographic fields.
- Add `min="0"`, `max="100"`, and `step="1"`.
#### [NEW] Add Total Counter
- Add a `<span id="demographic-total">Total: 0%</span>` next to the section label.
- Add a hidden error message element for submit-time feedback.

### [style.css](file:///Users/sj/Documents/try-first-fruits-farm-website/style.css)
#### [NEW] Validation Styles
- Add styles for `#demographic-total`.
- Define `.total-valid` (green) and `.total-invalid` (red) states.
- Style the inputs to show red borders when the specific input is out of range.

### [script.js](file:///Users/sj/Documents/try-first-fruits-farm-website/script.js)
#### [NEW] Validation Logic
- Implement a `DemographicValidator` class or add to the DOMContentLoaded listener.
- Listen for `input` events on all specific demographic fields.
- Sum up all values (treating empty as 0).
- Update the UI counter real-time.
- Prevent form `submit` if the total is not 100%, and show a helpful alert/message.

## Verification Plan

### Manual Verification
- **Real-time update**: Type in values and verify the "Total" counter updates immediately.
- **Color Feedback**: Verify the counter turns green only when the sum is exactly 100.
- **Form Blocking**: Attempt to submit with 90% or 110% and verify the submission is prevented with an error message.
- **Success Case**: Submit with exactly 100% and verify it proceeds.
