/**
 * Gallery: loads gallery/gallery.json and renders sections by folder.
 * - Root images (e.g. "photo.jpg") go in section "Gallery".
 * - Paths with a folder (e.g. "events/photo.jpg") get a section from the folder name (e.g. "Events").
 * To add photos: add the image file to gallery/ or gallery/Subfolder/, then add the path to gallery.json "images" array.
 */
(function () {
  const GALLERY_JSON = 'gallery/gallery.json';
  const GALLERY_BASE = 'gallery/';

  function getSectionKey(path) {
    const i = path.indexOf('/');
    return i === -1 ? '' : path.slice(0, i);
  }

  function sectionTitle(key) {
    if (!key) return 'Gallery';
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  }

  function groupImagesBySection(images) {
    const sections = {};
    images.forEach(function (path) {
      const key = getSectionKey(path);
      if (!sections[key]) sections[key] = [];
      sections[key].push(path);
    });
    return sections;
  }

  function renderSection(title, paths) {
    const section = document.createElement('section');
    section.className = 'gallery-section';
    section.setAttribute('aria-labelledby', 'section-' + title.replace(/\s+/g, '-'));
    const h2 = document.createElement('h2');
    h2.id = 'section-' + title.replace(/\s+/g, '-');
    h2.textContent = title;
    section.appendChild(h2);
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    paths.forEach(function (path) {
      const src = GALLERY_BASE + path;
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('role', 'button');
      item.tabIndex = 0;
      const img = document.createElement('img');
      img.src = src;
      img.alt = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      img.loading = 'lazy';
      item.appendChild(img);
      item.addEventListener('click', function () { openLightbox(src, img.alt); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(src, img.alt);
        }
      });
      grid.appendChild(item);
    });
    section.appendChild(grid);
    return section;
  }

  function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('.lightbox-content');
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function showError() {
    document.getElementById('gallery-loading').style.display = 'none';
    document.getElementById('gallery-sections').style.display = 'none';
    document.getElementById('gallery-error').style.display = 'block';
  }

  function getGalleryData() {
    var el = document.getElementById('gallery-data');
    if (el && el.textContent) {
      try {
        return JSON.parse(el.textContent);
      } catch (e) {}
    }
    return null;
  }

  function run() {
    initLightbox();
    var data = getGalleryData();
    if (!data) {
      showError();
      return;
    }
    var images = data.images;
    if (!Array.isArray(images) || images.length === 0) {
      document.getElementById('gallery-loading').textContent = 'No photos in the gallery yet.';
      document.getElementById('gallery-loading').style.display = 'block';
      document.getElementById('gallery-sections').style.display = 'none';
      return;
    }
    var sections = groupImagesBySection(images);
    var container = document.getElementById('gallery-sections');
    var keys = Object.keys(sections).sort();
    keys.forEach(function (key) {
      container.appendChild(renderSection(sectionTitle(key), sections[key]));
    });
    document.getElementById('gallery-loading').style.display = 'none';
    container.style.display = 'block';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
