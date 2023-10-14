import { Path, Svg, SvgProps } from 'react-native-svg';

export function UserIcon(props: SvgProps) {
  return (
    <Svg strokeWidth={1.5} viewBox='0 0 24 24' {...props}>
      <Path
        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export function CameraIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path d='M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z' />
      <Path
        d='M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </Svg>
  );
}

export function MapPinIcon(props: SvgProps) {
  return (
    <Svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
      <Path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
    </Svg>
  );
}

export function GalleryIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </Svg>
  );
}

export function ContactIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 20 20' fill='currentColor' {...props}>
      <Path d='M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z' />
    </Svg>
  );
}

export function NotificationIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
      />
    </Svg>
  );
}
