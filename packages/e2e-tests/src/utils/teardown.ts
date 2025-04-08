import { test as teardown } from '@playwright/test';

import { cleanup } from './cleanup';

teardown.describe.configure( { timeout: 600000 } );
teardown( 'shut down WordPress and the Next.js app', cleanup );
