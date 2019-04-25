module.exports = {
  middleware: [ 'auth' ],
  keys: 'hxh',
  multipart: {
    mode: 'file'
  },
  security: {
    csrf: {
      enable: false
    }
  },
  database: {
    host: '',
    user: '',
    password: '',
    database: '',
    charset: 'utf8'
  },
  oss: {
    client: {
      accessKeyId: 'your access key',
      accessKeySecret: 'your access secret',
      bucket: 'your bucket name',
      endpoint: 'oss-cn-hongkong.aliyun.com',
      timeout: '60s'
    }
  }
}
