import http from "@/lib/http";


export const trainingApiRequest = {
    getList: ({dp,startDate,endDate}:{dp:string,startDate:string,endDate:string}) => http.get<any>(`http://10.198.170.99:5000/API/training?dp=${dp}&startDate=${startDate}&endDate=${endDate}`, {
        baseUrl: "",
        cache: 'no-store',
    }),
}