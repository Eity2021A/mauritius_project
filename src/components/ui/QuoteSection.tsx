interface QuoteSectionProps {
  quote: string;
  className?: string;
}

export default function QuoteSection({ quote, className = "" }: QuoteSectionProps) {
  return (
    <p className={`text-xl md:text-2xl text-gray-700 font-light leading-relaxed border-l-4 border-orange-500 pl-6 ${className}`}>
      {quote}
    </p>
  );
}
