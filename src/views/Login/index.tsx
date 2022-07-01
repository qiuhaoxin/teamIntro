
import {defineComponent,getCurrentInstance,inject,ref,withDirectives} from 'vue';
import './index.less'

interface userInfo{
    userName:string,
    psw:string
}

export default defineComponent({
    setup(props,{emit,attrs,slots,expose}){
        let userName=ref('');
        let psw=ref('')

        const instance:any=getCurrentInstance();
        const $http:any=inject('$http')
        console.log("instance is ",instance);
        let mes=instance.appContext.app.config.globalProperties.$message;
        const handleLogin=()=>{
            let emptyReg=/^\s*$/;
            
            if(emptyReg.test(userName.value)){
                mes.error("用户名不能为空!");
                return
            }
            if(emptyReg.test(psw.value)){
                mes.error("用户密码不能为空!");
                return;
            }
            let params={
                userName:userName.value,
                psw:psw.value
            }
            console.log("$https i s",$http.post);
            $http.post('http://localhost:3001/login',params).then(res=>{

            })
            // $http.post({
            //     baseUrl:'http://localhost:3001',
            //     url:'/login',
            //     data:params
            // }).then((res:any)=>{
            //     console.log("res is ",res);
            // })



        }
        const handleChange=(key:string,e:Event)=>{
            const target=e.target;
            const value=(target as any).value;
            if(key=='userName'){
                userName.value=value;
            }else if(key=='psw'){
                psw.value=value;
            }
        }
        return ()=>{
            return <div class='form'>
                <div class='row'>
                    <label>用户名：</label>
                    <a-input type="text" value={userName} onChange={(e:Event)=>handleChange('userName',e)}  placeholder="请输入用户名"/>
                    
                </div>
                <div class='row'> 
                    <label>密码</label>
                    <a-input type="password" value={psw} onChange={(e:Event)=>handleChange('psw',e)} placeholder="请输入用户名"/>
                </div>
                <div class='row'>
                    <a-button onClick={handleLogin} type="primary">登录</a-button>
                </div>
            </div>
        }
    }
})
