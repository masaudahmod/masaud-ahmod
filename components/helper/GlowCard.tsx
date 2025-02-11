"use client";

import { useEffect } from "react";

interface GlowCardProps {
    children: React.ReactNode;
    identifier: string;
}

interface GlowCardConfig {
    proximity: number;
    spread: number;
    blur: number;
    gap: number;
    vertical: boolean;
    opacity: number;
}

interface GlowDOMElements {
    container: HTMLElement | null;
    cards: NodeListOf<Element>;
}

const GlowCard = ({ children, identifier }: GlowCardProps) => {
  useEffect(() => {
    const elements: GlowDOMElements = {
      container: document.querySelector(`.glow-container-${identifier}`),
      cards: document.querySelectorAll(`.glow-card-${identifier}`),
    };

    if (!elements.container || elements.cards.length === 0) return;

    const CONFIG: GlowCardConfig = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event: MouseEvent) => {
      for (const card of elements.cards) {
        const cardElement = card as HTMLElement;
        const CARD_BOUNDS = cardElement.getBoundingClientRect();

        if (
          event.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          cardElement.style.setProperty("--active", "1");
        } else {
          cardElement.style.setProperty("--active", CONFIG.opacity.toString());
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];

        let ANGLE =
          (Math.atan2(event.y - CARD_CENTER[1], event.x - CARD_CENTER[0]) *
            180) /
          Math.PI;

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

        cardElement.style.setProperty("--start", (ANGLE + 90).toString());
      }
    };

    document.body.addEventListener("pointermove", UPDATE);

    const RESTYLE = () => {
      if (!elements.container) return;
      elements.container.style.setProperty("--gap", CONFIG.gap.toString());
      elements.container.style.setProperty("--blur", CONFIG.blur.toString());
      elements.container.style.setProperty("--spread", CONFIG.spread.toString());
      elements.container.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    RESTYLE();
    UPDATE(new MouseEvent("mousemove"));

    return () => {
      document.body.removeEventListener("pointermove", UPDATE);
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;