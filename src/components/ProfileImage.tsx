import Image from "next/image";

type ProfileImageProps = {
  src?: string | null;
};

export function ProfileImage({ src }: ProfileImageProps) {
  return (
    <div>{src == null ? null : <Image src={src} alt="ProfileImage" />}</div>
  );
}
