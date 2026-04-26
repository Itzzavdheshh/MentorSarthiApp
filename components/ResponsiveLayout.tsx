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

  return (
    <View className="flex-1 bg-[#0F0520] min-h-screen flex-row justify-center">
      {/* 
        Main Responsive Container
        - Mobile: 100% width, no sidebar
        - Tablet/Desktop: max-width scaled, centered
      */}
      <View className="w-full max-w-7xl flex-row h-full">
        
        {/* Left Sidebar (Hidden on mobile, visible on lg screens) */}
        <View className="hidden lg:flex w-64 bg-[#1a0533] border-r border-purple-900/30 pt-10 px-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-2xl">🎯</Text>
            <Text className="text-xl font-extrabold text-white">MentorSarthi</Text>
          </View>
          <Text className="text-xs text-white/50 mb-6">Your Growth. Our Mission.</Text>
          <View className="h-px bg-purple-900/30 mb-6" />
          
          <View className="gap-2">
            {['🏠  Home', '👨‍💼  Mentors', '📊  Dashboard', '👤  Profile'].map((item) => (
              <View key={item} className="py-3 px-4 rounded-xl bg-purple-900/15">
                <Text className="text-white/80 text-sm font-semibold">{item}</Text>
              </View>
            ))}
          </View>
          
          <View className="absolute bottom-8 left-6">
            <Text className="text-white/40 text-xs">by Enorvia Global</Text>
            <Text className="text-white/25 text-[11px] mt-1">v1.0.0</Text>
          </View>
        </View>

        {/* Center Content - The actual App screens */}
        <View className="flex-1 bg-[#0F0520] relative">
          {children}
        </View>

        {/* Right Panel Stats (Hidden on mobile/tablet, visible on xl screens) */}
        <View className="hidden xl:flex w-72 bg-[#1a0533] border-l border-purple-900/30 pt-10 px-6">
          <Text className="text-sm font-extrabold text-white mb-4 uppercase tracking-wider">Platform Stats</Text>
          {[
            { emoji: '👨‍💼', label: 'Expert Mentors', value: '500+' },
            { emoji: '📅', label: 'Sessions Done', value: '10,000+' },
            { emoji: '⭐', label: 'Avg Rating', value: '4.9 / 5' },
            { emoji: '🏢', label: 'B2B Clients', value: '50+' },
            { emoji: '🌍', label: 'Cities', value: '20+' },
          ].map((s) => (
            <View key={s.label} className="flex-row items-center gap-3 mb-4 bg-purple-900/15 p-3 rounded-xl">
              <Text className="text-2xl">{s.emoji}</Text>
              <View>
                <Text className="text-base font-extrabold text-purple-600">{s.value}</Text>
                <Text className="text-[11px] text-white/50 mt-0.5">{s.label}</Text>
              </View>
            </View>
          ))}
          <View className="h-px bg-purple-900/30 my-5" />
          <Text className="text-sm font-extrabold text-white mb-4 uppercase tracking-wider">Why MentorSarthi?</Text>
          {[
            '✅ 1-on-1 expert sessions',
            '✅ Live workshops & events',
            '✅ B2B corporate mentoring',
            '✅ Flexible scheduling',
            '✅ Secure Razorpay payments',
          ].map((item) => (
            <Text key={item} className="text-white/70 text-[13px] mb-2.5 font-medium">{item}</Text>
          ))}
        </View>

      </View>
    </View>
  );
}
