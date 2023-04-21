

import { useState } from 'react';
import { BsFillArrowDownCircleFill } from "react-icons/bs";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
  index: Number
}

const Card: React.FC<CardProps> = ({ _id, name, prompt, photo, index }) => {
  const [isHovered, setIsHovered] = useState(false);


	const handleDownload = (fileLink:string) => {
		// Split the file link to generate file name, extension
		let arr = fileLink.split('.');
		let extension = arr[arr.length - 1];
		fetch(fileLink, {
			method: 'GET',
			headers: {
				// TODO: set content file
				// 'Content-Type': 'image/pdf',
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				// Create blob link to download
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute(
					'download',
					`${prompt}.${extension}`
				);

				// Append to html link element page
				document.body.appendChild(link);

				// Start download
				link.click();

				// Clean up and remove the link
				if (link.parentNode !== null) {
				  link.parentNode.removeChild(link);
				}
			});
	};


  return (
    <div
      className={`rounded-xl group relative shadow-card hover:shadow-cardhover my-3 md:my-0 card shadow-2xl drop-shadow-lg hover:scale-[103%] transition-transform duration-200 ease-in-out ${index === 0 && 'md:col-span-2 md:row-span-2'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      {isHovered && (
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#14213D] m-2 p-4 rounded-md">
          <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

          <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-[#FCA311] flex justify-center items-center text-[#14213D] text-base font-bold">
                {name[0].toUpperCase()}
              </div>
              <p className="text-white text-sm">{name}</p>
            </div>
            <button
              type="button"
              onClick={()=> handleDownload(photo)}
              className="outline-none bg-transparent border-none"
            >
              <BsFillArrowDownCircleFill className='w-6 h-6 object-contain invert bg-[#E5E5E5]' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;