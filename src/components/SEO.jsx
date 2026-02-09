import { useEffect } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'

function SEO({ 
  title = "Mathys Peypoux - Développeur Full Stack",
  description = "Portfolio de Mathys Peypoux, développeur Full Stack."
}) {
  const fullTitle = title.includes("Mathys Peypoux") 
    ? title 
    : `${title} | Mathys Peypoux`

  useDocumentTitle(fullTitle)

  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = description

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.content = fullTitle

    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.content = description
  }, [fullTitle, description])

  return null
}

export default SEO