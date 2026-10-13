export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type AgentRole =
  | 'CISO'
  | 'CIO'
  | 'CTO'
  | 'CRO'
  | 'COMPLIANCE_MANAGER'
  | 'DPO'
  | 'GOVERNANCE_MANAGER'
  | 'CYBERSECURITY_MANAGER'
  | 'INTERNAL_AUDITOR'
  | 'PROJECT_MANAGER';

export interface AgentPersona {
  role: AgentRole;
  titleEn: string;
  titleAr: string;
  nameEn: string;
  nameAr: string;
  department: string;
  avatarSeed: string;
  specializationEn: string;
  specializationAr: string;
  hemisphere: 'right' | 'left';
  voiceProfile: {
    voicePitch: number;
    voiceRate: number;
    langCode: string;
    description: string;
  };
}

export type FrameworkId =
  | 'NCA_ECC'
  | 'NCA_CSCC'
  | 'SAMA_CSF'
  | 'CMA_CSF'
  | 'PDPL'
  | 'TGA_CYBER'
  | 'ISO_27001'
  | 'ISO_31000'
  | 'NIST_CSF'
  | 'CIS_V8'
  | 'GDPR';

export interface Framework {
  id: FrameworkId;
  nameEn: string;
  nameAr: string;
  category: 'national_saudi' | 'international';
  totalControls: number;
  descriptionEn: string;
  descriptionAr: string;
  authority: string;
  version: string;
}

export type ControlStatus =
  | 'not_started'
  | 'in_progress'
  | 'pending_approval'
  | 'implemented'
  | 'auditing'
  | 'completed'
  | 'remarks_needed';

export interface ControlItem {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  domainEn: string;
  domainAr: string;
  frameworkId: FrameworkId;
  mappedFrameworks: {
    framework: FrameworkId;
    controlRef: string;
  }[];
  descriptionEn: string;
  descriptionAr: string;
  assignedRole: AgentRole;
  responsibleHuman: string;
  status: ControlStatus;
  inherentLikelihood: number;
  inherentImpact: number;
  residualLikelihood: number;
  residualImpact: number;
  evidence: EvidenceItem[];
  auditorRemarks?: string;
  lastUpdated: string;
}

export interface EvidenceItem {
  id: string;
  filename: string;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  visionScanResult?: {
    verified: boolean;
    confidence: number;
    detectedArtifacts: string[];
    technicalAuditNotes: string;
    auditedBy: string;
    auditTimestamp: string;
  };
}

export interface RiskMatrixConfig {
  dimension: 3 | 4 | 5;
  likelihoodLabels: { score: number; labelEn: string; labelAr: string }[];
  impactLabels: { score: number; labelEn: string; labelAr: string }[];
  thresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export interface DocumentItem {
  id: string;
  type:
    | 'BUSINESS_CASE'
    | 'PROJECT_CHARTER'
    | 'SOW'
    | 'POLICY_PROCEDURE'
    | 'SOA'
    | 'MOM'
    | 'COMMUNICATION_PLAN'
    | 'TIME_MANAGEMENT';
  titleEn: string;
  titleAr: string;
  category: string;
  version: string;
  createdAt: string;
  authorAgent: AgentRole;
  contentEn: string;
  contentAr: string;
  status: 'draft' | 'pending_board' | 'pending_c_level' | 'approved_signed' | 'rejected';
  approvalSignatures: ApprovalSignature[];
  documentHash: string;
}

export interface ApprovalSignature {
  id: string;
  signerName: string;
  signerRole: string;
  signerEmail: string;
  timestamp: string;
  mfaCode: string;
  sha256Hash: string;
  blockchainBlockIndex: number;
  status: 'approved' | 'rejected' | 'pending';
}

export interface BlockchainLedgerBlock {
  index: number;
  timestamp: string;
  action: string;
  entityId: string;
  actor: string;
  role: string;
  details: string;
  previousHash: string;
  hash: string;
  mfaVerified: boolean;
}

export interface BoardMeetingSession {
  id: string;
  titleEn: string;
  titleAr: string;
  scheduledDate: string;
  status: 'active' | 'concluded';
  agendaEn: string[];
  agendaAr: string[];
  transcripts: {
    id: string;
    agentRole: AgentRole;
    timestamp: string;
    speechEn: string;
    speechAr: string;
    motionVote?: 'FOR' | 'AGAINST' | 'ABSTAIN';
  }[];
  conclusionsEn: string;
  conclusionsAr: string;
  momDocumentId?: string;
}

export interface RootCauseToolState {
  pestle: {
    political: string[];
    economic: string[];
    social: string[];
    technological: string[];
    legal: string[];
    environmental: string[];
  };
  fishbone: {
    problemStatement: string;
    people: string[];
    process: string[];
    technology: string[];
    governance: string[];
    measurement: string[];
    environment: string[];
  };
  fiveWhys: {
    incidentTitle: string;
    whys: { level: number; question: string; answer: string; rootCauseFound: boolean }[];
    remedialAction: string;
  };
}

export interface EscalationRule {
  id: string;
  tier: 'TIER_1_OPERATIONAL' | 'TIER_2_MANAGEMENT' | 'TIER_3_BOARD_EXECUTIVE';
  slaHours: number;
  targetRole: AgentRole;
  channels: ('active_directory' | 'email' | 'whatsapp')[];
  descriptionEn: string;
  descriptionAr: string;
  activeIncidentsCount: number;
}
