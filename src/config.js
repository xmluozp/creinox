// import publicIp from 'public-ip'

// export const setIp = async() => {

//     let url

//     // url = process.env.REACT_APP_API

//     const publicIP = await publicIp.v4()
//     url = "http://" + publicIP + ":8000"

//     localStorage.setItem('CreinoxUrl', url);
//     console.log("记录后台网址", url)
// }

export const getIP = () => {

    let url = "" //localStorage.getItem('CreinoxUrl');
    return url || process.env.REACT_APP_API
}

export const RESTURL = getIP()

export const getUrl = subUrl => {
    return getIP() + subUrl
}