import { useEffect, useState } from 'react'
import CreateModal from '../components/CreateModal'
import Header from '../components/Header'
import Bg from '../assets/bg.png';
import MainSection from '../components/MainSection'

export interface postProps {
  name: string;
  prompt: string;
  img: string;
}

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:4000/api/v1/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        if (response.ok) {
          const data = await response.json();
          setPosts(data?.data?.reverse())
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }

    getPosts()
  }, [])

  useEffect(() => {
    if (searchText === '') {
      setSearchResults(posts);
    } else {
      const results = posts.filter((post: postProps) =>
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||  post.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchText, posts]);

  return (
    <div>
      {openModal && <CreateModal setOpenModal={setOpenModal} />}
      <Header setOpenModal={setOpenModal} />
      <div className='relative h-[300px] md:h-[50vh] w-full bg-black z-0'>
        <img src={Bg} alt="background" className='w-full h-[100%] object-cover relative' />
        <div className='absolute top-[20%] left-[8%] md:left-[13%] w-[80%] h-[100%]'>
          <p className='text-[22px] md:text-[50px] mt-4 md:mt-5 tracking-wider leading-tight font-medium text-white mb-4'>Transform Your Photos <span className='text-[#FCA311]'>with AI:</span> Create Stunning Images in Just a Few Clicks!</p>
          <div className=''>
            <div>
              <div className='flex items-center justify-center gap-2 mt-4'>
                <input type='text' className='w-full mx-auto bg-white rounded-xl border-none outline-none my-5 p-3 md:p-4 text-[14px] md:text-[18px]' onChange={(e) => setSearchText(e.target.value)} placeholder='Search images by prompt or creator name' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-[100%] rounded-lg">
            <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#FCA311]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
      )}
      <MainSection posts={posts} searchResults={searchResults} />
    </div>
  )
}

export default Home