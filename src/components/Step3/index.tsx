import {defineComponent, onErrorCaptured, reactive,ref} from 'vue';
import './index.less';

import Matrix from '../Matrix';
import type { btnProps } from '../BtnList';

let MatrixArr=[
    {
        title:'局部放电幅值判断矩阵设置',
        desc:['放电重复率n','最大放电能量𝑊_max','总放电能量𝑊_total','最大放电量𝑄_max'],
        columns:['n','𝑊_max','𝑊_total','𝑄_max'],
        initData:[[1,1,0.5,2],[1,1,0.5,2],[2,2,1,4],[0.5,0.5,0.25,1]]
    },{
        title:'局部放电趋势判断矩阵设置',
        desc:['放电重复率𝑍_𝑛','最大放电能量𝑍_𝑤max','总放电能量𝑍_𝑧total','最大放电量𝑍_𝑞max'],
        columns:['𝑍_𝑛','𝑍_𝑤max','𝑍_𝑧total','𝑍_𝑞max'],
        initData:[[1,1,0.5,2],[1,1,0.5,2],[2,2,1,4],[0.5,0.5,0.25,1]]
    },{
        title:'接头温度判断矩阵设置',
        desc:['外表面相间温差𝑇_w','外表面轴向温差𝑇_v','外表面与环境的相对温差𝑇_u'],
        columns:['T_w','T_v','T_u'],
        initData:[[1,1,1],[1,1,1],[1,1,1]]
    },{
        title:'环境温湿度判断矩阵设置',
        desc:['环境温度𝑇_4','环境湿度𝐻_5'],
        columns:['𝑇_4','𝐻_5'],
        initData:[[1,1],[1,1]]
    },{
        title:'准则层判断矩阵设置',
        desc:['相对温升𝐺_1','局放趋势𝐺_2','局放幅值𝐺_3','外界环境因素𝐺_4'],
        columns:['n','𝑊_max','𝑊_total','𝑄_max'],
        initData:[[1,0.25,0.5,2],[4,1,2,8],[2,0.5,1,4],[0.5,0.125,0.25,1]],
    }
]

import BtnList from '../BtnList';

const step3Props={
    previous:{
        type:Function,
        default:()=>null
    },
    next:{
        type:Function,
        default:()=>null,
    }
} as const;
export default defineComponent({
    inheritAttrs:false,
    props:step3Props,
    setup(props,{expose,emit,attrs,slots}){

        let matrixArr=reactive(MatrixArr)

        let handleClick=(key:string,e:Event)=>{
            const {next,previous}=props;
            const target=e.target as any;
            const val=target.value;

            if(key=='previous'){
                previous && previous(2)
            }else if(key=='next'){
                next && next(2)
            }
        }
        onErrorCaptured((error,target)=>{
            console.log('error is ',error)
            return false;
        })

        let handleBtnClick=(e:Event)=>{
            const {previous,next}=props;
            let target=e.target as any;
            let text=target.innerText;
            text=text.replace(/\s*/g,'');
            switch(text){
                case '恢复所有默认设置':

                break;
                case '上一步':
                    previous && previous(2)
                break;
                case '下一步':
                    next && next(2)
                break;
            }
        }

        let btnList=ref<btnProps[]>([
            {
                name:'恢复所有默认设置',
                btnType:'primary',
                onClick:handleBtnClick
            },{
                name:'上一步',
                onClick:handleBtnClick,

            },{
                name:'下一步',
                onClick:handleBtnClick,
                btnType:'primary'
            }
        ])
        return ()=>{
            return <div class="step3-wrapper">
           
                <div class='step3-content'>
                    {
                        matrixArr.map(matrix=>{
                            return <Matrix title={matrix.title} 
                            desc={matrix.desc} 
                            initColumns={matrix.columns}
                            initData={matrix.initData}>
                        </Matrix>
                        })
                    }
                </div>
                <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
                    <BtnList btnList={btnList.value}></BtnList>
                </div>
                

            </div>  
        }
    }
})