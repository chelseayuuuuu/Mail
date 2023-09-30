import httpInstance from '@/utils/http'

export function getBannerAPI(params = {}){
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}

export function findNewAPI(){
    return httpInstance({
        url: '/home/new'
    })
}

export function getHotAPI(){
    return  httpInstance({
        url: 'home/hot'
    })
}

export const getGoodsAPI = () => {
    return httpInstance({
      url: '/home/goods'
    })
}