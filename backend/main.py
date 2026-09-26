from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from database import get_db
import models
import schemas

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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
def get_construction_stages(property_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.ConstructionStage)
    if property_id is not None:
        query = query.filter(models.ConstructionStage.property_id == property_id)
    return query.all()



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

@app.get("/tasks", response_model=list[schemas.TaskOut])
def get_tasks(stage_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Task)
    if stage_id is not None:
        query = query.filter(models.Task.stage_id == stage_id)
    return query.all()



@app.post("/tasks", response_model=schemas.TaskOut)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        due_date=task.due_date,
        stage_id=task.stage_id,
        contractor_id=task.contractor_id,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@app.get("/inspections", response_model=list[schemas.InspectionOut])
def get_inspections(stage_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Inspection)
    if stage_id is not None:
        query = query.filter(models.Inspection.stage_id == stage_id)
    return query.all()


@app.post("/inspections", response_model=schemas.InspectionOut)
def create_inspection(inspection: schemas.InspectionCreate, db: Session = Depends(get_db)):
    new_inspection = models.Inspection(
        inspector_name=inspection.inspector_name,
        inspection_date=inspection.inspection_date,
        result=inspection.result,
        notes=inspection.notes,
        stage_id=inspection.stage_id,
    )
    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)
    return new_inspection

@app.get("/issues", response_model=list[schemas.IssueOut])
def get_issues(db: Session = Depends(get_db)):
    return db.query(models.Issue).all()


@app.post("/issues", response_model=schemas.IssueOut)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    new_issue = models.Issue(
        title=issue.title,
        description=issue.description,
        priority=issue.priority,
        status=issue.status,
        due_date=issue.due_date,
        inspection_id=issue.inspection_id,
        contractor_id=issue.contractor_id,
    )
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)
    return new_issue


@app.get("/documents", response_model=list[schemas.DocumentOut])
def get_documents(db: Session = Depends(get_db)):
    return db.query(models.Document).all()


@app.post("/documents", response_model=schemas.DocumentOut)
def create_document(document: schemas.DocumentCreate, db: Session = Depends(get_db)):
    new_document = models.Document(
        name=document.name,
        category=document.category,
        file_url=document.file_url,
        property_id=document.property_id,
        uploaded_at=datetime.utcnow(),
    )
    db.add(new_document)
    db.commit()
    db.refresh(new_document)
    return new_document


