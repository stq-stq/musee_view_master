<template>
    <div class="main">
        <div class="container" style="width: 1000px;transform: translateX(50%) ;">
            <div class="learn" style="opacity: 1; transform: none;">
                <div class="learn-program">
                    <div class="learn-program-title">
                        <span class="text1" style="text-shadow:0px 5px 5px rgba(0, 0, 0, 0.1)">学习计划</span>
                    </div>
                </div>
            </div>
            <!-- <div class="absolute left-0 right-0 m-auto grid place-items-center overflow-hidden opacity-40">
                <canvas style="width:700px;height:700px;aspect-ratio:1" width="1400" height="1400"></canvas>
            </div> -->
            <div style="opacity: 1; transform: none;">
                <div style="opacity: 1; transform: none;display: flex;flex-direction: row;justify-content: space-between;">
                    <div class="card" style="margin-right: 15px;background-color: rgb(214,243,255);">
                        <div class="card-body">
                            <p class="card-text" >教我数学题</p>
                            <p class="card-text">Embarking on a new goal</p>
                        </div>
                    </div>
                    <div class="card" style="margin-right: 15px;background-color:rgb(214,243,255);">
                        <div class="card-body">
                            <p class="card-text"  >教我英语题</p>
                            <p class="card-text">Embarking on a new goal</p>
                        </div>
                    </div>
                    <div class="card" style="background-color:rgb(214,243,255);">
                        <div class="card-body">
                            <p class="card-text" >教我语文题</p>
                            <p class="card-text">Embarking on a new goal</p>
                        </div>
                    </div>

                </div>
            </div>
            <v-card style="width: 85%;">
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
        </div>
        
    </div>
</template>

<script setup>
import GPTSVGComponent from '../components/GPTSVGComponent.vue';

import { mdiArrowUpCircle, mdiMicrophone, mdiCog } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { ref } from 'vue';


const conversationData = [
    {
        userMessage: '教我数学题',
        userTime: '2022-04-12 10:00:00',
        userName: 'user',
        userInfo: '别人能做到的事情，我也能做到。'

    },
    {
        userMessage: '确定你想要学习的数学题的类型',
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '沐斯慧教AI大模型'

    },
    {
        userMessage: '找到一个合适的学习资源，如教科书、在线教程或视频。',
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '沐斯慧教AI大模型'
    },
    {
        userMessage: '阅读或观看相关的数学概念和解题技巧。',
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '沐斯慧教AI大模型'

    },
    {
        userMessage: '确定你想要学习的数学题的类型。',
        userTime: '2022-04-12 10:00:00',
        userName: 'ChatGPT',
        userInfo: '沐斯慧教AI大模型'

    },
    {
        userMessage: '我的选择是学习代数题。我选择代数题是因为它是数学中的基础，涵盖了许多重要的概念和技巧。通过学习代数题，我可以提高解决问题的能力，掌握变量、方程和函数等基本概念。此外，代数题也可以帮助我理解数学中的抽象思维和逻辑推理。因此，我认为学习代数题对我的数学知识和思维能力的发展非常有益。',
        userTime: '2022-04-12 10:00:00',
        userName: 'user',
        userInfo: '别人能做到的事情，我也能做到。'

    },
]
function openDialog() {
    dialog.value = true;
}
function ConversationModel() {
    ConversationShow.value = true;
}
function TextSend() {
    commonGlobalState.warntitle = '小沐正在努力思考~'
    commonGlobalState.dialogVisible = true;
    console.log('textValue.value', textValue.value);
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
    textValue.value = '';
    localStorage.setItem('renderedFormula', '');
}

</script>

<style scoped>
.main {
    width: 1963.02px;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.learn {
    display: flex;
}
.learn-program {
    display: flex;
    align-items: center;
}

.learn-program-title .text1 {
    font-size: 50px;
    font-weight: 700px;
    --tw-text-opacity: 1;
    color: rgb(17 24 28 / var(--tw-text-opacity));
}
.card{
    left: 0;
    right: 0;
    margin: 20px;
    place-items: center;
    opacity: 0.4;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.card-text{
    width: 100%;
    padding: 5px 10px;
    color: black;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
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
