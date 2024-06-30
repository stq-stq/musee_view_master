<template>
    <v-card>
        <v-card-title class="card-title">
                个性化学生档案
        </v-card-title>
        <v-card class="mx-auto main-card" >
            <div class="content">
                <!-- info -->
                <div class="info">
                    <div class="image-container">
                        <v-img src="../src/images/musee-edu/info.svg" height=200px width=200px cover></v-img>
                    </div>
                    <div class="text-container">
                        <v-card-title class="card-title"><span class="dot" style="background-color: green;"></span>Musee</v-card-title>
                        <div class="border-line"></div>
                        <ul>
                            <li><span class="dot"></span><span>姓名:</span><span>{{name1}}</span></li>
                            <li><span class="dot"></span><span>年龄:</span><span>{{age}}</span></li>
                            <li><span class="dot"></span><span>年级:</span><span>{{grade}}</span></li>
                            <li><span class="dot"></span><span>电话:</span><span>{{tel}}</span></li>
                            <li><span class="dot"></span><span>邮箱:</span><span>{{email}}</span></li>
                        </ul>
                    </div>
                </div>
                <!-- chart -->
                <div class="mx-auto content-card" height="100%" style="display: flex;margin-top: 20px;margin-bottom: 20px;">
                    <div style="background-color: #F7F9F9;border-radius: 16px;margin-left: 20px;">
                        <div ref="echartRef2" style="width: 60vw; height: 50vh;"></div>
                    </div>
                    
                </div>
            </div>
            
            <!-- 档案 -->
            <v-card class="card-content" style="margin-left:10px;background-color: #D4F0FC;border-radius: 16px;">
                <div class="chart-title">
                    <span >核心素养能力档案</span>
                </div>
                <!-- <div style="margin-bottom: 20px;">
                    <div v-for="(verticalIndex,index) in 6" :key="index" class="slider">
                        <div class="slider-text">
                            <span style="font-weight: bold;">{{chartData[index].name}}</span>
                        </div>
                        <div class="low">低</div>
                        <div class="high">高</div>
                        <div class="slider-container" >
                            <div class="slider-border"></div>
                            <div class="slider-track">
                                <div class="slider-handle" :style="getPositionStyle(chartData,index,verticalIndex)"></div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div style="margin-left:20px;border-radius: 16px;">
                    <div ref="echartRef3" style="width: 30vw; height: 60vh;"></div>
                </div>
                <div class="chart-title">
                    <span >个性偏好档案</span>
                </div>
                <div v-for="(habit,index) in habitData" :key="index" style="display: flex;align-items: center;margin-bottom: 10px;justify-content: center;">
                    <div class="habit-container">{{habit}}</div>
                </div>
            </v-card>
        </v-card>
    </v-card>
    
    
</template>
<script setup>
    import { onMounted,ref } from 'vue';
    import * as echarts from 'echarts';

    const echartRef2 = ref(null);
    const radarChart = ref(null);
    const echartRef3 = ref(null);

    const days = Array.from({ length: 30 }, (_, i) => i + 1); // 生成1到30的数组表示天数
    const searchData = days.map(() => Math.floor(Math.random() * 20)); // 生成随机搜索量数据

    const categories = ['多项式函数', '相遇问题', '一元一次方程', '不等式求解', '一次函数', '平面几何', '圆的性质','根与系数关系','指数与对数','因式分解']; // 错题种类
    const dots = Array.from({ length: 10 }, (_, i) => i + 1);
    const categoryData = dots.map(() => Math.floor(Math.random() * 10)); // 各种类错题数量
    const radraData = [{value: [80, 70, 60, 50, 40, 30, 20, 10, 5, 0], name: '学生A'}, 
        {value: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110], name: '学生B'}, 
        {value: [50, 40, 30, 20, 10, 0, 10, 20, 30, 40], name: '学生C'}, 
        {value: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], name: '学生D'}, 
        {value: [80, 70, 60, 50, 40, 30, 20, 10, 0, 10], name: '学生E'}, 
        {value: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], name: '学生F'}, 
        {value: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], name: '学生G'}
    ]; // 能力档案数据
    const errorData = [
        { value: 40, name: '语法错误' },
        { value: 30, name: '拼写错误' },
        { value: 20, name: '逻辑错误' },
        { value: 10, name: '事实错误' }
    ];

    onMounted(() => {
        const myChart2 = echarts.init(echartRef2.value);

        const option2 = {
            title: {
                text: '知识点档案',
                padding: [30, 20, 30, 30],
                textStyle: {
                    fontSize: 24.5
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: categories
            },
            
            series: [
                {
                    name: '错题数量',
                    type: 'bar',
                    data: categoryData,
                    emphasis: {
                        focus: 'series'
                    },
                    barWidth: '50%',
                    itemStyle: {
                        
                        normal: {
                            color: '#5470C6',// 可以设置条形的颜色
                            barBorderRadius: [10, 10, 10, 10] // 设置左上角和右上角的圆角半径为 10，右下角和左下角的圆角半径为 0
                        }
                        
                    }
                }
            ]
        };

        myChart2.setOption(option2);
        const myChart3 = echarts.init(echartRef3.value);

        const option3 = {
            title: {
                text: '图表区',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            radar: {
                
                indicator: [
                        { name: '核心素养', max: 100 },
                        { name: '数学审美', max: 100 },
                        { name: '沟通交际', max: 100 },
                        { name: '创新意识', max: 100 },
                        { name: '实践能力', max: 100 },
                        { name: '自学能力', max: 100 },
                        { name: '学习习惯', max: 100 },
                        { name: '自信心', max: 100 },
                    ],
                name: {
                    textStyle: {
                        color: '#1F1F1F',
                    }
                }
            },
            series: [
                {
                    name: '能力档案',
                    type: 'radar',
                    data: radraData,
                    
                }
            ]
        };

        myChart3.setOption(option3);
        // const myChart = echarts.init(radarChart,value);
        // const option = {
        //     tooltip: {},
        //     radar: {
        //         // shape: 'circle',
        //         name: {
        //             textStyle: {
        //                 color: '#fff',
        //                 backgroundColor: '#999',
        //                 borderRadius: 3,
        //                 padding: [3, 5]
        //             }
        //         },
        //         indicator: [
        //             { name: '核心素养', max: 100 },
        //             { name: '数学审美', max: 100 },
        //             { name: '沟通交际', max: 100 },
        //             { name: '创新意识', max: 100 },
        //             { name: '实践能力', max: 100 },
        //             { name: '自学能力', max: 100 },
        //             { name: '学习习惯', max: 100 },
        //             { name: '自信心', max: 100 },
        //         ]
        //     },
        //     series: [{
        //         name: '能力档案',
        //         type: 'radar',
        //         data: radraData,
        //         symbol: 'none',
        //         lineStyle: {
        //             color: '#fff'
        //         },
        //         areaStyle: {
        //             color: '#5470C6'
        //         },
        //         emphasis: {
        //             itemStyle: {
        //                 color: '#fff',
        //                 borderWidth: 2
        //             }
        //         }
        //     }]
        // };
        // myChart.setOption(option);
    });

    const name1 = ref('张三');
    const age = ref(20);
    const grade = ref('初一');
    const tel = ref('13812345678');
    const email = ref('123456@qq.com');
    const chartData = ref([
        { name: '数学建模', value: 0.8 },
        { name: '数学建模', value: 0.7 },
        { name: '数学建模', value: 0.6 },
        { name: '数学建模', value: 0.5 },
        { name: '数学建模', value: 0.4 },
        { name: '数学建模', value: 0.4 },
    ]);
    const habitData = ref([
        '爱好：篮球',
        '爱好：打游戏',
    ]);

    const data = () => ({
        name1: '张三',
        age: 20,
        grade: '初一',
        tel: '13812345678',
        email: '123456@qq.com',
    });
    function getPositionStyle(chartData,innerIndex,verticalIndex) {
        const Data = chartData[innerIndex].value;
        return {
            left: `calc(50% + ${(Data - 0.5) * 100}%)`,
        };
    }



</script>
<style scoped>
    #radarChart {
        width: 100%;
        height: 400px;
    }
    .card-title {
        font-size: 30px;
        margin:20px 0px 0px 10px;
    }
    .content {
        display: flex;
        flex-direction: column;
        width:66%;
    }
    .image-container {
        position: relative;
        margin-left: 20px;
        margin-top: 20px;
        width: 200px;
        height: 200px;
    }
    .image-container img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .main-card {
        width: 95vw;
        margin: 20px 20px 30px 0px;
        padding: 20px;
        display: flex;
        flex-direction: row;
        
    }
    .info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
    }
    .text-container {
        width: 350px;
        margin-left: 60px;
    }
    .border-line {
        border-bottom: 10px solid #ccc;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .info ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .info ul li {
        list-style-type: disc;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .info ul li span {
        font-size: 18px;
        font-weight: bold;
        margin-left: 20px;
    }
    .dot {
        display: inline-block;
        margin-right: 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: black;
    }
    .card-content{
        width: 34%;
        padding-top: 30px;
        height: 900px;
    }
    .chart-title {
        font-size: 24px;
        margin-bottom: 20px;
        margin-left: 30px;
    }
    .slider{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .low{
        position:relative;
        margin-top:-20px;
        left:15px;
    }
    .high{
        position:absolute;
        margin-top:-20px;
        right:125px;
    }
    .slider-text {
        font-size: 18px;
        font-weight: bold;
        margin-right: 20px;
    }
    .slider-container {
        width: 200px;
        height: 80px;
        position: relative;
        display: flex;
    }

    .slider-border {
        top: 50%;
        width: 200px;
        height: 5px;
        position: absolute;
        background-color: #CCCCCC;
    }

    .slider-track {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        transition: transform 0.3s ease-out;
        touch-action: none;
        /* 禁用默认的滑动行为 */
    }

    .slider-handle {
        width: 40px;
        height: 20px;
        position: absolute;
        background-color: #131313;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
    }

    .slider-handle:hover {
        cursor: pointer;
    }
    .habit-container{
        font-size: 20px;
        font-weight: bold;

    }
</style>