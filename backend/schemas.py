from pydantic import BaseModel
from datetime import datetime


class CommunityBase(BaseModel):
    name: str
    location: str | None = None


class CommunityCreate(CommunityBase):
    pass


class CommunityOut(CommunityBase):
    id: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True

class PropertyBase(BaseModel):
    name: str
    address: str | None = None
    status: str = "in_progress"
    community_id: int


class PropertyCreate(PropertyBase):
    pass


class PropertyOut(PropertyBase):
    id: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True

class ContractorBase(BaseModel):
    name: str
    specialty: str | None = None
    phone: str | None = None
    email: str | None = None


class ContractorCreate(ContractorBase):
    pass


class ContractorOut(ContractorBase):
    id: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True


class ConstructionStageBase(BaseModel):
    name: str
    order: int
    status: str = "not_started"
    start_date: str | None = None
    end_date: str | None = None
    property_id: int


class ConstructionStageCreate(ConstructionStageBase):
    pass


class ConstructionStageOut(ConstructionStageBase):
    id: int

    class Config:
        from_attributes = True


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    status: str = "not_started"
    due_date: str | None = None
    stage_id: int
    contractor_id: int | None = None


class TaskCreate(TaskBase):
    pass


class TaskOut(TaskBase):
    id: int
    completed_at: datetime | None = None

    class Config:
        from_attributes = True


class InspectionBase(BaseModel):
    inspector_name: str | None = None
    inspection_date: str | None = None
    result: str = "pending"
    notes: str | None = None
    stage_id: int


class InspectionCreate(InspectionBase):
    pass


class InspectionOut(InspectionBase):
    id: int

    class Config:
        from_attributes = True

class IssueBase(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    status: str = "open"
    due_date: str | None = None
    inspection_id: int
    contractor_id: int | None = None


class IssueCreate(IssueBase):
    pass


class IssueOut(IssueBase):
    id: int
    resolved_at: datetime | None = None

    class Config:
        from_attributes = True


class DocumentBase(BaseModel):
    name: str
    category: str | None = None
    file_url: str | None = None
    property_id: int


class DocumentCreate(DocumentBase):
    pass


class DocumentOut(DocumentBase):
    id: int
    uploaded_at: datetime | None = None

    class Config:
        from_attributes = True
class PropertyStatusUpdate(BaseModel):
    status: str



