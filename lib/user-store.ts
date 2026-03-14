import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_NAME_KEY = 'tiny_times_user_name';

export async function getUserName(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(USER_NAME_KEY);
  } catch {
    return null;
  }
}

export async function setUserName(name: string): Promise<void> {
  await AsyncStorage.setItem(USER_NAME_KEY, name.trim());
}
