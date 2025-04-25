
# UBS Spec Scribe

A UBS-styled job specification generator and interview question tool built with React and FastAPI.

## Features

- Generate job specifications from templates
- Customize job specs with your requirements
- Upload existing job specifications (PDF, DOCX)
- Upload CVs/Resumes for analysis
- Generate tailored interview questions based on job specs and CVs
- UBS-inspired design and user interface

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- Tanstack Query for data management

### Backend
- FastAPI Python framework
- Azure OpenAI integration for AI features
- File processing capabilities

## Setup and Installation

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- Docker and Docker Compose (optional, for containerized deployment)

### Environment Variables
Create a `.env` file in the root directory with these variables:

```
AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

### Running Locally

#### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at http://localhost:8080

#### Backend

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### Docker Deployment

To deploy the entire application using Docker:

```bash
docker-compose up -d
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:8000

## API Endpoints

- `GET /`: Welcome message and API status
- `POST /api/generate-job-spec`: Generate job specification from template
- `POST /api/upload-job-spec`: Upload and process job specification document
- `POST /api/generate-interview-questions`: Generate interview questions
- `POST /api/upload-cv`: Upload and process CV/Resume

## Frontend Routes

- `/`: Home/Dashboard
- `/job-specs`: Job Specification generator
- `/interviews`: Interview question generator
