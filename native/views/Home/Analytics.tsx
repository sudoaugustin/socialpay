import { useFetch } from 'hooks/useQuery';
import { Text, View } from 'react-native';

const tabs = ['Today', 'This Week', 'This Month'];

const data = [
  { income: '20000', outcome: '20000' },
  { income: '20000', outcome: '20000' },
  { income: '20000', outcome: '20000' },
];

export default function Analytics() {
  return (
    <View>
      <View>
        {tabs.map((tab) => (
          <Text>{tab}</Text>
        ))}
      </View>
    </View>
  );
}
