export enum Seniority {
    NotAvailable,
    Junior,
    JuniorMiddle,
    Middle,
    MiddleSenior,
    Senior
};

export enum CandidateStatus
{
    Proposed,
    Rejected,
    Hired
}

export enum EnglishLevel
{
    A1,
    A2,
    B1,
    B2,
    C1,
    C2
}

export interface HR {
    id: string;
    fullName: string;
}

export interface Candidate {
    id: number;
    fullName: string;
    city: string;
    email: string;
    phone: string;
    skype: string;
    seniority?: Seniority;
    experience?: number;
    techStack?: number;
    english?: EnglishLevel;
    position?: Position;
    positionId?: number;
    hr?: HR;
    hrId?: number;
    comments: string;
    status: CandidateStatus;
    created: string;
}

export interface Position {
    id: number;
    title: string;
    description: string;
    seniority: Seniority;
    techStack: string;
    active: boolean;
}

