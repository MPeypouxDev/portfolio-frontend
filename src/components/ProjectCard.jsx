import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCardTilt from '../hooks/useCardTilt'

function ProjectCard({ project, index }) {

    const [ref, rotateX, rotateY, handleMouseMove, handleMouseLeave] = useCardTilt()

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} transition={{ delay: index * 0.1 }}
                style={{
                    perspective: 1000,
                    rotateX: rotateX,
                    rotateY: rotateY,
                }}
                className="
                    group rounded-xl overflow-hidden
                    bg-gradient-to-b from-gray-900/80 to-gray-950
                    border border-gray-800
                    shadow-lg shadow-black/40
                    hover:shadow-xl hover:shadow-indigo-500/10
                    transition-all duration-300
                    ">
                    <div className="h-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                        <img 
                        src={project.images[0].path}
                        alt={project.images[0].alt_text || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                        Pas d'image
                        </div>
                    )}
                    </div>

                    <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        {project.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies?.map((tech) => (
                        <span
                            key={tech.id}
                            className="
                            text-xs px-2.5 py-1 rounded-full
                            bg-gray-800 text-gray-300
                            border border-gray-700
                            "
                        >
                            {tech.name}
                        </span>
                        ))}
                    </div>

                <Link
                        to={`/projects/${project.id}`}
                        className="
                        inline-flex items-center gap-1
                        text-indigo-400 font-medium
                        group-hover:text-indigo-300
                        transition
                        "
                    >
                        Voir le projet
                    <span className="transition group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </motion.div>
    )
}

export default ProjectCard