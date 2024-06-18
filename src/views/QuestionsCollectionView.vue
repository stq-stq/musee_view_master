<template>
    <div class="container">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#FFFFFF">
                <CollectionIndex></CollectionIndex>
            </v-card>
        </div>
        <!-- Right Section -->
        <div class="right-section">
            <v-card color="#FFFFFF" style="height: 100%;">
                <div style="height: 100%;overflow-y: auto;">
                    <div style="margin: 10px 0;" v-for="(mistake, index) in mistakeData" :key="index">
                        <MistakePreviewComponent :tags="mistake.tags" :cardTitle="mistake.cardTitle"
                            :cardMsg="mistake.cardMsg" :cardTime="mistake.cardTime" :cardColor="mistake.cardColor" :imgSrc="mistake.imgSrc">
                        </MistakePreviewComponent>
                    </div>
                </div>
            </v-card>
        </div>
        <div class="overlay-image">
            <el-button class="custom-button">
                <img src="../images/button/1.svg" alt="图片 1" />
            </el-button>
            <el-button class="custom-button">
                <img src="../images/button/2.svg" alt="图片 2" />
            </el-button>
            <el-button class="custom-button" @click="() => { show1 == false; openChat1 = true;}">
                <img src="../images/button/3.svg" alt="图片 3" />
            </el-button>
            <el-button class="custom-button" @click="() => { show == false; openChat = true;}">
                <img src="../images/button/4.svg" alt="图片 4" />
            </el-button>
        </div>
    </div>
    <template>
        <v-dialog v-model="openChat" width="700px">
            <v-card>
                <div class="icon">
                    <img src="../images/button/4.svg" alt="图片 4">
                    <v-card-text class="title-card">
                        <span class="title" style="font-size: 20px;">ChatGPT</span>
                        <span class="title">沐斯慧教AI大模型</span>
                    </v-card-text>
                </div>
                <v-card-text style="margin: 30px 30px 30px 30px;">
                    周一<br>
                    <br>
                    预习（16:00-16:45）<br>
                    1. <b>内容选择：</b> 针对即将学习的基本初等函数的定义、性质进行预习。特别是对函数概念的理解、函数的图像和性质等。<br>
                    2. <b>方法建议：</b> 使用图像辅助记忆和理解，如通过对照函数图像来辅助理解函数的增减性、奇偶性等。<br>
                    <br>
                    复习（19:00-20:00）<br>
                    1. <b>内容选择：</b> 对之前学习的函数基础知识进行复习，确保对函数的基本概念（如定义域、值域、单调性）有扎实的理解。
                    2. <b>方法建议：</b> 通过完成教材提供的习题，重点关注解题中的函数概念运用。
                    <br>
                    练习（20:00-21:00）<br>
                    1. <b>内容选择：</b> 挑战一些与基本初等函数相关的习题，从简单题目开始，渐进到一些综合题。<br>
                    2. <b>方法建议：</b> 分类练习，先练习单一类型的初等函数题目，逐步过渡到涉及函数综合应用的题目。<br>
                    <br>
                    深化（21:00-22:00）<br>
                    1. <b>内容选择：</b> 尝试解决一些实际问题，如应用函数解决一些简单的生活或数学问题。<br>
                    2. <b>方法建议：</b> 找寻与生活相关的函数应用实例，如预算规划、简单的物理问题等，通过解决实际问题深化对函数的理解和运用。<br>
                    <br>
                    这个计划注重从基础概念的理解到实际应用的能力提升，强调通过大量的练习和应用来加深对函数理解的重要性。同时，也鼓励学生利用网络资源和教材之外的练习资源来丰富学习内容和方法。
                </v-card-text>

                <div class="textarea-container">
                    <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded
                        @click="openDialog" class="single-line-textarea"></v-text-field>

                    <!-- 更改 -->
                    <v-btn  :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                        @click="TextSend" color="#2081C3">
                        <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
                    </v-btn>


                    <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                        @click="ConversationModel" color="#2081C3">
                        <svg-icon type="mdi" :path="mdiMicrophone" class="expand-icon"
                            style="height: 40px;height: 40px;"></svg-icon>
                    </v-btn>
                </div>

            </v-card>
        </v-dialog>
        <v-dialog v-model="openChat1" width="700px">
            <v-card>
                <v-card class="card-container inner-card-1" color="#FFF" elevation="0" v-for="(props, index) in conversationData" :key="index">
                    <v-card-actions>
                        <v-list-item class="w-100">
                            <template v-slot:prepend>
                                <v-avatar color="grey-darken-3"
                                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                    v-if="props.userName == 'user'"></v-avatar>
                                <v-avatar color="grey-lignt-3" v-else>
                                    <GPTSVGComponent></GPTSVGComponent>
                                </v-avatar>
                            </template>
                            <v-list-item-title>{{ props.userName == 'user' ? props.userName : "ChatGPT" }}</v-list-item-title>
                            <v-list-item-subtitle>{{ props.userName == 'user' ? props.userInfo : "沐斯慧教AI大模型" }}</v-list-item-subtitle>
                        </v-list-item>
                    </v-card-actions>
                    <v-card-subtitle style="white-space: normal; font-size: 1.1rem;    line-height: 2rem;">{{ conversationData[index].userMessage
                        }}</v-card-subtitle>
                </v-card>

                <div class="textarea-container">
                    <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded
                        @click="openDialog" class="single-line-textarea"></v-text-field>

                    <!-- 更改 -->
                    <v-btn  :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                        @click="TextSend" color="#2081C3">
                        <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
                    </v-btn>


                    <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                        @click="ConversationModel" color="#2081C3">
                        <svg-icon type="mdi" :path="mdiMicrophone" class="expand-icon"
                            style="height: 40px;height: 40px;"></svg-icon>
                    </v-btn>
                </div>

            </v-card>
        </v-dialog>
    </template>
</template>


<script setup>
import CollectionIndex from '@/components/CollectionIndex.vue';
import MistakePreviewComponent from '@/components/MistakePreviewComponent.vue';
import { mdiArrowUpCircle, mdiMicrophone, mdiCog } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { ref } from 'vue';
import GPTSVGComponent from '../components/GPTSVGComponent.vue';

const mistakeData = [
    {
        tags: ['综合', '选择'],
        cardTitle: '反比例函数在几何图形中的应用',
        cardMsg:
            '错误地将反比例函数的应用局限于四边形的面积计算，而没有将其扩展到整个图形的性质和特征中，学生可能对反比例函数和几何图形的性质和特征理解不够深入，未能掌握反比例函数在解决几何问题中的重要应用。',
        cardTime: '2024/1/4',
        cardColor: '#D0E4F1',
        imgSrc:'https://p4.itc.cn/q_70/images03/20220412/5e59aaab355b45ab88fa4bc4d738b825.jpeg'
    },
    {
        tags: ['数学', '代数'],
        cardTitle: '解一元二次方程的方法',
        cardMsg: '详细介绍了使用配方法和公式法解一元二次方程的步骤，注意点和常见错误。',
        cardTime: '2024/2/15',
        cardColor: '#D0E4F1',
        imgSrc:'https://5b0988e595225.cdn.sohucs.com/images/20190803/b4b5d9450e784d25a1e9acd27c6b04cf.jpeg'
    },
    {
        tags: ['物理', '力学'],
        cardTitle: '牛顿第二定律的实际应用',
        cardMsg: '通过实例解释了牛顿第二定律在不同物理场景中的应用，强调了力与加速度的关系。',
        cardTime: '2024/3/22',
        cardColor: '#D0E4F1',
        imgSrc:'https://puui.qpic.cn/vpic_cover/e03560j8srb/e03560j8srb_hz.jpg'
    },
    {
        tags: ['化学', '化学键'],
        cardTitle: '离子键的形成和特性',
        cardMsg: '详细介绍了离子键的形成条件，特性和应用，通过实验和图表展示了离子键的特性。',
        cardTime: '2024/4/30',
        cardColor: '#D0E4F1',
        imgSrc:'https://i.ytimg.com/vi/uhVnS0axFJY/sddefault.jpg'
    },]
const openChat = ref(false);
const openChat1 = ref(false);
const show = ref(false);
const show1 = ref(false);
const text = `根据甲车行驶了全程的2/3，而乙车行驶了全程的45%，得到甲、乙各自的行驶路程。
        已知两车相距35千米。
        根据两车相向而行的关系，可以得到函数方程，解得A和B两城之间的距离。
        以上，是本题的解题思路。`;
const props = defineProps({
    userMessage: {
        type: String,
        default: "",
    },
    userName: {
        type: String,
        default: "ChatGPT",
    },
    userInfo: {
        type: String,
        default: "",
    },
    avatarSrc: { // 更改 "vAvatar" 为实际用于表示图片源的 prop 名称，如 "avatarSrc"
        type: String,
        default: "",
    },
});
const conversationData = [
    {
        userMessage: '你好，我是沐斯慧教AI大模型，很高兴为你服务。',
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '沐斯慧教AI大模型'

    },
    {
        userMessage: '这道题我不会，你能给我解答一下吗?大模型说：设全程为x千米。',
        userTime: '2022-04-12 10:00:00',
        userName: 'user',
        userInfo: '别人能做到的事情，我也能做到。'
    },
    {
        userMessage: text,
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '别人能做到的事情，我也能做到。'

    },
    {
        userMessage: '根据两车相向而行得到的关系是不是，两车行驶的路程的总和再加上相距的距离就是整段路的长度呀？但是两车行驶的路程的总和怎么算呢？',
        userTime: '2022-04-12 10:00:00',
        userName: 'user',
        userInfo: '沐斯慧教AI大模型'

    },
]
function ConversationModel() {
    ConversationShow.value = true;
}
function TextSend() {
    try {
        commonGlobalState.warntitle = '小沐正在努力思考~'
        commonGlobalState.dialogVisible = true;
        switch (commonGlobalState.chatModel) {
            case 0:
                sendDefault(textValue.value);
                break;
            case 1:
                sendGuide(textValue.value);
                break;
            case 2:
                sendMistake(textValue.value);
                break;
            case 3:
                sendFeynman(textValue.value);
                break;
            case 4:
                sendexplanation(textValue.value);
                break;
        }
        textValue.value = ' ';
        localStorage.setItem('renderedFormula', '');
    } catch (error) {
        textValue.value = '';
        localStorage.setItem('renderedFormula', '');
    }

}
</script>

<style scoped>
.container {
    height: 85vh;
    display: flex;
}

.left-section {
    width: 33vw;
    padding: 20px 5px 0px 20px;
    display: flex;
    min-width: 500px;
}

.right-section {
    width: 67vw;
    min-width: 500px;
    padding: 20px 20px 0px 5px
}

.left-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.inner-card {
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
.custom-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: transparent;
    border: none;
    cursor: pointer;
    background-color: #F7F9F9;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-button img {
    width: 50%;
    height: 50%;
    
}
.overlay-image {
    position: fixed;
    display: flex;
    flex-direction: row;
    bottom: 60px;
    right: 60px;

}
.icon{
    margin: 30px 30px 0px 30px;
    display: flex;
    flex-direction: row;
}
.title-card{
    display: flex;
    flex-direction: column;
}
.compact-button {
    margin: 5px;
    density: compact;
    elevation: 0;
    width: 30px;
    height: 30px;
}

.icon-button {
    width: 52px;
    height: 52px;
}
.textarea-container {
    display: flex;
    padding: 0 10px 0 30px;
    width: 95%;
}
.expand-icon {
    height: 49px;
    width: 48px;
}
</style>
