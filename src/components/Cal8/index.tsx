import {defineComponent, reactive} from 'vue'
import type{PropType} from 'vue'
import './index.less'


const cal8Props={
    title:String,
    initData:{
        type:Array,
        default:()=>[]
    },
    previous:{
        type:Function as PropType<(stepNum:number)=>void>,
        default:()=>null
    },
    next:{
        type:Function as PropType<(stepNum:number)=>void>,
        default:()=>null
    }
} as const;

export default defineComponent({
    name:'Cal8',
    props:cal8Props,
    setup(props,{emit,expose}){

        let dataArr={
            '8':{
                text:`指标8（放电重复率n （次/秒））`,
                min:150,
                max:1000
            },
            '9':{
                text:`指标9（最大放电能量𝑊_𝑚𝑎𝑥 （nj））`,
                min:500,
                max:7000
            },
            '10':{
                text:`指标10（总放电能量𝑊_𝑡𝑜𝑡𝑎𝑙 （μj））`,
                min:150,
                max:1000
            },
            '11':{
                text:`指标11（最大放电量𝑄_𝑚𝑎𝑥 （pc））`,
                min:60,
                max:1000
            },
            'all':{
                text:`指标4、5、6、7（局放特征值变化趋势𝑍_𝑛 、𝑍_𝑤 、𝑍_𝑎𝑣𝑒 、𝑍_𝑞）`,
                min:0,
                max:2.58
            },
            '1':{
                text:`指标1（外表面相间温差𝑇_𝑤 （℃））`,
                min:0.5,
                max:5
            },
            '2':{
                text:`指标2（外表面轴向温差𝑇_𝑣 （℃））`,
                min:0.5,
                max:5
            },
            '3':{
                text:`指标3（外表面与环境的相对温差𝑇_𝑢 （℃））`,
                min:0,
                max:25
            },
            '12':{
                text:`指标12（环境温度𝑇 ̅_4 （℃））`,
                min:10,
                max:45
            },
            '13':{
                text:`指标13（环境湿度𝐻 ̅_5  （RH%））`,
                min:40,
                max:90
            }
        }

        const getData=()=>{

        }

        //暴露组件接口
        expose({
            getData
        })
        const handleInputChange=(key:string,maxOrMin:string,e:Event)=>{
            const row=(dataArr as any)[key];
            const target=e.target as any
            let value=target.value;

            row[maxOrMin]=value;
        }
        dataArr=reactive(dataArr)
        const handleClick=(key:string,e:Event)=>{
            // debugger
            const {previous,next}=props;
            if(key=='previous'){
                previous && previous(1);
            }else if(key=='next'){
                next && next(1);
            }
        }
        return ()=>{
            return <div class="cal8-wrapper">
                <div class="cal8-content">
                    <div class='row'>
                        <span>指标列</span>
                        <span>𝑥_𝑖𝑚𝑖𝑛最小阈值</span>
                        <span>𝑥_𝑖max最大阈值</span>
                    </div>
                    <div>
                    {
                        Object.keys(dataArr).map(key=>{
                            let obj=(dataArr as any)[key];
                            const {text,min,max}=obj;
                            return <div class='row'>
                                <span>{text}</span>
                                <span>
                                    <a-input onChange={(e:Event)=>handleInputChange(key,'min',e)} value={min}/>
                                </span>
                                <span>
                                    <a-input onChange={(e:Event)=>handleInputChange(key,'max',e)} value={max}/>
                                </span>
                            </div>
                        })
                    }
                </div>
                </div>
                <div style={{marginLeft:'70%',marginTop:'30px'}}>
                    <a-button type="primary">恢复默认设置</a-button>
                    <a-button style={{marginLeft:'20px'}} onClick={(e:Event)=>handleClick('previous',e)}>上一步</a-button>
                    <a-button style={{marginLeft:'20px'}} type="primary" onClick={(e:Event)=>handleClick('next',e)}>下一步</a-button>
                </div>

            </div>
        }
    }
})