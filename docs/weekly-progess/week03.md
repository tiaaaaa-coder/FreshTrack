# Week 3 Progress Log — Fresh Track

## Tasks planned and completed
- Reviewed the Week 2 requirements and mapped FR-01, FR-04, FR-05, NFR-01, and NFR-02 to proposed system components.
- Drafted the component responsibilities and system boundaries.
- Described the pantry-item creation flow and an invalid-input case.
- Prepared two architecture decision records: PostgreSQL for pantry data and transfer learning for ingredient classification.
- Planned the high-level architecture diagram. The diagram has not yet been created or added to the repository.

## New diagrams / files
- Planned: `docs/design/architecture.png`
- Planned: `docs/design/architecture-source.drawio`
- Planned: `docs/design/component-interfaces.md`
- Planned: `docs/design/design-decisions.md`

## GitHub commit links or hashes
- To be added after the design files are committed.

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
