import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const VerifiedBadge = ({ size = "sm", className = "" }) => {
  const { t } = useLanguage();
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/20 ${
        isSm ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
      } ${className}`}
      title="GramSetu Verified Rural Producer"
    >
      <CheckCircle className={isSm ? "w-3.5 h-3.5 text-[#176B3A]" : "w-4 h-4 text-[#176B3A]"} />
      <span>{t('verifiedSeller')}</span>
    </span>
  );
};

export default VerifiedBadge;
