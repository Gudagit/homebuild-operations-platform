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
