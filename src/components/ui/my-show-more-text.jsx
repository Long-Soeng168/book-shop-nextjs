// components/MyShowMoreText.js
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";
import { useTranslations } from "next-intl";

const MyShowMoreText = ({ text, maxLine = 4 }) => {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);
  const t = useTranslations('Index');

  const toggleText = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const checkIfTextIsTruncated = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    };

    checkIfTextIsTruncated();
    window.addEventListener("resize", checkIfTextIsTruncated);

    return () => {
      window.removeEventListener("resize", checkIfTextIsTruncated);
    };
  }, [text]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-gray-500 dark:text-gray-400 text-md text-start transition-all duration-300`}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: showMore ? 'unset' : maxLine, // Limit text to 2 lines when collapsed
          overflow: 'hidden',
        }}
      >
        {text}
      </p>

      {isTruncated && (
        <Button
          variant="link"
          className="p-0 border-none outline-none text-primary"
          onClick={toggleText}
        >
          {showMore ? (
            <>
              {t('showLess')} <ChevronUp />
            </>
          ) : (
            <>
              {t('showMore')} <ChevronDown />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default MyShowMoreText;
