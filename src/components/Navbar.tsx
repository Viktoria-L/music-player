import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { GoInfo, GoHome, GoListUnordered, GoLog } from 'react-icons/go';
import { PiMusicNotes } from 'react-icons/pi';

export const Navbar = () => {
    const [openNav, setOpenNav] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const threshold = 900;

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(()=> {
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(()=> {
        if (windowWidth <= threshold) {
            setOpenNav(false);
        } else {
            setOpenNav(true);
        }
    }, [windowWidth, threshold])

    return (
    
            <div className={`min-h-screen -mt-20 p-5 pt-8 ${openNav ? 'w-72' : 'w-20'} relative duration-300 bg-black bg-opacity-40`}>
            
             {openNav ? 
             <FaAnglesLeft onClick={()=>{setOpenNav((prev) => !prev)}} className='rounded-full bg-teal text-2xl p-1 absolute -right-3 top-20 cursor-pointer' /> : 
             <FaAnglesRight onClick={()=>{setOpenNav((prev) => !prev)}} className='rounded-full bg-teal text-2xl p-1 absolute -right-3 top-20 cursor-pointer' /> }
                <ul className="mt-24 flex flex-col gap-6">
                        <li>
                            <NavLink to="/" className=''>{openNav ? <div className='flex gap-2 items-center'><GoHome className='text-xl'/> Home</div> : <GoHome className='text-2xl' />}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className=''>{openNav ? <div className='flex gap-2 items-center'><GoListUnordered className='text-xl'/> Playlists</div>: <GoListUnordered className='text-2xl' />}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className=''>{openNav ? <div className='flex gap-2 items-center'><PiMusicNotes className='text-xl'/> Songs</div> : <PiMusicNotes className='text-2xl' />}</NavLink>
                        </li>                       
                        <li>
                            <NavLink to="/about" className=''>{openNav ? <div className='flex gap-2 items-center'><GoInfo className='text-xl'/> About</div> : <GoInfo className='text-2xl'/>}</NavLink>
                        </li>
                </ul>
        </div>
    
      
    )
}


//TODO, gör en till UL nedanför som kan fyllas på med spellistor. och visa spellistor samt en spellista add new


