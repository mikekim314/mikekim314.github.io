# Salesforce Environment Sync Guide

This document outlines the necessary changes required to point Salesforce Web-to-Lead forms from a **Production** environment to a **Sandbox/Dev** environment.

## 1. Form Action URL
The endpoint for submitting Web-to-Lead data changes depending on the environment:
- **Production**: `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8`
- **Sandbox/Dev**: `https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8`

## 2. Organization ID (`oid`)
The `oid` hidden input must be updated to match the Salesforce Org ID of the target environment.
- **Example (Sandbox)**: `<input type="hidden" name="oid" value="00DDG00000NAgJq">`

## 3. Custom Field IDs
Salesforce custom field IDs (e.g., `00N...`) are **environment-specific**. When moving a form from Production to Sandbox:
1.  Generate a new Web-to-Lead HTML snippet from the target Sandbox (Setup > Web-to-Lead).
2.  Identify the new IDs for all custom fields (e.g., `EIN`, `Mission`, `Demographics`).
3.  Update the `id` and `name` attributes of the corresponding inputs in your HTML files.

| Field Name | Production ID | Sandbox ID (Example) |
| :--- | :--- | :--- |
| EIN | `00NKY00000bqQ8O` | `00NDG000005Q7hK` |
| 501(c)(3) | `00NKY00000bqQ8J` | `00NDG000005Q7hP` |

## 4. Record Type IDs
If your form uses a `recordType` hidden input, ensure the ID matches the Record Type in the target environment. It is recommended to use the **18-character ID** to avoid case-sensitivity issues during deployment.
- **Example**: `<input type="hidden" name="recordType" value="012D4000001EOT8IAO">`

## 5. Return URL (`retURL`)
Ensure the `retURL` points to the correct success/thank-you page for the specific environment or deployment (e.g., `https://mikekim314.github.io/distribution-thank-you.html`).

---
> [!IMPORTANT]
> Always verify the field IDs by cross-referencing with the generated HTML asset files in the `assets/` directory before deploying changes.
