import type { FC } from 'react'
import Layout from '@/components/profile/Layout'
import { Divider } from '@/components/profile/Divider'

const Security: FC = () => {
  return <Layout title="Profile">
    <div className="md:w-[70%]">
      <div className="text-[20px] text-[#52525B]">Login</div>
      <div className='my-8 flex justify-between items-center'>
        <div>
          <div className='mb-4 text-[20px] text-[700]'>Password</div>
          <div><span>Password last updated:</span><span>{' March 27'}</span></div>
        </div>
        <button
          onClick={() => {
            console.log('rename')
          }}
          className="bg-green1 text-white px-5 py-2 rounded-md"
        >
          Update
        </button>
      </div>
      <Divider />
      <div className='mb-4 text-[20px] text-[700]'>Delete your account</div>
      <div>By deleting your account, you&apos;ll no longer be able to access any of your designs or log in to Focusify</div>
      <button
        onClick={() => {
          console.log('rename')
        }}
        className="bg-green1 text-white px-5 py-2 rounded-md mt-6"
      >
        Delete account
      </button>
    </div>
  </Layout>
}
export default Security
