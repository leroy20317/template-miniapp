/**
 * @author: leroy
 * @date: 2024-10-23 16:07
 * @description：user
 */

import api from '@/utils/api';
import url from '@/utils/url';

export interface Info {
  id: number;
  name: string;
  sex: number;
  university: number;
  phone: string;
  email: string;
  college: number;
  college_name: string;
  education: number;
  degree: number;
  major: number;
  graduation: string;
  graduation_date: string;
  universityName: string;
  educationName: string;
  degreeName: string;
  majorName: string;
  graduationName: string;
  isNameCanChange: boolean;
  cityIntention: string[];
  faceLargeFullUrl: string;
}

export interface UserState {
  status: string;
  user_id: number;
  session: string;
  auth: string;
  cookie: string;
  info: Info;
  infoFlag: boolean;
  role: number;
  email?: any;
  phone: string;
  register_time: string;
  isEmailBind: boolean;
  isPhoneBind: boolean;
  wxxPermission?: any;
  returnUrl?: any;
  debug: boolean;
}

export async function getCode(params: { phone: string; area_code: string }) {
  return api.get<{ status: number; message: any }>({ url: url.userCode, params });
}

export async function getAreaCodeList() {
  return api.get<{
    status: number;
    message: any;
    data: { name: string; value: string; id: string }[];
  }>({
    url: url.areaCodeList,
  });
}

export const getAnidInfo = ({ anid }) => {
  return api.get<{
    message: string;
    status: number;
    data: { phone: string; name: string; area_code; platform };
  }>({ url: url.anidInfo, params: { anid } });
};

export async function getExamUserInfo(params: { auth }) {
  return api.get<{ status: number; message: any; data: { id: string; phone: string } }>({
    url: url.userInfo,
    params,
  });
}

export async function codeLogin(data: {
  phone: string;
  code: string;
  area_code: string;
  tianc?;
  anid?;
  exam?;
}) {
  return api.post<{ message: string; status: string; login: { phone: string; auth: string } }>({
    url: url.codeLogin,
    data,
  });
}

export async function userAuthorization(data: any) {
  return api.post({
    url: url.wxAuthorization,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      client: 'examcloud',
    },
  });
}
