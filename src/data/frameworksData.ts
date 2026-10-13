import { Framework, ControlItem } from '../types';

export const FRAMEWORKS: Framework[] = [
  // Saudi National Frameworks
  {
    id: 'NCA_ECC',
    nameEn: 'NCA Essential Cybersecurity Controls (ECC-1:2018)',
    nameAr: 'الضوابط الأساسية للأمن السيبراني (ECC-1:2018)',
    category: 'national_saudi',
    totalControls: 114,
    descriptionEn: 'Mandatory minimum cybersecurity requirements issued by the National Cybersecurity Authority of Saudi Arabia.',
    descriptionAr: 'الحد الأدنى الإلزامي من ضوابط الأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني في المملكة العربية السعودية.',
    authority: 'National Cybersecurity Authority (NCA - KSA)',
    version: 'ECC-1:2018'
  },
  {
    id: 'NCA_CSCC',
    nameEn: 'NCA Critical Systems Cybersecurity Controls (CSCC-1:2019)',
    nameAr: 'ضوابط الأمن السيبراني للأنظمة الحساسة (CSCC-1:2019)',
    category: 'national_saudi',
    totalControls: 35,
    descriptionEn: 'High-rigor controls safeguarding national critical information infrastructures and OT/SCADA systems.',
    descriptionAr: 'ضوابط فائقة التحصين لحماية البنى التحتية الحيوية وأنظمة التحكم الصناعي في المملكة.',
    authority: 'National Cybersecurity Authority (NCA - KSA)',
    version: 'CSCC-1:2019'
  },
  {
    id: 'SAMA_CSF',
    nameEn: 'SAMA Cybersecurity Framework v3.0',
    nameAr: 'إطار العمل للأمن السيبراني للبنك المركزي السعودي (ساما)',
    category: 'national_saudi',
    totalControls: 88,
    descriptionEn: 'Binding framework for banking, fintech, insurance, and financing institutions operating under SAMA regulation.',
    descriptionAr: 'الإطار الملزم للقطاع المالي والمصرفي وشركات التقنية المالية والتأمين الخاضعة لإشراف البنك المركزي.',
    authority: 'Saudi Central Bank (SAMA)',
    version: 'v3.0'
  },
  {
    id: 'CMA_CSF',
    nameEn: 'CMA Cybersecurity Guidelines & Requirements',
    nameAr: 'متطلبات وإرشادات هيئة السوق المالية للأمن السيبراني',
    category: 'national_saudi',
    totalControls: 42,
    descriptionEn: 'Cybersecurity requirements for listed joint-stock companies, capital market brokers, and authorized persons.',
    descriptionAr: 'تعليمات وضوابط الأمن السيبراني للمؤسسات المالية المدرجة والأشخاص المرخص لهم من هيئة السوق المالية.',
    authority: 'Capital Market Authority (CMA - KSA)',
    version: '2022.1'
  },
  {
    id: 'PDPL',
    nameEn: 'Saudi Personal Data Protection Law (PDPL)',
    nameAr: 'نظام حماية البيانات الشخصية ولائحته التنفيذية (PDPL)',
    category: 'national_saudi',
    totalControls: 43,
    descriptionEn: 'Statutory regulation governing personal data processing, cross-border transfers, and data subjects rights in KSA.',
    descriptionAr: 'النظام الوطني لحماية البيانات الشخصية وحوكمة نقل البيانات خارج الحدود وحقوق أصحاب البيانات.',
    authority: 'SDAIA / National Data Management Office (NDMO)',
    version: 'Royal Decree M/19'
  },
  {
    id: 'TGA_CYBER',
    nameEn: 'TGA Transport & Logistics Cybersecurity Controls',
    nameAr: 'ضوابط الأمن السيبراني للهيئة العامة للنقل والخدمات اللوجستية',
    category: 'national_saudi',
    totalControls: 31,
    descriptionEn: 'Cyber resiliency directives for transport fleets, maritime, rail, and logistics supply chain systems in KSA.',
    descriptionAr: 'الضوابط السيبرانية لأسطول النقل والسكك الحديدية والموانئ وسلاسل الإمداد اللوجستية في المملكة.',
    authority: 'Transport General Authority (TGA - KSA)',
    version: 'TGA-CYB-2023'
  },

  // International Frameworks
  {
    id: 'ISO_27001',
    nameEn: 'ISO/IEC 27001:2022 Information Security Management',
    nameAr: 'المعيار الدولي لنظام إدارة أمن المعلومات (ISO 27001:2022)',
    category: 'international',
    totalControls: 93,
    descriptionEn: 'Global gold standard for establishment, implementation, maintenance, and continual improvement of an ISMS.',
    descriptionAr: 'المعيار العالمي الذهبي لإنشاء وتطبيق ومراجعة نظام إدارة أمن المعلومات المؤسسي.',
    authority: 'International Organization for Standardization (ISO)',
    version: '2022 Revision'
  },
  {
    id: 'ISO_31000',
    nameEn: 'ISO 31000:2018 Enterprise Risk Management',
    nameAr: 'المعيار الدولي لإدارة المخاطر المؤسسية (ISO 31000:2018)',
    category: 'international',
    totalControls: 28,
    descriptionEn: 'Principles, framework, and process guidelines for enterprise risk identification, assessment, and treatment.',
    descriptionAr: 'المبادئ الإرشادية وإطار العمل الدولي لتحديد وتقييم ومعالجة المخاطر المؤسسية.',
    authority: 'International Organization for Standardization (ISO)',
    version: '2018 Revision'
  },
  {
    id: 'NIST_CSF',
    nameEn: 'NIST Cybersecurity Framework 2.0 (CSF)',
    nameAr: 'إطار المعهد الوطني للمعايير والتقنية (NIST CSF 2.0)',
    category: 'international',
    totalControls: 106,
    descriptionEn: 'Industry-leading six-function cybersecurity lifecycle: Govern, Identify, Protect, Detect, Respond, and Recover.',
    descriptionAr: 'الإطار المرجعي العالمي المرتكز على ست وظائف: الحوكمة، التحديد، الحماية، الاكتشاف، الاستجابة، والتعافي.',
    authority: 'U.S. National Institute of Standards and Technology',
    version: 'CSF 2.0'
  },
  {
    id: 'CIS_V8',
    nameEn: 'CIS Critical Security Controls v8',
    nameAr: 'ضوابط مركز أمن الإنترنت للتحصين الفني (CIS v8)',
    category: 'international',
    totalControls: 153,
    descriptionEn: 'Prioritized prescriptive technical safeguards across 18 control groups for defensive cyber hygiene.',
    descriptionAr: 'قائمة التدابير والضوابط الفنية ذات الأولوية للدفاع السيبراني والتحصين التقني المباشر.',
    authority: 'Center for Internet Security (CIS)',
    version: 'v8.0'
  },
  {
    id: 'GDPR',
    nameEn: 'EU General Data Protection Regulation (GDPR)',
    nameAr: 'اللائحة العامة الأوروبية لحماية البيانات (GDPR)',
    category: 'international',
    totalControls: 99,
    descriptionEn: 'Comprehensive regulatory benchmark for data privacy rights, consent architecture, and breach notifications.',
    descriptionAr: 'المعيار الأوروبي لحوكمة خصوصية البيانات وحقوق الأفراد وإجراءات الإبلاغ عن الانتهاكات.',
    authority: 'European Data Protection Board (EDPB)',
    version: 'Regulation 2016/679'
  }
];

export const INITIAL_CONTROLS: ControlItem[] = [
  {
    id: 'ctrl-ecc-1-1-1',
    code: 'NCA-ECC-1-1-1',
    titleEn: 'Cybersecurity Governance & Strategy Approval',
    titleAr: 'حوكمة الأمن السيبراني واعتماد الاستراتيجية',
    domainEn: 'Cybersecurity Governance',
    domainAr: 'حوكمة الأمن السيبراني',
    frameworkId: 'NCA_ECC',
    mappedFrameworks: [
      { framework: 'ISO_27001', controlRef: 'A.5.1 Policies for info security' },
      { framework: 'NIST_CSF', controlRef: 'GV.OC-01 Organizational Context' },
      { framework: 'SAMA_CSF', controlRef: '1.1 Governance & Strategy' }
    ],
    descriptionEn: 'The organization must formulate and document a cybersecurity strategy approved by the Board of Directors, reviewed periodically.',
    descriptionAr: 'يجب على الجهة إعداد وتوثيق استراتيجية للأمن السيبراني معتمدة من مجلس الإدارة وتحديثها بصفة دورية.',
    assignedRole: 'CISO',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'completed',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualLikelihood: 1,
    residualImpact: 2,
    evidence: [
      {
        id: 'ev-1',
        filename: 'board_approved_cybersecurity_strategy_2026.pdf',
        uploadedAt: '2026-10-10 14:30',
        uploadedBy: 'Dr. Tariq Al-Mansoor (CISO)',
        fileSize: '4.2 MB',
        visionScanResult: {
          verified: true,
          confidence: 0.98,
          detectedArtifacts: ['Board Signature Seal', 'SHA-256 Stamp', 'Approval Resolution #882'],
          technicalAuditNotes: 'Computer Vision analysis confirmed genuine Board Chairman signature, cryptographic seal, and alignment with NCA ECC 1-1-1.',
          auditedBy: 'Mr. Hamed Al-Subaie (Internal Auditor)',
          auditTimestamp: '2026-10-10 15:10'
        }
      }
    ],
    lastUpdated: '2026-10-10 15:10'
  },
  {
    id: 'ctrl-ecc-1-2-1',
    code: 'NCA-ECC-1-2-1',
    titleEn: 'Cybersecurity Roles & RACI Responsibilities',
    titleAr: 'أدوار ومسؤوليات الأمن السيبراني ومصفوفة RACI',
    domainEn: 'Cybersecurity Governance',
    domainAr: 'حوكمة الأمن السيبراني',
    frameworkId: 'NCA_ECC',
    mappedFrameworks: [
      { framework: 'ISO_27001', controlRef: 'A.5.2 Roles & responsibilities' },
      { framework: 'NIST_CSF', controlRef: 'GV.RR-01 Roles & Resourcing' },
      { framework: 'SAMA_CSF', controlRef: '1.2 Organizational Roles' }
    ],
    descriptionEn: 'Establish an independent cybersecurity function reporting directly to executive leadership, ensuring segregation of duties.',
    descriptionAr: 'إنشاء إدارة مستقلة للأمن السيبراني ترتبط مباشرة برأس الهرم التنفيذي مع ضمان الفصل بين المهام المتعارضة.',
    assignedRole: 'GOVERNANCE_MANAGER',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'implemented',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 2,
    evidence: [
      {
        id: 'ev-2',
        filename: 'org_chart_and_raci_matrix_v3.pdf',
        uploadedAt: '2026-10-11 09:20',
        uploadedBy: 'Dr. Bandar Al-Shehri (Gov Mgr)',
        fileSize: '1.8 MB',
        visionScanResult: {
          verified: true,
          confidence: 0.95,
          detectedArtifacts: ['RACI Matrix Matrix Table', 'CEO Executive Endorsement'],
          technicalAuditNotes: 'Verified reporting structure directly to CEO without operational conflict with IT.',
          auditedBy: 'Mr. Hamed Al-Subaie (Internal Auditor)',
          auditTimestamp: '2026-10-11 10:00'
        }
      }
    ],
    lastUpdated: '2026-10-11 10:00'
  },
  {
    id: 'ctrl-ecc-2-1-1',
    code: 'NCA-ECC-2-1-1',
    titleEn: 'Multi-Factor Authentication (MFA) & Privileged Access',
    titleAr: 'التحقق متعدد العوامل وإدارة الوصول المميز',
    domainEn: 'Cybersecurity Defense',
    domainAr: 'تعزيز الأمن السيبراني',
    frameworkId: 'NCA_ECC',
    mappedFrameworks: [
      { framework: 'ISO_27001', controlRef: 'A.8.5 Secure authentication' },
      { framework: 'NIST_CSF', controlRef: 'PR.AA-01 Identity Management' },
      { framework: 'CIS_V8', controlRef: 'Control 6.3 Require MFA' },
      { framework: 'SAMA_CSF', controlRef: '3.1 Identity & Access' }
    ],
    descriptionEn: 'Enforce phishing-resistant MFA for all administrative, remote, and critical infrastructure access points.',
    descriptionAr: 'إلزام تطبيق التحقق الثنائي/متعدد العوامل المقاوم للتصيد لجميع جلسات الإدارة عن بعد والأنظمة الحساسة.',
    assignedRole: 'CYBERSECURITY_MANAGER',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'pending_approval',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualLikelihood: 2,
    residualImpact: 2,
    evidence: [
      {
        id: 'ev-3',
        filename: 'mfa_enforcement_active_directory_audit.png',
        uploadedAt: '2026-10-12 11:15',
        uploadedBy: 'Eng. Naif Al-Dossary (Cyber Ops)',
        fileSize: '820 KB',
        visionScanResult: {
          verified: true,
          confidence: 0.94,
          detectedArtifacts: ['FIDO2 Policy Screen', 'AD Conditional Access Rule', '99.8% Enforcement Metric'],
          technicalAuditNotes: 'Computer Vision verified Active Directory conditional access rule mandating FIDO2 MFA across all admin accounts.',
          auditedBy: 'Mr. Hamed Al-Subaie (Internal Auditor)',
          auditTimestamp: '2026-10-12 12:00'
        }
      }
    ],
    lastUpdated: '2026-10-12 12:00'
  },
  {
    id: 'ctrl-pdpl-1-3',
    code: 'PDPL-REQ-14',
    titleEn: 'Data Protection Impact Assessment (DPIA) & Consent Register',
    titleAr: 'تقييم أثر معالجة البيانات الشخصية وسجل الموافقات',
    domainEn: 'Data Privacy & Rights',
    domainAr: 'خصوصية البيانات وحقوق الأفراد',
    frameworkId: 'PDPL',
    mappedFrameworks: [
      { framework: 'GDPR', controlRef: 'Article 35 DPIA' },
      { framework: 'ISO_27001', controlRef: 'A.8.11 Data masking' },
      { framework: 'NCA_ECC', controlRef: 'ECC-2-12 Data Protection' }
    ],
    descriptionEn: 'Conduct statutory DPIA for high-risk data processing operations and maintain real-time personal consent ledger.',
    descriptionAr: 'إجراء تقييم أثر حماية البيانات لكافة عمليات المعالجة عالية الخطورة وإنشاء سجل توثيق موافقات أصحاب البيانات.',
    assignedRole: 'DPO',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'in_progress',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 3,
    evidence: [],
    lastUpdated: '2026-10-12 08:00'
  },
  {
    id: 'ctrl-sama-3-4',
    code: 'SAMA-CSF-3.4',
    titleEn: 'Third-Party Risk & Supply Chain Security',
    titleAr: 'أمن سلاسل الإمداد ومخاطر الطرف الثالث',
    domainEn: 'Third-Party Security',
    domainAr: 'أمن الأطراف الخارجية',
    frameworkId: 'SAMA_CSF',
    mappedFrameworks: [
      { framework: 'ISO_27001', controlRef: 'A.5.19 Supplier relationships' },
      { framework: 'NIST_CSF', controlRef: 'GV.SC-04 Supplier Assessment' },
      { framework: 'NCA_ECC', controlRef: 'ECC-4-1 Third Party Security' }
    ],
    descriptionEn: 'Perform cybersecurity due diligence, establish contractual security clauses, and continuously monitor external vendor risks.',
    descriptionAr: 'إجراء الفحص النافي للجهالة السيبراني لمزودي الخدمات وإلزامهم ببنود اتفاقيات مستوى الخدمة والتفتيش الدوري.',
    assignedRole: 'CRO',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'in_progress',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualLikelihood: 2,
    residualImpact: 2,
    evidence: [],
    lastUpdated: '2026-10-12 09:30'
  },
  {
    id: 'ctrl-cscc-2-2',
    code: 'NCA-CSCC-2-2',
    titleEn: 'Air-Gapped Network Segmentation & Industrial Isolation',
    titleAr: 'العزل الشبكي المحصن (Air-Gap) وحماية البيئات الصناعية',
    domainEn: 'Critical Systems Resilience',
    domainAr: 'صمود الأنظمة الحساسة',
    frameworkId: 'NCA_CSCC',
    mappedFrameworks: [
      { framework: 'CIS_V8', controlRef: 'Control 12 Network Infrastructure' },
      { framework: 'ISO_27001', controlRef: 'A.8.20 Network security' },
      { framework: 'TGA_CYBER', controlRef: 'TGA-SEC-09 Operational Tech' }
    ],
    descriptionEn: 'Physical and logical segregation of critical control infrastructure with unidirectional data diodes and strict air-gapping.',
    descriptionAr: 'الفصل المادي والمنطقي التام لشبكات العمليات والأنظمة الحساسة باستخدام تقنية الصمامات أحادية الاتجاه والعزل الكامل.',
    assignedRole: 'CTO',
    responsibleHuman: 'abdulazizmsroomi@gmail.com',
    status: 'implemented',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualLikelihood: 1,
    residualImpact: 2,
    evidence: [
      {
        id: 'ev-4',
        filename: 'airgap_data_diode_topology_inspection.pdf',
        uploadedAt: '2026-10-12 16:00',
        uploadedBy: 'Dr. Faisal Al-Ghamdi (CTO)',
        fileSize: '3.1 MB',
        visionScanResult: {
          verified: true,
          confidence: 0.97,
          detectedArtifacts: ['Data Diode Hardware Serial', 'Zero Direct Route Confirmed', 'Physical Airgap Layout'],
          technicalAuditNotes: 'Computer Vision confirmed unroutable optical data diode interface isolated from external WAN.',
          auditedBy: 'Mr. Hamed Al-Subaie (Internal Auditor)',
          auditTimestamp: '2026-10-12 16:45'
        }
      }
    ],
    lastUpdated: '2026-10-12 16:45'
  }
];
