"use client"
import { BaseURL } from '@/app/baseUrl';
import Heading from '@/app/components/common/Heading';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import SaveAndCancel from '@/app/components/common/SaveAndCancel';
import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";

const page = () => {
  const router = useRouter()
  const [data, setData] = useState([])

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${BaseURL}/blog/get`)

      if (res?.status === 200) {
        setData(res?.data)
      }
    }
    catch (err) {
      console.log(err)
    }

  }
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
            <div className='flex justify-between'>
              <p className='p-[1rem] hover:bg-[#e3e3e3]'>{blog?.postTitle}</p>
              <MdEdit
                onClick={() => router.push(`/admin/blog/${blog._id}`)}
                size={35}
                className="cursor-pointer bg-yellow-100 p-2 rounded-2xl"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
