import { useEffect, useRef, useState } from 'react'

function useInView(options = {}) {
    const [isInView, setIsInView] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const currentRef = ref.current
        const observer = new IntersectionObserver(([entry]) => {
            console.log("Home section visible:", entry.isIntersecting);
            setIsInView(entry.isIntersecting)
        }, options)

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [options])

    const animationClass = isInView
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'

    return [ref, isInView, animationClass]
}

export default useInView