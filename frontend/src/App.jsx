import { Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import GlobalError from './components/GlobalError'
import PageLoader from './components/PageLoader'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader message="Loading page..." />}>
        <AppRouter fallback={<GlobalError title="Route Error" message="Unable to load this route." />} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
