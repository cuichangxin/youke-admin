const CODE = {
  error: 500,
  success: 200,
}
export const successResponseWrap = (data, code = CODE.success) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code,
  }
}
export const failResponseWrap = (data, msg, code = CODE.error) => {
  return {
    data,
    status: 'fail',
    msg,
    code,
  }
}
