
import { useEffect, useState } from 'react';
import Logo from '../assets/RETINA.png';

export interface herocompProps {
    setOpenModal: (value: boolean) => void;
  }

const Header:React.FC<herocompProps> = ( { setOpenModal } ) => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <header className={`fixed w-full top-0 z-50 grid grid-cols-2 gap-3 shadow-md px-2 md:px-7 py-2 md:py-3 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
            <div className='w-[60%] md:w-[25%]'>
                <img src={Logo} alt="logo" className='object-cover object-left w-full' />
            </div>
            <div className="flex items-center justify-end gap-2 md:gap-6">
                <div className='cursor-pointer px-1 md:px-3 py-2 text-white text-[12px] md:text-[16px] text-center'><a href="#">Meet Samuel</a></div>
                <div className="cursor-pointer px-2 md:px-3 py-1 md:py-2 bg-[#FCA311] text-black rounded-lg text-[14px] md:text-[16px] text-center" onClick={()=>setOpenModal(true)}>Create</div>
            </div>
        </header>
    )
}

export default Header