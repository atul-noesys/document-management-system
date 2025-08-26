// hooks/useTranslation.ts
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/dictionary";
import { useEffect, useState } from "react";

export const useTranslation = () => {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = (key: keyof typeof dictionary.en) => {
    if (!isMounted) return "";
    return dictionary[language][key];
  };

  return { t, language };
};
