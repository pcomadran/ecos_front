// src/components/ProtectedChatbot.tsx

import React from "react";
import { useAuth, Role } from "../../context/authContext";

interface ProtectedChatbotProps {
  children: React.ReactNode;
  roles: Role[];
}

const ProtectedChatbot: React.FC<ProtectedChatbotProps> = ({
  children,
  roles,
}) => {
  const { user } = useAuth();

  // Verifica si el usuario tiene uno de los roles permitidos o si no está autenticado
  const hasAccess = !user || (user.role && roles.includes(user.role));

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedChatbot;
