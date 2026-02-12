function ErrorMessage({ message, onRetry}) {
    return (
        <div className="text-center">
            <svg className="w-12 h-12 text-red-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle 
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
                <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle
                    cx="12"
                    cy="16"
                    r="1"
                    fill="currentColor"
                />
            </svg>
            <p className="text-xl text-red-500 mb-4">{message}</p>
            <div>
                {onRetry && (
                    <button 
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        onClick={onRetry}>
                            Réessayer
                    </button>
                )}
            </div>
        </div>
    )
}

export default ErrorMessage