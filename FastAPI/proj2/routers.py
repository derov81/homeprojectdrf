from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_session
import services
from dto import CarDto


router = APIRouter()


@router.post('/', tags=["car"])
async def create(car_dto: CarDto = None, db_session: Session = Depends(get_session)):
    return services.create_car(car_dto, db_session)


@router.get('/{id}', tags=["car"])
async def get(car_id: int, db_session: Session = Depends(get_session)):
    return services.get_car(car_id, db_session)


@router.get('/all/1', tags=["car"])
async def get_all(db_session: Session = Depends(get_session)):
    return services.get_all_cars(db_session)


@router.put('/{id}', tags=["car"])
async def update(car_id: int, car_dto: CarDto = None, db_session: Session = Depends(get_session)):
    return services.update_car(car_id, car_dto, db_session)


@router.delete('/{id}', tags=["car"])
async def delete(car_id: int, db_session: Session = Depends(get_session)):
    return services.delete_car(car_id, db_session)

