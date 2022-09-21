import Mock from "mockjs"

Mock.setup({
    timeout: "200-600", // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

Mock.mock(RegExp("/mock/login"), "post", (params) => {
    let { username, password } = JSON.parse(params.body)
    if (username == "shuai" && password == "123456") {
        return {
            code: 200,
            message: "登录成功",
            data: {
                username,
                token: "eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZUeTA0VVFSU3RHWVpnUWxRdzBjUUZia1EzYUUrXC9IeUV1Z0lDdkRoakgwV1JNSk5YVk5VMHhQVlZOZFRVekk4R3cwZ1VMakVwaTRpK3c5eU4wNHdjWVhiaGw3ZFlxWG8xdWlMWHA5SzNUNTV4Nzd1MjlmVENjY3hBd25taURncUlWVExVazBySzBTQWpWOG93VG11UVlGWnlJZ1Zia21NZFlRSkxtMmh6anVDbmZ3ZUdwVkVFbEJGVVNDM0FwWElYcnNKNUNtdFNYb2xXTXhIU2ZBMU1wSFBLMU9lemlIdU1kN1lRWlNiYVwvNkV2cTZzMHFHR21CY1lnUUs2aFlaSFMrbnhHTzR4WVlLMnNoUXgxVnVvemtEYWFDd0RRXC9EUjNCRkVZcGprTXdDZ3V4d3FRcXdia0FGd1wvTkZvS2s5UVlXMHlFNGw4RThsKzcrNmFRaGxIVjFyMnhTMmNFYWVBVnFcL2F3aWowendob0pxaWtkR2s2YXlhOEpvUHRta1hSYVRObEhpa245cjR0MjNuVTlielNvQU1wTmJaMzlUMXFcL09ncTB2TDM1Zk93aTZnZ1M0Y3NwNkNadnVaOUxOZU1uOGhHT2xcL1Azam9cL2U3KzIrZUQwbGxoVmo0XC8zbE16aHdsTjVoajNReHlLTmlwR1VuYVhrMXRnaVNmUFp2OGVBb0RyVUc2V1lydmNrZ0ZqazhrU21MWmJvMno5RGh2QWM0XC9YZ3JubHhlWGx0V3owUmZnODBiajNzeHR4ekEzTjZZZVJnVUxHaG5sUGc4eXIxZFBXck5QVjU1MTlKYytYek1XeVAyQ3JyZVNYb2RPTmU5c3VvN2hCOWkwNDhqMkhRc0Z1bW1aa1JIbzJFV1JwVnVCNXpwdDdFZSs2M2xPNU1XMkhkbWVyK3NPREF6UGd5YjBMRGZBRW15Nk9MYWN5TEo5QzVrUkNnTEhNQUxvMjQ2SFRkOHlJWUt4N2JiYjBMZDA1T29TajAzUDhBMUhnSnFRU3lnRHUzQXdMN1ZvV3Nqa21tM1wvZXZ0MTVcL29QMmZ3RE1Md08wd0xMZFJrclFZdEZOOEw4OWQ3dXhPaUhuOXNINFJcLzlpRU5cL0FQaEFxRWpTQXdBQSIsInN1YiI6InRlc3QiLCJyb2xlcyI6WyJST0xFX05PX1JPTEVTIl0sImV4cCI6MTY0NjM4MzAwMywiaWF0IjoxNjQ2Mzc1ODAzfQ.05VhRJnmLbT2yhE_jnQRD915MRjv1kdoyKOu7Saf88k",
            },
        }
    } else {
        return {
            code: 201,
            message: "用户名或密码错误",
        }
    }
})
