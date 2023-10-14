import { Form, ImagePicker, Input, Phone, Submit } from 'components/Form';
import Page from 'components/Page';
import TitleBar from 'components/TitleBar';
import { useRouter } from 'expo-router';
import useProfile from 'hooks/useProfile';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { $toast } from 'stores/layout';
import schemas from 'utils/schemas';

const schema = schemas.object({ name: schemas.name, email: schemas.email, avatar: schemas.string() });

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation();
  const { balance, ...user } = useProfile();

  return (
    <Page className='px-4'>
      <TitleBar title={t('profile')} />
      <Form
        url='/user'
        watch
        schema={schema}
        config={{ method: 'PUT' }}
        initial={user}
        revalidates={['/user']}
        onSuccess={() => {
          $toast.set({ message: 'Saved' });
          router.replace('/');
        }}
      >
        {({ onSubmit }) => (
          <View className='py-2.5 space-y-5'>
            <ImagePicker name='avatar' label={t('upload-profile')} aspect={[1, 1]} className='h-[100vw]' />
            <Input name='name' label={t('name')} variant='outline' />
            <Phone name='mobile' label={t('mobile')} state='disable' variant='outline' />
            <Submit label='Save' onSubmit={() => onSubmit()} />
          </View>
        )}
      </Form>
    </Page>
  );
}
