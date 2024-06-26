import { createRouter, createWebHistory } from 'vue-router'
import CaptureMainView from '../views/CaptureMainView.vue'
import QuestionsCollectionView from '../views/QuestionsCollectionView.vue'
// import UserInformationView from '../views/UserInformationView.vue'
import UserInforView from '../views/UserInforView.vue'
import NotFoundComponent from '../views/NotFoundPage.vue'
import LanguageGraphView from '../views/LanguageGraphView.vue'
import LearnProgramView from '../views/LearnProgramView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/musee_view_master/',
      name: 'index',
      component: CaptureMainView
    },
    {
      path: '/musee_view_master/collection',
      name: 'QuestionsCollectionView',
      component: QuestionsCollectionView
    },
    // {
    //   path: '/musee_view_master/userinfo',
    //   name: 'UserInformationView',
    //   component: UserInformationView
    // },
    {
      path: '/musee_view_master/student',
      name: 'UserInforView',
      component: UserInforView
    },
    {
      path: '/musee_view_master/graph',
      name: 'LanguageGraphView',
      component: LanguageGraphView
    },
    {
      path: '/musee_view_master/program',
      name: 'LearnProgramView',
      component: LearnProgramView
    },
    {
      path: '/musee_view_master/error',
      name: 'not-found',
      component: NotFoundComponent
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const resolvedRoute = await router.resolve(to);
    if (!resolvedRoute.matched.length) {
      next({ name: 'not-found' });
    } else {
      next();
    }
  } catch (error) {
    // 如果解析路由时出现错误，也可以考虑跳转至错误页面
    next({ name: 'not-found' });
  }
});

export default router
