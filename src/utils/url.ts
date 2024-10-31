export const isProd = process.env.NODE_ENV === 'production';

let apiHost = '';
const cdnHost = apiHost.replace('api', 'cdn');
if (isProd) apiHost = `https://${apiHost.replace('api', 'api.01')}`;

export default {
  staticHost: isProd ? `https://${cdnHost}/static` : '/static',
  appLogin: apiHost + '/user/small-app-login?client=miniapp&appName=examcloud', // 微信静默登录
  getUnionId: apiHost + '/user/mini-app-unionid', // 微信换取unionId

  captcha: apiHost + '/system/captcha', // 获取验证码图片
  quicklogin: apiHost + '/user/quick-login', //  微信手机验证码快速登录
  prequicklogin: apiHost + '/user/pre-quick-login', //  快速登录获取验证码

  myInfo: apiHost + '/user/my-info', // 获取当前用户的个人信息

  wxAuthorization: apiHost + '/wx/authlogin', // 微信授权登录
};
