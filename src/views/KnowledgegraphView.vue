<template>
    <v-card class="mx-auto main-card" >
        <v-card-title class="card-title">
            个性化学生档案
        </v-card-title>
        <div class="info">
            <div class="image-container">
                <v-img src="../src/images/musee-edu/student.png" height=auto width=auto cover></v-img>
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
        <v-card>
            <!-- <v-card-title class="card-title">
                核心素养能力档案
            </v-card-title> -->
            
            <v-card class="mx-auto content-card" height="100%" style="display: flex;margin-top: 20px;margin-bottom: 20px;">
                <div style="background-color: #F7F9F9;border-radius: 16px;margin-left: 20px;">
                    <!-- <div ref="echartRef1" style="width: 60vw; height: 28vh;"></div> -->
                    <div ref="echartRef2" style="width: 60vw; height: 60vh;"></div>
                </div>
                <div style="margin-left:10px;background-color: #F7F9F9;border-radius: 16px;">
                    <div ref="echartRef3" style="width: 30vw; height: 60vh;"></div>
                </div>
            </v-card>
        </v-card>
    </v-card>
    
</template>
<script setup>
import { onMounted,ref } from 'vue';
import * as echarts from 'echarts';

const echartRef1 = ref(null);
const echartRef2 = ref(null);
const echartRef3 = ref(null);
const days = Array.from({ length: 30 }, (_, i) => i + 1); // 生成1到30的数组表示天数
const searchData = days.map(() => Math.floor(Math.random() * 20)); // 生成随机搜索量数据

const categories = ['多项式函数', '相遇问题', '一元一次方程', '不等式求解', '一次函数', '平面几何', '圆的性质','根与系数关系','指数与对数','因式分解']; // 错题种类
const dots = Array.from({ length: 10 }, (_, i) => i + 1);
const categoryData = dots.map(() => Math.floor(Math.random() * 10)); // 各种类错题数量
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
                fontSize: 24
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
            text: '错题类型分析',
            left: 'center',
            padding: [30, 20, 30, 30],
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '错题类型',
                type: 'pie',
                radius: '50%',
                data: errorData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart3.setOption(option3);

});

const name1 = ref('张三');
const age = ref(20);
const grade = ref('初一');
const tel = ref('13812345678');
const email = ref('123456@qq.com');
const chartData = ref([
    { name: '数学建模', value: 80 },
    { name: '数学建模', value: 70 },
    { name: '数学建模', value: 60 },
    { name: '数学建模', value: 50 },
    { name: '数学建模', value: 40 },
    { name: '数学建模', value: 40 },
]);
const chartE = ref({
    series: {
        label: {
            show: true,
            position: 'top',
            formatter: '{c}'
        },
        lineStyle: {
            color: '#546673',
            width: 2
        }
    },
    yAxis: {
        type: 'name',
        data: ['数学建模', '数学建模', '数学建模']
    },
    xAxis: {
        type: 'value'
    }
});

const data = () => ({
    name1: '张三',
    age: 20,
    grade: '初一',
    tel: '13812345678',
    email: '123456@qq.com',
    chartData: [
        { name: '数学建模', value: 80 },
        { name: '数学建模', value: 70 },
        { name: '数学建模', value: 60 },
        { name: '数学建模', value: 50 },
        { name: '数学建模', value: 40 },
        { name: '数学建模', value: 40 },
    ],
    chartE: {
        series: {
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            },
            lineStyle: {
                color: '#546673',
                width: 2
            }
        },
        yAxis: {
            type: 'name',
            data: ['数学建模', '数学建模', '数学建模']
        },
        xAxis: {
            type: 'value'
        }
    }
});

// function useKnowledgegraphView() {
//     return {
//         data() {
//             return {
//                 name: '张三',
//                 age: 20,
//                 grade: '初一',
//                 tel: '13812345678',
//                 email: '123456@qq.com',
//                 // chartData: [
//                 //     { name: '数学建模', value: 80 },
//                 //     { name: '数学建模', value: 70 },
//                 //     { name: '数学建模', value: 60 },
//                 //     { name: '数学建模', value: 50 },
//                 //     { name: '数学建模', value: 40 },
//                 //     { name: '数学建模', value: 40 },
//                 // ],
//                 // chartE: {
//                 //     series: {
//                 //         label: {
//                 //             show: true,
//                 //             position: 'top',
//                 //             formatter: '{c}'
//                 //         },
//                 //         lineStyle: {
//                 //             color: '#546673',
//                 //             width: 2
//                 //         }
//                 //     },
//                 //     yAxis: {
//                 //         type: 'name',
//                 //         data: ['数学建模', '数学建模', '数学建模']
//                 //     },
//                 //     xAxis: {
//                 //         type: 'value'
//                 //     }
//                 // }
//             };
//         },
//         components: {
//             // bar: () => import('@/components/bar/index.vue')
//         }
//     };
// }
//    const data(){
//         return{
//             name: '张三',
//             age: 20,
//             grade: '初一',
//             tel: '13812345678',
//             email: '123456@qq.com',
//         };
//     };
// components: { bar };
// const chartData = ref([
//     { name: '数学建模', value: 80 },
//     { name: '数学建模', value: 70 },
//     { name: '数学建模',value: 60 },
//     { name: '数学建模', value: 50 },
//     { name: '数学建模', value: 40 },
//     { name: '数学建模', value: 40 },
//     ]);
// const chartE = ref({
//     series: {
//         label: {
//             show: true,
//             position: 'top',
//             formatter: '{c}'
//         },
//         lineStyle: {
//             color: '#546673',
//             width: 2
//         }
//     },
//     yAxis: {
//         type: 'name',
//         data: ['数学建模', '数学建模', '数学建模', '数学建模', '数学建模', '数学建模']
//     },
//     xAxis: {
//         type: 'value'
//     }
// })
// onMounted(() => {
//     const chartExtend = ref({
//             legend: {
//                 show: false
//             },
//             grid: {
//                 left: '5%',
//                 containLabel: true,
//                 top: '5%',
//                 bottom: '5%'
//             },
//             xAxis: {
//                 axisLabel: {
//                     textStyle: {
//                     color: '#fff',
//                     fontSize: 14
//                     }
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                     color: '#fff'
//                     }
//                 }
//             },
//             yAxis: {
//                 axisLabel: {
//                     textStyle: {
//                     color: '#fff',
//                     fontSize: 14
//                     }
//                 },
//                 splitLine: {
//                     show: false
//                 },
//                 position: 'left',
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                     color: '#fff'
//                     }
//                 }
//             },
//             series: {
//             type: 'name',
//             itemStyle: {
//                 normal: {
//                 color: 'rgba(68,240,255,1)'
//                 }
//             }
//             }
//         });
//     props: {
//         chartData: {
//         type: Object;
//         required: true
//         };
//         storeList: {
//         type: Array;
//         required: true
//         };
//     };
//     // watch: {
//     //     storeList (newVal, oldVal) {
//     //         const that = this;
//     //         if (newVal.length > 0) {
//     //             if (that.storeList.length > 5) {
//     //             that.realList = that.storeList.slice(0, 5)
//     //             that.timer3 = setInterval(() => {
//     //                 if (that.storeFlag) {
//     //                 that.realList = that.storeList.slice(5)
//     //                 that.storeFlag = false;
//     //                 } else {
//     //                 that.realList = that.storeList.slice(0, 5)
//     //                 that.storeFlag = true;
//     //                 }
//     //             }, 5000)
//     //             } else {
//     //             that.realList = that.storeList;
//     //             }
//     //         }
//     //     };
//     // }; 
// });

</script>
<style scoped>
.card-title {
    font-size: 30px;
}
.image-container {
    position: relative;
    margin-left: 20px;
    margin-top: 20px;
    width: auto;
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
    margin: 50px 20px 30px 0px;
    padding: 20px;
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
</style>