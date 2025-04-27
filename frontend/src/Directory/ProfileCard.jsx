import { useRef } from "react";

function ProfileCard({ userProps }) {
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left + 50; // X position within the card
    const y = e.clientY - rect.top + 50; // Y position within the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transition = "transform 0.3s ease-out";
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;

    setTimeout(() => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`; // Reset rotation
    }, 100);
  };

  return (
    <>
      <div
        className="directory-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h3>
          {userProps.firstName} {userProps.lastName}
        </h3>
        <p style={{ fontSize: "10pt" }}>{userProps.email}</p>

        <a
          href={`https://github.com/${userProps.githubUsername}`}
          className="no-underline font-bold text-[--primary-color] tx-xs hover:text-[--primary-color]"
        >
          {userProps.githubUsername}
        </a>

        <p> Admin: {userProps.isAdmin ? "Yes" : "No"}</p>
      </div>
    </>
  );
}

export default ProfileCard;
