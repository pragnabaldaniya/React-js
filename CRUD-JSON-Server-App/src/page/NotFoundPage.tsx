import { useNavigate } from "react-router"

export default function NotFoundPage() {

    const navigate = useNavigate(); // return home page k liye hook

    return <>
        <center>
            {/* <h1 className="text-9xl text-center text-red-600">404</h1> */}
            <img src="https://thumbs.dreamstime.com/b/error-page-not-found-cute-cat-message-system-maintenance-updates-uploading-operation-computing-adorable-little-kitty-371563703.jpg " className="w-110 h-90"></img>

            <h2 className="text-3xl text-center text-red-400">Not Found Page</h2>

            <button className="bg-red-600 p-2.5 mt-3 text-white rounded-2xl" onClick={() => { navigate('/') }}>Go to Home</button>
        </center>
    </>
}