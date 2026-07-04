# Specification: One-Click Tournament Join

## Overview

Refactor the tournament registration process to enable a "One-Click Join" flow for Team Captains. This replaces the manual public registration form. Captains will manage their team profile centrally and link it to multiple tournaments.

## Functional Requirements

1.  **Database Schema Update:**
    - Modify the relationship between `Team` and `Tournament` to be Many-to-Many (N-N).
    - Create a new junction model `TournamentRegistration` to track a team's registration status in specific tournaments.
2.  **Public Registration Flow:**
    - Remove the public registration form.
    - When an unregistered user clicks "Daftar Turnamen", display a modal explaining they must create a Captain account, with a CTA to the Login/Register page.
3.  **Captain Dashboard Registration (Quick Join):**
    - Captains viewing a tournament can click "Daftar Turnamen".
    - A confirmation modal will appear: "Register team [Team Name] to [Tournament Name]?".
    - Upon confirmation, the team is registered for the tournament.
4.  **Registration Validation Criteria:**
    - Before a Captain can register their team, the system must validate:
      - The team has an uploaded Logo.
      - The team has at least 4 registered players (1 Captain + 3 Members).

## Out of Scope

- Payment gateways or registration fees (assumes free entry).
- Match scheduling logic (already handled by admin).
