import Logo from 'components/logo';
import Page, { PageProps } from 'components/page';
import { useFetch } from 'hooks/request';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HTMLAttributes } from 'react';

type Props = { title: string } & HTMLAttributes<HTMLDivElement>;

const links = [
  { href: '/account/banks', label: 'Bank accounts' },
  //   { href: '/account/sessions', label: 'Sessions' },
  { href: '/account/create-account', label: 'Create admin account' },
  { href: '/account/logout', label: 'Logout' },
];

export default function Account({ title, children, ...rest }: Props) {
  const router = useRouter();
  const { data } = useFetch<any>('/');
  return (
    <Page title={title} className='bg-slate-100 p-2 space-x-5 flex h-screen'>
      <aside className='w-64 py-4 space-y-10'>
        <div className='flex space-x-2.5'>
          <Logo className='w-8' />
          <div>
            <p className='text-sm font-bold text-slate-800'>{data?.name}</p>
            <p className='text-xs font-extrabold text-slate-600'>{data?.username}</p>
          </div>
        </div>
        <div>
          {links.map(({ href, label }) => {
            const isActive = router.pathname.includes(href);
            return (
              <Link
                href={href}
                className={`px-4 py-2 block text-xs font-medium rounded-md ${isActive ? 'bg-brand-600 text-brand-50' : 'text-slate-600'}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </aside>
      <div {...rest} className='bg-white border border-slate-200 shadow-md flex-1 rounded-lg p-10 overflow-auto'>
        <h1 className='text-slate-800 font-bold text-lg mb-10'>{title}</h1>
        {children}
      </div>
    </Page>
  );
}
