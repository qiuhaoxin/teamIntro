import {defineComponent,ref,defineProps, reactive, getCurrentInstance} from 'vue';
import './index.less';


const step4Props={
    initData:{
        type:Object,
        default:()=>null
    },
    previous:{
        type:Function,
        default:()=>null
    },
    next:{
        type:Function,
        default:()=>null
    }
}

import type{btnProps} from '@/components/BtnList';
import BtnList from '@/components/BtnList';
import {cloneDeep} from 'lodash-es';
console.log("cloneDeep is ",cloneDeep);
export default defineComponent({
    name:'Step4',
    props:step4Props,

    inheritAttrs:false,
    setup(props,{expose,emit}){
        let initData=cloneDeep(props.initData)
        initData=reactive(initData)
        console.log("initData is ",initData);
        const handleInputChange=(key:string,e:Event)=>{
            const target=e.target as any;
            const val=target.value;
            initData[key]=val;
        }
        const handleBtnClick=(e:Event)=>{
            const target=e.target as any;
            const text=target.innerText;
            console.log("text is ",text);
            const {previous,next}=props;
            switch(text){
                case '恢复默认设置':
                    console.log("recover");
                    recoverData()
                break;
                case '上一步':
                    previous && previous(3);
                break;
                case '下一步':
                    next && next(3)
                break;
            }
        }
        const btnList=ref<btnProps[]>([
            {name:'恢复默认设置',onClick:handleBtnClick,btnType:'primary',key:'recover'},
            {name:'上一步',onClick:handleBtnClick,key:'previous'},
            {name:'下一步',onClick:handleBtnClick,btnType:'primary',key:'next'}
        ])

        const getData=()=>{
            return initData;
        }
        let instance=getCurrentInstance();
        const recoverData=()=>{
            initData=reactive(props.initData);
            instance?.update()
        }
        expose({
            getData
        })

        return ()=>{
            return <div class="step4-wrapper">
                <div class='step4-content'>
                    {
                        Object.keys(initData).map(key=>{
                            const value=initData[key];
                            return <div class='row'>
                                <label>{`${key}：`}</label>
                                <a-input value={value} style={{width:'50px'}} onChange={(e:Event)=>handleInputChange(key,e)}/>
                            </div>
                        })
                    }
                </div>
                <BtnList style={{marginLeft:'50%'}} btnList={btnList.value}></BtnList>
            </div>
        }
    }
})

