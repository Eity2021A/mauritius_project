/**
 * Reusable InfoItem component for displaying key-value information
 * Used in beach details, activities, destinations, and other info cards
 */

interface InfoItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
  bordered?: boolean;
}

export default function InfoItem({ label, value, icon, highlight = false, bordered = false }: InfoItemProps) {
  return (
    <div className={bordered ? "py-3 border-b border-gray-100 last:border-0" : "py-2"}>
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        <span className="text-gray-400">{icon}</span>
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-sm font-medium pl-7 ${highlight ? "text-green-600" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}
