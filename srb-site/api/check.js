export default {
  // 正则表达式
  // 手机
  mobileReg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-9])|(18[0-9]))\d{8}$/,
  //验证码
  codeReg: /^\d{4}|\d{6}$/,
  //密码
  passwordReg: /^[_0-9a-z]{6,24}$/,
  //姓名
  nameReg: /^[\u4E00-\u9FA5A-Za-z]+$/,
  //身份证号
  nameCodeReg: /^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/,
  //银行卡号
  checkBankNo: /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
  // 前端校验验证手机号
  checkMobile(mobile) {
    return this.baseCheck(mobile, this.mobileReg);
  },
  //验证验证码
  checkCode(code) {
    return this.baseCheck(code, this.codeReg);
  },
  //验证密码
  checkPassword(password) {
    return this.baseCheck(password, this.passwordReg);
  },
  //校验姓名
  checkName(name) {
    return this.baseCheck(name, this.nameReg);
  },
  //校验身份证号码
  checkNameCoded(nameCode) {
    return this.baseCheck(nameCode, this.nameCodeReg);
  },
  //校验银行卡号
  checkBankNo(bankNo) {
    return this.baseCheck(bankNo, this.bankNoReg);
  },
  // 基类
  baseCheck(data, reg) {
    return reg.test(data) && data != null;
  },
};
