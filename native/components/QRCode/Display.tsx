import useProfile from 'hooks/useProfile';
import { useRef } from 'react';
import { View } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import SaveAndShare from 'views/SaveAndShare';

export default function QRCode() {
  const ref = useRef(null);
  const { avatar, mobile } = useProfile();

  return (
    <View className='gap-y-5 justify-end items-center h-[356px]'>
      <SvgQRCode
        logo={{ uri: avatar }}
        size={256}
        value={JSON.stringify({ mobile })}
        getRef={(current) => {
          ref.current = current;
        }}
        quietZone={16}
        logoBorderRadius={1000}
        linearGradient={['#0369a1', '#0c4a6e']}
        enableLinearGradient
      />
      <SaveAndShare viewRef={ref} filename='SocialPay' />
    </View>
  );
}
