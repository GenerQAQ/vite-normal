import Mock from 'mockjs';

export default [
    // 模块接口
    {
        url: '/dev-api/login',
        method: 'GET',
        timeout: '500',
        response: () => {
            const data = Mock.mock({
                id: '@id',
                name: '@cname'
            });

            // 返回模拟的数据
            return {
                code: 0,
                message: '模拟数据成功',
                data
            };
        }
    }
];
