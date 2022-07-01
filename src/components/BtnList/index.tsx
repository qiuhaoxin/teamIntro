import {defineComponent, type CSSProperties} from 'vue';
import type{PropType} from 'vue';
import './index.less';

export interface btnProps{
    name:string,
    onClick:(e:Event)=>void,
    btnType?:string,

}

export default defineComponent({
    name:'BtnList',
    props:{
        btnList:{
            type:Array as PropType<btnProps[]>,
            default:()=>[]
        },
    },
    setup(props,{emit,expose,attrs,slots}){
        const btnList=props.btnList;
        
        return ()=>{
            const {style}=attrs;
            return <div style={style as CSSProperties} class='btn-list-wrapper'>
                {
                    btnList.map(btn=>{
                        const {btnType,onClick,name,key}=btn;
                        return <a-button data-key={key} style={{marginLeft:'10px'}} type={btnType} onClick={(e:Event)=>onClick(e)}>{name}</a-button>
                    })
                }
            </div>
        }
    }
})