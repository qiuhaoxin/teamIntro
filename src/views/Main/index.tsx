import {defineComponent,ref} from 'vue';
import './index.less'

import Upload from '@/components/Upload'
import Cal8 from '@/components/Cal8'
import Matrix from '@/components/Matrix';

import Settings from '@/components/Settings';
import ResultShow from '@/components/ResultShow'

export default defineComponent({
    components:{
        Upload,
        Cal8,
        Matrix
    },
    setup(){
        const curStep=ref(0)
        const stepArr=ref([
            {
                title:'参数设置',
                key:'setting'
            },{
                title:'结果展示',
                key:'showResult'
            }
        ])
        return ()=>{
            return <div class='mainWrapper'>
                <a-tabs >
                    <a-tab-pane key={1} tab={'配置参数'}>
                        <Settings />
                    </a-tab-pane>
                    <a-tab-pane key={2} tab={'查看结果'}>
                        <ResultShow />
                    </a-tab-pane>
                </a-tabs>
                {/* <a-steps current={curStep.value}>
                    {
                        stepArr.value.map(step=>{
                            return <a-step key={step.key} title={step.title}></a-step>
                        })
                    }
                </a-steps>
                <div class='step-content'>
                    {
                        curStep.value==0
                        ? 
                        <div class="step-one">
                            <Upload/>
                            <div class='row'>
                                <Cal8 />
                            </div>
                            <div class='row'>   
                                <label>3、设置主观权重输入矩阵</label>                 
                                <Matrix title={'局部放电幅值判断矩阵设置'} 
                                desc={['放电重复率n','最大放电能量𝑊_max','总放电能量𝑊_total','最大放电量𝑄_max']} 
                                initColumns={['n','𝑊_max','𝑊_total','𝑄_max']}
                                initData={[[1,1,0.5,2],[1,1,0.5,2],[2,2,1,4],[0.5,0.5,0.25,1]]}></Matrix>
                            </div>
                            <div class='row'>
                                <label>4、设置变权权重参数</label>
                                <a-input></a-input>
                            </div>
                            <div class='row'>
                                <label>5、设置综合评价参考数列</label>
                                <a-input></a-input>
                            </div>

                            <div class='row'>
                                <a-button type="primary">下一步</a-button>
                            </div>

                        </div>
                        : 
                        <div class="step-two">

                        </div>
                    }
                </div> */}
            </div>
        }
    }
})