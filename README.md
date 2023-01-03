## 主页面基本结构搭建(二)

### header组件创建

- 抽取header内容到独立组件内部
- 创建用户操作组件。使用menu下拉菜单实现，当用户点击下拉菜单时，进行退出操作
    - 退出功能实现
        - 删除sessionStorage存储数据
        - 刷新当前界面

**图标文件更新**

```css
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
  leftArrow: <MenuFoldOutlined />,
  rightArrow: <MenuUnfoldOutlined />,
  rewardAndPunishment: <DatabaseOutlined />,
  signOut: <WalletOutlined />,
  'bar-chart': <BarChartOutlined />,
```

---



### collaspe状态处理调整侧边宽度显示规则

- layout模版内部定义状态collapse
- header组件与siderbar组件内部进行状态调整操作



### 404界面制作

​	在用户已经登录但是输入错误时，显示404界面内容

<u>404界面样式相对不是很多，可以使用界面内直接使用的形式进行写入</u>

```html
 <div style={{
      display: 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '100%'
    }} >
```

