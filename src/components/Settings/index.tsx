import {defineComponent,ref} from 'vue';
import './index.less'

import Upload from '@/components/Upload'
import Cal8 from '@/components/Cal8'
import Matrix from '@/components/Matrix';
import Step3 from '@/components/Step3';
import Step4 from '../Step4';
import Step5 from '../Step5';
export default defineComponent({
    name:'Settings',
    components:{
        Upload,
        Cal8,
        Matrix
    },
    setup(){
        const curStep=ref(0)
        const stepOneRef=ref(null)
        const stepTwoRef=ref(null)
        const stepThreeRef=ref(null)
        const stepFourRef=ref(null)
        const stepFiveRef=ref(null) 
        const stepArr=ref([
            {
                title:'原始数据',
                key:'setting'
            },{
                title:'大小阈值',
                key:'showResult'
            },            {
                title:'主观权重输入矩阵',
                key:'setting'
            },{
                title:'变权权重参数',
                key:'showResult'
            },{
                title:'综合评价参考数列',
                key:''
            }
        ])
        const handleNext=(stepNum:number)=>{

            if(stepNum > stepArr.value.length){
                return;
            }
            curStep.value=stepNum + 1;
        }
        const handlePrevious=(stepNum:number)=>{
            if(stepNum < 1){
                return
            }
            curStep.value=stepNum - 1;
        }
        const handleSave=()=>{
            if(stepFiveRef.value){
                const fiveData=stepFiveRef.value.getData();
                console.log("fiveData is ",fiveData);
            }
        }
        const renderStepContent=()=>{
            const stepProps={
                next:handleNext,
                previous:handlePrevious
            }
            const stepVal=curStep.value;
            switch(stepVal){
                case 0:
                    return <>
                        <Upload ref={stepOneRef} {...stepProps}/>
                    </>
                case 1:
                    return <>
                        <Cal8 ref={stepTwoRef} {...stepProps}/>
                    </>
                case 2:
                    return <>
                        <Step3 ref={stepThreeRef} {...stepProps}></Step3>
                    </>
                case 3:
                    return <>
                        <Step4 ref={stepFourRef} initData={{a:0.2,b:0.4,c1:1,c2:1.5,$:2}}  {...stepProps}></Step4>
                    </>
                case 4:
                    return <>
                        <Step5 ref={stepFiveRef} save={handleSave}  {...stepProps} initData={[
                            [0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0.0176,0.0176,0.0181,0.04692,0.04692,0.0959,0.0234,0.0235,0.0235,0.0481,0.0118,0.018,0.009],
                            [0.0439,0.0439,0.0452,0.1173,0.1173,0.2398,0.0586,0.0587,0.0587,0.1202,0.0294,0.0449,0.0221]
                        ]}></Step5>
                    </>

            }
        }
        return ()=>{
            return <div class='mainWrapper'>
                <a-steps current={curStep.value}>
                    {
                        stepArr.value.map(step=>{
                            return <a-step key={step.key} title={step.title}></a-step>
                        })
                    }
                </a-steps>
                <div class='step-content'>
                    {
                        renderStepContent()
                    }
                </div>
            </div>
        }
    }
})