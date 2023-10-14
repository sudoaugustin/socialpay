import { useFetch } from './useQuery';

export default function useProfile() {
  const { data } = useFetch<User>('/user');
  return data || { name: '', avatar: '', mobile: '', balance: 0 };
}
