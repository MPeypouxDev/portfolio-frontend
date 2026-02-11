import { useEffect, useMemo, useState } from 'react'
import TechIcon from './TechIcon'

function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)

    if (media.addEventListener) {
      media.addEventListener('change', onChange)
    } else {
      media.addListener(onChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', onChange)
      } else {
        media.removeListener(onChange)
      }
    }
  }, [query])

  return matches
}

function ProjectFilters({ technologies, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTechnology, setSelectedTechnology] = useState(null)
  const [showAllTech, setShowAllTech] = useState(false)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const categories = [
    { id: null, label: 'Tous' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Fullstack' },
    { id: 'backend', label: 'Backend' },
  ]

  const techList = useMemo(() => technologies ?? [], [technologies])

  const TECH_LIMIT_MOBILE = 8
  const TECH_LIMIT_DESKTOP = 10
  const techLimit = isDesktop ? TECH_LIMIT_DESKTOP : TECH_LIMIT_MOBILE

  const visibleTechnologies = showAllTech ? techList : techList.slice(0, techLimit)
  const hasMoreTech = techList.length > techLimit

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

  const resetFilters = () => {
    setSelectedCategory(null)
    setSelectedTechnology(null)
    setShowAllTech(false)
    onFilterChange({ category: null, technology: null })
  }

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-gray-800 bg-gray-950/40 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Filtrer</h2>
            <p className="mt-1 text-gray-400 text-sm">
              Affinez les projets par catégorie ou technologie
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="self-start md:self-auto text-sm text-gray-400 hover:text-white transition underline underline-offset-4"
          >
            Réinitialiser
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-white">Catégories</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id ?? 'all'}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-gray-900/60 text-gray-300 border border-gray-800 hover:bg-gray-900 hover:border-gray-700'
                    }
                  `}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 h-px bg-gray-900" />

        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-white">Technologies</h3>

            {hasMoreTech && (
              <button
                type="button"
                onClick={() => setShowAllTech((v) => !v)}
                className="text-sm text-gray-400 hover:text-white transition border border-gray-800 rounded-lg px-3 py-2 hover:bg-gray-900/40"
              >
                {showAllTech ? 'Voir moins' : 'Voir plus'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {visibleTechnologies.map((tech) => {
              const isActive = selectedTechnology === tech.id

              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleTechnologyToggle(tech.id)}
                  className={`
                    group relative rounded-xl border p-4 text-left transition-all duration-200
                    bg-gray-950/30
                    ${
                      isActive
                        ? 'border-indigo-500/60 shadow-lg shadow-indigo-500/20'
                        : 'border-gray-800 hover:border-gray-700 hover:bg-gray-950/50'
                    }
                    hover:-translate-y-0.5
                  `}
                  style={{
                    boxShadow: isActive ? `0 0 0 1px ${tech.color}40` : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <TechIcon iconPath={tech.icon} color={tech.color} name={tech.name} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {tech.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Cliquer pour filtrer
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectFilters