"use client"
import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

export function useProtectedAction() {
  const { isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const protectedAction = useCallback((action: () => void) => {
    if (isAuthenticated) {
      action()
    } else {
      setShowLoginModal(true)
    }
  }, [isAuthenticated])

  const LoginModalComponent = () => (
    <LoginModal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
    />
  )

  return {
    protectedAction,
    showLoginModal,
    setShowLoginModal,
    LoginModalComponent,
    isAuthenticated
  }
}
