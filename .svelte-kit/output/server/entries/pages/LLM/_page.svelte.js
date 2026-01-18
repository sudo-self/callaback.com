import { _ as attr_class, a1 as store_get, a3 as ensure_array_like, a0 as stringify, $ as attr, a2 as unsubscribe_stores } from "../../../chunks/index.js";
import { t as theme } from "../../../chunks/theme.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let messages = [];
    let input = "";
    let loading = false;
    let typingInterval;
    {
      {
        clearInterval(typingInterval);
      }
    }
    $$renderer2.push(`<section${attr_class("chat-page svelte-o39feg", void 0, {
      "dark": store_get($$store_subs ??= {}, "$theme", theme) === "dark"
    })}><header class="chat-header svelte-o39feg"><h1 class="svelte-o39feg"><span class="brand-gradient svelte-o39feg">ai.callaback</span></h1> <p class="subtitle svelte-o39feg">Talk to the Callaback assistant</p></header> <div class="chat-shell svelte-o39feg"><div class="chat-messages svelte-o39feg"><!--[-->`);
    const each_array = ensure_array_like(messages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let msg = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`message ${stringify(msg.role)}`, "svelte-o39feg")}>${escape_html(msg.content)}</div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div></div></div> <form class="chat-input svelte-o39feg"><input placeholder="Ask something…"${attr("value", input)}${attr("disabled", loading, true)} autocomplete="off" class="svelte-o39feg"/> <button${attr("disabled", !input.trim(), true)} class="svelte-o39feg">Send</button></form></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
