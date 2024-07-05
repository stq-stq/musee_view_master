<template>
    <!-- <div class="text-center">
        <v-dialog v-model="commonGlobalState.showModal2" max-width="40%" persistent>
            <v-card>
                <v-card-title>调查问卷</v-card-title>
                <form @submit.prevent="submitForm">
                    <v-card-text>
                        <div>
                            <label for="name">您的姓名：</label>
                            <input type="text" v-model="name" />
                        </div>
                        <div>
                            <label for="age">您的年龄：</label>
                            <input type="number" v-model="age" />
                        </div>
                        <div>
                            <label for="feedback">您的反馈：</label>
                            <textarea v-model="feedback"></textarea>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit" color="primary">提交</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </div> -->
    <!-- <div class="text-center">
        <div v-if="showModal2==false" max-width="40%" >
            <v-card>
                <v-card-title>调查问卷</v-card-title>
                <form @submit.prevent="submitForm">
                    <v-card-text>
                        <div>
                            <label for="name">您的姓名：</label>
                            <input type="text" v-model="name" />
                        </div>
                        <div>
                            <label for="age">您的年龄：</label>
                            <input type="number" v-model="age" />
                        </div>
                        <div>
                            <label for="feedback">您的反馈：</label>
                            <textarea v-model="feedback"></textarea>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit" color="primary">提交</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </div>
    </div> -->
    <div v-if="showModal2==false">
        <h2>调查问卷</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">您的姓名：</label>
                <input type="text" v-model="name" />
            </div>
            <div>
                <label for="age">您的年龄：</label>
                <input type="number" v-model="age" />
            </div>
            <div>
                <label for="feedback">您的反馈：</label>
                <textarea v-model="feedback"></textarea>
            </div>
            <div>
                <button type="submit">提交</button>
            </div>
        </form>
    </div>
</template>
    

<script>
import { ref } from 'vue';
// import { commonGlobalState } from '@/utils/commonStore.js';
// import Axios from '@/axios/axiosPlugin';

const showModal2 = ref(false);
    export default {
        data() {
        return {
            name: "",
            age: "",
            gender: "",
            feedback: "",
        };
        },
        methods: {
        submitForm(event) {
            event.preventDefault();
            // 在这里可以添加提交数据的逻辑，例如发送到服务器
            console.log(this.name, this.age, this.gender, this.feedback);
        },
        },
    };
</script>
    
<style scoped>
    form div {
        margin-bottom: 10px;
    }
    label{
        color: black;
    }
</style>