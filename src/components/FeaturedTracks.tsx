
export const FeaturedTracks = ({ imageSrc, title }) => {
    console.log(imageSrc)

   //Här vill man ju skriva ut data som 
        return (
            <div className="w-32">
    
                <img src={imageSrc} className="h-32 rounded-xl"></img>
                <p className="text-center mt-2">{title}</p>
            </div>
        )
    }