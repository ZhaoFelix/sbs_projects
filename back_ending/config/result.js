const res_options = require('./env')

class Result {
  // 构造函数
  constructor(data, message = '查询成功', options) {
    this.data = null
    if (arguments.length == 0) {
      this.message = '查询成功'
    } else if (arguments.length === 1) {
      this.message = data
    } else {
      this.data = data
      this.message = message
      if (options) {
        this.options = options
      }
    }
  }
  // 创建响应结果对象
  createResult() {
    if (!this.code) {
      this.code = res_options.response_options.CODE_SUCCESS
    }
    let base = {
      code: this.code,
      message: this.message,
    }

    if (this.data) {
      base.data = this.data
    }

    if (this.options) {
      // 对象解析
      base = { ...base, ...this.options }
      // 等同于
      // base = {
      //   code: this.code,
      //   message: this.message,
      //   data: this.data,
      //   ...this.options
      // }
    }
    return base
  }
  json(res) {
    res.json(this.createResult())
  }

  success(res) {
    this.code = res_options.response_options.CODE_SUCCESS
    this.json(res)
  }

  fail(res) {
    this.code = res_options.response_options.CODE_ERROR
    this.json(res)
  }

  // TODO: JWT认证失败
  jwtError(res) {
    this.code = 401
    this.json(res)
  }
}

module.exports = Result
