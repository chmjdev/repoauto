// repo-player.instrument.js — browse the library clone and play a file
// in this panel. mp4/mov/webm → video; mp3/wav/m4a → audio. START/STOP,
// token on the media URL. Other files are listed and refused.

AUTO.registerWidget({
  name: 'repo-player',
  title: 'Repo Player',
  aliases: ['repo player', 'library player', 'browse the repo', 'the repo player'],

  async mount(el, ctx) {
    const kindOf = window.mediaKind || ((f) =>
      /\.(mp4|m4v|mov|webm)$/i.test(f) ? 'video'
      : /\.(mp3|wav|m4a)$/i.test(f) ? 'audio' : null);
    const filePath = window.libraryFilePath || ((folder, file) => {
      const name = encodeURIComponent(file);
      if (!folder || folder === 'root') return '/api/library/file/' + name;
      return '/api/library/file/' + folder.split('/').map(encodeURIComponent).join('/') + '/' + name;
    });
    const srcFn = window.clipMediaUrl || window.autoApiUrl;
    const start = window.startClip;
    const stop = window.stopClip;

    let library = {};
    let folder = null;
    try {
      const d = await (await ctx.api('/api/library/list')).json();
      library = d.library || {};
    } catch {
      el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:24px 0">LIBRARY UNREACHABLE</div>';
      return;
    }

    const video = document.createElement('video');
    video.playsInline = true;
    video.preload = 'auto';
    video.style.cssText = 'width:100%;aspect-ratio:16/9;border-radius:6px;background:#000;display:none;margin:8px 0';
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.style.cssText = 'width:100%;display:none;margin:8px 0';
    const now = document.createElement('div');
    now.className = 'wgt-dim wgt-center';
    const fault = document.createElement('div');
    fault.className = 'wgt-dim wgt-center';
    fault.style.minHeight = '1em';
    const bar = document.createElement('div');
    bar.style.cssText = 'display:none;gap:10px;justify-content:center;padding-top:4px';
    const pill = (label, fn) => {
      const b = document.createElement('div');
      b.className = 'wgt-dim';
      b.textContent = label;
      b.style.cssText = 'cursor:pointer;letter-spacing:2px;padding:6px 18px;'
        + 'border:1px solid rgba(0,229,255,0.3);border-radius:999px';
      b.onclick = fn;
      return b;
    };
    const live = () => (video.style.display !== 'none' ? video : audio);
    bar.append(
      pill('▶ START', async () => {
        fault.textContent = '';
        const m = live();
        const r = start
          ? await start(m)
          : await m.play().then(() => ({ started: !m.paused }))
              .catch(e => ({ started: false, error: e.message || String(e) }));
        if (!r.started) fault.textContent = String(r.error || 'WILL NOT PLAY').toUpperCase();
      }),
      pill('■ STOP', () => {
        if (stop) { stop(video); stop(audio); }
        else { video.pause(); audio.pause(); }
        fault.textContent = '';
      }));
    const list = document.createElement('div');
    list.className = 'wgt-days';

    function halt() {
      try { video.pause(); video.removeAttribute('src'); video.load(); } catch { /* idle */ }
      try { audio.pause(); audio.removeAttribute('src'); audio.load(); } catch { /* idle */ }
      video.style.display = 'none';
      audio.style.display = 'none';
      bar.style.display = 'none';
    }

    function play(fold, file) {
      const kind = kindOf(file);
      if (!kind) { fault.textContent = 'NOT A CLIP OR TRACK'; return; }
      halt();
      fault.textContent = '';
      const path = filePath(fold, file);
      const src = srcFn ? srcFn(path) : path;
      const target = kind === 'video' ? video : audio;
      target.src = src;
      target.style.display = 'block';
      bar.style.display = 'flex';
      now.textContent = file.replace(/\.[^.]+$/, '').replace(/_/g, ' ').toUpperCase();
      window.autoRadio?.stop();
      window.autoMusic?.stop();
    }

    function rowHtml(left, right) {
      const row = document.createElement('div');
      row.className = 'wgt-dayrow';
      row.style.cursor = 'pointer';
      row.innerHTML = `<span class="wgt-day">${left}</span><span class="wgt-rain">${right}</span>`;
      return row;
    }

    function paint() {
      list.innerHTML = '';
      if (folder == null) {
        now.textContent = 'THE REPO';
        const names = Object.keys(library).sort();
        if (!names.length) {
          list.innerHTML = '<div class="wgt-dim wgt-center" style="padding:12px 0">NOTHING IN THE LIBRARY</div>';
          return;
        }
        for (const name of names) {
          const r = rowHtml(name.toUpperCase(), String(library[name]?.length || 0));
          r.onclick = () => { folder = name; paint(); };
          list.appendChild(r);
        }
        return;
      }
      const back = rowHtml('← SHELVES', '');
      back.onclick = () => { folder = null; halt(); now.textContent = 'THE REPO'; paint(); };
      list.appendChild(back);
      const files = (library[folder] || []).slice().sort();
      now.textContent = folder.toUpperCase();
      for (const file of files) {
        const kind = kindOf(file);
        const tag = kind === 'video' ? 'MP4' : kind === 'audio' ? 'MP3' : '';
        const r = rowHtml(file.toUpperCase(), tag);
        r.onclick = () => play(folder, file);
        list.appendChild(r);
      }
    }

    el.innerHTML = '';
    el.append(now, video, audio, bar, fault, list);
    paint();
    return () => halt();
  }
});
