import { useState, useEffect } from 'react'

function TechIcon({ iconPath, color }) {
    const [svgContent, setSvgContent] = useState('')

    useEffect(() => {
        fetch(`/icons/${iconPath}`)
            .then(response => response.text())
            .then(data => {
                let coloredSvg = data
                    .replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`)
                    .replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`)
                if (!data.includes('fill=')) {
                    coloredSvg = coloredSvg.replace('<svg', `<svg fill="${color}"`)
                }
                setSvgContent(coloredSvg)
            })
            .catch(err => console.error('Erreur de chargement SVG:', err))
    }, [iconPath, color])

    if (!svgContent) {
        return <div className="w-12 h-12 bg-gray-800 rounded animate-pulse" />
    }

    return (
        <div
            className="w-12 h-12 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
}

export default TechIcon