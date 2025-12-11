/**
 * ProtectedRoute - Client-side access control wrapper
 * 
 * SECURITY NOTE: This component provides UI-level access control ONLY.
 * It is NOT the primary security boundary.
 * 
 * Actual data protection is enforced by Supabase Row Level Security (RLS) policies:
 * - Products table: Admin-only INSERT/UPDATE/DELETE via RLS policies
 * - Profiles table: User can only modify own profile; admin role changes require admin RLS check
 * 
 * This component should be used for UX purposes (hiding admin UI from non-admins),
 * NOT as a security measure. Even if this check is bypassed, RLS prevents unauthorized data access.
 */
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AdminLoadingScreen } from '@/components/admin/AdminLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  console.log('ProtectedRoute state:', { 
    hasUser: !!user, 
    loading, 
    isAdmin, 
    requireAdmin 
  });

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <AdminLoadingScreen />;
  }

  // Se não está logado, redirecionar para auth
  if (!user) {
    console.log('User not authenticated, redirecting to /auth');
    window.location.href = '/auth';
    return null;
  }

  // Se requer admin mas usuário não é admin
  if (requireAdmin && !isAdmin) {
    console.log('User is not admin, access denied');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-red-600">Acesso negado</div>
          <div className="text-sm text-gray-600 mt-2">Você não tem permissão para acessar esta página</div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
