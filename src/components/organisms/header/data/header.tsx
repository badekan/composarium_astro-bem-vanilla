import { type HeaderHomeItem, type HeaderProps } from "../header.astro";
import LogoSvg from "../svg/logo.svg?raw";

const homeItem: HeaderHomeItem = {
  svgString: LogoSvg,
  label: 'logo', 
}

const leftItems = [{ isActive: true, label: 'Home', url: '#' }, { label: 'Solutions', url: '#' }, { label: 'Services', url: '#' }];
const rightItems = [{ label: 'About', url: '#' }, { label: 'Contact', url: '#', isButton: true }];

const headerProps: HeaderProps = {
  homeItem,
  leftItems,
  rightItems
};

export default headerProps;