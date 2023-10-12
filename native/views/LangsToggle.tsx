import { useStore } from '@nanostores/react';
import Toggle from 'components/Toggle';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { $lang } from 'stores';
import { langs } from 'utils/const';

export default function LangsToggle(props: ViewProps) {
  const lang = useStore($lang);

  return <Toggle {...props} value={lang} items={langs} className='w-28 self-center' onChange={(lang) => $lang.set(lang as Lang)} />;
}
