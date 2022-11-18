import React, {useState} from "react";
import Layout from "./layout";
import PhotoAlbum from "react-photo-album";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {Box} from "theme-ui";
import SEO from "./seo";
import {FaCameraRetro, FaStopwatch, FaRulerHorizontal} from "react-icons/fa";
import {FiAperture} from "react-icons/fi";
import {isMobileOnly, isTablet} from "react-device-detect";

export default ({name, options, photos}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const openLightbox = (event, photo, index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const getCaption = (photo) => {
        if (photo.EXIF) {
            const model = photo.EXIF.Model || '';
            const lensModel = photo.EXIF.LensModel || '';
            const aperture = photo.EXIF.FNumber ? <><FiAperture/> ƒ/{photo.EXIF.FNumber}</> : '';
            const focalLength = photo.EXIF.FNumber ? <><FaRulerHorizontal/> {Math.round(photo.EXIF.FocalLength * 10) / 10}mm</> : '';
            const shutterSpeed = photo.EXIF.ExposureTime ? <><FaStopwatch/> 1/{Math.round(1 / photo.EXIF.ExposureTime)}</> : '';
            const iso = photo.EXIF.ISO ? <> ISO {photo.EXIF.ISO}</> : '';

            let cameraEXIF = model + ' ' + lensModel;
            // Remove any duplicated words (e.g. from iPhone EXIF)
            cameraEXIF = Array.from(new Set(cameraEXIF.split(' '))).join(" ");
            return (<>
                <div style={{display: "flex", alignItems: "center", gap: 6}}><FaCameraRetro/>{cameraEXIF}</div>
                <div style={{display: "flex", alignItems: "center", gap: 6}}>
                    {focalLength}
                    {aperture}
                    {shutterSpeed}
                    {iso}
                </div>
            </>)
        }

        return photo.title;
    }

    return (<Layout>
        <SEO title={name}/>
        <Box sx={{p: `${options.spacing}px`}}>
            <PhotoAlbum
                photos={photos}
                layout={options.layout}
                spacing={options.spacing}
                columns={() => {
                    if (isMobileOnly) return 1;
                    if (isTablet) return 2;
                    return 3;
                }}
                onClick={openLightbox}
            />
        </Box>
        {isOpen && (
            <Lightbox
                mainSrc={photos[photoIndex].src}
                nextSrc={photos[(photoIndex + 1) % photos.length].src}
                prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].src}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photos.length)}
                imageCaption={getCaption(photos[photoIndex])}
                reactModalStyle={{overlay: {zIndex: 200}}}
            />
        )}
    </Layout>);
};
