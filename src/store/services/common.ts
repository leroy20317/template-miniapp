/**
 * @author: leroy
 * @date: 2024-10-23 17:07
 * @description：common
 */
import api from '@/utils/api';
import { API } from '@/types/api';
import Url from '@/utils/url';

export function getServerTime() {
  return api.get<API<{ date: string; timestamp: number }>>({ url: Url.serverTime });
}
