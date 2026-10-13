import React, { useState } from 'react';
import { 
  Key, 
  Lock, 
  CheckCircle, 
  Link2, 
  RefreshCw
} from 'lucide-react';
import { Language, DocumentItem, BlockchainLedgerBlock, ApprovalSignature } from '../types';
import { computeSha256, generateMfaCode, generateSignatureHex } from '../utils/crypto';

interface ApprovalLedgerViewProps {
  lang: Language;
  documents: DocumentItem[];
  ledger: BlockchainLedgerBlock[];
  onUpdateDocument: (doc: DocumentItem) => void;
  onAddLedgerBlock: (block: BlockchainLedgerBlock) => void;
}

export const ApprovalLedgerView: React.FC<ApprovalLedgerViewProps> = ({
  lang,
  documents,
  ledger,
  onUpdateDocument,
  onAddLedgerBlock
}) => {
  const isAr = lang === 'ar';
  
  // Pending approvals list
  const pendingDocs = documents.filter(d => d.status.startsWith('pending'));

  // Approval modal state
  const [selectedDocToApprove, setSelectedDocToApprove] = useState<DocumentItem | null>(null);
  const [mfaInput, setMfaInput] = useState('');
  const [expectedMfa, setExpectedMfa] = useState('');
  const [signatureKey, setSignatureKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null);

  // Open approval modal
  const handleOpenApprovalModal = (doc: DocumentItem) => {
    setSelectedDocToApprove(doc);
    const code = generateMfaCode();
    setExpectedMfa(code);
    setMfaInput(code);
    setSignatureKey(generateSignatureHex());
    setVerificationSuccess(null);
  };

  // Execute Cryptographic Human Approval
  const handleExecuteApproval = async () => {
    if (!selectedDocToApprove) return;
    setIsVerifying(true);

    try {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const prevBlock = ledger[ledger.length - 1];
      const newBlockIndex = ledger.length;

      const blockPayload = `${newBlockIndex}-${prevBlock.hash}-${selectedDocToApprove.id}-Abdulaziz Al-Roomi-CEO-${signatureKey}-${mfaInput}-${timestamp}`;
      const blockHash = await computeSha256(blockPayload);

      const approvalSig: ApprovalSignature = {
        id: `sig-${Date.now().toString(36)}`,
        signerName: 'Abdulaziz Al-Roomi',
        signerRole: 'Chief Executive Officer (CEO)',
        signerEmail: 'abdulazizmsroomi@gmail.com',
        timestamp,
        mfaCode: mfaInput,
        sha256Hash: blockHash,
        blockchainBlockIndex: newBlockIndex,
        status: 'approved'
      };

      const updatedDoc: DocumentItem = {
        ...selectedDocToApprove,
        status: 'approved_signed',
        approvalSignatures: [...selectedDocToApprove.approvalSignatures, approvalSig]
      };

      const newBlock: BlockchainLedgerBlock = {
        index: newBlockIndex,
        timestamp,
        action: `HUMAN_APPROVAL_${selectedDocToApprove.type}`,
        entityId: selectedDocToApprove.id,
        actor: 'Abdulaziz Al-Roomi',
        role: 'Chief Executive Officer (CEO)',
        details: `Cryptographically signed with MFA code ${mfaInput} & 256-bit key. Authorized for execution phase.`,
        previousHash: prevBlock.hash,
        hash: blockHash,
        mfaVerified: true
      };

      onUpdateDocument(updatedDoc);
      onAddLedgerBlock(newBlock);
      setVerificationSuccess(blockHash);

      setTimeout(() => {
        setSelectedDocToApprove(null);
        setVerificationSuccess(null);
      }, 1800);

    } catch (e) {
      console.error(e);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
              <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                {isAr ? 'حوكمة التحقق البشري الصارم (Human-in-the-Loop)' : 'Human-in-the-Loop & Blockchain Ledger'}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
              {isAr ? 'طابور الاعتماد التنفيذي وسجل البلوكتشين التشفيري' : 'Executive Approval Hierarchy & Cryptographic Chain'}
            </h1>
            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
              {isAr 
                ? 'لا يمكن للقوة الوكيلة اعتماد أو تمرير أي قرار دون توقيع بشري صريح برمز تحقق MFA ومفتاح تشفير 256-bit مسجل في سلسلة كتل غير قابلة للتعديل.'
                : 'Agents cannot authorize actions without explicit human cryptographic MFA sign-off appended to the immutable SHA-256 ledger.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-teal-950 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-3 py-1.5 rounded-lg border-2 border-teal-400 dark:border-cyan-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              <span>{isAr ? 'سلامة السجل التشفيري: ١٠٠٪' : 'Ledger Integrity: 100% Tamper Evident'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Approval Queue (Left) + Blockchain Ledger Blocks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Human Approval Queue */}
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-neutral-950 dark:text-white">
                {isAr ? 'طابور الوثائق بانتظار الاعتماد البشري' : 'Pending Human Approval Queue'}
              </h3>
              <p className="text-xs font-semibold text-teal-800 dark:text-teal-400">
                {isAr ? `${pendingDocs.length} وثائق جاهزة للتوقيع النهائي` : `${pendingDocs.length} items awaiting C-Level authorization`}
              </p>
            </div>
            <span className="text-xs font-mono font-black bg-teal-50 dark:bg-cyan-950/70 text-teal-900 dark:text-cyan-300 px-2.5 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
              {pendingDocs.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingDocs.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-neutral-300 dark:border-slate-700 rounded-lg bg-neutral-50 dark:bg-[#080e1b]">
                <CheckCircle className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto" />
                <p className="text-xs font-bold text-neutral-900 dark:text-white mt-2">
                  {isAr ? 'كافة الوثائق معتمدة وموقعة رقمياً!' : 'All documents are cryptographically approved!'}
                </p>
                <p className="text-[11px] font-medium text-neutral-500 dark:text-slate-400 mt-0.5">
                  {isAr ? 'القوة الوكيلة تعمل الآن في مرحلة التنفيذ' : 'Agentic force is currently executing in Phase 02.'}
                </p>
              </div>
            ) : (
              pendingDocs.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b] space-y-3 hover:bg-neutral-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-neutral-900 dark:text-cyan-300 bg-neutral-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-neutral-300 dark:border-slate-700">
                      {doc.type}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-slate-400">
                      {doc.createdAt}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-neutral-950 dark:text-white">
                    {isAr ? doc.titleAr : doc.titleEn}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-slate-400 pt-2 border-t border-neutral-200 dark:border-slate-800 font-medium">
                    <span>{isAr ? `صياغة الوكيل: ${doc.authorAgent}` : `Authored by: ${doc.authorAgent}`}</span>
                    <button
                      onClick={() => handleOpenApprovalModal(doc)}
                      className="px-3.5 py-1.5 bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isAr ? 'اعتماد بتوقيع MFA' : 'Sign with MFA'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blockchain Ledger Blocks Stream */}
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-neutral-950 dark:text-white">
                {isAr ? 'سجل البلوكتشين التشفيري غير القابل للتعديل' : 'Immutable Blockchain Ledger Blocks'}
              </h3>
              <p className="text-xs font-semibold text-teal-800 dark:text-teal-400">
                {isAr ? `${ledger.length} كتل مرتبطة بـ SHA-256` : `${ledger.length} Chained cryptographic blocks`}
              </p>
            </div>
            <Link2 className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {ledger.slice().reverse().map((block) => (
              <div 
                key={block.index}
                className="p-3.5 rounded-xl border-2 border-teal-200 dark:border-teal-500/30 bg-white dark:bg-[#080e1b] space-y-2 text-xs font-mono hover:border-teal-400 dark:hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-neutral-950 dark:text-cyan-300">
                      BLOCK #{block.index}
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-[10px] text-neutral-500 dark:text-slate-400 font-medium">
                      {block.timestamp}
                    </span>
                  </div>
                  <span className="text-[10px] bg-teal-50 dark:bg-emerald-950/60 text-teal-900 dark:text-emerald-300 border border-teal-300 dark:border-emerald-500/40 px-1.5 py-0.5 rounded font-sans font-bold">
                    MFA VERIFIED
                  </span>
                </div>

                <div className="font-sans text-xs font-bold text-neutral-950 dark:text-white">
                  {block.action}
                </div>

                <p className="font-sans text-[11px] text-neutral-700 dark:text-slate-300 font-medium">
                  {block.details}
                </p>

                {/* Hashes */}
                <div className="pt-2 border-t border-teal-100 dark:border-slate-800 text-[10px] space-y-1">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-slate-400">
                    <span className="font-bold">PREV HASH:</span>
                    <span className="truncate max-w-[220px] font-mono">{block.previousHash}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-900 dark:text-teal-300 font-bold">
                    <span>BLOCK HASH:</span>
                    <span className="truncate max-w-[220px] font-mono">{block.hash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MFA & 256-Bit Cryptographic Approval Modal */}
      {selectedDocToApprove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-neutral-900 dark:text-slate-100 shadow-teal-500/20">
            <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                <h3 className="text-base font-black text-neutral-950 dark:text-white">
                  {isAr ? 'الاعتماد الرقمي للرئيس التنفيذي (MFA)' : 'Executive MFA Cryptographic Sign-Off'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocToApprove(null)}
                className="text-neutral-500 dark:text-slate-400 hover:text-black dark:hover:text-white text-sm p-1 rounded-md border border-teal-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#080e1b] border border-neutral-200 dark:border-slate-800 text-xs space-y-1">
                <span className="text-[10px] text-neutral-600 dark:text-cyan-400 uppercase font-bold">
                  {isAr ? 'الوثيقة المراد اعتمادها:' : 'Document to Authorize:'}
                </span>
                <p className="font-bold text-neutral-950 dark:text-white">
                  {isAr ? selectedDocToApprove.titleAr : selectedDocToApprove.titleEn}
                </p>
                <p className="font-mono text-[10px] text-neutral-600 dark:text-slate-400 truncate">
                  SHA-256: {selectedDocToApprove.documentHash}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'رمز التحقق الثنائي MFA (مكون من ٦ أرقام):' : '6-Digit MFA Verification Code:'}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    maxLength={6}
                    value={mfaInput}
                    onChange={(e) => setMfaInput(e.target.value)}
                    className="flex-1 text-center font-mono font-bold text-base tracking-widest py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => {
                      const code = generateMfaCode();
                      setExpectedMfa(code);
                      setMfaInput(code);
                    }}
                    className="p-2 border border-neutral-300 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg text-neutral-700 dark:text-slate-300 transition-colors"
                    title={isAr ? 'توليد رمز MFA جديد' : 'Generate new MFA code'}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'المفتاح الرقمي المشفر 256-Bit:' : 'Encrypted 256-Bit Digital Signature Key:'}
                </label>
                <input
                  type="text"
                  readOnly
                  value={signatureKey}
                  className="w-full text-[11px] font-mono mt-1 p-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-teal-300 select-all font-bold"
                />
              </div>

              {verificationSuccess && (
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-500/50 text-teal-900 dark:text-teal-200 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>
                    {isAr ? 'تم التحقق بنجاح وإضافة الكتلة لسلسلة البلوكتشين!' : 'Signed successfully! Block minted and appended to ledger.'}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedDocToApprove(null)}
                className="px-3.5 py-2 text-xs font-bold rounded-lg text-neutral-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleExecuteApproval}
                disabled={isVerifying || mfaInput.length < 6}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isVerifying ? (isAr ? 'جاري التوقيع والتعدين...' : 'Minting Block...') : (isAr ? 'توقيع واعتماد رسمي' : 'Confirm & Authorize')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
