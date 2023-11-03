import { useStore } from '@nanostores/react';
import RadioList from 'components/RadioList';
import { $lang } from 'stores';
import { $sheet } from 'stores/layout';
import { langs } from 'utils/const';

export default function ChooseLang() {
  const lang = useStore($lang);

  return (
    <RadioList
      value={lang as string}
      options={langs}
      className='mt-5'
      onSelect={(v) => {
        $lang.set(v as Lang);
        $sheet.set(undefined);
      }}
    />
  );
}
