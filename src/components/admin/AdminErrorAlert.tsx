
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface AdminErrorAlertProps {
  error: string;
  onRetry: () => void;
}

export const AdminErrorAlert = ({ error, onRetry }: AdminErrorAlertProps) => {
  return (
    <Alert className="mb-6 border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        <div className="font-medium mb-1">Erro detectado:</div>
        {error}
        <div className="mt-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onRetry}
            className="text-xs"
          >
            Tentar novamente
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
