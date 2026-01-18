import { $ as attr, a3 as ensure_array_like } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let todos = [];
    let isLoading = true;
    $$renderer2.push(`<div class="board svelte-1g7fi1p">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading svelte-1g7fi1p">Loading todos from Cloudflare D1...</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="controls svelte-1g7fi1p"><input class="new-todo svelte-1g7fi1p" placeholder="what needs to be done?"${attr("disabled", isLoading, true)}/> <div class="action-buttons svelte-1g7fi1p"><button class="secondary svelte-1g7fi1p"${attr("disabled", !todos.some((t) => t.done) || isLoading, true)}>Clear Completed</button></div></div> <div class="columns svelte-1g7fi1p"><div class="left svelte-1g7fi1p"><h2 class="svelte-1g7fi1p">todo (${escape_html(todos.filter((t) => !t.done).length)})</h2> `);
    const each_array = ensure_array_like(todos.filter((t) => !t.done));
    if (each_array.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let todo = each_array[$$index];
        $$renderer2.push(`<label class="svelte-1g7fi1p"><input type="checkbox"${attr("checked", todo.done, true)}${attr("disabled", isLoading, true)} class="svelte-1g7fi1p"/> <span class="description svelte-1g7fi1p">${escape_html(todo.description)}</span> <button${attr("disabled", isLoading, true)} class="svelte-1g7fi1p">x</button></label>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-1g7fi1p">All done! 🎉</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="right svelte-1g7fi1p"><h2 class="svelte-1g7fi1p">done (${escape_html(todos.filter((t) => t.done).length)})</h2> `);
    const each_array_1 = ensure_array_like(todos.filter((t) => t.done));
    if (each_array_1.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let todo = each_array_1[$$index_1];
        $$renderer2.push(`<label class="svelte-1g7fi1p"><input type="checkbox"${attr("checked", todo.done, true)}${attr("disabled", isLoading, true)} class="svelte-1g7fi1p"/> <span class="description svelte-1g7fi1p">${escape_html(todo.description)}</span> <button${attr("disabled", isLoading, true)} class="svelte-1g7fi1p">x</button></label>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-1g7fi1p">Nothing completed yet</div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="stats svelte-1g7fi1p"><small>Total: ${escape_html(todos.length)} |
            Todo: ${escape_html(todos.filter((t) => !t.done).length)} |
            Done: ${escape_html(todos.filter((t) => t.done).length)} | <span class="db-status svelte-1g7fi1p">${escape_html("Loading...")}</span></small></div></div>`);
  });
}
export {
  _page as default
};
