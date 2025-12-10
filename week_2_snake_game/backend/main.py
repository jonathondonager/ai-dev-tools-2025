from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Score(BaseModel):
    username: str
    score: int

scores = []

@app.get("/scores", response_model=List[Score])
async def get_scores():
    return sorted(scores, key=lambda x: x.score, reverse=True)[:10]

@app.post("/scores")
async def save_score(score: Score):
    scores.append(score)
    return {"message": "Score saved"}

@app.get("/")
async def root():
    return {"message": "Snake Game API"}
