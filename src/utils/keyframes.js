import { keyframes } from '@emotion/core';

export const slideUp = (pixel) => keyframes`
from {
    opacity: 0;
    transform: translateY(${pixel}px);
}`;

export const slideDown = (pixel) => keyframes`
from {
    opacity: 0;
    transform: translateY(-${pixel}px);
}`;

export const slideLeft = (pixel) => keyframes`
from {
    opacity: 0;
    transform: translateX(${pixel}px);
}`;

export const slideRight = (pixel) => keyframes`
from {
    opacity: 0;
    transform: translateX(-${pixel}px);
}`;
