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
  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept, token'
  },
  database: {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'fruit',
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
  },
  jwtkey: 'hxh'
}
