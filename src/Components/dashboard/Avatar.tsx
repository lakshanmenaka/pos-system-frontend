interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = ({
  
  size = "md",
}: AvatarProps) => {
  

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-[#2563EB] font-semibold text-white`}
    >
      
    </div>
  );
};

export default Avatar;