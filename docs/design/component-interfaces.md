
# Fresh Track Components and Data Flow

The components below describe the proposed Week 3 design. Components not yet implemented are planned.

## Component responsibilities

| Component | Responsibility and input | Output and connection |
|---|---|---|
| React web interface | Accepts pantry item names and expiry dates, displays pantry items, and lets the user upload a photo or request recipes. | Sends HTTP requests to the FastAPI backend and displays returned pantry items, ingredient predictions, and recipes. |
| FastAPI backend | Validates requests and coordinates pantry operations, photo classification, and recipe searches. | Reads from or writes to PostgreSQL, calls the inference module or recipe service, and returns results to React. |
| PostgreSQL database | Stores pantry records, including item ID, item name, expiry date, and creation date. | Returns pantry records to the backend for display and expiry-based operations. |
| MobileNetV2 inference module | Processes an uploaded food photo. | Returns a predicted ingredient label and confidence score to the backend. Low-confidence results can be entered manually. |
| Recipe service | Uses pantry ingredients and expiry dates to search for recipes and prioritize ingredients nearing expiry. | Sends recipe search requests to Spoonacular and returns ranked results to the backend. |
| Spoonacular API | External recipe search service that receives ingredient-based requests. | Returns matching recipes to the Fresh Track recipe service. |
| Offline training and evaluation script | Trains and evaluates the classifier using a fixed train/test split. | Produces evaluation results and a versioned model file for the inference module. |

## System boundaries

The user accesses Fresh Track through a React interface in a browser. The FastAPI backend, PostgreSQL database, and MobileNetV2 inference module are planned server-side components; the hosting location has not been selected. Model training and evaluation are performed separately during development. Spoonacular is an external service accessed by the recipe service. Pantry records are stored in PostgreSQL.

## End-to-end flow: add a pantry item

1. The user enters a food name and expiry date in the React interface.
2. React sends the item details to the FastAPI `POST /items` endpoint.
3. FastAPI validates the input.
4. If valid, the backend stores the item in PostgreSQL.
5. PostgreSQL returns the saved record to the backend.
6. FastAPI returns the saved item to React, and the interface displays it in the pantry list.

### Error case

If the food name is missing or the expiry date is invalid, the backend returns a validation error. The interface displays an error message, and the item is not saved.

The request and response fields beyond the food name and expiry date will be finalized during implementation.
