from typing import Union


from fastapi import FastAPI, Query
from typing import List
from shemas import Person

app = FastAPI()

@app.get("/test")
def read_item(parametr: List[str] = Query(['default1', 'default2'], max_length=10)):
    return parametr

@app.get("/")
def read_root():
    return {"Hello": "Worldddd"}

@app.post('/person')
def read_root(person:Person):
    return person