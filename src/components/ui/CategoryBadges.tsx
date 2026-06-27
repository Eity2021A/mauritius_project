import { ActivityCategory, PlaceCategory, BeachCategory, Region, REGION_COLORS, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types/content";

type Category = ActivityCategory | PlaceCategory | BeachCategory | Region | string;

interface CategoryBadgesProps {
  categories: Category[];
  className?: string;
}

function getCategoryColor(category: string): string {
  const key = category.toLowerCase();
  return REGION_COLORS[key] ?? CATEGORY_COLORS[key] ?? "bg-gray-100 text-gray-700";
}

function getCategoryLabel(category: string): string {
  const key = category.toLowerCase();
  return CATEGORY_LABELS[key] ?? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
}

export default function CategoryBadges({ categories, className = "" }: CategoryBadgesProps) {
  const visibleCategories = categories.filter((cat) => cat !== "all");

  if (visibleCategories.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {visibleCategories.map((category) => (
        <span
          key={category}
          className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(category)}`}
        >
          {getCategoryLabel(category)}
        </span>
      ))}
    </div>
  );
}
