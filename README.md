
# TypeScript 回顾
> typescript 是JavaScript的超集
#####  interface 接口
1. 对对象的形状进行描述
2. 对象进行抽象
3. Duck Typing(鸭子类型)
```TypeScript
interface Person { 
    readonly id: Number
    name: String,
    age: Number
}
let boy:Person = {
    id: 1,
    name: 'zhangsan',
    age: 12
}
```
##### 函数类型
```ts
const add = function(x:number,y:number,z?:number):number{
    return x + y + z
}
// 函数类型
const add1:(x:number,y:number) => number = add
```
##### 类类型与类实现接口
```ts
class Animate {
    public name: string = 's'
    readonly age: number = 0
    protected sex: string = 'man'
    private color:string= 'red'
    constructor(name){
        this.name = name
    }
    say(){
        console.log(`${this.name} 说：`)
    }
    static eat(){
        console.log(`eat：`)
    }
}
let cat = new Animate('猫')
cat.say()
cat.age
Animate.eat()

class Dog extends Animate{
    constructor(name){
        super(name)
    }
}
let dog = new Dog('dog')
// 类实现接口，对类进行抽象
interface AnimateInterface {
    name: string,
    say: (x: number) => number
}
class Monkey implements AnimateInterface{
    name: string
    say (){
        return 1
    }
}
```
##### 类型推断
```ts
let str = 'hello World'
str = 1 // 不能将类型“1”分配给类型“string”。
```
##### 枚举
1. 常量枚举(提升性能)
```ts
const enum Drection {
    left,
    right,
    top,
    bottom
}
```
2. 普通枚举
```ts
const enum Drection{
    left,
    right,
    top,
    bottom
}
```
##### 泛型 不预先定义类型，而是在使用时定义
```ts
function echo<T>(arg: T):T{
    return arg
}
let echoStr:string = echo('rgb')
let echoNum = echo(1) // 类型推断 原：let echoNum:Number = echo(1)

function excel<T,U>(arg:[T,U]):[T,U]{
    return arg
}
```
##### 约束泛型
```ts
// 泛型约束 规定传入的值必须包含
interface EchoAnimateInterface{
    length: Number
}
function AnimateFn<T extends EchoAnimateInterface>(arg:T):T{
    arg.length
    return arg
}
AnimateFn([1])
```
##### 类中使用泛型
```ts
class EchoContent<T>{
    private data = []
    push(item:T){
        return this.data.push(item)
    }
    pop():T{
        return this.data.shift()
    }
}
let a = new EchoContent<string>().push('1')
let b = new EchoContent<number>().push(1)
```
##### 泛型接口
```ts
// 泛型接口
interface Getvalue<T,U>{
    key: T,
    val: U
}
let keys:Getvalue<number, string> = {
    key: 1,
    val: '1'
}
```
##### 泛型的其他用途
```ts
let num1: Array<number> = [1]
let num2: Array<string> = ['1']
```
##### 类型别名
```ts
// 类型别名
type arrFN = (x:number,y:number) => number
type orresoleve = String | arrFN
function push(x:orresoleve): string{
    return ''
}
```
##### 类型断言
```ts
// 类型断言 as
function props(x:any){
    // (x as string).length
    // (<string>x).length
}
```
##### 声明文件
```ts
 eg declare var jQuery: (selector:string) => any
```
##### 直接编译ts文件
1. ts-node
2. 每次执行npm run 就会新建一个shell命令，npm 新建的shell会将当前目录的node_modules/.bin/子目录加入path变量，
    执行结束后在将path目录恢复原样
##### react-ts 项目初始化
1. npx create-react-app ts-with-react --typescript
##### react 自定义配置
1. yarn eject
##### 编程语言的类型
1. 动态类型语言（js Python）用js写的程序只有在运行时才能看到一些错误，因此前端开发出了一些静态类型检测器如：eslint
2. 静态类型语言 数据类型检查发生在编译阶段
##### Hook
1. react16.8 用函数组件代替class组件的写法
##### useState
1. useState 通过在函数组件里调用它来给组件添加一些内部state，React会在重复渲染时保留这个state，useState 会返回一对值：
    当前状态和一个让你更新它的函数，你可以在事件处理函数中调用这个函数
##### useEffect
1. 函数组件中没有生命周期，可以用来代替他的方法，相当于class 中的生命周期函数：componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
2. useEffect 第二个参数可以是空数组，它等价于只有componentDidMount 时执行，如果不传第二个参数的话，它就等价于componentDidMount和componentDidUpdate
##### 自定义HOOKS
1. 将组件逻辑提取到可重用的函数中
2. *hook要以use开头*
##### HOC - Higher order component(高阶组件)
1. 高阶组件是一个函数，接受一个组件作为参数，返回一个新的组件
##### useRef - 多次渲染之间的纽带
1. 获取dom元素的节点
2. 获取子组件的实例
3. 渲染周期之间共享数据的存储
```javascript
function App() {
  const [count, setCount] = useState(0);
  // 把定时器设置成全局变量使用useRef挂载到current上
  const timer = useRef();
  // 首次加载useEffect方法执行一次设置定时器
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);
  // count每次更新都会执行这个副作用，当count > 5时，清除定时器
  useEffect(() => {
    if (count > 5) {
      clearInterval(timer.current);
    }
  });
  return <h1>count: {count}</h1>;
}
```
###### useContext - 解决多层传递
``` typescript
interface ITheme {
  [key:string]:{color: string, background: string}
}
const ThemStyle:ITheme = {
  light: {color: '#ccc', background: 'red'},
  dart: {color: '#fff', background: 'gold'}
}
export const ThemContext = createContext(ThemStyle.light)
 <ThemContext.Provider value={ThemStyle.dart}>
    <div></div>
 <ThemContext.Provider />
 // 子组件
 import {ThemContext} from '../App'
 const ThemContextStyle = useContext(ThemContext)
```
###### Hook规则
1. 只在最顶层使用hook
2. 只在React 函数中调用hook
##### Partial 后属性变为可选参数
###### react (测试))testing-library
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
