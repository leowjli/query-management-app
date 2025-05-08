# Vial Query Management Application  

A full stack **Query Management Application** where users can create, update, and delete queries. Each query will have a title, description, date, and a status (OPEN, RESOLVED). Queries in the context of an EDC (electronic data capture) system help identify and flag incorrect data entries for patients and alert effected data managers/ users when a query needs to be resolved, and a management portal allow users to update and manage queries efficiently without losing progress on work or questions.

## Table of Contents  
- [Features](#features) 
- [Tech Stacks](#tech-stack)
- [API Endpoints](#api-endpoints)  
- [Getting Started](#getting-started)  
- [Running Locally](#running-locally)  
- [Contributing](#contributing)  
- [License](#license)  

## Features  
#### Frontend (UI)
- **Table View**:
    - Displays form data with columns: Question, Answer, and Queries
    - Hover over the Queries column to:
        - Create a new query if none exists (with a blue "+" icon and tooltip)
        - View query status: "OPEN" (Red with question mark) or "RESOLVED" (Green with checkmark)
    - Fetches data from the `/form-data` endpoint

- **Create Query**:
    - Opens a modal to add a new query
    - Allows editing the description and submitting the form
    - Saves query data to the backend

- **View Query**:
    - Displays query details for "OPEN" or "RESOLVED" statuses
    - Includes options to resolve an "OPEN" query, updating its status to "RESOLVED"

#### Backend (API)
- RESTful API with the following endpoints:
    1. Retrieve all form data with related query data
    2. Create a new query
    3. Update an existing query by ID
    4. (Bonus) Delete a query by ID

#### Database
- **Form Data Model**:
    - Fields: `id`, `question`, `answer`
- **Query Model**:
    - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`, `status`, `formDataId`
    - Relational field linking to form data 

## Tech stack
* [Node](https://nodejs.org/en/)
* [Typescript](www.google.com)
* [Fastify](https://www.fastify.io/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker and Compose](https://www.docker.com/)

## RESTful API Endpoints  

### Base URL  
`http://localhost:8080`  

### Endpoints  

#### 1. `GET /form-data`  
- **Description**: Retrieve a list of all form data entries along with the associated queries
- **Response**:  
    ```json
    {
        "total": 2,
        "formData": [
            {
                "id": "1",
                "question": "What is your age?",
                "answer": "30",
                "queries": [
                    {
                        "id": "abc123",
                        "title": "wrong age!",
                        "description": "Value can't be >100",
                        "status": "OPEN",
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z"
                    }
                ]
            }
        ]
    }
    ```
- **Status**: 200 OK, 400 Bad Request

#### 2. `POST /queries`  
- **Description**: Creates a new query for a form data  
- **Request Body**:  
    ```json
    {
        "description" : "test",
        "formDataId" : "85d828dc-2dd6-4098-a7f3-385e874f294b",
        "title" : "Have you ever had an allergic reaction to any medications?"
    }
    ```  
- **Status**: 200 OK, 400 Bad Request

#### 3. `PATCH /queries/:id`  
- **Description**: Updates status or description of an existing query  
- **Request Body**:  
    ```json  
    {
        "status": "RESOLVED",
        "description": "Which antihypertensive meds are you taking?"
    }  
    ```  
- **Response**:  
    ```json  
    {
        "id": "72a25a29-34c7-4db5-9c57-66a39bb12936",
        "title": "Medication details",
        "description": "Which antihypertensive meds are you taking?",
        "status": "RESOLVED",
        "createdAt": "2025-05-07T08:08:14.897Z",
        "updatedAt": "2025-05-07T08:09:14.678Z",
        "formDataId": "1d58825c-db54-490c-85d2-06fc2b6eb23d"
    }  
    ```
- **Status**: 200 OK, 404 Not Found

#### 4. `DELETE /queries/:id`  
- **Description**: Deletes a resource by ID.  
- **Response**:  
    ```json  
    {"success" : true}  
    ```
- **Status**: 200 OK, 404 Not Found

## Getting Started
### Installation  
1. Clone the repository:  
     ```bash  
     git clone https://github.com/username/repo.git  
     ```  
2. Navigate to the project directory:  
     ```bash  
     cd your-repo  
     ```  
3. Install dependencies:  
     ```bash  
     npm install  
     ```

## Running Backend Locally

1. Start the database container:  
     ```bash  
    docker-compose build
    docker-compose up
     ```  
2. Run the database migration
    ```bash
    npm run migrate
    ```

3. Seed the database:
    ```bash
    npm run seed
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## Running frontend Locally
Run the development server after installation
    ```bash
    npm run dev
    ```

### Running Tests  
Run the following command to execute tests:  
```bash  
npm test  
```

### Live Site:
