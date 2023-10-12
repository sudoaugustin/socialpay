import { useStore } from '@nanostores/react';
import Button from 'components/Button';
import { Form, ImagePicker, Input, Phone } from 'components/Form';
import Page from 'components/Page';
import Return from 'components/Return';
import { Image } from 'expo-image';
import { CameraIcon } from 'icons';
import { Pressable, View } from 'react-native';
import { $user } from 'stores';
import schemas from 'utils/schemas';

const schema = schemas.object({ name: schemas.name, email: schemas.email, avatar: schemas.string() });

export default function Profile() {
  const user = useStore($user);
  return (
    <Page className='px-4'>
      <Return title='Profile' />
      <Form url='' watch schema={schema} initial={user}>
        {() => (
          <View className='py-2.5 space-y-5'>
            <ImagePicker name='avatar' label='Upload profile image' className='h-[65vw]' />
            <Input name='name' label='Name' variant='outline' />
            <Input name='email' label='Email' variant='outline' />
            <Phone name='mobile' label='Mobile' state='disable' variant='outline' />
            <Button label='Save' />
          </View>
        )}
      </Form>
    </Page>
  );
}
