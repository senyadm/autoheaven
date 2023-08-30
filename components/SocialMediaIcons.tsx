import React from 'react';
import SvgIcon from './SvgIcon';



interface SocialMediaLinkProps{
    href: string; 
    iconFilename: string; 
}

const SocialMediaLink = ({ href, iconFilename }: SocialMediaLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className='w-9 h-9 flex justify-center border rounded-lg'>
      <SvgIcon filepath={`icons/${iconFilename}`} alt="Social Media Icon" width={12} height={12}/>
    </a>
  );
};

const SocialMediaIcons = () => {
  return (
    <div className="flex justify-between">
      <SocialMediaLink href="https://instagram.com" iconFilename="instagram-custom.svg" />
      <SocialMediaLink href="https://instagram.com" iconFilename="tiktok.svg" />
      <SocialMediaLink href="https://instagram.com" iconFilename="youtube-custom.svg" />
      <SocialMediaLink href="https://instagram.com" iconFilename="telegram.svg" />
    </div>
  );
};

export default SocialMediaIcons;




