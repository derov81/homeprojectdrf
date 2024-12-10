from models import Car
from sqlalchemy.orm import Session
from dto import CarDto


def create_car(car_dto: CarDto, db_session: Session):
    car = Car(
        brand=car_dto.brand,
        mark=car_dto.mark,
        year=car_dto.year,
    )
    try:
        db_session.add(car)
        db_session.commit()
        db_session.refresh(car)
    except Exception as e:
        print(e)

    return car


def get_car(id: int, db_session: Session):
    return db_session.query(Car).filter(Car.id == id).first()


def get_all_cars(db_session: Session):
    return db_session.query(Car).all()


def update_car(id: int, car_dto: CarDto, db_session: Session):
    car = db_session.query(Car).filter(Car.id == id).first()
    car.brand = car_dto.brand
    car.mark = car_dto.mark
    car.year = car_dto.year
    try:
        db_session.add(car)
        db_session.commit()
        db_session.refresh(car)
    except Exception as e:
        print(e)

    return car


def delete_car(id: int, db_session: Session):
    db_session.query(Car).filter(Car.id == id).delete()
    db_session.commit()
    return
