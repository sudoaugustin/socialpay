import Avatar from 'components/Avatar';
import Button from 'components/Button';
import { Form, Input } from 'components/Form';
import * as ExpoContacts from 'expo-contacts';
import { openSettings } from 'expo-linking';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, View } from 'react-native';
import { $sheet } from 'stores/layout';
import { formatMobile, search, stripMobile } from 'utils';
import schemas from 'utils/schemas';

type Props = { onSelect: Function };

type ContactProps = ExpoContacts.Contact & { onSelect: Function };

const schema = schemas.object({ keyword: schemas.string() });

function Contact({ name, image, phoneNumbers = [], onSelect }: ContactProps) {
  const mobiles = phoneNumbers.map(({ number = '', ...rest }) => ({ ...rest, number: stripMobile(number) }));

  const handleSelect = (mobile: string) => {
    onSelect(mobile);
    $sheet.set(undefined);
  };

  return (
    <Pressable className='flex-row gap-x-2.5 my-2' onPress={() => handleSelect(mobiles[0].number)}>
      <Avatar name={name} source={image} />
      <View>
        <Text className='font-sans-bold text-slate-800 dark:text-slate-200' numberOfLines={1}>
          {name}
        </Text>
        <View className='space-y-0.5 mt-1'>
          {mobiles.map(({ number }) => (
            <Pressable key={number} onPress={() => handleSelect(number)}>
              <Text className='font-sans-medium text-slate-600 dark:text-slate-400'>{formatMobile(number)}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

export default function Contacts({ onSelect }: Props) {
  const { t } = useTranslation();
  const [isGranted, setGranted] = useState(false);
  const [contacts, setContacts] = useState<ExpoContacts.Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { granted } = await ExpoContacts.requestPermissionsAsync();
      granted ? setGranted(true) : ExpoContacts.requestPermissionsAsync().then((variable) => setGranted(variable.granted));
    })();
  }, []);

  useEffect(() => {
    if (isGranted) {
      (async () => {
        const { data } = await ExpoContacts.getContactsAsync();
        const contacts = data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(({ phoneNumbers = [] }) => phoneNumbers.some(({ number = '' }) => number.startsWith('09') || number.startsWith('+95')));
        setContacts(contacts);
      })();
    }
  }, [isGranted]);

  return isGranted ? (
    <Form watch schema={schema}>
      {({ values }) => {
        const { keyword = '' } = values;
        return (
          <View>
            <Input name='keyword' className='mt-3 mb-1.5' placeholder={t('search-contact')} />
            <FlatList
              data={contacts.filter(({ name }) => search([name], keyword))}
              keyExtractor={(item) => item.id}
              extraData={{ keyword }}
              renderItem={({ item }) => <Contact {...item} onSelect={onSelect} />}
              className='h-[50vh] max-h-[50vh]'
            />
          </View>
        );
      }}
    </Form>
  ) : (
    <View className='flex-center'>
      <Button label={t('access.contact')} intent='outline' onPress={openSettings} className='h-[50vh]' />
    </View>
  );
}
