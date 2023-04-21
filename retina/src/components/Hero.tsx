import Bg from '../assets/bg.png';
import Searchinput from './Searchinput';


export interface heroCompprops {
  setSearchText: (value: string) => void;
  searchText: string;
  handleSearchChange: () => void;
}

const Hero: React.FC<heroCompprops> = ({ setSearchText, searchText,  handleSearchChange }) => {

  return (
    <div className='relative h-[400px] md:h-[50vh] w-full bg-black z-0'>
      <img src={Bg} alt="background" className='w-full h-[100%] object-cover relative' />
      <div className='absolute top-[20%] left-[8%] md:left-[13%] w-[80%] h-[100%]'>
        <p className='text-[22px] md:text-[50px] mt-4 md:mt-5 tracking-wider leading-tight font-medium text-white mb-4'>Transform Your Photos <span className='text-[#FCA311]'>with AI:</span> Create Stunning Images in Just a Few Clicks!</p>
        <div className=''>
          <form>
            <div className='flex items-center justify-center gap-2 mt-4'>
              <input type='text' className='w-full mx-auto bg-white rounded-xl border-none outline-none my-5 p-4 text-[18px]' onChange={(e) => setSearchText(e.target.value)} />
              <button className={`py-4 px-4 bg-[#E5E5E5] ${searchText ? 'text-black' : 'text-gray-400'} cursor-pointer text-[16px] rounded-xl`} disabled={searchText ? false : true} onClick={()=>handleSearchChange()}>Generate</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Hero