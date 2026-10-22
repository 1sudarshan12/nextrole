import { getDb } from '@/db';
import { opportunities, preferences } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/server';
import { DEFAULT_SETTINGS } from '@/lib/model';
export async function GET(request:Request){const a=await auth(request);if(a.error)return a.error;try{const db=getDb();const [rows,prefs]=await Promise.all([db.select().from(opportunities).where(eq(opportunities.userId,a.user.userId)).orderBy(desc(opportunities.updatedAt)),db.select().from(preferences).where(eq(preferences.userId,a.user.userId))]);return Response.json({jobs:rows.map(r=>({...JSON.parse(r.payload),id:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt})),settings:prefs[0]?JSON.parse(prefs[0].payload):DEFAULT_SETTINGS},{headers:{'Cache-Control':'private, no-store'}});}catch(e){console.error('Read failed',e);return Response.json({error:'Your tracker could not be loaded. Please retry.'},{status:500});}}
