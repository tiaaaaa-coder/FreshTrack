## 4.1 Implementation Overview

The Week 4 prototype will implement FR-01: adding a food item with its name and expiry date and displaying it in the pantry list. The React interface will send the item to the FastAPI backend, which will validate the input and save valid records in PostgreSQL. The saved item will then be returned to the interface and shown in the pantry list. This prototype covers manual item entry, validation, database persistence, and display. Photo classification and recipe suggestions are planned for later development.
## 4.2 Development Environment and Technologies

| Component | Actual technology/version | Role and reason for selection |
|---|---|---|
| Operating system / hardware | macOS, Apple Silicon (`arm64`); macOS version not recorded | Local development environment. |
| Frontend runtime and package manager | Node.js 26.13.0; npm 11.20.0 | Runs the React development environment and manages JavaScript dependencies. |
| Frontend library and build tool | React version recorded in `frontend/package.json`; Vite 8.3.6 | React provides the user interface. Vite scaffolds and serves the frontend during development. |
| Backend language and framework | Python 3.13.9; FastAPI 0.162.2; Uvicorn 0.54.0 | Python and FastAPI are selected for the API; Uvicorn runs the local development server. |
| Database and access libraries | PostgreSQL 18.6; SQLAlchemy 2.1.8; Psycopg 3.3.8 | PostgreSQL stores pantry records. SQLAlchemy provides database access, and Psycopg connects Python to PostgreSQL. |
| IDE | Visual Studio Code; version not recorded | Used to edit project files and work with the local repository. |
| Version control | Git and GitHub | Tracks source and documentation changes. |
| Image classification | MobileNetV2; model not yet trained or connected | Planned classifier for the photo ingredient feature. |
| Recipe search | Spoonacular API; integration not yet configured | Planned external service for recipe suggestions. |

The React project was scaffolded with Vite. The Python dependencies were installed in a virtual environment at `backend/.venv`. PostgreSQL is installed locally and accepting connections. The FastAPI application has not yet started successfully, so database integration remains to be verified.
