import { 
  DocumentItem, 
  BlockchainLedgerBlock, 
  RiskMatrixConfig, 
  BoardMeetingSession, 
  RootCauseToolState,
  EscalationRule 
} from '../types';

export const INITIAL_RISK_MATRIX_CONFIG: RiskMatrixConfig = {
  dimension: 5,
  likelihoodLabels: [
    { score: 1, labelEn: 'Rare (1)', labelAr: 'نادر جداً (١)' },
    { score: 2, labelEn: 'Unlikely (2)', labelAr: 'غير محتمل (٢)' },
    { score: 3, labelEn: 'Possible (3)', labelAr: 'محتمل (٣)' },
    { score: 4, labelEn: 'Likely (4)', labelAr: 'مرجح (٤)' },
    { score: 5, labelEn: 'Almost Certain (5)', labelAr: 'شبه مؤكد (٥)' },
  ],
  impactLabels: [
    { score: 1, labelEn: 'Insignificant (1)', labelAr: 'طفيف جداً (١)' },
    { score: 2, labelEn: 'Minor (2)', labelAr: 'محدود (٢)' },
    { score: 3, labelEn: 'Moderate (3)', labelAr: 'متوسط (٣)' },
    { score: 4, labelEn: 'Major (4)', labelAr: 'كبير (٤)' },
    { score: 5, labelEn: 'Catastrophic (5)', labelAr: 'كارثي (٥)' },
  ],
  thresholds: {
    low: 4,
    medium: 9,
    high: 15,
    critical: 20
  }
};

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-bc-01',
    type: 'BUSINESS_CASE',
    titleEn: 'Business Case: Autonomous GRC & KSA Regulatory Compliance Program',
    titleAr: 'دراسة الجدوى الاستثمارية: برنامج أتمتة الحوكمة والالتزام السيبراني الوطني',
    category: 'Strategic Justification',
    version: '1.0',
    createdAt: '2026-10-10 10:00',
    authorAgent: 'CIO',
    contentEn: `EXECUTIVE SUMMARY:
This strategic business case establishes the definitive justification for transitioning our enterprise compliance posture to the autonomous Agent X platform.

1. STRATEGIC DRIVERS:
- Elimination of recurring consultancy expenditures averaging 1.4M SAR annually.
- Accelerated time-to-compliance from 9 months down to 14 business days across NCA ECC, SAMA CSF, and ISO 27001.
- Guaranteed air-gapped sovereignty ensuring zero sensitive technical telemetry egresses to foreign public clouds.

2. RETURN ON INVESTMENT (ROI):
- First-Year Direct Cost Savings: 74%
- Audit Preparation Hours Saved: 850 man-hours
- Penalty Risk Mitigation (PDPL & CMA): 100% elimination of statutory breach exposure.

3. RESOURCE ALLOCATION:
- Executive Sponsor: Chief Executive Officer
- Operational Governance: Chief Information Security Officer (CISO)
- Assurance Lead: Chief Internal Auditor`,
    contentAr: `الملخص التنفيذي:
تضع دراسة الجدوى هذه المبررات الحاسمة لتبني منظومة Agent X المؤتمتة لتحقيق الامتثال الشامل للأنظمة الوطنية والدولية.

١. الدوافع الاستراتيجية:
- خفض تكاليف الاستشارات الخارجية المتكررة بمعدل ١.٤ مليون ريال سعودي سنوياً.
- تقليص زمن الحصول على شهادات الامتثال من ٩ أشهر إلى ١٤ يوم عمل عبر ضوابط الهيئة الوطنية (NCA ECC) وساما والآيزو.
- سيادة رقمية معزولة (Air-Gap) بنسبة ١٠٠٪ تمنع تسرب البيانات الحساسة لأي خدمات سحابية خارجية.

٢. العائد على الاستثمار:
- وفر مالي مباشر في السنة الأولى: ٧٤٪
- ساعات عمل تم توفيرها في تجهيز ملفات التدقيق: ٨٥٠ ساعة عمل
- تفادي العقوبات التنظيمية (نظام حماية البيانات وهيئة السوق المالية): حماية كاملة من المخالفات.`,
    status: 'approved_signed',
    approvalSignatures: [
      {
        id: 'sig-1',
        signerName: 'Abdulaziz Al-Roomi',
        signerRole: 'Chief Executive Officer (CEO)',
        signerEmail: 'abdulazizmsroomi@gmail.com',
        timestamp: '2026-10-10 16:30',
        mfaCode: '918234',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        blockchainBlockIndex: 1,
        status: 'approved'
      }
    ],
    documentHash: 'a7c92b5e1d44849202bfda1934c9f13e7784032a11b7f0e998124b45cc092e1f'
  },
  {
    id: 'doc-charter-01',
    type: 'PROJECT_CHARTER',
    titleEn: 'Project Charter: Unified Cybersecurity Controls Implementation & PDCA Cycle',
    titleAr: 'ميثاق المشروع: التطبيق الموحد لضوابط الأمن السيبراني ودورة التحسين المستمر',
    category: 'Project Governance',
    version: '1.2',
    createdAt: '2026-10-11 08:30',
    authorAgent: 'PROJECT_MANAGER',
    contentEn: `1. PROJECT PURPOSE & OBJECTIVES:
Institutionalize cybersecurity controls mapping across 11 industrial and national regulatory frameworks under strict human-in-the-loop oversight.

2. SCOPE OF BOUNDARIES:
- In Scope: Enterprise IT, Production DMZ, Corporate Active Directory, Air-Gapped Supervisory Networks, HR Data Privacy Workflows.
- Out of Scope: Decommissioned legacy branch servers scheduled for Q4 retirement.

3. SUCCESS CRITERIA:
- 100% compliance with NCA ECC-1:2018 mandatory controls.
- Full evidence validation by the Internal Auditor prior to external accreditation.
- Dual-language executive reporting in Arabic and English.`,
    contentAr: `١. الغرض والأهداف:
مأسسة ومطابقة ضوابط الأمن السيبراني عبر ١١ إطاراً تنظيمياً وطنياً ودولياً تحت إشراف وحوكمة بشرية صارمة.

٢. نطاق العمل:
- ضمن النطاق: بيئة تقنية المعلومات المؤسسية، خوادم النطاق، الشبكات المعزولة، وتدفقات حماية بيانات الموارد البشرية.
- خارج النطاق: الخوادم القديمة المجدول إيقافها في الربع الرابع.

٣. معايير النجاح:
- امتثال بنسبة ١٠٠٪ لضوابط الهيئة الوطنية للأمن السيبراني (ECC).
- اعتماد كامل للأدلة الميدانية بواسطة المراجع الداخلي قبل التدقيق الخارجي.
- تقارير ثنائية اللغة بالعربية والإنجليزية للقيادة العليا.`,
    status: 'approved_signed',
    approvalSignatures: [
      {
        id: 'sig-2',
        signerName: 'Abdulaziz Al-Roomi',
        signerRole: 'Chief Executive Officer (CEO)',
        signerEmail: 'abdulazizmsroomi@gmail.com',
        timestamp: '2026-10-11 11:20',
        mfaCode: '448102',
        sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        blockchainBlockIndex: 2,
        status: 'approved'
      }
    ],
    documentHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'doc-soa-01',
    type: 'SOA',
    titleEn: 'Statement of Applicability (SoA) - ISO 27001:2022 & NCA Mapping',
    titleAr: 'بيان قابلية التطبيق (SoA) - آيزو 27001 ومطابقة ضوابط الأمن السيبراني',
    category: 'Compliance Matrix',
    version: '2.0',
    createdAt: '2026-10-11 14:15',
    authorAgent: 'COMPLIANCE_MANAGER',
    contentEn: `STATEMENT OF APPLICABILITY (SoA):
Total Controls Analyzed: 93 (ISO 27001 Annex A) mapped to 114 (NCA ECC) controls.

- Applicable Controls: 89 (95.7%)
- Excluded Controls: 4 (Justification: Organization does not perform outsourced software development directly; vendor controls applied via A.5.19 instead).
- Implementation Mechanisms: Automated cryptographic verification, biometric zero trust, and air-gapped system isolation.`,
    contentAr: `بيان قابلية التطبيق (SoA):
إجمالي الضوابط المحللة: ٩٣ ضابطاً من ملحق الآيزو مطابقة مع ١١٤ ضابطاً من ضوابط الهيئة الوطنية.

- الضوابط المطبقة: ٨٩ ضابطاً (٩٥.٧٪)
- الضوابط المستثناة: ٤ ضوابط (المبرر: الجهة لا تقوم ببرمجة أنظمة تجارية خارجية وتعتمد على تدقيق المزودين عبر الضابط A.5.19).
- آليات التنفيذ: التحقق المشفر، انعدام الثقة، والعزل التام للشبكات الحيوية.`,
    status: 'pending_c_level',
    approvalSignatures: [],
    documentHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  },
  {
    id: 'doc-policy-01',
    type: 'POLICY_PROCEDURE',
    titleEn: 'Enterprise Cryptography & Key Management Policy',
    titleAr: 'سياسة التشفير وإدارة المفاتيح الأمنية المؤسسية',
    category: 'Technical Safeguards',
    version: '1.0',
    createdAt: '2026-10-12 09:00',
    authorAgent: 'CISO',
    contentEn: `PURPOSE & SCOPE:
Mandates 256-bit AES symmetric encryption at rest and TLS 1.3 with SHA-256 for all data in transit across enterprise perimeters.

KEY MANAGEMENT PROCEDURES:
1. Hardware Security Module (HSM) root of trust deployment.
2. Dual-custody key ceremony protocols with multi-party computation.
3. Air-gap offline key derivation for disaster recovery cold sites.`,
    contentAr: `الغرض والنطاق:
إلزام استخدام تشفير AES-256 للبيانات المخزنة وبروتوكول TLS 1.3 مع SHA-256 لكافة البيانات المنقولة عبر حدود المنظمة.

إجراءات إدارة المفاتيح:
١. نشر وحدات الأمان للأجهزة (HSM) كجذر موثوق.
٢. تطبيق بروتوكول الحيازة المزدوجة ومشاركة المفاتيح متعددة الأطراف.
٣. اشتقاق مفاتيح التشفير الاحتياطية في بيئة معزولة بالكامل (Air-Gap).`,
    status: 'pending_board',
    approvalSignatures: [],
    documentHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
  }
];

export const INITIAL_LEDGER_BLOCKS: BlockchainLedgerBlock[] = [
  {
    index: 0,
    timestamp: '2026-10-10 09:00:00',
    action: 'GENESIS_BLOCK_INITIALIZED',
    entityId: 'AGENT_X_AIRGAP_SOVEREIGNTY',
    actor: 'Agent X Security Kernel',
    role: 'Root of Trust',
    details: 'Cryptographic air-gap root anchor established with SHA-256 ledger.',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0000a4b7f8c92e1d44849202bfda1934c9f13e7784032a11b7f0e998124b45cc',
    mfaVerified: true
  },
  {
    index: 1,
    timestamp: '2026-10-10 16:30:15',
    action: 'HUMAN_APPROVAL_BUSINESS_CASE',
    entityId: 'doc-bc-01',
    actor: 'Abdulaziz Al-Roomi',
    role: 'Chief Executive Officer',
    details: 'Executive signed Business Case with MFA token 918234 and 256-bit signature.',
    previousHash: '0000a4b7f8c92e1d44849202bfda1934c9f13e7784032a11b7f0e998124b45cc',
    hash: '2c624232cdd221771294dfbb310aca000a0df6ec8b66304dc2bf1f8e229d8011',
    mfaVerified: true
  },
  {
    index: 2,
    timestamp: '2026-10-11 11:20:44',
    action: 'HUMAN_APPROVAL_PROJECT_CHARTER',
    entityId: 'doc-charter-01',
    actor: 'Abdulaziz Al-Roomi',
    role: 'Chief Executive Officer',
    details: 'Project Charter signed with MFA token 448102, authorizing multi-agent execution.',
    previousHash: '2c624232cdd221771294dfbb310aca000a0df6ec8b66304dc2bf1f8e229d8011',
    hash: '4857648cad622b349712b4e60beddc7bba5fcb3f123674d7f2e84f924f148ea0',
    mfaVerified: true
  }
];

export const INITIAL_BOARD_MEETING: BoardMeetingSession = {
  id: 'bm-2026-10',
  titleEn: 'Executive Agentic Board: Q4 Cyber Compliance & Air-Gap Validation',
  titleAr: 'مجلس الإدارة الاستشاري: اعتماد الامتثال والتحصين السيبراني المعزول للربع الرابع',
  scheduledDate: '2026-10-12 10:00',
  status: 'active',
  agendaEn: [
    'Review NCA ECC-1:2018 Mandatory Control Implementation Progress',
    'Assess Air-Gap Network Diode Hardening with CTO',
    'Evaluate Saudi PDPL Data Protection Impact Assessment (DPIA)',
    'Formulate Motion for C-Level Human-in-the-Loop Final Authorization'
  ],
  agendaAr: [
    'مراجعة وتيرة تطبيق الضوابط الأساسية للأمن السيبراني (ECC)',
    'تقييم كفاءة عزل الصمام الأحادي والشبكات المعزولة مع رئيس التكنولوجيا',
    'فحص مخرجات تقييم الأثر لنظام حماية البيانات الشخصية السعودي',
    'صياغة قرار المجلس لعرضه على القيادة التنفيذية للاعتماد النهائي'
  ],
  transcripts: [
    {
      id: 'tr-1',
      agentRole: 'CISO',
      timestamp: '10:02',
      speechEn: 'Board members, Dr. Tariq speaking. We have achieved 84% implementation across NCA ECC controls. However, privileged access management requires final CEO signature before hardware lockdown.',
      speechAr: 'أعضاء المجلس الكرام، يتحدث د. طارق المنصور. حققنا نسبة إنجاز ٨٤٪ في ضوابط الهيئة الوطنية، ولكن إدارة الوصول المميز تتطلب اعتماد الرئيس التنفيذي قبل الإقفال الفني النهائي.',
      motionVote: 'FOR'
    },
    {
      id: 'tr-2',
      agentRole: 'CRO',
      timestamp: '10:05',
      speechEn: 'Salman Al-Harbi here. Inherent risk on third-party integration remains at level 20 (Critical). By adopting SAMA CSF 3.4 vendor escrow, our residual score drops safely to 4 (Low).',
      speechAr: 'معكم سلمان الحربي. الخطر الكامن لمزودي الخدمات الخارجية يقف عند مستوى ٢٠ (حرج). وبموجب تطبيق ضابط ساما لحساب الضمان الأمني، ينخفض الخطر المتبقي إلى ٤ (منخفض).',
      motionVote: 'FOR'
    },
    {
      id: 'tr-3',
      agentRole: 'INTERNAL_AUDITOR',
      timestamp: '10:08',
      speechEn: 'Hamed Al-Subaie reviewing evidence. Computer Vision scans of the data diode configuration verified unroutable boundaries. Evidence is formally validated for audit.',
      speechAr: 'حامد السبيعي - المراجع الداخلي. تم فحص لقطات التكوين والوثائق بالرؤية الحاسوبية وتأكدنا تماماً من العزل التام للصمام الأحادي ومطابقة معايير التدقيق.',
      motionVote: 'FOR'
    }
  ],
  conclusionsEn: 'The Agentic Advisory Board unanimously approves submitting the Compliance Dossier to the Human Executive with recommendation for signature.',
  conclusionsAr: 'أقر المجلس الاستشاري بالإجماع رفع ملف الامتثال للرئيس التنفيذي للتوقيع والاعتماد الرقمي.'
};

export const INITIAL_ROOT_CAUSE_STATE: RootCauseToolState = {
  pestle: {
    political: [
      'Saudi Vision 2030 digital economy directives',
      'Mandatory national data sovereignty requirements by NCA & SDAIA'
    ],
    economic: [
      'Elimination of 1.4M SAR external advisory consultancy overheads',
      'Minimization of non-compliance fines up to 5M SAR'
    ],
    social: [
      'Heightened public awareness regarding personal privacy under PDPL',
      'Fostering domestic cybersecurity competencies in KSA'
    ],
    technological: [
      'Zero trust architecture & FIDO2 phishing-resistant authentication',
      'Air-gapped deployment capability with offline local neural reasoning'
    ],
    legal: [
      'Statutory compliance with SAMA, CMA, and TGA sector circulars',
      'Criminal liability protections for board members via audited controls'
    ],
    environmental: [
      'Paperless automated GRC records reducing corporate carbon footprint',
      'Optimized green data center computational profiles'
    ]
  },
  fishbone: {
    problemStatement: 'Potential delay in cross-regulatory compliance accreditation prior to Q4 audit',
    people: ['Segregation of duties between IT operations and cybersecurity governance'],
    process: ['Standard Operating Procedures (SOPs) awaiting multi-tier signoff'],
    technology: ['Automated air-gapped evidence collection without human manual burden'],
    governance: ['Executive alignment and board meeting cadence verification'],
    measurement: ['Real-time clock dynamic metrics measuring residual vs inherent risk'],
    environment: ['Physical and logical air-gap perimeter enforcement']
  },
  fiveWhys: {
    incidentTitle: 'Root-Cause Analysis: Prolonged Legacy Compliance Cycles',
    whys: [
      {
        level: 1,
        question: 'Why did traditional compliance certifications take over 9 months?',
        answer: 'Because organizations heavily relied on manual external consultants preparing disparate spreadsheets.',
        rootCauseFound: false
      },
      {
        level: 2,
        question: 'Why were manual spreadsheets and consultancies inefficient?',
        answer: 'Each framework (NCA, ISO, SAMA, NIST) was treated in isolated silos with duplicate control reviews.',
        rootCauseFound: false
      },
      {
        level: 3,
        question: 'Why was there no automated cross-framework mapping?',
        answer: 'Teams lacked unified agentic intelligence capable of mapping 1,200+ controls across Saudi and international standards.',
        rootCauseFound: false
      },
      {
        level: 4,
        question: 'Why were evidence reviews fraught with delays and rejections?',
        answer: 'Lack of automated computer-vision inspection verifying cryptographic seals and technical configurations prior to audit.',
        rootCauseFound: false
      },
      {
        level: 5,
        question: 'Why was executive authorization detached from the workflow?',
        answer: 'Lack of an integrated blockchain-style ledger with cryptographic MFA and digital signature hierarchy.',
        rootCauseFound: true
      }
    ],
    remedialAction: 'Deploy Agent X autonomous dual-hemisphere platform with air-gapped local intelligence and human-in-the-loop MFA cryptographic governance.'
  }
};

export const INITIAL_ESCALATION_RULES: EscalationRule[] = [
  {
    id: 'esc-1',
    tier: 'TIER_1_OPERATIONAL',
    slaHours: 4,
    targetRole: 'CYBERSECURITY_MANAGER',
    channels: ['active_directory', 'email'],
    descriptionEn: 'Operational control deviation or failed technical evidence verification.',
    descriptionAr: 'انحراف في الضوابط الفنية أو فشل التحقق الآلي من الأدلة الفنية.',
    activeIncidentsCount: 1
  },
  {
    id: 'esc-2',
    tier: 'TIER_2_MANAGEMENT',
    slaHours: 12,
    targetRole: 'CISO',
    channels: ['email', 'whatsapp'],
    descriptionEn: 'Pending regulatory approval exceeding SLA deadline or high-residual risk exposure.',
    descriptionAr: 'تجاوز مهلة الاعتماد النظامي أو رصد خطر متبقٍ عالي الشدة.',
    activeIncidentsCount: 0
  },
  {
    id: 'esc-3',
    tier: 'TIER_3_BOARD_EXECUTIVE',
    slaHours: 24,
    targetRole: 'CIO',
    channels: ['active_directory', 'email', 'whatsapp'],
    descriptionEn: 'Critical statutory non-conformance with impending regulatory penalty exposure.',
    descriptionAr: 'عدم مطابقة حرجة لأحد الضوابط الإلزامية تهدد بفرض غرامة نظامية.',
    activeIncidentsCount: 0
  }
];
