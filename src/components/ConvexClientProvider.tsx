"use client";

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { FC } from 'react'

interface ConvexClientProviderProps {
  children?: React.ReactNode
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexClientProvider: FC<ConvexClientProviderProps> = ({children}) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}

export default ConvexClientProvider