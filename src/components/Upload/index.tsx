import {defineComponent} from 'vue'


export default defineComponent({
    inheritAttrs:false,
    props:{
        next:{
            type:Function,
            default:()=>null
        }
    },
    setup(props,{emit}){
        const handleBeforeUpload=(file,filelist)=>{
            
        }
        const handleClick=(key:string,e:Event)=>{
            console.log("key is ",key);
            const {next}=props;
            if(key=='reset'){

            }else if(key=='next'){
                next && next(0)
            }
        }
        return ()=>{
            return <div>
                <label>请选择一个文件作为输入数据：</label>
                <a-upload beforeUpload={handleBeforeUpload} action="http://localhost:3000/upload">
                    <a-button type="primary">选择数据文件</a-button>
                </a-upload>

                <div class='row' style={{marginLeft:'60%',marginTop:'30px'}}>
                    <a-button onClick={(e:Event)=>handleClick('reset',e)}>重置</a-button>
                    <a-button style={{marginLeft:'20px'}} onClick={(e:Event)=>handleClick('next',e)} type="primary">下一步</a-button>
                </div>
            </div>
        }
    }
})