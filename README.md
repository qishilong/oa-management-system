## 主页面基本结构搭建

### 路由守卫处理

> 当用户未登录状态时，首页面相关信息用户无法进行访问，同时跳登录页面。

1. 使用dva的`subscriptions`初始化进行事件派发

    参考文档：https://dvajs.com/api/#subscriptions

    ```js
      subscriptions: {
        setup ({ dispatch }) {
          //- 初始化查询用户是否登录（路由守卫）
          dispatch({ type: 'queryUserLoginStatus' });
        }
      }
    ```

2. 定义路由匹配规则

    > 判断当前用户是否在非权限界面，如果在权限界面，直接显示页面
    >
    > 不在权限页面，判断当前用户是否已经进行过登录操作（登录操作之后，本地会存储路由表，token值，以及用户信息）
    >
    > 用户信息不存在，直接跳转登录界面

    > 用户本地已经存储过信息时，直接进行用户信息的检测，用户身份查询接口
    >
    > 接口地址：`api/queryLoginStatus`
    >
    > 返回相应状态：
    >
    > - 检测失败：直接跳转登录界面，并删除sessionStorage保存的内容
    > - 检测成功：请求路由表，并进行storage的保存操作，准备跳转界面
    >     - 路由表请求地址：http://mock.duyiedu.com/project/128/interface/api/432

    

    ```js
     *queryUserLoginStatus ({ payload }, { put, call }) {
          const { history, history: { location: { pathname } } } = payload;
          if (pathname !== '/users/login' && pathname !== '/users/forgetPassword') {
            //- 如果当前存储数据中没有用户信息，token值，或者是路由表，直接跳转login界面
            if (!sessionStorage.getItem('userProfile') || !sessionStorage.getItem('token') || !sessionStorage.getItem('routeList')) {
              history.replace('/users/login')
            } else {
              //- 发送数据请求
              const res = yield call($http.queryLoginStatus);
              if (res.code !== 0) {
                //- 用户token不正确
                history.replace('/user/login')  // - 跳转登录界面
                sessionStorage.clear();         //- 清空本地存储信息
              } else {
                // - 用户token为正确状态 获取路由表
                const { data: routeList } = yield call($http.getRouteList);
                sessionStorage.setItem('routeList', JSON.stringify(routeList));
              }
            }
          } else {
            //- 如果当前在登陆界面直接删除session信息内容
            sessionStorage.clear();
          }
        }
    ```

---



### 添加布局模版

1. **创建侧边栏组件**

    > 使用antlayout布局
    >
    > **参考地址**:https://ant.design/components/layout-cn/

    **侧边栏图标列表**

    ```js
    import {
      ArrowRightOutlined,
      MobileOutlined,
      UserOutlined,
      CodeSandboxOutlined,
      LockOutlined,
      ApartmentOutlined,
      AimOutlined,
      InsertRowAboveOutlined,
      SmileOutlined,
      AccountBookOutlined,
      DashboardOutlined,
      LineChartOutlined,
      TeamOutlined
    } from '@ant-design/icons';
    
    export default {
      arrowRight: <ArrowRightOutlined />,
      userIcon: <UserOutlined />,
      mobileIcon: <MobileOutlined />,
      smCodeIcon: <CodeSandboxOutlined />,
      passwordIcon: <LockOutlined />,
      department: <ApartmentOutlined />,
      level: <AimOutlined />,
      assessment: <InsertRowAboveOutlined />,
      reward: <SmileOutlined />,
      salary: <AccountBookOutlined />,
      dashboard: <DashboardOutlined />,
      attendance: <LineChartOutlined />,
      team: <TeamOutlined />,
    };
    ```

    **侧边栏样式文件**

    ```css
    #root {
      height: 100%;
      .container {
        height: 100%;
      }
      .ant-layout-header {
        width: 100%;
        height: 72px;
        background-color: #fff;
        box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        flex-direction: row;
      }
      .side-bar {
        box-shadow: rgb(24 144 255 / 10%) 0 0 28px 0;
        z-index: 10;
        :global {
          .ant-layout-sider-children {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
        .brand {
          z-index: 1;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 36px;
              margin-right: 8px;
            }
            h1 {
              vertical-align: text-bottom;
              font-size: 16px;
              text-transform: uppercase;
              display: inline-block;
              font-weight: 700;
              color: #1890ff;
              white-space: nowrap;
              margin-bottom: 0;
              background-image: -webkit-gradient(
                linear,
                37.219838% 34.532506%,
                36.425669% 93.178216%,
                from(#29cdff),
                to(#0a60ff),
                color-stop(0.37, #148eff)
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
    
        .menuContainer {
          height: ~'calc(100vh - 120px)';
          overflow-x: hidden;
          flex: 1;
          padding: 24px 0;
    
          &::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
    
          &:hover {
            &::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
    
          :global {
            .ant-menu-inline {
              border-right: none;
            }
          }
        }
      }
      box-shadow: rgb(24 144 255 / 10%) 0 0 28px 0;
    }
    
    ```
