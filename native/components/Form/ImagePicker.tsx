import Field from './Field';
import { Image } from 'expo-image';
import * as ExpoImagePicker from 'expo-image-picker';
import { CameraIcon, CloseIcon, GalleryIcon } from 'icons';
import ProgressBar from 'icons/ProgressBar';
import { useEffect, useState } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { openAppSetting } from 'utils/native';

type Props = ViewProps & { name: string; label: string; aspect?: [number, number] };

export default function ImagePicker({ name, aspect = [16, 9], label, ...rest }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [mediaStatus, requestMediaPermission] = ExpoImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] = ExpoImagePicker.useCameraPermissions();

  useEffect(() => {
    requestMediaPermission();
    requestCameraPermission();
  }, []);

  const handleMediaPress = (setValue: Function) => () => {
    setLoading(true);
    ExpoImagePicker.launchImageLibraryAsync({ base64: true, aspect, allowsEditing: true })
      .then(({ assets }) => {
        const image = assets?.[0];
        image && setValue(image.base64);
      })
      .finally(() => setLoading(false));
  };

  const handleCameraPress = (setValue: Function) => () => {
    setLoading(true);
    ExpoImagePicker.launchCameraAsync({ base64: true, aspect, allowsEditing: true })
      .then(({ assets }) => {
        const image = assets?.[0];
        image && setValue(image.base64);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Field bare name={name}>
      {({ value, setValue }) => (
        <View {...rest} className='bg-slate-600 rounded-xl overflow-hidden'>
          {value ? (
            <Image source={{ uri: value.startsWith('https') ? value : `data:image/png;base64,${value}` }} className='w-full h-full' />
          ) : (
            <Text className='mt-1.5 text-xs font-sans-bold text-slate-50 m-auto'>{label}</Text>
          )}
          <View className='flex-row absolute w-full h-full'>
            {value && (
              <CloseIcon onPress={() => setValue('')} className='w-4 h-4 absolute stroke-[3px] stroke-slate-50 top-2.5 right-2.5' />
            )}
            <View className='w-full flex-row space-x-2.5 items-end justify-end p-2.5'>
              <GalleryIcon
                onPress={cameraStatus?.granted ? handleMediaPress(setValue) : openAppSetting}
                className='w-6 h-6 fill-slate-50'
              />
              <CameraIcon
                onPress={cameraStatus?.granted ? handleCameraPress(setValue) : openAppSetting}
                className='w-6 h-6 fill-slate-50'
              />
            </View>
          </View>
          {isLoading && (
            <View className='w-full h-full flex-center absolute bg-slate-200/20'>
              <ProgressBar invert />
            </View>
          )}
        </View>
      )}
    </Field>
  );
}
