import Contacts from './Contacts';
import Phone from 'components/Form/Phone';
import { ContactIcon } from 'icons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { $sheet } from 'stores/layout';

export default function ContactInput() {
  const { t } = useTranslation();
  return (
    <Phone
      name='mobile'
      label={t('mobile')}
      postfix={({ setValue }) => (
        <Pressable
          onPress={() => $sheet.set({ title: t('contacts'), children: <Contacts onSelect={setValue} />, className: 'pb-0' })}
          className='flex-center'
        >
          <ContactIcon className='w-6 h-6 text-slate-400' />
        </Pressable>
      )}
    />
  );
}
