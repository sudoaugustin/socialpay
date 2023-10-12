import Button from 'components/Button';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { RefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { openAppSetting, preserveView } from 'utils/native';

type Props = ViewProps & {
  viewRef: RefObject<View>;
  filename: string;
};

export default function SaveAndShare({ viewRef, filename, ...rest }: Props) {
  const { t } = useTranslation();
  const [isSharable, setSharable] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    requestMediaPermission();
  }, []);

  useEffect(() => {
    Sharing.isAvailableAsync().then(setSharable);
  }, []);

  return (
    <View {...rest} className='flex-row gap-x-2.5'>
      <Button
        label={t('actions.save')}
        className='flex-1'
        onPress={() =>
          mediaPermission?.granted ? preserveView(viewRef, { filename, message: t('saved'), isSave: true }) : openAppSetting()
        }
      />
      {isSharable && (
        <Button label={t('actions.share')} intent='outline' className='flex-1' onPress={() => preserveView(viewRef, { filename })} />
      )}
    </View>
  );
}
