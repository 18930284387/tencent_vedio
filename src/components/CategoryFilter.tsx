interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
