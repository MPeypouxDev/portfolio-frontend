import { useEffect, useState } from 'react'

function useCounter(target, duration, isInView) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = duration / target

        if (!isInView) {
            return
        }

        const timer = setInterval(() => {
            setCount(prev => {
                if (prev >= target) {
                    clearInterval(timer)
                    return prev
                }
                return prev + 1
            })
        }, interval)
    }, [target, duration, isInView])

    return count;
}

export default useCounter