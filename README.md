## 西邮Linux兴趣小组内部交流平台

基于koa@1.x开发


### 本地开发

##### 应用配置

1. 应用所有的配置文件都放在config目录下

    1. app.json

        应用相关的配置，内容如下:

        ```
        {
          "server": {
            "host": "121.42.144.117",
            "port": 2111
          },
          "app_keys": [
            "hello"
          ],
          "middlewares": [
            "oauth",
            "proxy",
            "logger",
            "autoload",
            "render"
          ]
        }
        ```
        其中各个配置项的作用如下：

        middlewares: 应用所用到的中间件文件名称，这些中间件放在app/middlewares目录下

    2. oauth.json

        CS采用grant中间件实现oauth授权功能，相关的配置如下：

        ```
        {
          "server": {
            "protocol": "http",
            "host": "{{host}}:{{port}}"
          },
          "adam": {
            "authorize_url": "{{sso_domain}}/oauth/authorize",
            "access_url": "{{sso_domain}}/oauth/access_token",
            "oauth": 2,
            "key": "{{client_id}}",
            "secret": "{{client_secret}}",
            "scope": ["all"],
            "state": true,
            "callback": "/handle_adam_callback",
            "transport": "session"
          }
        }
        ```

        server: 本地应用服务相关的配置

        adam: 西邮Linux统一授权服务平台adam相关的配置

        adam.authorize_url: 授权地址

        adam.access_url: 获取access_token的地址

        adam.logout_url: 授权平台登出的地址

        adam.key: client id

        adam.secret: client secret

        adam.scope: oauth scopes

        参见 [Grant](https://www.npmjs.com/package/grant#custom-providers) 说明文档

    3. proxy.json

        西邮Linux兴趣小组统一接口代理配置，采用Purest实现.

        ```
        {
          "adam": {
            "{{api_domain}}": {
              "__domain": {
                "auth": {
                  "auth": {"bearer": "[0]"}
                }
              },
              "{endpoint}/[subpath]": {
                "__path": {
                  "alias": "__default",
                  "subpath": "/"
                }
              }
            }
          }
        }
        ```

        详细配置参见 [Purest](https://simov.gitbooks.io/purest/content/docs/02-provider-config.html) Provider配置文档

##### 相关脚本

```
make dev 开启开发环境下的服务，文件更改时会自动构建静态文件并重启服务
make server 开启生产环境下的服务

make build 构建静态文件


bash server.sh 生产环境下启动后台服务进程

```


### 线上部署

##### 环境变量

复制.env.sample.json到.env.json，配置相关信息

```
{
  "host": "[host]",
  "port": "[port]",

  "key": "[client id]",
  "secret": "[client secret]",

  "sso_domain": "[sso domain]",
  "api_domain": "[api domain]"
}
```

##### 开启服务

```
bash server.sh
```
