import Image from "next/image";

interface Props {
   size?: number;
}

const LoadingLogo = ({ size }: Props) => {
   return (
      <div className="w-full h-full flex justify-center items-center">
         <Image
            className="animate-pulse invert dark:brightness-0 duration-1000
            ease-in-out"
            
            src="/logo-baru.png"
            alt="logo"
            width={size}
            height="100"
         />
      </div>
   );
};

export default LoadingLogo;
