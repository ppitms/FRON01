export default function({$axios,redirect}){
    $axios.onRequest(config=>{
        console.log("http请求报文：",config)
    })
    $axios.onResponse(response=>{
        console.log("http响应报文：",response)
        return response
    })
}