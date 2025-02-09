import Image from "next/image";

export default function WhatsappChat({ tfn }) {
  return (
    <a
      href={`https://wa.me/${tfn}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "100px",
        right: "20px",
        textDecoration: "none",
      }}
    >
      <Image src={'/assets/icons/whatsapp.png'} width={50} height={50} />
    </a>
  );
}
