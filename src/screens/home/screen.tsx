import {
  faBalanceScaleLeft,
  faFolderOpen,
  faQuestionCircle,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Feather } from "./Feather";
export const HomePage: React.FC = () => {

 /*
  const share = () => {
    fetch(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    )
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        let navigator: any = window.navigator;
        var file = new File([blob], "Name-image-whith-extension", {
          type: "image/jpeg",
        });
        var filesArray = [file];
        var shareData: { title: string; files: any } = {
          files: filesArray,
          title: "",
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          // Adding title afterwards as navigator.canShare just
          // takes files as input
          shareData.title = "Name";

          navigator
            .share(shareData)
            .then(() => console.log("Share was successful."))
            .catch((error: any) => console.log("Sharing failed", error));
        } else {
          console.log("Your system doesn't support sharing files.");
        }
      });
  };
 */


  return (
    <div className="homepage">
      <Feather href="/files" text="Directorio" icon={faFolderOpen} />
      <Feather
        href="/comparador"
        text="Comparativos"
        icon={faBalanceScaleLeft}
      />
      <Feather href="/cotizador" text="Cotizaciones" icon={faSlidersH} />
      <Feather href="/support" text="Ayuda y Soporte" icon={faQuestionCircle} />
    </div>
  );
};
