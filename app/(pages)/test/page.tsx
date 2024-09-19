"use client"
import { testApiRequest } from "@/app/api/test";
import { useEffect } from "react";

export default function TrainingPage() {
  useEffect(() => {

    const fetchItem = async () => {

      const { payload } = await testApiRequest.getList();
      console.log("🚀 ~ fetchItem ~ payload:", payload)
    };
    fetchItem();

  }, []);
  
  return (
    <div>
      
    </div>
  );
}