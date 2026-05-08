
import { useNavigate } from 'react-router'

export default function NotFoundPage() {

    const navigate = useNavigate();

    return <>
        <div className='text-center'>

            <h1 className='text-8xl text-center text-red-500'>404</h1>

            <h2 className='text-3xl text-red-400 text-center'>Page not Found</h2>

            <button onClick={() => { navigate('/') }} className='text-xl py-2 bg-red-300 p-2 rounded-2xl text-red-900 mt-3'> ← Go to Home</button>
        </div>

    </>
}
