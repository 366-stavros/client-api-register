import axios from 'axios'

export const withReference = <T1,T2>(obj:T1, callback:(obj:T1) => T2):T2 => callback(obj)
export const zip = <T1,T2>(arr1:T1[], arr2:T2[]):[T1,T2][] => arr1.map((ai,i) => [ai,arr2[i]])

const REGISTER_CLIENT_ENDPOINT = process.env.ENDPOINT ?? 'http://localhost/GitVersionControl/cryptogt_client/api/register_api'
const API_KEY =                  process.env.API_KEY  ?? 'local_auth'

export const registerClient = async (client: any):Promise<'Success' | {error:string}> => {
  const res = await axios.post(REGISTER_CLIENT_ENDPOINT, {...client}, {
    headers: {
      'Content-Type': 'application/json',
      'ApiKey': API_KEY,
    }
  }).catch(err => {
    // console.log(err.response.data)
    return ({error:err.response.data.message})})

  return res['error'] ? ({error: res['error']}) : 'Success'
}