import { createStackNavigator } from '@react-navigation/stack';
import { Main } from '../../screens';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
    </Stack.Navigator>
  );
};
