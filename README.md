### 西邮Linux兴趣小组内部交流平台

基于koa@1.x开发

#### 配置

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

        server: 服务启动时绑定的IP和端口

        app_keys: 随机字符串数组，用于加密session、cookie等等

        middlewares: 应用所用到的中间件文件名称，这些中间件放在app/middlewares目录下，一般情况下只允许开发者更改次配置项

    2. oauth.json

        CS采用grant中间件实现oauth授权功能，相关的配置如下：

        ```
        {
          "server": {
            "protocol": "http",
            "host": "121.42.144.117:2111"
          },
          "adam": {
            "authorize_url": "http://sso.adam.404befound.com/oauth/authorize",
            "access_url": "http://sso.adam.404befound.com/oauth/access_token",
            "logout_url": "http://sso.adam.404befound.com/logout",
            "oauth": 2,
            "key": "hawwa",
            "secret": "$2y$10$8Gz5X7XkQtVzwFU8C9zSQ.FzIH6OZNd5D",
            "scope": [],
            "state": true,
            "callback": "/handle_adam_callback",
            "transport": "session"
          }
        }
        ```

        server: 本地应用服务相关的配置

        adam: 西邮Linux统一授权服务平台adam相关的配置，应用部署只需更改：

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
            "http://api.adam.404befound.com": {
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

        应用部署时只需更改对应的域名即可，详细配置参见 [Purest](https://simov.gitbooks.io/purest/content/docs/02-provider-config.html) Provider配置文档

#### 开发部署

```
make dev 开启开发环境下的服务，文件更改时会自动构建静态文件并重启服务
make server 开启生产环境下的服务

make build 构建静态文件


bash server.sh 生产环境下启动后台服务进程

```
