# Database Schema — HomeBuild Operations Platform

## communities
| Column      | Type      | Notes                        |
|-------------|-----------|-------------------------------|
| id          | integer   | primary key, auto-increment   |
| name        | string    | e.g. "Sunset Villas"          |
| location    | string    | city / address                |
| created_at  | datetime  | when the community was added  |

## properties
| Column        | Type      | Notes                                      |
|---------------|-----------|---------------------------------------------|
| id            | integer   | primary key, auto-increment                 |
| community_id  | integer   | foreign key → communities.id                |
| name          | string    | e.g. "House #1024"                          |
| address       | string    | street address                              |
| status        | string    | "in_progress", "completed", "on_hold"       |
| created_at    | datetime  | when the property was added                 |


## construction_stages
| Column        | Type      | Notes                                              |
|---------------|-----------|------------------------------------------------------|
| id            | integer   | primary key, auto-increment                          |
| property_id   | integer   | foreign key → properties.id                          |
| name          | string    | e.g. "Foundation", "Framing", "Electrical"            |
| order         | integer   | sequence position (1, 2, 3...) for displaying in order|
| status        | string    | "not_started", "in_progress", "completed"             |
| start_date    | date      | nullable — kad je faza počela                         |
| end_date      | date      | nullable — kad je faza završena                       |

## contractors
| Column        | Type      | Notes                                       |
|---------------|-----------|-----------------------------------------------|
| id            | integer   | primary key, auto-increment                    |
| name          | string    | e.g. "ABC Construction"                        |
| specialty     | string    | e.g. "Electrical", "Plumbing", "General"       |
| phone         | string    | contact broj                                   |
| email         | string    | kontakt email                                  |
| created_at    | datetime  | kad je dodat u sistem                          |


## tasks
| Column         | Type      | Notes                                              |
|----------------|-----------|------------------------------------------------------|
| id             | integer   | primary key, auto-increment                           |
| stage_id       | integer   | foreign key → construction_stages.id                  |
| contractor_id  | integer   | foreign key → contractors.id (nullable — može biti nedodeljen) |
| title          | string    | e.g. "Install wiring"                                 |
| description    | text      | detaljniji opis zadatka                               |
| status         | string    | "not_started", "in_progress", "completed"             |
| due_date       | date      | rok za završetak                                      |
| completed_at   | datetime  | nullable — kad je zaista završen                      |


## inspections
| Column           | Type      | Notes                                           |
|------------------|-----------|---------------------------------------------------|
| id               | integer   | primary key, auto-increment                        |
| stage_id         | integer   | foreign key → construction_stages.id               |
| inspector_name   | string    | ime inspektora (kasnije će biti FK ka users tabeli) |
| inspection_date  | date      | kad je inspekcija obavljena                        |
| result           | string    | "passed", "failed", "pending"                      |
| notes            | text      | nullable — dodatne napomene inspektora              |


## issues
| Column          | Type      | Notes                                              |
|-----------------|-----------|-------------------------------------------------------|
| id              | integer   | primary key, auto-increment                            |
| inspection_id   | integer   | foreign key → inspections.id                           |
| contractor_id   | integer   | foreign key → contractors.id (ko treba da ga otkloni)  |
| title           | string    | e.g. "Electrical outlet not installed correctly"       |
| description     | text      | detaljniji opis problema                               |
| priority        | string    | "low", "medium", "high"                                |
| status          | string    | "open", "resolved"                                     |
| due_date        | date      | rok za rešavanje                                       |
| resolved_at     | datetime  | nullable — kad je zaista rešen                         |


## documents
| Column        | Type      | Notes                                        |
|---------------|-----------|-------------------------------------------------|
| id            | integer   | primary key, auto-increment                       |
| property_id   | integer   | foreign key → properties.id                       |
| name          | string    | e.g. "Building Permit.pdf"                        |
| category      | string    | "permit", "contract", "photo", "inspection_report"|
| file_url      | string    | putanja/link do fajla                             |
| uploaded_at   | datetime  | kad je dodat                                      |


## users
| Column          | Type      | Notes                                     |
|-----------------|-----------|----------------------------------------------|
| id              | integer   | primary key, auto-increment                    |
| name            | string    | puno ime                                       |
| email           | string    | unique, koristi se za login                    |
| password_hash   | string    | nikad ne čuvamo pravu lozinku, samo hash        |
| role            | string    | "manager", "contractor", "inspector"           |
| created_at      | datetime  | kad je nalog napravljen                        |
