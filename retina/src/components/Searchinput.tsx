import { useState } from "react";

const Searchinput = () => { 
    const [searchText, setSearchText] = useState("");

    return (
        <div className=''>
            <form>
                <div className='flex items-center justify-center gap-2 mt-4'>
                <input type='text' className='w-full mx-auto bg-white rounded-xl border-none outline-none my-5 p-4 text-[18px]' onChange={(e)=> setSearchText(e.target.value)}/>
                    <button className={`py-4 px-4 bg-[#E5E5E5] ${searchText ? 'text-black' : 'text-gray-400'} cursor-pointer text-[16px] rounded-xl`} disabled={searchText ? false : true}>Generate</button> 
                </div>
            </form>
        </div>
    )
}

export default Searchinput