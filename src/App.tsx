import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TransactionsProvider } from './hooks/useTransactions'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'
import StatsPage from './pages/StatsPage'

export default function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="add" element={<AddPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </TransactionsProvider>
    </BrowserRouter>
  )
}
