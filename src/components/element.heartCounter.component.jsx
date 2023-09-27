import React from "react";
import { Icon } from "@iconify/react";

export default function HeartCounter(props) {
  return (
    <div className="mt-8 flex flex-row-reverse">
      <div className={`mx-4 h-6 w-6`}>
        {props.triesLeft < 3 ? (
          <Icon
            className=" text-zinc-500"
            icon="mdi:heart-outline"
            width={24}
            height={24}
          />
        ) : (
          <Icon
            className="text-zinc-100"
            icon="mdi:cards-heart"
            width={24}
            height={24}
          />
        )}
      </div>
      <div className={`mx-4 h-6 w-6`}>
        {props.triesLeft < 2 ? (
          <Icon
            className=" text-zinc-500"
            icon="mdi:heart-outline"
            width={24}
            height={24}
          />
        ) : (
          <Icon
            className="text-zinc-100"
            icon="mdi:cards-heart"
            width={24}
            height={24}
          />
        )}
      </div>
      <div className={`mx-4 h-6 w-6`}>
        {props.triesLeft < 1 ? (
          <Icon
            className=" text-zinc-500"
            icon="mdi:heart-outline"
            width={24}
            height={24}
          />
        ) : (
          <Icon
            className="text-zinc-100"
            icon="mdi:cards-heart"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
}
