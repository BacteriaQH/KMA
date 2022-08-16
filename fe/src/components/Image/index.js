import { Image as ImageBootstrap } from 'react-bootstrap';
import images from '~/assets/image';

function Image({ src, alt, isMale, isLogo, isIcon, isAvatar, height = '' }) {
    if (isLogo) {
        src = images.logoB;
        height = '70px';
    } else if (isIcon) {
        height = '20px';
    } else if (isAvatar) {
        src = isMale ? images.male : images.female;
        height = '40px';
    }
    return <ImageBootstrap src={src} alt={alt} roundedCircle height={height} />;
}
export default Image;
