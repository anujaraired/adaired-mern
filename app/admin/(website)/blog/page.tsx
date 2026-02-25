"use client"
import { BaseURL } from '@/app/baseUrl';
import Heading from '@/app/components/common/Heading';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import SaveAndCancel from '@/app/components/common/SaveAndCancel';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const [data, setData] = useState([])

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${BaseURL}/blog/read`)

      console.log(res, "res......")
      if (res?.status) {
        setData(res?.data?.data)
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  console.log(data, "data....")
  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <div>

      <div className='flex justify-between'>
        <Heading subTitle={"Blog"} title={"Blog List"} />
        <div>
          <SaveAndCancel name={'Create'} isIcon={true} handleClick={() => router.push("/admin/blog/create")} />
        </div>

      </div>      <div>
        {data?.map((blog: any) => {
          return (
            <div>
              <p className='p-[1rem] hover:bg-[#e3e3e3]'>{blog?.postTitle}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
