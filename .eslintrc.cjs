module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    globals: {
        defineEmits: true,
        document: true,
        localStorage: true,
        GLOBAL_VAR: true,
        window: true,
        defineProps: true,
        defineExpose: true,
        withDefaults: true
    },
    extends: [
        'standard-with-typescript',
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/vue/strict',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended' // 使用prettier插件 必须放在最后面
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
    },
    plugins: ['vue', '@typescript-eslint', 'import'],
    rules: {
        'prettier/prettier': 'error'
    }
};
