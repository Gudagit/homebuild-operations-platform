from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Community(Base):
    __tablename__ = "communities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    created_at = Column(DateTime)

    properties = relationship("Property", back_populates="community")


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    community_id = Column(Integer, ForeignKey("communities.id"))
    name = Column(String, nullable=False)
    address = Column(String)
    status = Column(String, default="in_progress")
    created_at = Column(DateTime)

    community = relationship("Community", back_populates="properties")
    stages = relationship("ConstructionStage", back_populates="property")
    documents = relationship("Document", back_populates="property")


class ConstructionStage(Base):
    __tablename__ = "construction_stages"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"))
    name = Column(String, nullable=False)
    order = Column(Integer)
    status = Column(String, default="not_started")
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)

    property = relationship("Property", back_populates="stages")
    tasks = relationship("Task", back_populates="stage")
    inspections = relationship("Inspection", back_populates="stage")


class Contractor(Base):
    __tablename__ = "contractors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialty = Column(String)
    phone = Column(String)
    email = Column(String)
    created_at = Column(DateTime)

    tasks = relationship("Task", back_populates="contractor")
    issues = relationship("Issue", back_populates="contractor")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    stage_id = Column(Integer, ForeignKey("construction_stages.id"))
    contractor_id = Column(Integer, ForeignKey("contractors.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="not_started")
    due_date = Column(Date, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    stage = relationship("ConstructionStage", back_populates="tasks")
    contractor = relationship("Contractor", back_populates="tasks")


class Inspection(Base):
    __tablename__ = "inspections"

    id = Column(Integer, primary_key=True, index=True)
    stage_id = Column(Integer, ForeignKey("construction_stages.id"))
    inspector_name = Column(String)
    inspection_date = Column(Date)
    result = Column(String, default="pending")
    notes = Column(Text, nullable=True)

    stage = relationship("ConstructionStage", back_populates="inspections")
    issues = relationship("Issue", back_populates="inspection")


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"))
    contractor_id = Column(Integer, ForeignKey("contractors.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    priority = Column(String, default="medium")
    status = Column(String, default="open")
    due_date = Column(Date, nullable=True)
    resolved_at = Column(DateTime, nullable=True)

    inspection = relationship("Inspection", back_populates="issues")
    contractor = relationship("Contractor", back_populates="issues")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"))
    name = Column(String, nullable=False)
    category = Column(String)
    file_url = Column(String)
    uploaded_at = Column(DateTime)

    property = relationship("Property", back_populates="documents")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime)
