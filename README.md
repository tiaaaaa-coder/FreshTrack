# FreshTrack 
AI Powered Pantry & Meal Assistant to reduce household food waste. 
Altınbaş University Graduation Project 2026-2027

## Project Description
FreshTrack helps households and small stores reduce food waste. Users track
pantry items with expiry dates, receive reminders before food expires, and
get meal suggestions generated from ingredients they already have either
entered manually or detected from a photo.

## Objective
Reduce household food waste and grocery costs by combining expiry tracking
with AI powered recipe suggestions prioritized by items nearing expiry.

## Target Users
Students, families, young professionals, convenience store employees, and
anyone managing a kitchen who wants to save money and waste less.

## Planned Technologies
- Python (FastAPI) backend, PostgreSQL database
- TensorFlow/Keras (MobileNetV2 transfer learning) for ingredient detection
- Spoonacular API for recipe suggestions
- React (web frontend)
- Firebase Cloud Messaging for expiry notifications

## Current Status
Week 1 – Project definition and initial research
Next: dataset collection for ingredient recognition.
## Planned Features
- FR-01: Add/view/remove pantry items with expiry dates
- FR-03: Configurable expiry warnings (default 3 days)
- FR-04: Recipe suggestions via Spoonacular API, ranked by expiry
- FR-05: Photo-based ingredient recognition (transfer learning, 10–20 classes)
- FR-06: "Used vs discarded" waste statistics

## Scope (Week 2)
In scope v1: pantry tracking, expiry warnings, recipe suggestions, photo
ingredient recognition, waste statistics.
Out of scope v1: barcode scanning, grocery-store integrations,
multi-user households, nutrition tracking.

## Current Status
Week 2 – Requirements engineering completed. Functional requirements
(FR-01–FR-06), non-functional requirements (NFR-01–NFR-03), user stories
(US-01–US-03), and milestone plan defined. Development starts Week 3 with
architecture design.

## Tech Stack
- Backend: Python + FastAPI
- Frontend: React
- Database: PostgreSQL
- ML: TensorFlow/Keras (MobileNetV2 transfer learning)
- Recipe data: Spoonacular API

## References
- Mathisen, T. F., & Johansen, F. R. (2022). The impact of smartphone apps
  designed to reduce food waste... JMIR Formative Research.
  https://doi.org/10.2196/39275
- Morol, M. K., et al. (2022). Food recipe recommendation based on ingredient
  detection using deep learning. https://arxiv.org/abs/2203.06721
- TensorFlow (2026). Transfer learning and fine-tuning with Keras.
## Roadmap
- Week 2: gather ingredient image dataset, set up project structure
- Week 3: baseline ingredient classifier using transfer learning- 
  https://www.tensorflow.org/guide/keras/transfer_learning
- Spoonacular (2026). Food API documentation.
  https://spoonacular.com/food-api/docs
