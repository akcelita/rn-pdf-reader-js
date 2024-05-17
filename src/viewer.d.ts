declare module 'viewer' {
    export function getViewerHtml(
        base64: string,
        customStyle?: CustomStyle,
        withScroll: boolean = false,
        withPinchZoom: boolean = false,
        maximumPinchZoomScale: number = 5,
      ): string
    export function getBundle(): string
} 