import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URL } from "@/lib/constants";

/**
 * Facebook Page plugin (compact header + Like) — see Meta Page Plugin docs.
 */
export default function FacebookSiteLikeEmbed() {
  const params = new URLSearchParams({
    href: FACEBOOK_PAGE_URL,
    tabs: "timeline",
    width: "270",
    height: "70",
    small_header: "true",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "false",
    appId: FACEBOOK_APP_ID,
  });
  const src = `https://www.facebook.com/plugins/page.php?${params.toString()}`;

  return (
    <div className="mt-5 pt-5 border-t border-neutral-700 w-full max-w-[270px]">
      <iframe
        title="Mauritius Explored on Facebook"
        src={src}
        width={270}
        height={70}
        className="block border-0 overflow-hidden"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
