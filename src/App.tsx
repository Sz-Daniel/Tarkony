import './App.css'
import { DataShow } from './devtools/dataShow'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DataShow />
      </QueryClientProvider>
    </>
  )
}

export default App
