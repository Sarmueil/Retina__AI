import { useState } from "react";
import { BsFillPersonVcardFill, BsFillChatLeftQuoteFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import preview from '../assets/preview-icon.jpg'
import { generateRandomPrompts } from "../utils/randomprompts";
import { toast } from 'react-hot-toast';

export interface createprops {
    setOpenModal: (value: boolean) => void;
}

const CreateModal: React.FC<createprops> = ({ setOpenModal }) => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("A serene countryside with rolling hills and fields of flowers");
    const [isgenerating, setIsgenerating] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false)

    const generateImage = async () => {
        setIsgenerating(false)
        if (prompt) {
            try {
                setIsgenerating(true)
                const response = await fetch('https://retina.onrender.com/api/v1/generateimage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: prompt })
                })
                const data = await response.json();
                setImage(`data:image/jpeg;base64,${data?.photo}`)
                setIsgenerating(false)
                toast.success(`Image generated successfully`)
            } catch (err) {
                setIsgenerating(false)
                console.error(err)
            }
        } else {
            toast.error('please input prompt')
        }
    }

    const handleGeneratePrompt = (prompt:string) => {
       const generatedprompt =  generateRandomPrompts(prompt)
       setPrompt(generatedprompt)
    }

    const form = {
        name,
        prompt,
        photo:image
    }

    const handleSubmit = async() => {
        if(prompt && image && name) {
            setLoading(true)
            console.log('aaaa')
            try{
                console.log('bbb')
                console.log(form)
                const response = await fetch('https://retina.onrender.com/api/v1/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                await response.json();
                setLoading(false)
                setOpenModal(false)
                navigate('/')
                window.location.reload();
            }catch(err){
                console.log('ccc')
                setLoading(false)
            }
        }else{
            toast.error('Plese fill in your name')
        }
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)]" onClick={() => setOpenModal(false)}></div>
            <div className="relative z-10 bg-white px-6 py-6 md:py-8 rounded-lg shadow-lg w-[90%] md:w-[600px] h-[700px] overflow-y-scroll">
                <div className="text-center w-full text-[20px] md:text-[25px] font-semibold my-1 md:my-2">Create Image</div>
                <p className="text-[14px] md:text-[18px] font-light">Transform Your Ideas into Stunning Images with Dale-2's AI-Powered Platform and Share Them with Millions!</p>
                <div>
                    {/* images */}
                    <div className="h-[30vh] md:h-[40vh] w-[90%] mx-auto border rounded-lg mt-5 relative">
                        {image ? <img src={image} alt="preview" className="object-contain w-full h-[100%]" /> : <img src={preview} alt="preview" className="object-contain w-full h-[100%]" />}
                        {isgenerating && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-[100%] rounded-lg">
                                <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#FCA311]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="border-none rounded-lg bg-[#14213D] text-white p-2 mt-3 text-[14px] font-bold text-center cursor-pointer w-[80%] mx-auto" onClick={() => generateImage()}>Generate image</div>
                    <div className='flex items-center mt-3 py-4 px-6 gap-2'>
                        <BsFillPersonVcardFill className="hidden md:block text-[50px] text-[#14213D]" />
                        <div className="w-full">
                            <label htmlFor="name" className="text-[14px] md:text-[16px]">Your Name</label>
                            <input type="text" className="w-full border shadow-md outline-none rounded-lg text-[12px] md:text-[14px] py-2 md:py-4 px-3" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex items-center mt-1 py-0 md:py-4 px-6 gap-2'>
                        <BsFillChatLeftQuoteFill className="hidden md:block text-[30px] md:text-[50px] text-[#14213D]" />
                        <div className="w-full">
                            <label htmlFor="name" className="text-[14px] md:text-[16px]">Add your prompt</label>
                            <input type="text" className="w-full border shadow-md outline-none rounded-lg text-[12px] md:text-[14px] py-2 md:py-4 px-3" placeholder={prompt || 'Tell everyone what your image is all about'} onChange={(e) => setPrompt(e.target.value)} />
                            <div className="border-none rounded-lg bg-[#FCA311] text-[#14213D] p-2 mt-5 text-[14px] font-bold text-center cursor-pointer w-[80%] mx-auto" onClick={()=> handleGeneratePrompt(prompt)}>Try some suggestions</div>
                        </div>
                    </div>
                    <p className="text-[14px] font-light mt-2">Please note that once you submit, the generated images will be shared with our community of users.</p>
                    <div className='flex items-center justify-center gap-3 w-full mt-5'>
                        <button className='py-1 px-4 bg-transparent text-[#14213D] rounded-lg text-[16px] cursor-pointer border shadow-lg' onClick={() => setOpenModal(false)}>Cancel</button>
                        <button className='py-1 px-4 bg-[#FCA311] text-[#14213D] rounded-lg text-[16px] font-bold cursor-pointer' disabled={loading} onClick={() => handleSubmit()}>{loading ? "sharing...": "Share image"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal