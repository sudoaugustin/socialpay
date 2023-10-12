import Button from 'components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { openAppSetting } from 'utils/native';

type Props = {
  onScanned: (data: string) => void;
};

const screenWidth = Dimensions.get('screen').width;

export default function Scanner({ onScanned }: Props) {
  const [isScanned, setScanned] = useState(false);
  const [permissionResponse, requestPermission] = BarCodeScanner.usePermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setScanned(false), 2500);
    () => clearTimeout(timeout);
  }, [isScanned]);

  return (
    <View style={{ width: screenWidth, height: screenWidth }} className='flex-center bg-slate-100 overflow-hidden rounded-b-3xl -mx-4'>
      {permissionResponse?.granted ? (
        <View>
          <BarCodeScanner
            style={{ width: screenWidth * 1.5, height: screenWidth * 1.35 }}
            onBarCodeScanned={({ data }) => {
              if (!isScanned) {
                onScanned(data);
                setScanned(true);
              }
            }}
          />
        </View>
      ) : (
        <Button
          label='Allow camera access'
          intent='outline'
          onPress={() => (permissionResponse?.canAskAgain ? requestPermission() : openAppSetting())}
          className='bg-slate-100'
        />
      )}
    </View>
  );
}
