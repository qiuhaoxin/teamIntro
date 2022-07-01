import {computed, defineComponent,ref} from 'vue';
import './index.less';

import BtnList from '../BtnList';
import type { btnProps } from '../BtnList';
import {cloneDeep} from 'lodash-es'

export default defineComponent({
    name:'Step5',
    inheritAttrs:false,
    props:{
        initData:{
            type:Array,
            default:()=>[]
        },
        previous:{
            type:Function,
            default:()=>null
        },
        save:{
            type:Function,
            default:()=>null
        }
    },
    setup(props,{expose,emit}){
        const myData=computed({
            get(){
                return props.initData;
            },
            set(){

            }
        })
        console.log("muData in step5 is ",myData);
        const getData=()=>{
            console.log("myData is ",myData.value);
            return myData.value;
        }

        const handleBtnClick=(e:Event)=>{
            const target=e.target as any;
            let text=target.innerText;
            text=text.replace(/\s*/g,'')
            const {save,previous}=props;
            console.log("text is ",text);
            switch(text){
                case '上一步':
                    previous && previous(4)
                break;
                case '保存':
                    console.log("hei save !");
                    save && save();
                break;
                case '恢复默认设置':

                break;
            }
        }
        const btnList=ref<btnProps[]>([
            {name:'恢复默认设置',onClick:handleBtnClick,btnType:'primary',key:'recover'},
            {name:'上一步',onClick:handleBtnClick,key:'previous'},
            {name:'保存',onClick:handleBtnClick,btnType:'primary',key:'next'}
        ])
        expose({
            getData
        })
        const handleInputChange=(e:Event,rowInfo:{rowIdx:number,columnIdx:number})=>{
            const target=e.target as any;
            const val=target.value;
            const {rowIdx,columnIdx}=rowInfo;
            console.log("rowIdx is ",rowIdx);
            console.log("columnIdx is ",columnIdx);
            let tempArr=cloneDeep(myData.value);
            console.log("tempArr is ",tempArr);
            tempArr[rowIdx][columnIdx]=val;
            myData.value=tempArr;
            // (myData.value as any)[rowIdx][columnIdx]=val;
        }
        return ()=>{
            return <div class="step5-wrapper">
                <div class='step5-header'>
                    <span class='step5-column1'>状态等级</span>
                    <span class='step5-column2'>参考数列</span>
                </div>
                <div class='step5-content'>
                    {
                        myData.value.map((rowData,rowIdx)=>{
                            
                            return <div class='step5-row'>
                                <span class='step5-column1'>{rowIdx}</span>
                                <span class='step5-column2'>
                                    {
                                        
                                        (rowData as number[]).map((columnData,columnIdx)=>{
                                            
                                            return <span class='step5-unit'>
                                                <a-input style={{width:'80px'}} 
                                                onClick={(e:Event)=>handleInputChange(e,{rowIdx,columnIdx})} value={columnData}/>
                                            </span>
                                        })
                                    }
                                </span>
                            </div>
                        })
                    }
                </div>
                <BtnList btnList={btnList.value}/>
            </div>
        }
    }
})

