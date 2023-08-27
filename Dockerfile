# FROM是构建镜像的基础源镜像，该Image文件继承官方的node Image
FROM node:20  

# 在容器中创建一个目录
RUN mkdir -p /app/tog/

# 定位到容器的工作目录   
WORKDIR /app/tog/ 


# 将 package.json 和 package-lock.json 复制到容器中
COPY  package*.json  /app/tog_sever/
RUN cd /app/tog_sever/

# 安装项目依赖  
RUN npm install    

# 把当前目录下的所有文件拷贝到 Image 的 /app/tog/ 目录下
COPY . /app/tog/

# 暴露应用程序端口
EXPOSE 3000

# 运行应用程序
CMD [ "node", "./app.js" ]