import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../screens';

const Stack = createStackNavigator();

export const NotAuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
};
