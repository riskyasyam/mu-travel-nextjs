import { Suspense } from 'react';
import JamaahClient from './JamaahClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JamaahClient />
    </Suspense>
  );
}