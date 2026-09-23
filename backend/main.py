from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from database import get_db
import models
import schemas

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "HomeBuild Operations Platform API is running"}


@app.get("/communities", response_model=list[schemas.CommunityOut])
def get_communities(db: Session = Depends(get_db)):
    return db.query(models.Community).all()


@app.post("/communities", response_model=schemas.CommunityOut)
def create_community(community: schemas.CommunityCreate, db: Session = Depends(get_db)):
    new_community = models.Community(
        name=community.name,
        location=community.location,
        created_at=datetime.utcnow(),
    )
    db.add(new_community)
    db.commit()
    db.refresh(new_community)
    return new_community

@app.get("/properties", response_model=list[schemas.PropertyOut])
def get_properties(db: Session = Depends(get_db)):
    return db.query(models.Property).all()


@app.post("/properties", response_model=schemas.PropertyOut)
def create_property(property: schemas.PropertyCreate, db: Session = Depends(get_db)):
    new_property = models.Property(
        name=property.name,
        address=property.address,
        status=property.status,
        community_id=property.community_id,
        created_at=datetime.utcnow(),
    )
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property


@app.get("/properties/{property_id}", response_model=schemas.PropertyOut)
def get_property(property_id: int, db: Session = Depends(get_db)):
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property


@app.get("/contractors", response_model=list[schemas.ContractorOut])
def get_contractors(db: Session = Depends(get_db)):
    return db.query(models.Contractor).all()


@app.post("/contractors", response_model=schemas.ContractorOut)
def create_contractor(contractor: schemas.ContractorCreate, db: Session = Depends(get_db)):
    new_contractor = models.Contractor(
        name=contractor.name,
        specialty=contractor.specialty,
        phone=contractor.phone,
        email=contractor.email,
        created_at=datetime.utcnow(),
    )
    db.add(new_contractor)
    db.commit()
    db.refresh(new_contractor)
    return new_contractor


@app.get("/construction-stages", response_model=list[schemas.ConstructionStageOut])
def get_construction_stages(db: Session = Depends(get_db)):
    return db.query(models.ConstructionStage).all()


@app.post("/construction-stages", response_model=schemas.ConstructionStageOut)
def create_construction_stage(stage: schemas.ConstructionStageCreate, db: Session = Depends(get_db)):
    new_stage = models.ConstructionStage(
        name=stage.name,
        order=stage.order,
        status=stage.status,
        start_date=stage.start_date,
        end_date=stage.end_date,
        property_id=stage.property_id,
    )
    db.add(new_stage)
    db.commit()
    db.refresh(new_stage)
    return new_stage
