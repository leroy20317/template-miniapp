export function getDateStr(AddDayCount: number) {
  const dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1; //获取当前月份的日期
  const d = dd.getDate();
  const mStr = m < 10 ? '0' + m : m;
  const dStr = d < 10 ? '0' + d : d;
  return y + '-' + mStr + '-' + dStr;
}

/**
 *
 * @param {String} dateString 'YYYY-MM-DD HH:MM:SS'
 */
export function formatTime(dateString: { slice: (arg0: number, arg1: number) => string }) {
  const fullDate = new Date();
  const date = dateString.slice(0, 10);
  const time = dateString.slice(11, 16);
  let resultDate = '';
  if (fullDate.getFullYear() > parseInt(dateString.slice(0, 4))) {
    return dateString.slice(0, 16);
  }

  if (getDateStr(0) === date) {
    resultDate = '今天 ' + time;
  } else if (getDateStr(1) === date) {
    resultDate = '明天 ' + time;
  } else if (getDateStr(2) === date) {
    resultDate = '后天 ' + time;
  } else {
    resultDate = date.slice(5, 10) + ' ' + time;
  }

  return resultDate;
}

export function secondsToMMSS(seconds: number) {
  if (seconds < 600) {
    const minutes = Math.floor(seconds / 60); //向下整除 4/3=1;
    const second = seconds % 60;
    return second < 10 ? `0${minutes}:0` + second : `0${minutes}:` + second;
  }
  return '';
}

/**
 *
 * * @param {String} dateString 'YYYY-MM-DD HH:MM:SS'
 * return {String} dateString 'YYYY年MM月DD日 HH:MM:SS'
 */
export function standardTime(dateString: string) {
  const milliseconds = Date.parse(dateString.replace(/-/g, '/'));
  const dt = new Date(milliseconds);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');

  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');
  return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`;
}

// 题目类型枚举
export const examTypeEnum = {
  1: '单选题',
  2: '多选题',
  3: '不定项',
  4: '填空题',
  5: '问答题',
  6: '编程题',
  7: '判断题',
  8: '编程问答题',
  9: '阅读题',
  10: '听力题',
  11: '梯度选择题目',
};

export const letterList = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const handleUrl = (url?: string, option?: { w?: number; h?: number; q?: number }) => {
  if (!url) return '';
  // 本地路径
  if (/^\/static/.test(url)) return url;
  // 测试环境 upload 路径
  if (/uploads\.01/.test(url)) { return url.replace(/(http(s)?:)?\/\/uploads\.01/, 'https://uploads01'); }
  // 不做cdn压缩
  if (Object.keys(option || {}).length === 0) return url;
  // return `${url}${/\?/.test(url) ? '&' : '?'}x-oss-process=image/resize${
  //   option?.w ? `,w_${option.w}` : ''
  // }${option?.h ? `,h_${option.h}` : ''}${option?.q ? `/quality,q_${option.q}` : ''}`;
};

export function fetchWithAutoRetry<T = any>(fetcher: (...args) => Promise<T>, ...args): Promise<T> {
  const maximumRetryCount = 2;
  return new Promise<T>((resolve, reject) => {
    function _fetcher(last) {
      return fetcher(...args)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (last === 0) {
            reject(err);
          } else {
            setTimeout(() => {
              _fetcher(last - 1);
            }, 300);
          }
        });
    }

    _fetcher(maximumRetryCount);
  });
}

export const qs = (data: Record<string, string | number>) => {
  return Object.entries(data)
    .reduce<string[]>((acc, [key, value]) => {
      acc.push(`${key}=${value}`);
      return acc;
    }, [])
    .join('&');
};
