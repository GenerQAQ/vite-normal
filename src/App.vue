<script setup lang="ts">
import { Sunny, Moon, Calendar } from '@element-plus/icons-vue';
import { isDark, toggleDark } from '@/utils/dark';
import { dayjs } from 'element-plus';

import { getUser } from '@/api/modules/user';

import zhCn from 'element-plus/es/locale/lang/zh-cn';

const day = ref(dayjs().add(1, 'month').startOf('month'));

const name = ref('');

const init = async () => {
    const { code, data } = await getUser();
    if (code === 0) {
        name.value = data.name;
    }
};

onMounted(() => {
    ElMessage.success('Welcome to this template!');
    init();
});
</script>

<template>
    <el-config-provider :locale="zhCn" size="small">
        <div>
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
        </div>
        <HelloWorld msg="Vite + Vue" />
        <el-switch
            v-model="isDark"
            inline-prompt
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="() => toggleDark"
        />
        <el-countdown format="DD [days] HH:mm:ss" :value="day">
            <template #title>
                <el-icon :size="12">
                    <calendar />
                </el-icon>
                Still to go until next month
            </template>
        </el-countdown>
        <div class="countdown-footer">{{ day.format('YYYY-MM-DD') }}</div>
        <el-tag>{{ name }}</el-tag>
    </el-config-provider>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    transition: filter 300ms;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
