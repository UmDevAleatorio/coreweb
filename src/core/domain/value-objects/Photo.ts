import { StaticImageData } from "next/image";

export class Photo {
    private constructor(readonly url: string | StaticImageData) { } 

    static create(url: string | StaticImageData): Photo {
        if (!this.validate(url)) {
            throw new Error('URL da foto inválida.'); 
        }
        return new Photo(url);
    }

    private static validate(url: string | StaticImageData): boolean {
        if (typeof url === 'string') {
            return url.length > 0; 
        }
        return !!url; 
    }
}