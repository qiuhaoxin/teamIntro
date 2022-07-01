import {defineComponent, onErrorCaptured, reactive,ref} from 'vue'
import type{PropType} from 'vue'
import './index.less'


const matrixProps={
    title:{
        type:String,
        default:''
    },
    desc:{
        type:Array as PropType<string[]>,
        default:()=>[]
    },
    initData:{
        type:Array,
        default:()=>[]
    },
    initColumns:{
        type:Array as PropType<string[]>,
        default:()=>[]
    }
} as const;

import {cloneDeep} from 'lodash-es'
import BtnList from '../BtnList';
import type { btnProps } from '../BtnList'; 
export default defineComponent({
    name:'Matrix',
    props:matrixProps,
    setup(props,{emit,expose}){
        const initColumns=cloneDeep(props.initColumns);
        const initData= cloneDeep(props.initData);
        initColumns.unshift('')
        console.log("initColumns in step3 Matrix is ",initColumns);
        console.log("initData in step3 matrix is ",initData);

        onErrorCaptured((err,target)=>{
            console.log("step3 matrix err is ",err);
        })
        let matrixArr=[
            initColumns
        ]
        const handleClick=(e:Event)=>{

        }
        let btnList=ref<btnProps[]>([
            {
                name:'恢复默认设置',
                btnType:'primary',
                onClick:handleClick
            }
        ])
        for(let i=1;i<props.initColumns.length;i++){
            matrixArr[i]=[initColumns[i]]
        }
        for(let i=0;i<initColumns.length;i++){
            for(let j=0;j<initColumns.length;j++){
                try{
                    if(j!=0 && i!=0){
                        let val=(initData[i-1] as any)[j-1];
                        
                        matrixArr[i][j]=val
                    }
                }catch(ex){
                    console.log("ex i "+i+"j is "+j+" and matrix is "+matrixArr);
                }

            }
        }

        const getData=()=>{
            return matrixArr
        }

        expose({
            getData
        })

        const handleInputChange=(pars:{rowIdx:number,columnIdx:number},e:Event)=>{
            // const row=(dataArr as any)[key];
            const target=e.target as any
            let value=target.value;

            // row[maxOrMin]=value;
            const {rowIdx,columnIdx}=pars;
            matrixArr[rowIdx][columnIdx]=value;
        }
        matrixArr=reactive(matrixArr)
        return ()=>{
            return <div class="matrix-wrapper">
                <div class="matrix-title">
                    {props.title}
                </div>
                <div class='matrix-desc'>
                    {
                        props.desc.map(desc=>{
                            return <span>
                                {desc}
                            </span>
                        })
                    }
                </div>
                <BtnList btnList={btnList.value} style={{margin:'10px 0'}}></BtnList>
                <div class="matrix-content">
                    <div class='matrix-content-wrapper'>
                    {
                        matrixArr.map((row,rowIdx)=>{
                            return <div class='row' style={{marginTop:0,width:`${60 * row.length}px`}}>
                                {
                                    row.map((column,columnIdx)=>{
                                        return <div class='column' style={{width:'60px',height:'60px'}}>
                                            { rowIdx==0 || columnIdx==0 || rowIdx==columnIdx 
                                            ? column
                                            : <a-input value={column} bordered={false} onChange={(e:Event)=>handleInputChange({rowIdx,columnIdx},e)}></a-input>
                                        }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                </div>

            </div>
        }
    }
})