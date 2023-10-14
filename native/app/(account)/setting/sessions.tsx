import { useStore } from '@nanostores/react';
import { Form, Submit } from 'components/Form';
import Page from 'components/Page';
import ProgressBar from 'components/ProgressBar';
import TitleBar from 'components/TitleBar';
import { useFetch } from 'hooks/useQuery';
import { MapPinIcon } from 'icons';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { $token } from 'stores';
import { formatDate } from 'utils';
import schemas from 'utils/schemas';

export default function Sessions() {
  const { t } = useTranslation();
  const token = useStore($token);
  const { data: sessions = [], mutate, isLoading } = useFetch<Session[]>('/session');

  return (
    <Page>
      <TitleBar title={t('sessions')} className='mx-4' />
      {isLoading ? (
        <View className='flex-center flex-1'>
          <ProgressBar size='lg' />
        </View>
      ) : (
        <ScrollView>
          {sessions.map(({ _id, date, device, location }) => {
            const isCurrent = token === _id;

            return (
              <View key={_id} className='p-4 border-b border-slate-200 dark:border-slate-800 flex-row justify-between'>
                <View className='flex-1'>
                  <View className='flex-row items-center space-x-1.5'>
                    <Text className='text-base font-sans-extrabold text-slate-800 dark:text-slate-200 uppercase'>{device.OS}</Text>
                    {isCurrent && <Text className='bg-brand-600 text-white text-xs font-sans-bold px-1.5 py-0.5 rounded-md'>Current</Text>}
                  </View>
                  <Text className='text-xs font-sans-bold text-slate-600 dark:text-slate-400 mt-0.5 mb-1'>{device.IP}</Text>
                  <View className='flex-row items-end gap-x-1'>
                    <MapPinIcon className='w-5 h-5 stroke-slate-500' />
                    <Text className='mt-1 text-sm font-sans-semibold text-slate-700 dark:text-slate-300'>
                      {location.city}, {location.country}
                    </Text>
                  </View>
                </View>
                <View className='items-end justify-between'>
                  <Text className='font-sans-semibold text-slate-900 dark:text-slate-100'>{formatDate(date, 'MMM dd, yyyy')}</Text>
                  {!isCurrent && (
                    <Form url={`session/${_id}`} schema={schemas.object({})} config={{ method: 'DELETE' }} onSuccess={() => mutate()}>
                      {({ onSubmit }) => <Submit label='Logout' intent='outline' className='bg-transparent px-0 h-8' onSubmit={onSubmit} />}
                    </Form>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </Page>
  );
}
