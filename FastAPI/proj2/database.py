from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


DB_URL = 'sqlite:///./db1.db'
engine = create_engine(DB_URL)
session = sessionmaker(autoflush=False, autocommit=False, bind=engine)
Base = declarative_base()


def get_session():
    db = session()
    try:
        yield db
    finally:
        db.close()




