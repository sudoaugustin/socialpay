import { $package } from './const';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { RefObject } from 'react';
import { Linking, Platform, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { $toast } from 'stores/layout';

type PreserveViewOptions = { isSave?: boolean; message?: string; filename: string };

async function saveToAlbum(uri: string) {
  const asset = await MediaLibrary.createAssetAsync(uri);
  const album = await MediaLibrary.getAlbumAsync('SocialPay');
  !album ? await MediaLibrary.createAlbumAsync('SocialPay', asset, false) : await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
}

export function openAppSetting() {
  Platform.OS === 'ios'
    ? Linking.openURL('app-settings:')
    : startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS, { data: `package:${$package}` });
}

export async function preserveView(ref: RefObject<View>, options: PreserveViewOptions) {
  captureRef(ref, { fileName: options.filename })
    .then(options.isSave ? saveToAlbum : Sharing.shareAsync)
    .then(() => options.message && $toast.set({ type: 'success', message: options.message }))
    .catch((err) => $toast.set({ type: 'error', message: err }));
}
