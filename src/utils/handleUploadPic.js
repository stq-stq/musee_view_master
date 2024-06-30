import Axios from '@/axios/axiosPlugin.js'
import { globalState } from '@/utils/store.js'
import { commonGlobalState } from '@/utils/commonStore.js'
import { fetchData } from '@/utils/common.js'

export const handleUploadCommonPic = async (formData) =>
    Axios({
        method: 'post',
        url: '/api/student/bigModel',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            if (response.data.status === 1) {
                console.log('获取到响应数据，开始处理');
                const temp = response.data.data
                globalState.qid = temp.basicQuestion.qid
                globalState.title = temp.basicQuestion.questionText
                globalState.Analyserdata = temp.concreteQuestion.questionAnalysis
                globalState.questionAnswer = temp.concreteQuestion.questionAnswer
                globalState.steps = temp.concreteQuestion.questionSteps
                globalState.knowledges = temp.concreteQuestion.knowledges
                globalState.dialogueArray = []
            }
            console.log('打印全局状态');
            console.log(globalState)
            console.log('执行获取数据操作');
            commonGlobalState.dialogVisible = false
            return fetchData();
        })
        .catch((error) => {
            console.error('上传失败，错误信息:');
            console.error(error);
            commonGlobalState.dialogVisible = false
            // 这里可以添加一些上传失败的处理
        });

export const handleUploadMistakePic = async (formData) =>
    Axios({
        method: 'post',
        url: '/api/student/bigModel/wrongAnswer',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(() => {
            console.log('设置对话框不可见');
            commonGlobalState.dialogVisible = false
        })
        .catch((error) => {
            console.error('上传失败，错误信息:');
            console.error(error);
            console.log('设置对话框不可见');
            commonGlobalState.dialogVisible = false
            // 这里可以添加一些上传失败的处理
        });