import { useState } from 'react'
import TechIcon from './TechIcon'

function ProjectFilters({ technologies, onFilterChange }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedTechnology, setSelectedTechnology] = useState(null)

    const categories = [
        { id: null, label: 'Tous' },
        { id: 'frontend', label: 'Frontend' },
        { id: 'fullstack', label: 'Fullstack' },
        { id: 'backend', label: 'Backend' }
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

    return (
        <div className="mb-12 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                    Catégories
                </h2>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id ?? 'all'}
                            type="button"
                            onClick={() => handleCategoryChange(category.id)}
                            className={`
                                px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                                ${selectedCategory === category.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                }
                            `}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                    Technologies
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {(technologies ?? []).map((tech) => (
                        <button
                            key={tech.id}
                            type="button"
                            onClick={() => handleTechnologyToggle(tech.id)}
                            className={`
                                bg-gray-900/50 border rounded-lg p-4 
                                transition-all duration-200 text-center group
                                ${selectedTechnology === tech.id
                                    ? 'border-indigo-500 bg-gray-800 shadow-lg shadow-indigo-500/20'
                                    : 'border-gray-800 hover:bg-gray-800 hover:border-gray-700'
                                }
                            `}
                        >
                            <div className="mb-3 flex justify-center">
                                <TechIcon
                                    iconPath={tech.icon}
                                    color={tech.color}
                                    name={tech.name}
                                />
                            </div>
                            <span className="text-sm text-white font-medium group-hover:text-gray-200 transition">
                                {tech.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectFilters