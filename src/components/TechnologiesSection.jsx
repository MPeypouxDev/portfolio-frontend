import { useState, useEffect } from 'react'
import { technologyService } from '../services/technologyService'
import TechIcon from './TechIcon'
import useInView from '../hooks/useInView'

function TechnologiesSection() {
    const [technologies, setTechnologies] = useState([])
    const [loading, setLoading] = useState(true)
    const [ref, IsInView, animationClass] = useInView()

    const loadTechnologies = async () => {
        try {
            setLoading(true)
            const response = await technologyService.getAll()
            setTechnologies(response.data)
        } catch (error) {
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTechnologies()
    }, [])

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Chargement des technologies...</p>
            </div>
        )
    }

    return (
    <section ref={ref} className={`border-t border-gray-900 py-20 transition-all duration-700 ${animationClass}`}>
        <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
            Technologies Utilisées
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Voici les technologies que j'utilise au quotidien pour créer des applications performantes
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech) => (
            <div
                key={tech.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-800 hover:border-gray-700 transition text-center group"
            >
                <div className="h-12 w-12 mb-4 mx-auto flex items-center justify-center">
                    <TechIcon
                        iconPath={tech.icon}
                        color={tech.color}
                        name={tech.name}
                    />
                </div>
                <span className="text-white font-medium group-hover:text-gray-200 transition">
                {tech.name}
                </span>
            </div>
            ))}
        </div>
        </div>
    </section>
    )
}

export default TechnologiesSection