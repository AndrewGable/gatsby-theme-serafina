import React, {useState} from "react";
import Layout from "./layout";
import PhotoAlbum from "react-photo-album";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {Box} from "theme-ui";
import SEO from "./seo";
import useWindowDimensions from "../hooks/use-window-dimensions";
import {FaCameraRetro, FaStopwatch, FaRulerHorizontal} from "react-icons/fa";
import {FiAperture} from "react-icons/fi";

export default ({name, options, photos}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const {width} = useWindowDimensions();

    const openLightbox = (event, photo, index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const getCaption = (photo) => {
        if (photo.EXIF) {
            let cameraEXIF = photo.EXIF.Model + ' ' + photo.EXIF.LensModel;
            // Remove any duplicated words (e.g. from iPhone EXIF)
            cameraEXIF = Array.from(new Set(cameraEXIF.split(' '))).join( " ");
            return (<><div style={{display: "flex", alignItems: "center", gap: 6}}><FaCameraRetro />{cameraEXIF}</div><div style={{display: "flex", alignItems: "center", gap: 6}}><FaRulerHorizontal/> {Math.round(photo.EXIF.FocalLength * 10)/10}mm <FiAperture/> ƒ/{photo.EXIF.FNumber} <FaStopwatch/> 1/{Math.round(1/photo.EXIF.ExposureTime)} ISO {photo.EXIF.ISO} </div></>)
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
                    if (width < 500) return 1;
                    if (width < 800) return 2;
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
