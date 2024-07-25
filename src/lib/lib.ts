"use server"
import { cookies } from "next/headers";

export async function getSession(){
    'use server'
    const session = cookies().get("session");
    console.log(cookies().get("session"))
    if(!session){
        return null;
    }
    return session;
}