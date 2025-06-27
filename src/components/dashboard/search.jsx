'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Gunakan useDebouncedCallback untuk menunda eksekusi
  // Ini akan menunggu 300ms setelah pengguna berhenti mengetik sebelum mencari
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // Pastikan input menampilkan nilai dari URL
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}