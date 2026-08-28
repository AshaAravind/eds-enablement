export default async function decorate(block) {
  const link = block.querySelector('a');
  const prefix = link ? new URL(link.getAttribute('href'), window.location.origin).pathname : '';
  block.textContent = '';

  const resp = await fetch('/query-index.json');
  if (!resp.ok) return;
  const { data: pages = [] } = await resp.json();

  const matches = pages.filter((page) => page.path.startsWith(prefix));

  const list = document.createElement('ul');
  matches.forEach((page) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = page.path;
    a.textContent = page.title || page.path;
    const p = document.createElement('p');
    p.textContent = page.description || '';
    li.append(a, p);
    list.append(li);
  });
  block.append(list);
}
