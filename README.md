

## 创建登录模块



### antForm表单使用

**参考地址** ： https://ant.design/components/form-cn/#header

> 使用form表单模板完成界面基本结构搭建

### ui实现

1. 实现用户登录界面制作

    - 创建账户名密码登录组件

    - 创建手机号验证码登录组件

        - 创建验证码组件

    - 定义图标组件库

        > 为了工程的图表统一管理维护，可添加图表配置组件文件进行图标文件导出

        antd图标访问地址：https://ant.design/components/icon-cn/#header

        ```html
        import {
          ArrowRightOutlined,
          MobileOutlined,
          UserOutlined,
          CodeSandboxOutlined,
          LockOutlined
        } from '@ant-design/icons';
        
        export default {
          arrowRight: <ArrowRightOutlined />,
          user: <UserOutlined />,
          mobile: < MobileOutlined />,
          smCode: < CodeSandboxOutlined />,
          password: <LockOutlined />
        };
        ```

        

    - 定义组件展示条件，状态值为0展示账户登录组件，状态值为1展示手机号+密码组件

        ```js
          const [type, setType] = useState(0);
        ```

2. 创建账户登录组件

    > 账户登录组件内部使用父组件传递的标单项渲染内容即可，父组件传递FormItem及Input组件

    - 在账户组件内部使用验证规则

    - 定义验证规则组件，rules，并进行导出使用

        ```js
        export const loginRule =  {
          userRule: [
            { required: true, message: '账户名不能为空' },
            { max: 16, message: '账户名长度不正确' },
            { min: 4, message: '账户名长度不正确' },
          ],
          passwordRule: [
            { required: true, message: '密码不能为空' },
            { max: 16, message: '密码长度不正确' },
            { min: 4, message: '密码长度不正确' },
          ]
        }
        
        ```

    - 将loginRule进行内容导出操作

        1. 创建index.js文件作为入口文件，进行相应的规则倒出

            ```js
            export { loginRule } from './loginRule.js'
            ```

    - 账户组件内进行规则添加，并创建验证图标hasFeedback

        ```js
           <FormItem name="accountName" rules={loginRule.userRule} hasFeedback>
        ```

3. 创建手机号+验证码登录组件

    - 添加验证规则

        ```js
          mobileRule: [
            {
              validator: (rule, val, callback) => {
                const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
                switch (true) {
                  case !Boolean(val):
                    return Promise.reject('手机号码不能为空')
                  case !mobileReg.test(val):
                    return Promise.reject('手机号码格式不正确')
                  default:
                    return Promise.resolve()
                }
              },
            }
          ],
          smCodeRule: [
            { required: true, message: '验证码不能为空' },
            { max: 6, message: '最大长度为6位' },
            { min: 6, message: '最小长度为6位' },
          ]
        ```

    - 完成倒计时逻辑添加

        1. 定义倒计时计算时间状态值

            ```js
              let [currentTime, setCurrentTime] = useState(60);
            ```

        2. 定义当前文字显示状态

            ```js
              const [currentStatus, setCurrentStatus] = useState(true);
            ```

        3. 创建按钮的显示状态

            ```js
              const [disabled, setDisabled] = useState(true);
            ```

        4. 手机号码输时是监听状态手机号码状态，正确，开启发送验证码，失败，无法进行验证码发送操作

            ```js
              //- 发送验证码验证手机号是否正确
              const mobileValChange = async () => {
                try {
                  const status = await form.validateFields(['mobile'])
                  setDisabled(false)
                } catch (error) {
                  setDisabled(true)
                }
              }
            ```

        5. 手机号码验证正确，开启倒计时逻辑处理

            ```js
              //- 发送验证码组件内部进行发送
              const _sendSmCode = async () => {
                setCurrentStatus(false);
                setDisabled(true)
                runTime();
              }
              
               //- 开始倒计时
              const runTime = () => {
                const timer = setInterval(() => {
                  if (currentTime === 0) {
                    clearInterval(timer);
                    setCurrentStatus(true);
                    setDisabled(false);
                    setCurrentTime(60);
                    return
                  }
                  setCurrentTime(--currentTime)
                }, 1000)
              }
            ```

            

### 组件切换逻辑实现

> ​	在当前登录方法中实现账户名以及手机号码登录的切换操作



### 表单验证

1. 创建用户表单登录验证规则文件

    ```js
    import { createReturn } from "typescript"
    
    export const loginRule =  {
      userRule: [
        { required: true, message: '账户名不能为空' },
        { max: 16, message: '账户名长度不正确' },
        { min: 4, message: '账户名长度不正确' },
      ],
    confirmPasswordRule :(form)=>{
      return [
        {
          validator: (rule, val, callback) => {
            switch (true) {
              case !Boolean(val):
                return Promise.reject('确认密码不能为空')
              case form.getFieldValue('password') !== val:
                return Promise.reject('两次密码不相同')
              default:
                return Promise.resolve()
            }
          }
        }]
    }
    }
    ```

    

    

