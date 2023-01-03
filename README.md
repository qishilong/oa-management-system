## 用户登录模块数据处理（二）

### 用户状态管理

- 保存全局用户信息到store对象内部

    - umi中dva的使用方法

        - 参考链接：https://umijs.org/zh-CN/plugins/plugin-dva

        - 使用注意事项：

            > - **内置 dva**，默认版本是 `^2.6.0-beta.20`，如果项目中有依赖，会优先使用项目中依赖的版本。
            > - **约定式的 model 组织方式**，不用手动注册 model
            > - **文件名即 namespace**，model 内如果没有声明 namespace，会以文件名作为 namespace
            > - **内置 dva-loading**，直接 connect `loading` 字段使用即可
            > - **支持 immer**，通过配置 `immer` 开启

        - 约定规则

            > 符合以下规则的文件会被认为是 model 文件，
            >
            > - `src/models` 下的文件
            > - `src/pages` 下，子目录中 models 目录下的文件
            > - `src/pages` 下，所有 model.ts 文件(不区分任何字母大小写)

- **状态定义**

    组件文件夹下或全局创建model文件夹

    <img src="https://adminimg.hyfarsight.com/image-20211102211626384.png" alt="image-20211102211626384" style="zoom: 80%;margin:0" />

- 组件内部进行使用

    ```js
    // 函数组件内部，在umi实例化对象内部进行useDispatch及useSelector获取
    
    import { useDispatch, useSelector } from 'umi';
    ```

- 根据命名空间空间获取state状态值

    ```js
     const { closeStatus } = useSelector((state) => state.common);
    ```

- **状态修改**

- dispath方法进行状态修改

    ```js
    dispatch({
          type: 'common/changeCloseStatus',
          payload: { closeStatus: !closeStatus },
        });
    ```

- model中进行状态修改处理

    ```js
    export default {
      namespace: 'common',
      state: {
        userInfo: session.get('userProfile'),
      },
      reducers: {
        //- 修改用户配置信息
        updateUserProfile (state, { payload }) {
          return { ...state, ...payload };
        }
      }
    };
    ```

**异步处理**

> 当需要处理异步数据（接口请求）的时候可以将请求状态处理放在effects对象内部进行收集，同时可获取一个全局的loadingState状态值
>
> 可以根据loading状态值进行loading效果添加



### 保存用户登录状态同时添加loading效果

1. **添加loading组件**

    > loading组件在多个界面或模块中使用，我们需要动态添加loading的显示效果

    ```js
    import React from 'react'
    import './Loading.less'
    import classNames from 'classnames';
    
    const Loading = ({ spinning = false, part = false }) => {
      const loadingStyleData = part ? {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: '100%',
        width: '100%',
        transform: 'translate(-50%, -50%)',
      } : {};
    
      return (
        <div style={{ ...loadingStyleData }} className={classNames('loader', 'fullScreen', { hidden: !spinning })}>
          <div className="wrapper">
            <div className="inner"></div>
            <div className="text">LOADING</div>
          </div>
        </div>
      )
    }
    
    export default Loading
    
    ```

2. **模板组件内部进行loading效果的显示隐藏处理**

    ```js
     <Loading spinning={loading.effects['user/login']}></Loading>
    ```

3. **定义用户状态**

    > 由于用户状态在多个组件内部会进行使用，所以我们可以将user状态存储在全局的model中，同时为了持久化对状态数据保存，可用使用session进行状态报错。

    ```js
    export default {
      namespace: 'common',
      state: {
        userInfo: session.get('userProfile')
      }
    };
    ```

4. **获取用户信息成功后，保存用户信息到store状态，同时进行session存储**

    ```js
      effects: {
        *login ({ payload }, { put, call, select }) {
          const { data, msg } = yield call(userLogin, payload)
          if (!data) {
            message.error(msg)
            return
          }
          const roteData = yield call(getRouteList);
          //- store存储
          session.set('userProfile', data)
          session.set('routeList', roteData.data)
          // - state 存储  
          yield put({
            type: 'common/updateUserProfile',
            payload: { userInfo: data }
          })
          history.push(roteData.data[0].route)
        }
      }
    ```



### 重置密码实现

- 创建UI界面，添加验证规则
- 验证码发送
