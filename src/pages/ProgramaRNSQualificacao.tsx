import { ProgramaRNSChat } from '@/components/ProgramaRNSChat'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProgramaRNSQualificacao() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <ProgramaRNSChat />
      </div>
    </div>
  )
}
