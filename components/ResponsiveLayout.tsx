import React from 'react';
import { View, Platform, Text, ScrollView } from 'react-native';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  // On native platforms, we might just want to return the children directly
  // or wrap them in a simple container to avoid breaking mobile styling if it was fine.
  // But to unify the web experience, we use Tailwind classes.
  
  if (Platform.OS !== 'web') {
    return <View className="flex-1 bg-[#0F0520]">{children}</View>;
  }

  return (<View className="flex-1 bg-[#0F0520] min-h-screen">
      {children}
      </View>
    );
}
