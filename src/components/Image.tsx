export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  webp?: string;
  style?: string;
  imgWidth?: string;
  imgHeight?: string;
  lazyLoading?: boolean;
};

const Image = ({
  src,
  alt,
  className,
  webp,
  style = "",
  imgWidth = "100%",
  imgHeight = "100%",
  lazyLoading = true,
}: ImageProps) => {
  // TODO: Consume Style prop

  return webp ? (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <source srcSet={src} type="image/png	" />
      <img
        src={src}
        alt={alt}
        loading={`${lazyLoading ? "lazy" : "eager"}`}
        className={className}
        width={imgWidth}
        height={imgHeight}
      />
    </picture>
  ) : (
    <img
      src={src}
      alt={alt}
      loading={`${lazyLoading ? "lazy" : "eager"}`}
      className={className}
      width={imgWidth}
      height={imgHeight}
    />
  );
};

export { Image };
