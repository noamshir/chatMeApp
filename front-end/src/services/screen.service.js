function isMobile(width) {
    return width < 720
}

function isTablet(width) {
    return width >= 720
}

export default {
    isMobile,
    isTablet
}


