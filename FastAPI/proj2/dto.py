from pydantic import BaseModel


class CarDto(BaseModel):
    brand: str
    mark: str
    year: int
