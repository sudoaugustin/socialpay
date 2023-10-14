import Field from './Field';
import { useStore } from '@nanostores/react';
import ProgressBar from 'components/ProgressBar';
import { Image } from 'expo-image';
import * as ExpoImagePicker from 'expo-image-picker';
import useIsDark from 'hooks/useIsDark';
import { CameraIcon, GalleryIcon } from 'icons';
import { CloseIcon } from 'icons/Close';
import { useEffect, useState } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { openAppSetting } from 'utils/native';

type Props = ViewProps & { name: string; label: string; aspect?: [number, number] };

export default function ImagePicker({ name, aspect = [16, 9], label, ...rest }: Props) {
  const isDark = useIsDark();
  const [isLoading, setLoading] = useState(false);
  const [mediaStatus, requestMediaPermission] = ExpoImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] = ExpoImagePicker.useCameraPermissions();

  useEffect(() => {
    requestMediaPermission();
    requestCameraPermission();
  }, []);

  const handleMediaPress = (setValue: Function) => () => {
    if (!cameraStatus?.granted) return cameraStatus?.canAskAgain ? requestCameraPermission() : openAppSetting();

    setLoading(true);
    ExpoImagePicker.launchImageLibraryAsync({ base64: true, aspect, allowsEditing: true })
      .then(({ assets }) => {
        const image = assets?.[0];
        image && setValue(image.base64);
      })
      .finally(() => setLoading(false));
  };

  const handleCameraPress = (setValue: Function) => () => {
    if (!mediaStatus?.granted) return mediaStatus?.canAskAgain ? requestMediaPermission() : openAppSetting();

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
      {({ value, setValue }) => {
        const setBase64Image = (value: string) => setValue(`data:image/png;base64,${value}`);
        return (
          <View {...rest} className='bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden'>
            {value ? (
              <Image source={value} className='w-full h-full' />
            ) : (
              <Text className='mt-1.5 text-xs font-sans-bold text-slate-800 dark:text-slate-200 m-auto'>{label}</Text>
            )}
            <View className='flex-row absolute w-full h-full'>
              {value && (
                <CloseIcon
                  onPress={() => setValue('')}
                  className={`w-4 h-4 absolute stroke-[3px] top-2.5 right-2.5 ${isDark ? 'stroke-slate-400' : 'stroke-slate-600'}`}
                />
              )}
              <View className='w-full flex-row space-x-2.5 items-end justify-end p-2.5'>
                <CameraIcon
                  onPress={handleCameraPress(setBase64Image)}
                  className={`w-6 h-6 ${isDark ? 'fill-slate-400' : 'fill-slate-600'}`}
                />
                <GalleryIcon
                  onPress={handleMediaPress(setBase64Image)}
                  className={`w-6 h-6 ${isDark ? 'fill-slate-400' : 'fill-slate-600'}`}
                />
              </View>
            </View>
            {isLoading && (
              <View className='w-full h-full flex-center absolute bg-slate-200/20 dark:bg-slate-800/20'>
                <ProgressBar invert />
              </View>
            )}
          </View>
        );
      }}
    </Field>
  );
}
