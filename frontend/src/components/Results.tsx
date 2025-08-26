import type { ResultsProps } from '../types'
import { Divider } from '@heroui/react'

// Sun and Moon icons - using simple SVG icons since we don't have access to Heroicons directly
const SunIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="mr-2 text-yellow-500"
  >
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const MoonIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="mr-2 text-indigo-500"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

export const Results = ({ 
  data, 
  isLoading, 
  error
}: ResultsProps) => {
  return (
    <>
      {error && (
        <div className="mt-8 p-5 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
          <p className="text-red-700 mb-2">Failed to fetch sunrise and sunset data. Please try again.</p>
          <p className="text-xs text-red-600">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      )}
      
      {data && !isLoading && (
        <div>
          <Divider className='my-8' />
          <div className="flex items-center mb-2">
            <SunIcon />
            <p className="m-0"><strong>Sunrise:</strong> {data.sunrise}</p>
          </div>
          <div className="flex items-center">
            <MoonIcon />
            <p className="m-0"><strong>Sunset:</strong> {data.sunset}</p>
          </div>
        </div>
      )}
    </>
  )
}
