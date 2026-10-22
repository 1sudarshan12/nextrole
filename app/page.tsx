import Tracker from './tracker';
import {getChatGPTUser} from './chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const [user,params]=await Promise.all([getChatGPTUser(),searchParams]);const initialView=typeof params?.view==='string'&&['overview','discovery','opportunities','actions','compare'].includes(params.view)?params.view:'overview';return <Tracker displayName={user?.fullName?.split(' ')[0]||'Sudarshan'} signedIn={!!user} initialView={initialView}/>;}
