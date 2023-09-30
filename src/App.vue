<script setup lang="ts">
import { useUserStore } from '@/store/user';

import { getUser } from '@/api/modules/user';

import zhCn from 'element-plus/es/locale/lang/zh-cn';

const store = useUserStore();

const init = async () => {
    const { code, data } = await getUser();
    if (code === 0) {
        store.user = data.name;
    }
};

onMounted(() => {
    ElMessage.success('Welcome to this template!');
    init();
});
</script>

<template>
    <el-config-provider :locale="zhCn" size="small">
        <router-view />
    </el-config-provider>
</template>
