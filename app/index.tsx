import { Redirect } from 'expo-router';

// Redirect to auth flow as the initial route
export default function Index() {
  return <Redirect href="/auth" />;
}