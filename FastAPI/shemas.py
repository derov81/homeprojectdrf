from  pydantic import BaseModel, validator
from typing import List

class Deti(BaseModel):
    name: str
    last_name: str
    age: int

class Person(BaseModel):
    name: str
    age: int
    deti: List[Deti]

    @validator('name')
    def validator_name(cls, raw_name):
        min_len =2
        max_len = 15
        if  min_len < len(raw_name) < max_len:
            return raw_name
        else:
            raise ValueError(f'Name length must be in range [{min_len}] - [{max_len}],'
                             f'but actual -> [{raw_name}] len [{len(raw_name)}]')

    @validator('age')
    def validator_age(cls, raw_age):
        min_age = 0
        max_age = 120
        if min_age <= raw_age < max_age:
            return raw_age
        else:
            raise ValueError(f'Age must be in range [{min_age}] - [{max_age}],'
                             f'but actual -> [{raw_age}]')





