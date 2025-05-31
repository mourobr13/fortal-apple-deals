
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AdminDebugInfoProps {
  isAuthenticated: boolean;
  productsCount: number;
  isLoading: boolean;
}

export const AdminDebugInfo = ({ isAuthenticated, productsCount, isLoading }: AdminDebugInfoProps) => {
  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="text-sm text-blue-800">
          <div className="font-medium mb-2">🔍 Informações de Debug:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <strong>Autenticação:</strong> {isAuthenticated ? 'Logado' : 'Não logado'}
            </div>
            <div>
              <strong>Produtos:</strong> {productsCount} carregados
            </div>
            <div>
              <strong>Status:</strong> {isLoading ? 'Carregando...' : 'Pronto'}
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            Abra o Console do navegador (F12) para ver logs detalhados
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
