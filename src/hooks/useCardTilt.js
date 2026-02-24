import { useRef, useState } from 'react'

function useCardTilt() {
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const ref = useRef(null)

    const handleMouseMove = (e) => {
        const cardLocation = ref.current.getBoundingClientRect()
        setRotateY(((e.clientX - cardLocation.left) / cardLocation.width - 0.5) * 20)
        setRotateX(-((e.clientY - cardLocation.top) / cardLocation.height - 0.5) * 20)
    }

    const handleMouseLeave = (e) => {
        setRotateY(0)
        setRotateX(0)
    }
    return [ref, rotateX, rotateY, handleMouseMove, handleMouseLeave]
}

export default useCardTilt