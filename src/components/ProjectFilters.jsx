import { useState } from 'react'
import TechIcon from './TechIcon'

function ProjectFilters({ technologies, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTechnology, setSelectedTechnology] = useState(null)
  const [showAllTech, setShowAllTech] = useState(false)

  const categories = [
    { id: null, label: 'Tous' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Fullstack' },
    { id: 'backend', label: 'Backend' },
  ]

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setSelectedTechnology(null)
    onFilterChange({ category: categoryId, technology: null })
  }

  const handleTechnologyToggle = (techId) => {
    const nextTechnology = selectedTechnology === techId ? null : techId
    setSelectedTechnology(nextTechnology)
    onFilterChange({ category: selectedCategory, technology: nextTechnology })
  }

  const TECH_LIMIT = 4
  const techList = technologies ?? []
  const visibleTechnologies = showAllTech ? techList : techList.slice(0, TECH_LIMIT)
  const hasMoreTech = techList.length > TECH_LIMIT

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-gray-800 bg-gray-950/40 p-6 md:p-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <h3 className="text-lg font-semibold text-white mb-4">Catégories</h3>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id ?? 'all'}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
                    ${
                      selectedCategory === category.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedTechnology(null)
                  onFilterChange({ category: null, technology: null })
                }}
                className="text-sm text-gray-400 hover:text-white transition underline underline-offset-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="flex items-end justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-white">Technologies</h3>

              {hasMoreTech && (
                <button
                  type="button"
                  onClick={() => setShowAllTech((v) => !v)}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  {showAllTech ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleTechnologies.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleTechnologyToggle(tech.id)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    ${
                      selectedTechnology === tech.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                        : 'border border-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-700'
                    }
                  `}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <TechIcon iconPath={tech.icon} color={tech.color} name={tech.name} />
                  </div>

                  <span className="text-sm font-medium whitespace-nowrap">
                    {tech.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectFilters