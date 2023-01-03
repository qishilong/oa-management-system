## 项目路由表设计



### 定义路由组件（页面）

1. **创建用户登录相关界面**

    1. 用户登录=>. `login`
    2. 密码重置 => `forgetPassword`

2. **定义主页面展示界面**

    1. 公司情况分析界面 => `dashborad`
    2. 出勤统计界面=>`attendance`
    3. 员工管理界面=>` staff`
    4. 部门管理界面=>`department`
    5. 职级管理界面=>`level`
    6. 绩效考核界面=>`assessment`
    7. 调薪记录界面=>`salary`
    8. 奖惩记录界面=>`rewardRecord`
    9. 考勤信息界面=>=>`attendanceInfo`

3. 404界面定义

    > 在没有匹配上所有的界面时，显示404届面
    >
    > 404page

    *保证当前界面的正常显示*

---



### layout定义

> 由于当前展示的UI界面分为两种，我们需要使用两种模板进行layout的定义

1. 创建用户登录及忘记密码的基础模板

2. 创建主页面展示模板

    > 展示模板包含 侧边栏以及头部信息

3. 根据展示路由进行当前模板选择

4. 定义选择逻辑

    > 定义utils文件夹，创建工具函数selectLayout

    ```js
    export const selectLayout = (pathName) => {
      return pathName.includes('/user') ? 'DefaultLayout' : 'PrimaryLayout'
    }
    ```

5. 在主模版内进行模版跳转处理

    - 倒入不同的模版组件

    - 使用selectLayout模版进行当前模版选择

        ```html
        const LayoutMap = { DefaultLayout, PrimaryLayout };
        const Container = LayoutMap[selectLayout(location.pathname)];
        
        return  <Container>{children}</Container>
        ```

6. 展示模板中创建公共组件，包含header及sidebar

    - 使用antdesign 进行基础布局创建

    - antdesign 文档路径 ： https://ant.design/docs/react/introduce-cn

    - 基本模板实现

        ```js
        <Layout>
          <Layout.Sider width={256} theme="light"  className="side-bar" >
          </Layout.Sider>
          <div className="container">
            <div class="head-container" collapse={collapse} onCollapseChange={changeCollapseStatus} >
              {children}
            </div>
          </div>
        </Layout>
        ```

7. 创建404界面

    在界面中未匹配路由时，指定显示404界面即可



### 别名定义

> ​	倒入path模块，添加alias属性

```js
const {resolve} = require('path');  

alias: {
    api: resolve(__dirname, './src/services/'), 
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  }
```

