
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw } from 'lucide-react';

interface AdminHeaderProps {
  userEmail?: string;
  onSignOut: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const AdminHeader = ({ userEmail, onSignOut, onRefresh, isLoading }: AdminHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-600 mt-2">Gerenciar produtos da loja</p>
        {userEmail && (
          <p className="text-sm text-gray-500 mt-1">
            Logado como: {userEmail}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        <Button onClick={onSignOut} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};
