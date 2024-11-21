"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import ConversationFallback from "@/components/shared/conversation/ConversationFallback.tsx"
export default function Errro({error}:{error : Error}) {
	const router = useRouter();
	
	useEffect(() => {
		router.push("/conversations")
	}, [error, router]);
	
	return <ConversationFallback />
}