import { getChatGPTUser } from '@/app/chatgpt-auth';
export async function auth(request:Request){
 const user=await getChatGPTUser();
 if(!user)return {error:Response.json({error:'Sign in with ChatGPT to access your tracker.'},{status:401})};
 const origin=request.headers.get('origin');
 if(request.method!=='GET' && origin && new URL(origin).origin!==new URL(request.url).origin)return {error:Response.json({error:'Invalid request origin'},{status:403})};
 return {user};
}
export function invalid(error:unknown){return Response.json({error:error instanceof Error?error.message:'Unable to save this change.'},{status:400});}
