import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/appNavigator";
import { AuthProvider } from "./src/contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
