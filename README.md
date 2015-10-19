### Xiyou Linux Group Collaboration System(CS)

#### Web Application

西邮Linux兴趣小组内部交流平台WEB应用。

本项目只包含由angular框架构建的单页WEB应用部分，数据由后端提API提供，详情请查看[cs-restful-api](https://github.com/xiyou-linuxer/cs-restful-api),

线上地址：http://cs.xiyoulinux.org

[![Build Status](https://travis-ci.org/xiyou-linuxer/cs-angular-app.svg?branch=master)](https://travis-ci.org/xiyou-linuxer/cs-angular-app)

#### 开发指南

1. **环境搭建**

  ```
  Nginx >= 1.9.1

  Node >= 0.10.0
  ```

1. **环境配置**

  ```
  1. 服务端nginx虚拟主机配置：

    server {
      listen       80;
      server_name dev.cs.xiyoulinux.org;
      # root为项目代码中build文件夹所在的路径
      # 默认不存在这个文件件，只有在构建之后才会生成
      root /home/web/cs.xiyoulinux.org/build;
      
      location / {
        index  index.html index.php index.htm;
        try_files $uri $uri/ /index.html;
      }
    }

  2. 浏览器端hosts文件设置
    
    //下面的IP为Web服务器所对应的IP
    127.0.0.1 dev.cs.xiyoulinux.org
  ```

1. **代码部署**

  ```
  // 拉取线上代码
  git clone https://github.com/xiyou-linuxer/cs-angular-app.git
  
  // 移动代码
  mv cs-angular-app /home/web/cs.xiyoulinux.org
  
  // 安装依赖
  sudo npm install
  
  // 构建代码
  grunt build
  ```
  
1. **协作开发（个人）**

  ```
  // 在github上fork主仓库
  // 主仓库地址为https://github.com/xiyou-linuxer/cs-angular-app
  // fork之后，个人仓库地址为https://github.com/username/cs-angular-app
  // 为避免引起混淆，对下文中所提到的名词作出如下约定:
  // 1. 主仓库    指xiyou-linuxer下的仓库
  // 2. 个人仓库  指开发人员fork之后的github仓库
  // 2. 本地仓库  指开发人员clone到本地的代码仓库

  // 拉取个人仓库代码到本地
  git clone https://github.com/username/cs-angular-app.git  

  // 配置主仓库地址
  git remote add upstream https://github.com/xiyou-linuxer/cs-angular-app.git

  // 配置好之后，可以通过一下命令查看当前的配置
  git remote -v

  // 编辑代码

  // 构建测试
  grunt build

  // 添加代码
  // git add filename添加单个文件
  // git add . 添加当前文件下所有文件
  // git add -A 添加所有更改（包括删除动作）
  git add xxx
  
  // 提交代码， 评论信息格式同分支名称
  // 新功能使用FEAT-前缀，bug修复使用FIX-前缀
  // 如果只是修改README等无需出发CI集成测试的话，可在commit信息中包含[ci skip]
  git commit
  
  // 拉取主仓库上master分支的最新代码
  git fetch upstream
  
  // 切换到本地仓库的master分支
  git checkout master
  
  // 将主仓库的master分支合并到本地仓库的master分支
  git merge upstream/master
  
  // 将本地仓库的修改提交到个人仓库上
  git push
  
  // 在github个人仓库上创建pull request，经管理员review之后，并入主仓库
  ```
