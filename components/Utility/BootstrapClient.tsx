// BootstrapClient.tsx
"use client";

import { useEffect } from 'react';
import { BootstrapLoader } from '@/components/Classes/BoostrapClasses/BootstrapLoader';

// Define an interface for the component’s props if needed in the future
interface BootstrapClientProps {}

const BootstrapClient: React.FC<BootstrapClientProps> = () => {
  useEffect(() => {
    BootstrapLoader.load();
  }, []);

  return null;
};

export default BootstrapClient;
