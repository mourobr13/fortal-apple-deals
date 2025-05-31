
import React from 'react';
import { RefreshCw } from 'lucide-react';

export const AdminLoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <div className="text-lg font-medium">Verificando autenticação...</div>
      </div>
    </div>
  );
};
