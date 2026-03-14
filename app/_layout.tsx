import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserProvider, useUser } from '@/lib/user-context';
import { NamePromptModal } from '@/components/NamePromptModal';

function AppContent() {
  const { needsName, saveName } = useUser();

  return (
    <>
      <StatusBar style="dark" />
      <NamePromptModal visible={needsName} onSubmit={saveName} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="stats"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Stats',
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
