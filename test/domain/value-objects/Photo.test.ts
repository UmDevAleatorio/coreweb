import { Photo } from '@domain/value-objects/Photo';
import { StaticImageData } from 'next/image';

describe('Value Object: Photo', () => {
  it('should create a valid photo from a URL string', () => {
    const photo = Photo.create('http://example.com/img.jpg');
    expect(photo.url).toBe('http://example.com/img.jpg');
  });

  it('should create a valid photo from a local image import', () => {
    const mockImageData = { src: '/_next/img.jpg', height: 100, width: 100 } as StaticImageData;
    const photo = Photo.create(mockImageData);
    expect(photo.url).toBe(mockImageData);
  });

  it('should throw an error for an invalid URL (empty string)', () => {
    expect(() => Photo.create('')).toThrow('URL da foto inválida.');
  });
});