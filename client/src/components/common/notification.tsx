import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification, NotificationType } from '@/context/NotificationContext';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 border-green-500 text-green-800',
  error: 'bg-red-50 border-red-500 text-red-800',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
  info: 'bg-blue-50 border-blue-500 text-blue-800',
};

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => {
        const Icon = icons[notification.type];
        return (
          <div
            key={notification.id}
            className={`flex items-start gap-3 p-4 rounded-lgborder-l-4 shadow-lg animate-slide-in ${colors[notification.type]}`}
>
<Icon size={20} />
<p className="flex-1 text-sm font-medium">{notification.message}</p>
<button
onClick={() => removeNotification(notification.id)}
className="hover:opacity-70 transition"
>
<X size={18} />
</button>
</div>
);
})}
</div>
);
};