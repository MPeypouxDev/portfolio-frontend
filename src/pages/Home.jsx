function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Bonjour, je suis Mathys Peypoux
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Développeur Full Stack
                </p>
                <div className="flex gap-4">
                    <a
                     href="#projects"
                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                     >
                        Voir mes projets
                     </a>
                     <a
                     href="#contact"
                     className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                     >
                        Me contacter
                     </a>
                </div>
            </div>
        </div>
    )
}

export default Home