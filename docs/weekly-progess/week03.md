# Week 3 Progress Log — Fresh Track

## Tasks planned and completed
- Mapped FR-01, FR-04, FR-05, NFR-01, and NFR-02 to proposed system components.
- Documented component responsibilities, system boundaries, and the pantry-item creation flow.
- Recorded two architecture decisions: PostgreSQL for pantry data and transfer learning for ingredient classification.
- Added the proposed system architecture diagram and its editable diagrams.net source.
- Added the component interfaces and design decisions documents.
- Added a proposed architecture summary to the README.

## New diagrams / files
- `docs/design/fresh-track-architecture.png`
- `docs/design/fresh-track-architecture.drawio`
- `docs/design/component-interfaces.md`
- `docs/design/design-decisions.md`
- `README.md` — proposed architecture summary

## GitHub commit links or hashes
- [FreshTrack commit history](https://github.com/tiaaaaa-coder/FreshTrack/commits/)

## Technical problems found
- No implementation problems investigated during this design work.

## Solutions considered
- Use validation in the FastAPI backend for missing or invalid pantry item data.
- Provide manual ingredient entry when photo-classification confidence is low.
- Handle Spoonacular timeouts or unavailability with an error message.

## References consulted
- PostgreSQL documentation: https://www.postgresql.org/docs/current/indexes-ordering.html
- TensorFlow transfer learning guide: https://www.tensorflow.org/guide/keras/transfer_learning

## Report sections updated
- Draft content prepared for system architecture, component responsibilities, data flow, and technology decisions. Report update is not yet completed.

## Week 4 prototype objective
- Demonstrate adding a pantry item through the React interface, saving it with the FastAPI `POST /items` endpoint to PostgreSQL, and displaying the saved item in the pantry list.
- Evidence planned: screenshot of the pantry list and the API response.
