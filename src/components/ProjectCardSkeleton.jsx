function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-950">
      <div className="h-48 bg-gray-800 animate-pulse" />
      
      <div className="p-6">
        <div className="h-6 bg-gray-800 rounded mb-3 w-3/4 animate-pulse" />
        
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-2/3 animate-pulse" />
        </div>
        
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-800 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-gray-800 rounded-full animate-pulse" />
        </div>
        
        <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  )
}

export default ProjectCardSkeleton