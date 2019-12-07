export const auth_success = {
    status: 200,
    message: '登录成功',
    data: {                     id: 1,
        userName: 'test1',
        fullName: '老王',
        ip: '192.168.0.1',
        lastLogin: '',
        memo: '测试用户',
        token: 'tokenjwt123',
        role_id: 1
     }, // test    
}

export const auth_fail = {
    status: 401,
    message: '登录失败', // test  
    data: {
        "userName":'用户名或密码错误'
    }
}