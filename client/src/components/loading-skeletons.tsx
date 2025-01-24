import { User } from "lucide-react"

export function PlayerCardSkeleton() {
  return (
    <div className="bg-muted/45 border rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 flex flex-col items-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="bg-gray-200 rounded-full p-6 mb-4">
          <User size={48} className="text-gray-400" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  )
}

