# Learnings: Distribution Form Modernization

This document summarizes the technical strategies and lessons learned during the upgrade of the Food Distribution Partner form.

## 1. Salesforce Web-to-Lead Integration
- **Parity is Paramount**: When duplicating Salesforce forms, ensure not just the field IDs but also hidden fields (`oid`, `retURL`), encoding Meta tags, and specific `name` attributes match exactly.
- **Background Syncing**: You can maintain Salesforce compatibility while providing a custom UI by keeping the original inputs (like checkboxes) hidden in the DOM and syncing their state via JavaScript.

## 2. UI/UX: The "Tag-Select" Pattern
- **Problem**: Long multi-select checkbox lists clutter the vertical space and overwhelm users.
- **Solution**: A custom "Tag-Select" component.
    - **Trigger**: A box that looks like a dropdown.
    - **Display**: Selected items appear as removable "Tags" (badges).
    - **Menu**: A scrollable dropdown limited to 4-5 lines (e.g., `max-height: 200px`).
- **Technical Implementation**:
    - Use `Set` in JavaScript to track unique selections efficiently.
    - Use `CSS Grid` and `flexbox` for responsive tag wrapping.
    - Close menus on document-level click listeners for a native feel.

## 3. Data Integrity & Real-time Validation
- **The 100% Rule**: For demographic percentages, enforcing a total sum of 100% prevents invalid data from reaching the CRM.
- **Visual Feedback**:
    - Progress counters that change color (Green for valid, Red for invalid) provide immediate guidance.
    - Use `input` events instead of `change` for truly real-time updates.
- **Submit Guard**: 
    - Always intercept the `submit` event to perform a final check.
    - Use `element.scrollIntoView({ behavior: 'smooth' })` to guide users back to errors, especially on long forms.

## 4. Modern CSS Layouts
- **Key-Value Grids**: Instead of simple stacks, use `grid-template-columns: 1fr 100px` to create perfectly aligned pairings for labels and small inputs (like percentages).
- **Responsive Matrix**: Use `repeat(auto-fit, minmax(220px, 1fr))` to allow the grid to automatically adjust from 3 columns to 1 column based on screen width.

## 5. Branch-based Workflow
- Creating feature-specific branches (e.g., `distribution_partner_form_update`) keeps the `main` branch stable and allows for clean code reviews via Pull Requests.
