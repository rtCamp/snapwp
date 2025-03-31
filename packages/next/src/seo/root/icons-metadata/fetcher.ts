import { QueryEngine } from '@snapwp/query';
import type { Fetcher } from '@/seo/types';

const fetchIcons: Fetcher = QueryEngine.getGeneralSettings;

export default fetchIcons;
