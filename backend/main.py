
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, List, Dict, Any
import os
import json
import azure.cognitiveservices.speech as speechsdk
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from pydantic import BaseModel
import requests
import uvicorn

app = FastAPI(title="UBS Spec Scribe API", description="Backend for Job Specification Generator and Interview Questions Tool")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config models
class JobSpecRequest(BaseModel):
    template_id: str
    job_title: str
    job_description: str
    experience_level: str
    additional_info: Optional[str] = None

class InterviewQuestionRequest(BaseModel):
    job_spec: Optional[str] = None
    cv_content: Optional[str] = None
    additional_context: Optional[str] = None

# Azure OpenAI configuration - would be in environment variables in production
AZURE_OPENAI_ENDPOINT = "YOUR_AZURE_OPENAI_ENDPOINT"
AZURE_OPENAI_API_KEY = "YOUR_AZURE_OPENAI_API_KEY"
AZURE_OPENAI_DEPLOYMENT_NAME = "YOUR_DEPLOYMENT_NAME"

# Helper function to call Azure OpenAI API
async def generate_content_from_openai(prompt: str) -> str:
    try:
        # In a real implementation, you would use Azure OpenAI SDK
        # For demonstration purposes, we're using a placeholder
        
        # This would be the actual implementation using Azure OpenAI
        # headers = {
        #     "api-key": AZURE_OPENAI_API_KEY,
        #     "Content-Type": "application/json"
        # }
        # request_body = {
        #     "messages": [{"role": "user", "content": prompt}],
        #     "max_tokens": 1000,
        #     "temperature": 0.7,
        # }
        # response = requests.post(
        #     f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/{AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=2023-05-15",
        #     headers=headers,
        #     json=request_body,
        # )
        # return response.json()["choices"][0]["message"]["content"]
        
        # For demonstration, return mock data
        if "job spec" in prompt.lower():
            return "# Sample Job Specification\n\n## Overview\nThis is an AI-generated job specification based on your requirements.\n\n## Responsibilities\n- Lead development of complex systems\n- Collaborate with cross-functional teams\n- Make technical decisions\n\n## Requirements\n- Relevant experience\n- Strong technical background\n- Excellent communication skills"
        elif "interview" in prompt.lower():
            return json.dumps([
                "Tell me about your experience with the technologies mentioned in your resume.",
                "How would you handle a difficult stakeholder?",
                "Describe a challenging project you worked on and how you overcame obstacles.",
                "What metrics would you use to measure success in this role?",
                "How do you stay updated with industry trends?"
            ])
        else:
            return "Generated content based on your request."
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating content: {str(e)}")

# Extract text from uploaded file (mock implementation)
async def extract_text_from_file(file: UploadFile) -> str:
    # In a real implementation, you'd use libraries like PyPDF2 for PDFs,
    # python-docx for docx files, etc.
    # For demonstration, just return a placeholder
    return f"Extracted content from {file.filename} would be here in the actual implementation."

@app.get("/")
async def root():
    return {"message": "Welcome to UBS Spec Scribe API"}

@app.post("/api/generate-job-spec")
async def generate_job_specification(request: JobSpecRequest):
    # Build the prompt for the AI
    prompt = f"""
    Create a professional job specification for a {request.job_title} position.
    
    Job Description: {request.job_description}
    Experience Level: {request.experience_level}
    Additional Information: {request.additional_info or 'N/A'}
    
    Format the job specification with clear sections for:
    - Overview/Summary
    - Responsibilities
    - Requirements/Qualifications
    - Additional Information
    
    Use a professional tone consistent with UBS corporate standards.
    """
    
    # Generate the content using OpenAI
    generated_content = await generate_content_from_openai(prompt)
    
    return {"job_specification": generated_content}

@app.post("/api/upload-job-spec")
async def upload_job_specification(
    file: UploadFile = File(...),
):
    # Extract text from the uploaded file
    try:
        file_content = await extract_text_from_file(file)
        return {"job_specification": file_content}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process file: {str(e)}")

@app.post("/api/generate-interview-questions")
async def generate_interview_questions(request: InterviewQuestionRequest):
    if not request.job_spec and not request.cv_content:
        raise HTTPException(status_code=400, detail="Either job specification or CV content is required")
    
    # Build the prompt for the AI
    prompt = "Generate professional interview questions based on the following information:\n\n"
    
    if request.job_spec:
        prompt += f"Job Specification:\n{request.job_spec}\n\n"
    
    if request.cv_content:
        prompt += f"Candidate CV:\n{request.cv_content}\n\n"
    
    if request.additional_context:
        prompt += f"Additional Context:\n{request.additional_context}\n\n"
    
    prompt += "Generate 5-10 specific interview questions that will help assess the candidate's fit for the position."
    
    # Generate the content using OpenAI
    questions_json = await generate_content_from_openai(prompt)
    
    # Parse the JSON response (in a real implementation)
    try:
        questions = json.loads(questions_json)
        return {"questions": questions}
    except json.JSONDecodeError:
        # Fallback if the response isn't valid JSON
        questions = questions_json.split("\n")
        questions = [q.strip() for q in questions if q.strip()]
        return {"questions": questions}

@app.post("/api/upload-cv")
async def upload_cv(
    file: UploadFile = File(...),
):
    # Extract text from the uploaded CV
    try:
        cv_content = await extract_text_from_file(file)
        return {"cv_content": cv_content}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process CV file: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
